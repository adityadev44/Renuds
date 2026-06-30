import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function chunkText(text: string, maxTokens = 500, overlapTokens = 50): string[] {
  const CHARS_PER_TOKEN = 4;
  const maxChars = maxTokens * CHARS_PER_TOKEN;
  const overlapChars = overlapTokens * CHARS_PER_TOKEN;
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + maxChars, text.length);
    const chunk = text.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    if (end >= text.length) break;
    start = end - overlapChars;
  }

  return chunks;
}

export async function POST() {
  try {
    const voyageKey = process.env.VOYAGE_API_KEY;
    if (!voyageKey) {
      return NextResponse.json({ ok: false, error: "VOYAGE_API_KEY not set" }, { status: 500 });
    }

    const docsDir = path.join(process.cwd(), "docs");
    const files = fs.readdirSync(docsDir).filter(
      (f) => f.endsWith(".md") && f !== "README.md"
    );

    type ChunkRecord = { text: string; source: string; chunkIndex: number };
    const allChunks: ChunkRecord[] = [];

    for (const file of files) {
      const content = fs.readFileSync(path.join(docsDir, file), "utf-8");
      const chunks = chunkText(content);
      chunks.forEach((text, i) => {
        allChunks.push({ text, source: file, chunkIndex: i });
      });
    }

    // Embed in batches of 128 (Voyage AI limit)
    const BATCH_SIZE = 128;
    const embeddings: number[][] = [];

    for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
      const batch = allChunks.slice(i, i + BATCH_SIZE).map((c) => c.text);
      const res = await fetch("https://api.voyageai.com/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${voyageKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "voyage-3", input: batch }),
      });

      if (!res.ok) {
        const err = await res.text();
        return NextResponse.json(
          { ok: false, error: `Voyage API error: ${err}` },
          { status: 500 }
        );
      }

      const data = await res.json();
      embeddings.push(
        ...data.data.map((d: { embedding: number[] }) => d.embedding)
      );
    }

    const records = allChunks.map((chunk, i) => ({
      ...chunk,
      embedding: embeddings[i],
    }));

    const libDir = path.join(process.cwd(), "lib");
    if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });
    fs.writeFileSync(
      path.join(libDir, "embeddings.json"),
      JSON.stringify(records, null, 2)
    );

    return NextResponse.json({
      ok: true,
      chunks: records.length,
      sources: files.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
