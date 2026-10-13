---
title: 'Hyper 0X'
description: 'Our own L1 blockchain, with an L2 for every customer'
main:
  id: 1
  content: |
    Hyper 0X is the custom blockchain that powers everything Buckleson builds. It is our own permissioned L1, engineered from scratch, so there are no public-chain fees, roadmaps or outages to inherit. Enterprises and builders use Hyper 0X to launch their own products: each customer gets a dedicated L2 with its own rules, settled on one shared, verifiable record. Hyper Wallet, Pavii and every custom chain we deliver run on it.
  imgCard: '@/images/product-image-1.avif'
  imgMain: '@/images/product-image-main-1.avif'
  imgAlt: 'The Hyper 0X blockchain'
tabs:
  - id: 'tabs-with-card-item-1'
    dataTab: '#tabs-with-card-1'
    title: 'Overview'
  - id: 'tabs-with-card-item-2'
    dataTab: '#tabs-with-card-2'
    title: 'Specifications'
  - id: 'tabs-with-card-item-3'
    dataTab: '#tabs-with-card-3'
    title: 'Architecture'
longDescription:
  title: 'A Modular Blockchain Built for Enterprises'
  subTitle: |
    The core of Hyper 0X never depends on the products built on top of it. Encryption layers, L2 types, bridges and policy rules plug in through their own interfaces, so we can add capabilities without a fork. Compliance runs as code: limits, KYC and maker-checker approvals are checked before a transaction executes. Hyper 0X is also the trust layer for AI. Every AI decision and action is recorded as a signed, chained transaction, turning "black box" AI operations into verifiable records for audit, billing and disputes.
  btnTitle: 'Build on Hyper 0X'
  btnURL: '/contact'
descriptionList:
  - title: 'Final in One Pass'
    subTitle: 'Leaderless aBFT consensus with virtual voting gives deterministic finality. No reorgs, no front-running, no leader to attack.'
  - title: 'Post-Quantum-Resistant'
    subTitle: 'Hybrid ML-KEM-768 + X25519 key exchange on every connection, plus four layers of encryption for data in transit, in computation, on the ledger and at rest.'
  - title: 'An L2 for Every Customer'
    subTitle: 'Each institution gets its own sequencer, policies and bridge. Blocks resize with load: fast when quiet, no backlog at peaks.'
specificationsLeft:
  - title: 'Consensus'
    subTitle: 'Hashgraph-based asynchronous BFT with a permissioned, PKI-bound validator set. Stays safe while fewer than 1/3 of validators are faulty.'
  - title: 'Encryption'
    subTitle: 'TLS 1.3 with hybrid X25519 + ML-KEM-768, AES-256-GCM, per-party encrypted payloads and HSM-held master keys.'
  - title: 'Smart Contracts'
    subTitle: 'Rust today, with a TypeScript framework in development. Deploy to the L1 or any L2, with governed, approval-based upgrades.'
  - title: 'Interoperability'
    subTitle: 'Bridge adapters for EVM chains, Solana and Sui, plus SDKs for bank DLTs and APIs. Account abstraction means no seed phrases or gas tokens for users.'
tableData:
  - feature: ['Capability', 'Hyper 0X']
    description:
      - ['Network type', 'Permissioned L1 + per-customer L2s']
      - ['Finality', 'Deterministic, no reorgs']
      - ['Transaction ordering', 'Median receive time, no single orderer']
      - ['Key exchange', 'Hybrid ML-KEM-768 + X25519']
      - ['Encryption layers', '4 (transit, compute, ledger, rest)']
      - ['Bridges', 'EVM, Solana, Sui']
blueprints:
  first: '@/images/diagrams/hyper0x-architecture.png'
---
