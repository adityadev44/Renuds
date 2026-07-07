import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ChunkRecord = {
  text: string;
  source: string;
  chunkIndex: number;
  embedding: number[];
};

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot  += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export async function POST(req: Request) {
  const { question } = await req.json();
  if (!question?.trim()) {
    return NextResponse.json({ error: "No question provided" }, { status: 400 });
  }

  const voyageKey = process.env.VOYAGE_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!voyageKey)    return NextResponse.json({ error: "VOYAGE_API_KEY not set" },    { status: 500 });
  if (!anthropicKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });

  // Step 1: Embed the question
  const embedRes = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${voyageKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "voyage-3", input: [question] }),
  });
  if (!embedRes.ok) {
    return NextResponse.json({ error: `Voyage error: ${await embedRes.text()}` }, { status: 500 });
  }
  const queryVector: number[] = (await embedRes.json()).data[0].embedding;

  // Step 2: Score every chunk
  const embeddingsPath = path.join(process.cwd(), "lib", "embeddings.json");
  const chunks: ChunkRecord[] = JSON.parse(fs.readFileSync(embeddingsPath, "utf-8"));

  const top5 = chunks
    .map((chunk) => ({ ...chunk, score: cosineSimilarity(queryVector, chunk.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Step 3: Call Claude with retrieved context
  const context = top5
    .map((c) => `Source: ${c.source}\n${c.text}`)
    .join("\n\n---\n\n");

  const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `Answer the user question using ONLY the provided context. Cite sources by [filename]. If the answer isn't in the context, say "I don't know."`,
      messages: [{ role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` }],
    }),
  });
  if (!claudeRes.ok) {
    return NextResponse.json({ error: `Claude error: ${await claudeRes.text()}` }, { status: 500 });
  }

  const answer = (await claudeRes.json()).content[0].text;

  return NextResponse.json({
    answer,
    sources: top5.map((c) => ({ source: c.source, score: Math.round(c.score * 100) / 100, text: c.text })),
  });
}
