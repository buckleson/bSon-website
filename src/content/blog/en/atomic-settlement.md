---
title: 'Atomic Settlement: Both Legs or Neither'
description: 'What atomic settlement is and why Herstatt risk still matters. Hyper Wallet runs an order book inside Hyper 0X consensus to settle every trade in one step.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-10
updatedDate: 2026-10-14
readTime: 5
tags: ['Settlement', 'Crypto wallets']
faqs:
  - question: 'What is atomic settlement?'
    answer: 'A trade where both transfers, the asset one way and the payment the other, happen in one indivisible step. Either both complete or neither does, so no party is left exposed.'
  - question: 'What is Herstatt risk?'
    answer: 'The risk that one side of a trade settles and the other does not. It takes its name from a German bank that closed in 1974. At that time, its counterparties had paid but had not yet received the other side.'
---

Atomic settlement means both legs of a trade, the asset and the payment, settle in one indivisible step: both happen or neither does. On Hyper 0X, our blockchain, the order book (the list of open buy and sell orders) runs inside consensus. Consensus is the process where validators, the nodes that run the chain, agree on the ledger. Each fill (a matched order) and both balance updates land in a single ledger event. So a buyer can never pay without receiving, and a seller can never deliver without payment.

## Why does it matter?

In 1974, a German bank called Herstatt was shut down in the middle of the trading day. Its counterparties had already paid their side of currency trades, but never received the other side. The risk that one leg of a trade settles and the other does not still carries the bank's name: _Herstatt risk_. We built [Hyper Wallet](../../products/hyper-wallet/) so that this cannot happen.

## Why combine the exchange and the wallet?

Hyper Wallet combines an exchange and a wallet in a single application that settles on Hyper 0X. The exchange, the custody and the integration layer all write to the same record. So there is nothing to reconcile across apps. Users also pay one unified transaction cost instead of exchange fees plus a wallet commission.

## How does an order book run inside consensus?

Hyper Wallet's exchange is a central limit order book that runs _inside_ Hyper 0X consensus. The exchange matches orders by price, then by time. Matching is deterministic, so every validator computes exactly the same fills. Transaction order comes from the median time at which validators received each order. So no single node can push a transaction ahead. Nobody can front-run (trade ahead of a known order).

## What does a settled trade look like?

When Rohan sells 0.5 ETH to Priya for 1,250 USDC, both transfers happen in one step or not at all. The fill and both balance updates land in a single ledger event. Hundreds of netted fills (fills that offset each other) can settle as one event. Cross-chain trades lock first, then either commit or refund.

For users, all of this comes down to three simple states: **pending**, **confirmed** or **failed**.

## How can builders use the same rails?

The same rails are available through the Hyper Wallet SDKs. You can launch your own neobank, embed in-app wallets in games and apps, or run your own payment gateway. See [how to launch your own crypto wallet](../how-to-launch-a-crypto-wallet/). Atomic settlement also makes secondary markets for [tokenized assets](../asset-tokenization-guide/) safe.
