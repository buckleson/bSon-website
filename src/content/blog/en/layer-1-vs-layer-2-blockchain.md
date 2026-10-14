---
title: 'Layer 1 vs Layer 2 Blockchain: What Is the Difference?'
description: 'Layer 1 vs layer 2 blockchain explained: the L1 protects and settles, the L2 runs transactions on top. How rollups work and when one L1 with many L2s fits.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['Layer 2', 'Scaling']
figure: 'chain-rack'
faqs:
  - question: 'Is Ethereum a layer 1 or a layer 2?'
    answer: 'Ethereum is a layer 1. Networks such as Arbitrum, Optimism, Base, zkSync and Starknet are layer 2 rollups. They run transactions away from Ethereum and post the results back to it.'
  - question: 'Are layer 2 transactions as secure as layer 1 transactions?'
    answer: 'A well-designed rollup inherits most of its security from the L1 that it settles to. The L1 holds the data or proofs that it needs to check the work of the rollup. Sidechains and some other designs use their own validators instead. Check how an L2 settles before you trust it with value.'
  - question: 'Can a company run its own layer 2?'
    answer: 'Yes. Rollup frameworks let teams launch their own L2 on a public chain. On Hyper 0X, Buckleson sets up a private L2 for each application. Each L2 has its own rules, privacy and bridges, and it settles to one shared L1.'
---

A layer 1 (L1) is the base blockchain: it orders transactions, agrees on them and keeps the final record. A layer 2 (L2) is a separate network that runs transactions on top of an L1 and posts the results back to it. The L1 stays the source of truth, and the L2 does the day-to-day work. Bitcoin, Ethereum and Solana are L1s. Arbitrum, Optimism and the Lightning Network are L2s. Hyper 0X uses the same split, with one L1 and a private L2 for each application.

## What does a layer 1 blockchain do?

An L1 does three jobs. It runs **consensus**: the process by which independent computers, called validators, agree on which transactions happened and in what order. It gives **security**: to change its history, an attacker must defeat that consensus. It also **settles**: it holds the final record that everyone else treats as the truth.

The problem is that every validator must process and store everything. That keeps the record trustworthy, but it limits how much one chain can handle. When demand suddenly increases on a busy public L1, users bid against each other for space, and fees rise. People often call this tension between decentralisation, security and scale the blockchain trilemma.

## What does a layer 2 do?

An L2 moves the work off the L1. It collects many transactions and executes them itself. Then it sends a compact summary to the L1. That summary usually includes a **state root**: a short fingerprint (a hash) of every balance and record on the L2 at that moment. If anything changes, the fingerprint changes.

On an L2, a **sequencer** usually puts the transactions in order. The sequencer is the component that decides which transaction goes first. The L2 posts many transactions to the L1 together, so they share one cost and each one is cheaper. Users also see confirmations sooner. The L1 still holds the final record.

## How do rollups work?

Rollups are the most common kind of L2. They all follow the same basic loop:

1. Users send transactions to the sequencer of the rollup.
2. The sequencer orders and executes them. Then it groups them into a batch.
3. The rollup posts the batch data and the new state root to the L1.
4. The L1 checks a proof that the batch is correct, or it gives anyone time to challenge the batch. After that, the L1 settles the result.

There are two families of rollup. **Optimistic rollups**, such as Arbitrum and Optimism, assume that each batch is valid unless someone proves fraud. That proof must come during a challenge window, a fixed period after the batch. That is why withdrawals from them to Ethereum usually take about seven days. **Zero-knowledge (ZK) rollups**, such as zkSync and Starknet, post a cryptographic validity proof with every batch. The L1 can then check the work without doing it again.

Ethereum now supports this model. Its Dencun upgrade in March 2024 (EIP-4844) gave rollups a cheaper, dedicated place to post their data, called blobs. Other L2 designs also exist, such as payment channels like the Lightning Network of Bitcoin. People often group sidechains with L2s. But sidechains run their own validators, so they do not inherit the security of the L1 in the same way.

