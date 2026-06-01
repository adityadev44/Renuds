"use client";

import { useRef, useState } from "react";

type Status = "idle" | "loading" | "done";

const EXAMPLES = [
  "How do I eval an agent?",
  "What is RAG?",
  "Explain inverse scaling.",
];

// --- Answer seam -----------------------------------------------------------
// Placeholder until the RAG retrieval backend is wired. Swapping this for
//   const res = await fetch("/api/ask", { method: "POST", body: JSON.stringify({ q }) });
//   return (await res.json()).answer;
// is the only change needed. No fabricated citations here.
const CANNED: Record<string, string> = {
  "what is rag?":
    "RAG (Retrieval-Augmented Generation) pairs a language model with a retrieval step. Instead of relying only on what the model memorized in training, the system first fetches relevant passages from an external corpus, then conditions its answer on them. This grounds responses in real source material, reduces hallucination, and lets you update knowledge by changing the corpus rather than retraining. It's the architecture Renuds itself is built on.",
  "how do i eval an agent?":
    "Evaluate an agent on whether it accomplishes tasks, not just whether individual replies look good. Start from a dataset of representative tasks with explicit success criteria, then combine three layers: (1) end-to-end outcome checks — did it reach the goal? (2) trajectory checks — did it call the right tools, in a sensible order, without wasted steps? and (3) LLM-as-judge or human review for open-ended quality. Do error analysis on failures, turn recurring ones into regression tests, and re-run the suite every time you change a prompt, tool, or model.",
  "explain inverse scaling.":
    "Inverse scaling is when a model gets worse at a task as it gets larger — even though scale usually helps. It surfaces tasks where bigger models more confidently learn the wrong heuristic: repeating a memorized pattern, following a misleading prompt, or trusting surface cues over the actual instruction. It matters because it shows scale isn't a guaranteed fix — some failures live in the training objective or prompt framing and need better data, framing, or signals rather than more parameters.",
};

async function askRenuds(q: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 800));
  return (
    CANNED[q.trim().toLowerCase()] ??
    "This is a preview of the Renuds answer surface. The retrieval pipeline that fetches and cites sources from the AI/ML canon isn't connected yet — once it is, a grounded, cited answer will appear here. Try one of the example questions to see the experience."
  );
}
// ---------------------------------------------------------------------------

export default function Home() {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
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
    setStatus("loading");
    const a = await askRenuds(trimmed);
    setAnswer(a);
    setStatus("done");
  }

  function reset() {
    setInput("");
    setQuestion("");
    setAnswer("");
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

            {status === "done" && (
              <p className="mt-8 border-t border-zinc-100 pt-4 text-xs text-zinc-400">
                Preview — answers aren&rsquo;t yet grounded in retrieved sources.
                Citations will appear here once the RAG pipeline is connected.
              </p>
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
