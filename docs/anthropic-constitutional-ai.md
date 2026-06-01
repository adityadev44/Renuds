---
title: "Claude's Constitution (Constitutional AI)"
author: "Anthropic"
source: "https://www.anthropic.com/news/claudes-constitution"
category: "Frontier Lab Blogs"
license: "Copyrighted (Anthropic). Summarized here; one short sentence quoted under fair use with attribution."
retrieved: 2026-06-01
---

# Claude's Constitution (Constitutional AI)

**Source:** [Anthropic, 2023](https://www.anthropic.com/news/claudes-constitution) · **License:** Copyrighted — summary + short fair-use quote only

## Excerpt (short quote)

> Constitutional AI is not a perfect approach, but it does make the values of the AI system easier to understand and easier to adjust as needed.
> — Anthropic

## Summary

Constitutional AI (CAI) is Anthropic's method for aligning a model's behavior to an explicit, written set of principles — a "constitution" — instead of relying only on large volumes of human preference labels. The motivation is threefold: make the model's values **transparent** (you can read the rules), **adjustable** (you can edit the rules), and **scalable** (you don't need humans to label every harmful example, which also spares them from reviewing disturbing content).

Training happens in two phases. First, a *supervised* phase: the model critiques and revises its own responses against the constitution, learning to self-correct. Second, a *reinforcement-learning* phase (often called **RLAIF** — reinforcement learning from AI feedback): instead of humans ranking outputs, an AI judges which response better follows the constitution, and that signal trains the model. The result is a system that's both more helpful and more harmless than one tuned on human feedback alone. The principles themselves are drawn from sources like the UN Declaration of Human Rights, other labs' safety research, and cross-cultural perspectives, chosen to avoid narrow bias.

## Why it's in the Renuds corpus

Constitutional AI is a landmark alignment technique and a recurring reference point in the AI safety canon. It grounds answers about how modern assistants are trained to be safe without purely human-labeled data.
