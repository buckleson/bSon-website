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
    answer: 'Strictly, none. Bitcoin finality is probabilistic, so each new block only makes a reversal less likely. For large amounts, a widely used rule of thumb is six confirmations, about an hour.'
  - question: 'Does Ethereum have finality?'
    answer: 'Yes, since it moved to proof of stake in 2022. Ethereum finalises blocks after two epochs, about 13 minutes. To reverse a finalised block, attackers must give up at least a third of all staked ETH.'
  - question: 'Can a final blockchain transaction ever be undone?'
    answer: 'Not by the network. Under deterministic finality, a confirmed transaction stays in the record permanently. You can still correct a mistaken payment with a new, offsetting transaction. This keeps a clean audit trail.'
---

Finality is the point after which nobody can change or reverse a blockchain transaction. On chains with probabilistic finality, such as Bitcoin, a payment only gets harder to undo as the chain adds more blocks on top. On chains with deterministic finality, a payment is final at the moment the chain confirms it. For payments and settlement, that difference decides when you can safely release goods, funds or securities.

## What does finality mean on a blockchain?

In banking, settlement finality is the moment a transfer becomes irrevocable and unconditional. It is a legal idea as much as a technical one. The CPMI-IOSCO Principles for Financial Market Infrastructures are the global standard for payment and settlement systems. They give finality a principle of its own (Principle 8). Principle 8 asks for final settlement that is clear and certain, at the latest by the end of the value date. The value date is the day the payment is due.

On a blockchain, finality is the guarantee that consensus will never remove a transaction from the record. Consensus is the process by which the computers of a network agree on the record. Different chains give that guarantee in very different ways. Some only make a probabilistic promise.

## What is probabilistic finality?

On proof-of-work chains like Bitcoin, miners compete to add the next block. Sometimes two miners find a block at almost the same moment. Then the network briefly has two competing versions of history. Nodes (the computers that run the network) follow the chain with the most accumulated work. The network drops the losing block, and with it any transactions that existed only in that block.

Each new block on top of the block with your payment makes a replacement far less likely. But the chance never reaches zero. That is why exchanges and merchants choose how many confirmations to wait for. Each block that includes or follows the payment is one confirmation. For large amounts on Bitcoin, a common rule of thumb is six confirmations, about an hour. The business must choose its own level of risk.

## What is a reorg, and why is it dangerous?

A reorg, short for chain reorganisation, happens when the network replaces recent blocks with a competing version. One-block reorgs happen naturally and are usually harmless. Deep reorgs are different. An attacker who controls most of the mining power of a network can secretly build a longer chain. Then the attacker releases it. People call this a 51 percent attack.

That makes a double spend possible: the attacker spends the same money twice. The attacker pays a merchant and waits for the goods. Then the attacker publishes a version of history where the payment never happened. Ethereum Classic, a smaller proof-of-work chain, suffered several such attacks in 2020. For a business, the result is a payment that showed as confirmed and then disappeared. The goods are already gone, and the books no longer match.

## What is deterministic finality?

Deterministic finality comes from Byzantine fault tolerant (BFT) consensus. In BFT, a known set of validators (the computers that check and approve transactions) vote. They do not race to add blocks. When more than two thirds agree, the transaction is final. There are no competing chains to choose between, so there is nothing to reorganise. BFT protocols stay safe while fewer than one third of validators are faulty or dishonest.

The honest trade-off is this: if more than a third of validators go offline, a BFT network pauses. It does not split into two histories. It chooses to be correct rather than to keep moving. For financial records, a brief pause is far better than a wrong ledger. BFT works with a defined set of validators, so it fits naturally with [permissioned blockchains](../permissioned-vs-permissionless-blockchain/), where every validator is a known organisation.

Ethereum sits in between. Since its move to proof of stake, in which validators lock up ETH as a deposit, it has **economic finality**. Ethereum finalises blocks at checkpoints, about 13 minutes later. To reverse a finalised block, attackers must give up a large share of all staked ETH.

| Topic | Probabilistic | Economic | Deterministic |
|---|---|---|---|
| Example | Bitcoin | Ethereum (proof of stake) | Hyper 0X, CometBFT chains |
| When is it final? | Never absolutely, but safer with each block | At checkpoints, about 13 minutes later | As soon as it is confirmed |
| Can reorgs happen? | Yes | Yes, before finalisation | No |
| What the business must do | Pick a confirmation count and accept some risk | Wait for finalisation | Act on confirmation |

## What does final in one pass mean?

[Hyper 0X](../../products/hyper-0x/) uses **aBFT**, asynchronous Byzantine fault tolerance. "Byzantine" means that validators can lie or misbehave, not only crash. "Asynchronous" means that the protocol makes no assumption about how quickly messages arrive. So it still reaches agreement when the network is slow or under attack.

Its consensus is hashgraph-based and leaderless. Leaderless means that there is no single block proposer that an attacker can bribe, censor or knock offline. It stays safe while fewer than one third of validators are faulty. Transaction order comes from the median time at which validators received each transaction. So no single node can front-run (put its own transaction ahead of others).

When the validators reach agreement, the transaction is final. There is no second stage in which you wait for more blocks to bury it. That is what we mean by final in one pass.

The same is true across layers. On Hyper 0X, each application runs on a private L2: a private blockchain that settles on the main chain, the L1. Each L2 posts its state roots (short fingerprints of its records) to the L1. The L1 never rolls back, so the shared record never rolls back either. For more about how the layers fit together, read [layer 1 vs layer 2 blockchain](../layer-1-vs-layer-2-blockchain/).

## Why does finality matter for payments and settlement?

Every payment flow has a moment when someone releases value because they believe that the payment has arrived. Finality decides if that belief is safe.

- **When to release value.** A merchant ships goods, a broker delivers securities, and a lender releases funds. Each one must act only after the incoming payment is final.
- **Both legs of a trade.** An exchange of an asset for payment in one step protects you only if nobody can undo that step. That is the basis of [atomic settlement](../atomic-settlement/).
- **Reconciliation.** With probabilistic finality, a payment can show as confirmed and then as unconfirmed. Then operations teams must chase it. With deterministic finality, [Hyper Wallet](../../products/hyper-wallet/) users see only three states: pending, confirmed or failed.
- **Liquidity.** Uncertain finality makes firms wait longer or hold extra buffers. Certainty lets them use funds again as soon as a payment settles.

Think of a fintech that pays merchants in several countries. On a chain with probabilistic finality, its treasury team must choose a confirmation count and accept the remaining risk. The other choice is to wait longer and tie up cash. If a reorg happens after a payout, the team must try to get the money back. With deterministic finality, each payout is either confirmed and final, or it failed. The ledger matches the bank statement.

## Where should you start?

1. Map every point in your flows where you release value after you receive a payment.
2. For each chain that you use, find out which finality model it has. Read what "confirmed" means in its documentation.
3. Ask what happens if a third of the validators go offline. Does the network pause, or can it fork (split into two histories)?
4. Check your bridges (the links that move assets between chains). A cross-chain transfer is only as final as the least final chain it passes through.
5. Write your finality rule into policy. Then operations teams know exactly when to act.

On Hyper 0X, every confirmed transaction is final in one pass, from the L1 to every private L2. Book a call to see how that fits your payment or settlement flows.
