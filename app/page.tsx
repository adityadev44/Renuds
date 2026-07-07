"use client";

import { useRef, useState } from "react";

type Status = "idle" | "loading" | "done";
type IngestStatus = "idle" | "running" | "done" | "error";

const EXAMPLES = [
  "How do I eval an agent?",
  "What is RAG?",
  "Explain inverse scaling.",
];

type Source = { source: string; score: number; text: string };

export default function Home() {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [sources, setSources] = useState<Source[]>([]);
  const [ingestStatus, setIngestStatus] = useState<IngestStatus>("idle");
  const [ingestMsg, setIngestMsg] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const idle = status === "idle";

  function resize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  async function submit(q: string) {
    const trimmed = q.trim();
    if (!trimmed || status === "loading") return;
    setQuestion(trimmed);
    setAnswer("");
    setSources([]);
    setStatus("loading");
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setAnswer(data.answer);
      setSources(data.sources ?? []);
    } catch (err) {
      setAnswer(`Error: ${err instanceof Error ? err.message : "Something went wrong"}`);
    }
    setStatus("done");
  }

  async function triggerIngest() {
    if (ingestStatus === "running") return;
    setIngestStatus("running");
    setIngestMsg("");
    try {
      const res = await fetch("/api/ingest", { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setIngestStatus("done");
        setIngestMsg(`${data.chunks} chunks from ${data.sources} files`);
      } else {
        setIngestStatus("error");
        setIngestMsg(data.error ?? "Unknown error");
      }
    } catch {
      setIngestStatus("error");
      setIngestMsg("Network error — is the dev server running?");
    }
  }

  function reset() {
    setInput("");
    setQuestion("");
    setAnswer("");
    setSources([]);
    setStatus("idle");
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  }

  const composer = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(input);
      }}
      className="group relative w-full rounded-2xl border border-zinc-200 bg-white shadow-sm transition-colors focus-within:border-zinc-300 focus-within:ring-4 focus-within:ring-zinc-900/5"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          resize();
        }}
        onKeyDown={onKeyDown}
        placeholder="Ask anything about AI…"
        aria-label="Ask a question"
        className="max-h-48 w-full resize-none bg-transparent py-4 pl-5 pr-14 text-[15px] leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={!input.trim() || status === "loading"}
        aria-label="Submit question"
        className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white transition enabled:hover:bg-zinc-700 enabled:active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </form>
  );

  return (
    <main className="min-h-dvh bg-white text-zinc-900">
      {!idle && (
        <header className="sticky top-0 z-10 border-b border-zinc-100 bg-white/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-2xl items-center px-6">
            <button
              onClick={reset}
              className="text-sm font-medium tracking-tight text-zinc-900 transition-colors hover:text-zinc-500"
            >
              Renuds
            </button>
          </div>
        </header>
      )}

      <div
        className={
          idle
            ? "mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-0 px-6 py-12 text-center"
            : "mx-auto w-full max-w-2xl px-6 pb-28 pt-8 sm:pt-10"
        }
      >
        {idle && (
          <>
            <span className="mb-3 text-sm font-medium tracking-tight text-zinc-400">
              Renuds
            </span>
            <h1 className="mb-8 text-[clamp(1.75rem,1.1rem+2.8vw,2.75rem)] font-semibold leading-tight tracking-tight text-balance text-zinc-900">
              What do you want to understand?
            </h1>
          </>
        )}

        {composer}

        {idle && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {EXAMPLES.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  submit(q);
                }}
                className="rounded-full border border-zinc-200 px-3.5 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {idle && (
          <div className="mt-16 flex flex-col items-center gap-1.5">
            <button
              onClick={triggerIngest}
              disabled={ingestStatus === "running"}
              className="text-xs text-zinc-300 transition-colors hover:text-zinc-500 disabled:cursor-not-allowed"
            >
              {ingestStatus === "running" ? "Ingesting…" : "Re-ingest corpus"}
            </button>
            {ingestMsg && (
              <p className={`text-xs ${ingestStatus === "error" ? "text-red-400" : "text-zinc-400"}`}>
                {ingestMsg}
              </p>
            )}
          </div>
        )}

        {!idle && (
          <section className="mt-8">
            <p className="text-base font-medium text-zinc-400">{question}</p>

            <div className="mt-5">
              {status === "loading" ? (
                <div className="flex items-center gap-1.5" aria-label="Thinking">
                  <Dot delay="0ms" />
                  <Dot delay="150ms" />
                  <Dot delay="300ms" />
                </div>
              ) : (
                <article className="text-[clamp(1rem,0.95rem+0.25vw,1.0625rem)] leading-8 text-zinc-800 [overflow-wrap:anywhere]">
                  {answer}
                </article>
              )}
            </div>

            {status === "done" && sources.length > 0 && (
              <div className="mt-8 border-t border-zinc-100 pt-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Retrieved sources
                </p>
                <div className="flex flex-col gap-2">
                  {sources.map((s, i) => (
                    <details key={i} className="group rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2">
                      <summary className="flex cursor-pointer items-center justify-between text-xs text-zinc-500 marker:content-none">
                        <span className="font-mono">{s.source}</span>
                        <span className="ml-3 shrink-0 text-zinc-300">score {s.score.toFixed(2)}</span>
                      </summary>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-500">{s.text.slice(0, 300)}…</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"
      style={{ animationDelay: delay }}
    />
  );
}
