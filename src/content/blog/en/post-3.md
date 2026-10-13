---
title: 'Both Legs or Neither: Atomic Settlement in Hyper Wallet'
description: 'How Hyper Wallet runs an order book inside Hyper 0X consensus and settles every trade in a single step.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-10
cardImage: '@/images/blog/post-3.avif'
cardImageAlt: 'Abstract illustration of two assets swapping atomically'
readTime: 4
tags: ['hyper-wallet', 'settlement', 'exchange']
---

In 1974, a German bank called Herstatt was shut down in the middle of the trading day. Its counterparties had already paid their side of currency trades, but never received the other side. The risk that one leg of a trade settles and the other does not still carries the bank's name: _Herstatt risk_.

**Hyper Wallet** is built so that this cannot happen.

## One app, one record

Hyper Wallet combines an exchange and a wallet in a single application, settled on Hyper 0X. Because the exchange, the custody and the integration layer write to the same record, there is nothing to reconcile across apps, and users pay one unified transaction cost instead of exchange fees plus a hidden wallet commission.

## An order book inside consensus

Hyper Wallet's exchange is a central limit order book that runs _inside_ Hyper 0X consensus. Orders are matched by price, then time. Matching is deterministic, so every validator computes exactly the same fills. Transaction order comes from the median time validators received each order, so no single node can push a transaction ahead. That means nobody can front-run.

## Atomic settlement

When Rohan sells 0.5 ETH to Priya for 1,250 USDC, both transfers happen in one step or not at all. The fill and both balance updates land in a single ledger event. Hundreds of netted fills can settle as one event, and cross-chain trades lock first, then either commit or refund.

For users, all of this collapses into three simple states: **pending**, **confirmed** or **failed**.

## Built for builders

The same rails are available through the Hyper Wallet SDKs. Launch your own neobank, embed in-app wallets in your games and apps, send and receive payments, or run your own payment gateway. Hyper Wallet has already processed more than 2 million transactions across 33,000+ portfolios.

Want to build on these rails? [Get in touch](../../contact/).
