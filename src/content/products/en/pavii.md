---
title: 'Pavii'
description: 'Blockchain-based security and observability for AI agents'
main:
  id: 2
  content: |
    Pavii connects all your AI agents, including Claude, Claude Code, Codex, ChatGPT, Grok, OpenCode and your own custom agents, and gives you blockchain-based observability and protection from external threats. Any agent, ours or yours, passes six gates before it can touch your systems, and Hyper 0X keeps the receipts. Pavii also optimizes tokens and acts as an observability engine that helps your agents improve themselves.
  imgCard: '@/images/product-image-2.avif'
  imgMain: '@/images/product-image-main-2.avif'
  imgAlt: 'Pavii AI-agent security'
tabs:
  - id: 'tabs-with-card-item-1'
    dataTab: '#tabs-with-card-1'
    title: 'Overview'
  - id: 'tabs-with-card-item-2'
    dataTab: '#tabs-with-card-2'
    title: 'Threats Stopped'
  - id: 'tabs-with-card-item-3'
    dataTab: '#tabs-with-card-3'
    title: 'Architecture'
longDescription:
  title: 'Observe, Protect and Improve Every Agent'
  subTitle: |
    Every agent call passes six checks and is recorded. The security rules themselves live on Hyper 0X, and logs are hash-chained with their roots anchored on-chain, so nobody can quietly delete what an agent did. The more an agent misbehaves, the less it can do: it is watched, then restricted, then halted until a human steps in. Meanwhile, Pavii's token optimizer and versioned memory cut costs and help agents get better at their tasks.
  btnTitle: 'Secure your agents'
  btnURL: '/contact'
descriptionList:
  - title: 'Connect Any Agent'
    subTitle: 'Works with Claude, Claude Code, Codex, ChatGPT, Grok, OpenCode and your own custom agents.'
  - title: 'Token Optimizer'
    subTitle: '30–60% fewer tokens, measured on a real Claude Code task. Over 100M tokens saved across 82K+ queries.'
  - title: 'Self-Improving Memory'
    subTitle: 'Small, versioned notes loaded only when a task needs them, each one hashed on Hyper 0X.'
specificationsLeft:
  - title: 'Prompt Injection (LLM01)'
    subTitle: 'Untrusted text is treated as data. A detector plus an on-chain contract hard-stops injected instructions.'
  - title: 'Data Leaks (LLM02)'
    subTitle: 'A privacy gate redacts PII and secrets before any model sees them.'
  - title: 'Supply Chain (LLM03)'
    subTitle: 'Allow-lists, pinned hashes and a sandbox for every new package or MCP server.'
  - title: 'Unsafe Output (LLM05)'
    subTitle: 'Scripts and secrets are stripped from agent output before delivery.'
specificationsRight:
  - title: 'Excessive Agency (LLM06)'
    subTitle: 'An egress smart contract on Hyper 0X decides what an agent is allowed to send or do.'
  - title: 'Runaway Cost (LLM10)'
    subTitle: 'Budgets plus MCP compaction keep token spend under control.'
  - title: 'Rogue Agents'
    subTitle: 'Agents move from observed to restricted to halted, with a kill switch for humans.'
  - title: 'Log Tampering'
    subTitle: 'Hash-chained logs anchored on Hyper 0X reveal exactly what is missing if anything is deleted.'
blueprints:
  first: '@/images/diagrams/pavii-architecture.png'
---
