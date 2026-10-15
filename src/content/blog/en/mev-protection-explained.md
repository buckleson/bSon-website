---
title: 'What Is MEV and How Can a Wallet Protect Users?'
description: 'MEV is the profit that bots take when they place trades around a pending swap. See how sandwich attacks work and how a wallet protects users from them.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-15
readTime: 7
tags: ['Crypto wallets', 'Settlement']
faqs:
  - question: 'Does MEV affect every crypto transaction?'
    answer: 'No. A simple transfer between two wallets rarely attracts MEV, because nobody gains from its position in a block. Swaps and trades are the main targets. Large swaps in small markets with a wide slippage limit attract the most bots.'
  - question: 'What is slippage tolerance?'
    answer: 'Slippage tolerance is the largest price change that a user accepts between the quote and the fill. A swap with a 1 percent tolerance fails if the price gets more than 1 percent worse. A wide tolerance gives sandwich bots more room to take value.'
  - question: 'Does Hyper Wallet protect swaps from MEV?'
    answer: 'Yes. Each swap in Hyper Wallet has MEV protection, and both sides settle at the same time. On Hyper 0X, an order book runs inside consensus. Every validator calculates the same fills, so nobody can trade ahead of an order.'
---

MEV, or maximal extractable value, is the profit that someone can take when they choose the order of transactions in a block. On many public blockchains, bots watch pending swaps, trade just before them and sell just after. The user gets a worse price, and the bot keeps the difference. A wallet protects users with tight price limits, hidden order flow and settlement where nobody can trade ahead of an order.

## What is MEV?

A blockchain groups transactions into blocks. Before a transaction enters a block, it waits in a public queue that many chains call the mempool. Anyone can read that queue. The party that builds the next block decides the order of the transactions in it.

That power to set the order is worth money. If you know that a large purchase is coming, you can buy first and sell to the buyer at a higher price. In traditional markets, this is front-running, and the rules forbid brokers to do it with client orders. On many public blockchains, no broker stands in the middle. Bots compete openly for the profit, and the block builder often takes a share.

The term started as "miner extractable value". It now covers every party that orders transactions, such as validators and block builders. A validator is a computer that checks transactions and adds blocks to the chain.

## How does a sandwich attack work?

A sandwich attack is the form of MEV that hurts wallet users most often. A bot places one trade before the swap of the user and one trade after it. The example below uses invented figures.

1. **The user asks for a swap.** Ana swaps $10,000 of stablecoin for a token. She accepts up to 1 percent slippage, that is, a price up to 1 percent worse than the quote.
2. **A bot sees the swap.** The swap waits in the public mempool. A bot reads its size and its slippage limit.
3. **The bot buys first.** The bot pays a higher fee, so its own purchase goes first. That purchase pushes the token price up.
4. **The swap of Ana fills at a worse price.** The new price is close to her limit, but still inside it. Her swap goes through, and she gets about $95 less of the token than the quote showed.
5. **The bot sells.** Right after the swap, the bot sells at the higher price and keeps the difference.

Ana sees a completed swap. She does not see the two trades around it. That is why MEV is a hidden cost.

## What other kinds of MEV are there?

Not all MEV harms users. Some of it keeps prices in line across markets. The table shows the main types.

| Type | What the bot does | Effect on the user |
|---|---|---|
| Front-running | Copies a pending trade and places it first | A worse price |
| Sandwich attack | Trades before and after a pending swap | A worse price, up to the slippage limit |
| Back-running | Trades right after a large swap | Usually no direct harm |
| Arbitrage | Buys where a token is cheap and sells where it is expensive | Keeps prices in line, no direct harm |
| Liquidation | Closes loans that lack enough collateral, for a reward | Harm only to the borrower who loses the position |

Wallet users care most about the first two. Both depend on one condition. A third party can see the swap before it settles and can place trades around it.

## Why does MEV matter to a wallet business?

