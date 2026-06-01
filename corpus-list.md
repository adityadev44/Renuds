# Renuds Corpus v0.1 — Seed Sources

Seed source list for **Renuds** — RAG over the AI/ML research & deployment canon. This is the manifest the ingestion pipeline will consume (fetch → chunk → embed → retrieve); it holds source metadata only, not the document contents.

- **Sources:** 41
- **Categories:** 5
- **Compiled:** 2026-06-01

**Selection bar:** primary/canonical sources only (official arXiv, lab blogs, author sites); recognized authorities; current versions where things evolve, foundational papers where they don't; every URL verified to resolve.

---

## AI Research Papers (10)

1. **[Language Models are Few-Shot Learners (GPT-3)](https://arxiv.org/abs/2005.14165)** — *Brown et al., OpenAI, 2020.* Introduced GPT-3 (175B) and showed that scale alone unlocks few-shot in-context learning without task-specific fine-tuning.
2. **[Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (RAG)](https://arxiv.org/abs/2005.11401)** — *Lewis et al., Meta FAIR, 2020.* The foundational RAG paper: couple a parametric LLM with a non-parametric retriever over a document index. Core to Renuds.
3. **[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)** — *Yao et al., Princeton & Google, 2022.* Interleaves chain-of-thought reasoning with tool/action steps — the blueprint for modern tool-using agents.
4. **[Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761)** — *Schick et al., Meta, 2023.* LLMs self-supervise when and how to call external APIs (search, calculator, translation) from a few demonstrations.
5. **[Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073)** — *Bai et al., Anthropic, 2022.* RLAIF: align models to a written constitution using AI feedback rather than human-labeled harmlessness data.
6. **[The Llama 3 Herd of Models](https://arxiv.org/abs/2407.21783)** — *Dubey et al., Meta, 2024.* Technical report for Meta’s open-weight Llama 3 family: data, training, scaling and evaluation at frontier scale.
7. **[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)** — *Wei et al., Google, 2022.* Showed that prompting for intermediate reasoning steps unlocks complex multi-step reasoning in large models.
8. **[FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](https://arxiv.org/abs/2205.14135)** — *Dao et al., Stanford, 2022.* IO-aware exact attention that made long-context training and inference dramatically faster and cheaper.
9. **[Measuring Massive Multitask Language Understanding (MMLU)](https://arxiv.org/abs/2009.03300)** — *Hendrycks et al., 2020.* The 57-subject benchmark that became the de-facto standard for measuring LLM knowledge and reasoning.
10. **[Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training](https://arxiv.org/abs/2401.05566)** — *Hubinger et al., Anthropic, 2024.* Demonstrates that backdoored deceptive behavior can survive standard safety training — a key alignment result.

## Frontier Lab Blogs (9)

11. **[Claude's Constitution](https://www.anthropic.com/news/claudes-constitution)** — *Anthropic, 2023.* Accessible explanation of the principles behind Constitutional AI and how they shape Claude’s behavior.
12. **[Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet](https://transformer-circuits.pub/2024/scaling-monosemanticity/)** — *Anthropic (Transformer Circuits), 2024.* Sparse autoencoders extract human-interpretable features from a production model — landmark interpretability work.
13. **[Sleeper Agents (research post)](https://www.anthropic.com/research/sleeper-agents-training-deceptive-llms-that-persist-through-safety-training)** — *Anthropic, 2024.* Blog companion to the deceptive-LLM paper, summarizing the threat model and findings for a broader audience.
14. **[GPT-4 System Card](https://cdn.openai.com/papers/gpt-4-system-card.pdf)** — *OpenAI, 2023.* Safety evaluation, red-teaming, and risk mitigations for GPT-4 — a model for documenting deployment risk.
15. **[OpenAI Evals (framework)](https://github.com/openai/evals)** — *OpenAI, 2023.* Open-source framework and registry for evaluating LLMs and LLM systems against benchmarks.
16. **[Gemini 1.5 Technical Report](https://arxiv.org/abs/2403.05530)** — *Google DeepMind, 2024.* MoE multimodal models with up to 1M-token context and near-perfect long-context retrieval.
17. **[Competitive Programming with AlphaCode](https://deepmind.google/blog/competitive-programming-with-alphacode/)** — *Google DeepMind, 2022.* First AI system to reach median human level in competitive programming contests.
18. **[Mixtral of Experts](https://mistral.ai/news/mixtral-of-experts/)** — *Mistral AI, 2023.* Open-weight sparse mixture-of-experts model that matched or beat much larger dense models at 6x faster inference.
19. **[Rerank (model docs)](https://docs.cohere.com/docs/rerank)** — *Cohere, 2024.* Production reranking model that reorders retrieved documents by semantic relevance — a practical RAG quality lever.

## AI Engineering (9)

20. **[Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/)** — *Hamel Husain, 2024.* The canonical case for (and how-to of) building evaluation systems for LLM-powered products.
21. **[A Field Guide to Rapidly Improving AI Products](https://hamel.dev/blog/posts/field-guide/)** — *Hamel Husain, 2025.* A systematic playbook for error analysis and iteration loops that actually improve AI products.
22. **[Creating a LLM-as-a-Judge That Drives Business Results](https://hamel.dev/blog/posts/llm-judge/)** — *Hamel Husain, 2024.* Practical guide to building reliable LLM-as-judge evaluators aligned to real outcomes.
23. **[Patterns for Building LLM-based Systems & Products](https://eugeneyan.com/writing/llm-patterns/)** — *Eugene Yan, 2023.* Seven battle-tested patterns: evals, RAG, fine-tuning, caching, guardrails, defensive UX, and feedback flywheels.
24. **[Simon Willison’s Weblog — LLMs](https://simonwillison.net/tags/llms/)** — *Simon Willison, 2022–present.* Continuously updated, highly cited running commentary on LLM capabilities, tooling, and practice.
25. **[AI Engineering: Building Applications with Foundation Models](https://huyenchip.com/books/)** — *Chip Huyen, 2025.* The reference book on the modern AI engineering stack: models, evals, RAG, fine-tuning, and deployment.
26. **[LangChain Blog](https://blog.langchain.com/)** — *LangChain, 2023–present.* Official blog covering agent architecture, LangGraph, evaluation, and production case studies.
27. **[LlamaIndex — High-Level Concepts (RAG)](https://developers.llamaindex.ai/python/framework/getting_started/concepts/)** — *LlamaIndex, 2024.* Core RAG concepts — documents, nodes, indexes, retrievers — from a leading data-framework for LLM apps.
28. **[Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)** — *Anthropic (Schluntz & Zhang), 2024.* Distinguishes workflows from agents and gives minimal, composable patterns for building agentic systems.

## AI Product Management (8)

29. **[AI PM Interview Guide 2026: Questions & Tools](https://www.news.aakashg.com/p/ai-pm-interview-guide-2026)** — *Aakash Gupta (Product Growth), 2026.* Up-to-date AI PM interview guide with real questions from OpenAI, Anthropic, Google, Meta and Amazon.
30. **[The AI Product Sense Interview Guide](https://www.news.aakashg.com/p/ai-product-sense-guide)** — *Aakash Gupta (Product Growth), 2025.* Five thinking shifts for AI product sense, with mock-interview analysis and company-by-company breakdowns.
31. **[The AI PM Interview: Your Complete Guide](https://www.news.aakashg.com/p/ai-pm-interview)** — *Aakash Gupta (Product Growth), 2024.* Broad primer on the AI PM role and how to prepare for the interview loop.
32. **[Marily Nika’s AI Product Academy Newsletter](https://marily.substack.com/)** — *Marily Nika (ex-Google/Meta), 2023–present.* Practical AI-for-PMs: tools, workflows, and frameworks from a leading AI PM educator.
33. **[AI and Product Management (Lenny’s summary)](https://www.lennysnewsletter.com/p/summary-ai-and-product-management)** — *Marily Nika via Lenny’s Newsletter, 2023.* Concise framework-level overview of how AI changes the PM craft.
34. **[The Product Compass — WTF is an AI Product Manager?](https://www.productcompass.pm/)** — *Paweł Huryn, 2024.* Defines the AI PM role and the skills/playbooks it demands, from a top PM newsletter.
35. **[Why AI Evals Are the Hottest New Skill for Product Builders (podcast)](https://www.lennysnewsletter.com/p/why-ai-evals-are-the-hottest-new-skill)** — *Lenny’s Podcast w/ Hamel Husain & Shreya Shankar, 2025.* Walkthrough of building evals live — why evals are now core PM/engineering skill.
36. **[Evals, Error Analysis, and Better Prompts (podcast)](https://www.lennysnewsletter.com/p/evals-error-analysis-and-better-prompts)** — *Lenny’s Podcast w/ Hamel Husain, 2025.* A systematic approach to improving AI products through error analysis and prompt iteration.

## Production Deployment (5)

37. **[Claude Code — Documentation (Overview)](https://docs.anthropic.com/en/docs/claude-code/overview)** — *Anthropic, 2025.* Official docs for Anthropic’s agentic coding tool: CLI, IDE, MCP, hooks, and automation.
38. **[Claude Agent SDK (Python)](https://github.com/anthropics/claude-agent-sdk-python)** — *Anthropic, 2025.* Build programmatic agents with Claude Code’s capabilities: query loop, custom tools, hooks, in-process MCP.
39. **[Model Context Protocol — Specification](https://modelcontextprotocol.io/specification/2025-06-18)** — *Anthropic / MCP, 2025.* Open standard (JSON-RPC) for connecting LLM apps to tools, resources, and data sources.
40. **[OpenAI Cookbook](https://cookbook.openai.com/)** — *OpenAI, 2023–present.* Open collection of example code and guides for building with the OpenAI API (agents, evals, RAG, more).
41. **[AI SDK — Documentation](https://ai-sdk.dev/docs/introduction)** — *Vercel, 2025.* TypeScript toolkit for building AI apps and agents: unified provider API, streaming, tools, structured output.

---

_Generated for Renuds. v0.1._
