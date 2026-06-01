# docs/ — Corpus reference cards

This folder holds one **reference card** per key source in the Renuds corpus — the
AI/ML research & deployment canon that Renuds answers questions over. (The full source
list lives in [`../corpus-list.md`](../corpus-list.md).)

## The "reference card, not full text" convention

Each file is a **card about** a source, **not a copy of it**. Every card has:

- **Front-matter** — title, author, source URL, category, license/access note, date retrieved
- **A short excerpt** — a brief, attributed fair-use quote (or, for the RAG paper, its freely available abstract)
- **A summary** — the key ideas in our own words
- **Why it's in the corpus** — how it grounds Renuds' answers

### Why not paste the full articles?

Two reasons:

1. **Copyright & licensing.** This is a public repo, so anything committed here is
   published to the world. Most sources are copyrighted (and two are paywalled), so
   reproducing them in full would be infringement. Cards stay within fair use:
   short attributed quotes + original summaries. Paywalled sources are summarized
   from their public teaser only and clearly marked.
2. **Architecture.** A RAG pipeline doesn't need full text sitting in the repo. When
   the ingestion pipeline is built, it will fetch each source's full content on demand
   into a **local, gitignored cache**, then chunk and embed it — keeping the repo clean
   and the heavy text out of version control.

## Files

| File | Source | Category |
|---|---|---|
| `rag-paper.md` | RAG paper (Lewis et al., 2020) | AI Research Papers |
| `hamel-evals-faq.md` | LLM Evals FAQ (Husain & Shankar) | AI Engineering |
| `anthropic-constitutional-ai.md` | Claude's Constitution (Anthropic) | Frontier Lab Blogs |
| `aakash-ai-pm-interview-guide.md` | AI PM Interview Guide 2026 (Aakash Gupta) | AI Product Management |
| `aakash-ai-product-sense-guide.md` | AI Product Sense Guide (Aakash Gupta) | AI Product Management |
