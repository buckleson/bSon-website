---
title: 'Blockchain Finality Explained: When Is a Payment Final?'
description: 'Blockchain finality explained: probabilistic vs deterministic finality, what a reorg is, and why payments and settlement need transactions final in one pass.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['Settlement', 'Enterprise blockchain']
faqs:
  - question: 'How many confirmations make a Bitcoin transaction final?'
    answer: 'Strictly, none: Bitcoin finality is probabilistic, so each new block only makes a reversal less likely. Six confirmations, roughly an hour, is a widely used rule of thumb for large amounts.'
  - question: 'Does Ethereum have finality?'
    answer: 'Yes, since it moved to proof of stake in 2022. Blocks are finalised after two epochs, about 13 minutes, and reversing a finalised block would mean destroying at least a third of all staked ETH.'
  - question: 'Can a final blockchain transaction ever be undone?'
    answer: 'Not by the network. Under deterministic finality a confirmed transaction stays in the record for good. A mistaken payment can still be corrected with a new, offsetting transaction, which keeps a clean audit trail.'
---

Finality is the point at which a blockchain transaction can no longer be changed or reversed. On chains with probabilistic finality, such as Bitcoin, a payment only gets harder to undo as more blocks are added on top. On chains with deterministic finality, it is final the moment it is confirmed. For payments and settlement, that difference decides when you can safely release goods, funds or securities.

## What does finality mean on a blockchain?

In banking, settlement finality is the moment a transfer becomes irrevocable and unconditional. It is a legal idea as much as a technical one. The CPMI-IOSCO Principles for Financial Market Infrastructures, the global standard for payment and settlement systems, give it a principle of its own (Principle 8): final settlement should be clear and certain, at the latest by the end of the value date.

On a blockchain, finality is the guarantee that consensus will never remove a transaction from the record. Different chains make that guarantee in very different ways, and some only make a probabilistic promise.

## What is probabilistic finality?

On proof-of-work chains like Bitcoin, miners compete to add the next block. Sometimes two miners find a block at almost the same moment, and the network briefly has two competing versions of history. Nodes follow the chain with the most accumulated work, and the losing block is dropped, along with any transactions that existed only in it.

Each new block built on top of yours makes it far less likely to be replaced, but the chance never reaches zero. That is why exchanges and merchants pick a number of confirmations to wait for. For Bitcoin, six confirmations, roughly an hour, is a common rule of thumb for large amounts. The business has to choose its own level of risk.

## What is a reorg, and why is it dangerous?

A reorg, short for chain reorganisation, happens when the network swaps recent blocks for a competing version. One-block reorgs happen naturally and are usually harmless. Deep reorgs are different. An attacker who controls most of a network's mining power can secretly build a longer chain and release it, which is known as a 51 percent attack.

That enables a double spend. The attacker pays a merchant, waits for the goods, then publishes a version of history where the payment never happened. Ethereum Classic, a smaller proof-of-work chain, suffered several such attacks in 2020. For a business, the result is a payment that showed as confirmed and then disappeared, with goods already gone and books that no longer match.

## What is deterministic finality?

Deterministic finality comes from Byzantine fault tolerant (BFT) consensus. Instead of racing to add blocks, a known set of validators vote. Once more than two thirds agree, the transaction is final. There are no competing chains to choose between, so there is nothing to reorganise. BFT protocols stay safe as long as fewer than one third of validators are faulty or dishonest.

The honest trade-off is that if more than a third of validators go offline, a BFT network pauses rather than splitting into two histories. It favours being correct over always moving. For financial records, a brief pause is far better than a wrong ledger. Because BFT works with a defined set of validators, it fits naturally with [permissioned blockchains](../permissioned-vs-permissionless-blockchain/), where every validator is a known organisation.

Ethereum sits in between. Since its move to proof of stake, it has **economic finality**: blocks are finalised at checkpoints, about 13 minutes later, and reversing a finalised block would mean destroying a large share of staked ETH.

| | Probabilistic | Economic | Deterministic |
|---|---|---|---|
| Example | Bitcoin | Ethereum (proof of stake) | Hyper 0X, CometBFT chains |
| When is it final? | Never absolutely; safer with each block | At checkpoints, about 13 minutes later | As soon as it is confirmed |
| Can reorgs happen? | Yes | Yes, before finalisation | No |
| What the business must do | Pick a confirmation count and accept some risk | Wait for finalisation | Act on confirmation |

## What does final in one pass mean?

[Hyper 0X](../../products/hyper-0x/) uses **aBFT**, asynchronous Byzantine fault tolerance. "Byzantine" means validators may lie or misbehave, not just crash. "Asynchronous" means the protocol makes no assumption about how quickly messages arrive, so it still reaches agreement when the network is slow or under attack.

Its consensus is hashgraph-based and leaderless: there is no single block proposer that could be bribed, censored or knocked offline. It stays safe while fewer than one third of validators are faulty. Once the validators reach agreement, the transaction is final. There is no second stage of waiting for more blocks to bury it, which is what we mean by final in one pass. Transaction order comes from the median time validators received each one, so no single node can front-run.

The same holds across layers. Each private L2 on Hyper 0X posts its state roots to the L1, and the L1 never rolls back, so the shared record never rolls back either. For more on how the layers fit together, read [layer 1 vs layer 2 blockchain](../layer-1-vs-layer-2-blockchain/).

## Why does finality matter for payments and settlement?

Every payment flow has a moment where someone releases value because they believe they have been paid. Finality decides whether that belief is safe.

- **Releasing value.** A merchant ships, a broker delivers securities, a lender releases funds. Each should act only once the incoming leg is final.
- **Both legs of a trade.** Exchanging an asset for payment in one step only protects you if that step cannot be undone. That is the basis of [atomic settlement](../atomic-settlement/).
- **Reconciliation.** With probabilistic finality, a payment can be confirmed and then unconfirmed, and operations teams must chase it. With deterministic finality, [Hyper Wallet](../../products/hyper-wallet/) users see only three states: pending, confirmed or failed.
- **Liquidity.** Uncertain finality pushes firms to wait longer or hold extra buffers. Certainty lets them reuse funds as soon as a payment settles.

Consider a fintech that pays merchants in several countries. On a chain with probabilistic finality, its treasury team must choose a confirmation count and live with the remaining risk, or wait longer and tie up cash. A reorg after a payout means trying to claw money back. With deterministic finality, each payout is either confirmed and final or it failed, and the ledger matches the bank statement.

## Where should you start?

1. Map every point in your flows where you release value after receiving a payment.
2. For each chain you use, find out which finality model it has and what "confirmed" actually means in its documentation.
3. Ask what happens if a third of the validators go offline: does the network pause, or can it fork?
4. Check your bridges. A cross-chain transfer is only as final as the least final chain it passes through.
5. Write your finality rule into policy, so operations teams know exactly when to act.

Hyper 0X is built so that every confirmed transaction is final in one pass, from the L1 to every private L2. Book a call to see how that fits your payment or settlement flows.