## Layer 1 vs layer 2 at a glance

| | Layer 1 | Layer 2 |
|---|---|---|
| Main job | Consensus, security and the final record | Transactions at scale |
| Who orders transactions | The validators of the L1 | The sequencer of the L2 |
| Where security comes from | Its own consensus | Mostly from the L1 it settles to |
| Cost per transaction | Rises when the chain is busy | Lower, because a batch shares the cost |
| Custom rules | Hard: changes need network-wide upgrades | Easier: each L2 can set its own |
| Examples | Bitcoin, Ethereum, Solana, the Hyper 0X L1 | Arbitrum, Optimism, Lightning, Hyper 0X L2s |

## What are the trade-offs of layer 2s on public chains?

L2s fix cost and speed, but they raise new questions:

- **Data is still public.** A rollup on a public chain posts its transaction data where anyone can read it. That is fine for open apps, but it is a problem for client records.
- **Users and liquidity split up.** Each rollup is its own island. To move assets between rollups, you must use a bridge (a link that moves assets between chains) and wait.
- **Ordering is often centralised.** Many rollups still run a single sequencer that one company operates.
- **You still share the L1.** Fees, upgrades and congestion on the L1 stay outside your control.

For a bank or regulated fintech, the first point usually decides the choice. We compare the options in detail in [private L2 vs public blockchain](../private-l2-vs-public-blockchain/).

## How does Hyper 0X use layer 1 and layer 2?

[Hyper 0X](../../products/hyper-0x/) has one L1 and one private L2 for each application. The L1 is permissioned: only known organisations run its validators. Certificates bind each validator to its identity. The L1 uses leaderless aBFT consensus, a voting method with no single leader that stays safe even if some validators fail or lie. With this method, a transaction is final in one pass, and the L1 never rolls it back. Every L2 posts its state roots to this L1, so all the L2s share one verifiable record.

Each L2 has its own sequencer, policies, privacy settings and bridge. The L2s are independent, so you can change one L2 and leave the others as they are:

- **Add** an L2 when a new product, client or market launches. The existing L2s continue to run as before.
- **Resize** an L2 when its load changes. Blocks grow and shrink with demand, and each L2 sets its own limits. See [dynamic blocks](../dynamic-blocks/).
- **Retire** an L2 when a pilot ends or a product closes. The state roots that it posted stay on the L1 as a permanent record.

The figure at the top of this post shows the idea. L2 modules of different sizes plug into one L1 and send their transactions down to it. You can add a module or lift one out while the others continue to work.

## What does this look like for a bank?

Think of a mid-sized bank that wants three things on-chain. It wants salary payments, a tokenized money-market fund (fund shares held as tokens) for its clients and an audit trail for its AI agents. On Hyper 0X, each one gets its own L2.

On salary day, the payroll L2 fills larger blocks to handle the peak, and the fund L2 sees no effect. Before every trade, the fund L2 checks investor limits and KYC (know-your-customer identity checks) as code. The third L2 records a signed receipt for every agent action, the same approach that [Pavii](../../products/pavii/) uses. If the fund pilot ends after a year, the bank retires that L2, and the other two continue. Auditors check one L1 instead of three separate systems.

## Where should you start?

1. List the applications that you want on-chain. For each one, note its privacy needs, rules and expected peaks.
2. Decide which data must never be public. That tells you if a public L1 or a public rollup is an option at all.
3. Ask how each layer settles. Also ask when a payment is truly final (see [blockchain finality explained](../blockchain-finality-explained/)).
4. Check that you can add, resize or retire one application and leave the others as they are.
5. Start with one pilot L2. Agree on success metrics before you scale.

Buckleson sets up private L2s on Hyper 0X as part of our [custom blockchain service](../../services/#custom-blockchains). Book a call to map your applications to L2s.