MEV is a cost that users cannot see but still feel. They compare the quote with the result, and the gap looks like a bad wallet. Users blame the app, not the bot. For a bank or fintech that adds crypto swaps, this is a trust problem and a product problem.

The cost also grows with success. Larger swaps and thin markets attract more bots. A wallet that sends every swap to the public mempool with a wide default slippage gives bots an easy target. If you plan your own wallet, read [how to launch a crypto wallet](../how-to-launch-a-crypto-wallet/) for the full build list.

## How can a wallet protect users from MEV?

No single setting removes MEV. A good wallet combines several layers.

1. **Tight slippage by default.** A smaller limit leaves less room for a sandwich. The wallet sets the limit for the size of the trade and the depth of the market.
2. **Hidden order flow.** The wallet sends the swap straight to the parties that build blocks, not to the public mempool. Bots cannot attack a swap that they cannot see.
3. **Best-route quotes.** The wallet routes the swap across markets for the best price. It shows the minimum amount that the user will get.
4. **Fixed matching rules.** Some venues match orders by rules that every party can check. Nobody can then reorder trades for profit.
5. **Atomic settlement.** Both sides of the trade settle in one step, or neither side settles. Read more in [atomic settlement](../atomic-settlement/).
6. **Clear results.** The wallet shows the quote, the fill and the fee side by side, so users see what they paid.

| Topic | Unprotected swap | Protected swap |
|---|---|---|
| Who sees the swap first | Anyone who reads the mempool | Only the parties that settle it |
| Default slippage | Wide, set once | Tight, set per trade |
| Order of trades | Set by whoever builds the block | Set by fixed matching rules |
| If one leg fails | On cross-chain swaps, one leg can settle alone | Both legs settle, or neither |
| What the user sees | A finished swap with a hidden cost | Quote, fill and fee side by side |

## How do Hyper Wallet and Hyper 0X protect swaps?

[Hyper Wallet](../../products/hyper-wallet/) is a non-custodial wallet and exchange in one app. Non-custodial means that the private keys stay on the device of the user. Users sign in with passkeys instead of seed phrases. Each swap in Hyper Wallet has MEV protection. Swaps take the best route, and both sides settle at the same time.

On Hyper 0X, the Buckleson blockchain, the protection goes deeper. A central limit order book runs inside Hyper 0X consensus. A central limit order book is a list of buy and sell orders that the system matches by price and time. Consensus is the process that validators use to agree on the state of the chain. Every validator calculates the same fills, so nobody can trade ahead of an order.

Users also pay one fee, not two. They pay one transaction cost, with no exchange fee and wallet fee on top. Hyper Wallet runs in production with 2M+ transactions and 33K+ portfolios, and its users saved $128K+ in wallet fees. Banks and fintechs can put the same wallet into their own app with the Hyper Wallet SDKs. See [what a wallet SDK is](../what-is-a-wallet-sdk/) for how that works.

## What does MEV protection not cover?

MEV protection stops other parties from trading around a swap. It does not protect users from every loss.

- **Normal price moves.** The price changes between the quote and the fill when the market moves.
- **Thin markets.** A large swap in a small market moves the price on its own.
- **Bad tokens.** Protection does not make a scam token safe to buy.
- **Phishing.** A fake site can still trick a user into signing a bad transaction.

Good wallet design handles these with clear warnings, token checks and signing screens that show exactly what the user approves. Who holds the keys also matters here, as [custodial vs non-custodial wallets](../custodial-vs-non-custodial-wallet/) explains.

## Where should you start?

1. Measure the gap between the quote and the fill on your current swaps.
2. Set a tight default slippage, and adjust it to trade size and market depth.
3. Keep swaps out of the public mempool where the chain allows it.
4. Settle trades atomically, so no user holds only one side of a trade.
5. Show the quote, the fill and the fee on every swap screen.
6. Choose a wallet stack with MEV protection built in, such as the Hyper Wallet SDKs.

Book a call with a Buckleson engineer to review how your swaps fill today.
