# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Renuds** — RAG over the AI/ML research and deployment canon. Users ask technical AI questions and get grounded, cited answers. The app is in early scaffold stage (no RAG pipeline or backend yet).

## Commands

```bash
npm run dev      # start dev server (Next.js)
npm run build    # production build
npm run lint     # ESLint
```

No test suite exists yet.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css`, no config file
- **TypeScript** with strict mode; path alias `@/*` maps to the repo root

## Structure

All app code lives under `app/` (Next.js App Router convention):

- `app/layout.tsx` — root layout; sets dark background (`bg-gray-950`) and global metadata
- `app/page.tsx` — landing page with a disabled search input (placeholder UI, not yet functional)
- `app/globals.css` — single Tailwind import, nothing else

The RAG backend (vector DB, retrieval, LLM calls, API routes) has not been built yet. When adding it, follow Next.js App Router conventions: API routes go in `app/api/`, server components handle data fetching where possible.
