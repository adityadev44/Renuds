---
title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
author: "Lewis, Perez, Piktus, Petroni, Karpukhin, Goyal, Küttler, Lewis, Yih, Rocktäschel, Riedel, Kiela (Meta FAIR / UCL)"
source: "https://arxiv.org/abs/2005.11401"
category: "AI Research Papers"
license: "arXiv.org perpetual non-exclusive license — not redistributable in full; abstract quoted under fair use with attribution."
retrieved: 2026-06-01
---

# Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks

**Source:** [Lewis et al., 2020 (arXiv 2005.11401)](https://arxiv.org/abs/2005.11401) · **License:** arXiv perpetual non-exclusive (abstract quoted under fair use)

## Excerpt (abstract, verbatim)

> Large pre-trained language models have been shown to store factual knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks. However, their ability to access and precisely manipulate knowledge is still limited, and hence on knowledge-intensive tasks, their performance lags behind task-specific architectures. Additionally, providing provenance for their decisions and updating their world knowledge remain open research problems. Pre-trained models with a differentiable access mechanism to explicit non-parametric memory can overcome this issue, but have so far been only investigated for extractive downstream tasks. We explore a general-purpose fine-tuning recipe for retrieval-augmented generation (RAG) -- models which combine pre-trained parametric and non-parametric memory for language generation. We introduce RAG models where the parametric memory is a pre-trained seq2seq model and the non-parametric memory is a dense vector index of Wikipedia, accessed with a pre-trained neural retriever. We compare two RAG formulations, one which conditions on the same retrieved passages across the whole generated sequence, the other can use different passages per token. We fine-tune and evaluate our models on a wide range of knowledge-intensive NLP tasks and set the state-of-the-art on three open domain QA tasks, outperforming parametric seq2seq models and task-specific retrieve-and-extract architectures. For language generation tasks, we find that RAG models generate more specific, diverse and factual language than a state-of-the-art parametric-only seq2seq baseline.

## Summary

This is the paper that named and formalized **RAG**. The core problem it addresses: a language model stores everything it "knows" in its weights (parametric memory), which makes that knowledge hard to inspect, hard to attribute to a source, and hard to update without retraining. The fix is to pair the model with an external, searchable knowledge store (non-parametric memory) — here, a dense vector index over Wikipedia — and let the model retrieve relevant passages at generation time, then condition its output on them.

The authors describe two variants: one retrieves a set of passages and uses them for the whole answer (*RAG-Sequence*), the other can attend to different passages for each token it generates (*RAG-Token*). Both are trained end-to-end with a neural retriever plus a seq2seq generator. The payoff: new state-of-the-art on three open-domain QA benchmarks, and generations that are more specific and more factual than a model relying on its weights alone — plus the practical wins of being able to cite sources and swap in fresh knowledge by changing the index.

## Why it's in the Renuds corpus

Renuds *is* a RAG system. This paper is the foundational reference for the architecture — the "why retrieval beats memorization" argument and the source-attribution motivation are exactly what Renuds is built to deliver.
