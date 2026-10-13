---
title: 'Pavii'
seoTitle: 'Pavii: AI Agent Security on the Blockchain | Buckleson'
description: 'Pavii secures AI agents like Claude, Codex, ChatGPT and Grok. Every call passes six security gates and leaves a tamper-proof receipt on the Hyper 0X blockchain.'
order: 2
status: 'live'
tagline: 'Security gates and tamper-proof receipts for every AI agent'
summary: |
  Pavii sits between your AI agents and your systems. Every call from Claude, Codex, ChatGPT, Grok or your own agents passes six security gates, and the rules and receipts live on Hyper 0X, so nobody can quietly change or delete what an agent did. It also cuts token spend by 30 to 60 percent.
diagram: 'pavii'
features:
  - title: 'Connect any agent'
    subTitle: 'Claude, Claude Code, Codex, ChatGPT, Grok, OpenCode and your own custom agents, through one gateway.'
  - title: 'Blocks prompt injection'
    subTitle: 'Untrusted text is treated as data. A detector plus an on-chain contract hard-stops injected instructions.'
  - title: 'Stops data leaks'
    subTitle: 'A privacy gate redacts personal data and secrets before any model sees them.'
  - title: 'Tamper-proof receipts'
    subTitle: 'Logs are hash-chained and anchored on Hyper 0X. If anything is deleted, you see exactly what is missing.'
  - title: 'Fewer tokens'
    subTitle: '30 to 60 percent fewer tokens on a measured Claude Code task. Over 100M tokens saved across 82K+ queries.'
  - title: 'Kill switch for rogue agents'
    subTitle: 'Agents move from observed to restricted to halted as they misbehave, and a human can stop them at any time.'
details:
  title: 'Threats Pavii stops'
  items:
    - title: 'Prompt injection (OWASP LLM01)'
      subTitle: 'Injected instructions in web pages, files or tool output are detected and blocked.'
    - title: 'Sensitive data leaks (LLM02)'
      subTitle: 'PII and secrets are redacted on the way in and stripped on the way out.'
    - title: 'Supply chain (LLM03)'
      subTitle: 'Allow-lists, pinned hashes and a sandbox for every new package or MCP server.'
    - title: 'Unsafe output (LLM05)'
      subTitle: 'Scripts and secrets are removed from agent output before delivery.'
    - title: 'Excessive agency (LLM06)'
      subTitle: 'An egress smart contract on Hyper 0X decides what an agent may send or do.'
    - title: 'Runaway cost (LLM10)'
      subTitle: 'Budgets and MCP compaction keep token spend under control.'
cta:
  title: 'Book a Pavii demo'
  url: 'https://cal.com/buckleson-group/30min'
learnMore:
  - title: 'How to secure AI agents: 8 attacks'
    url: '/blog/how-to-secure-ai-agents/'
  - title: 'Proof of execution for AI'
    url: '/blog/proof-of-execution-ai/'
faqs:
  - question: 'What does Pavii do?'
    answer: 'Pavii is a security gateway for AI agents. It checks every agent call against six gates (injection, privacy, supply chain, budget, egress and output) and records rules and receipts on the Hyper 0X blockchain.'
  - question: 'Which AI agents does Pavii support?'
    answer: 'Claude, Claude Code, Codex, ChatGPT, Grok, OpenCode and custom agents. You can connect your existing subscriptions.'
  - question: 'Why use a blockchain for AI security?'
    answer: 'Because logs and rules stored on a blockchain cannot be quietly edited or deleted. Every agent action leaves a signed receipt that auditors, billing and dispute teams can verify.'
---
