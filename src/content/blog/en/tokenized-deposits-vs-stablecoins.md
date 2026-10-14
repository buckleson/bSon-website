---
title: 'Tokenized Deposits vs Stablecoins: What Is the Difference?'
description: 'Tokenized deposits are bank money on a blockchain. Stablecoins are tokens backed by a reserve. Compare who issues them, who can hold them and how they settle.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-15
readTime: 6
tags: ['Asset tokenization', 'Payments']
faqs:
  - question: 'Is a tokenized deposit the same as a central bank digital currency?'
    answer: 'No. A central bank digital currency (CBDC) is a claim on the central bank. A tokenized deposit is a claim on a commercial bank. A stablecoin is a claim on its issuer.'
  - question: 'Can a tokenized deposit pay interest?'
    answer: 'Yes. A tokenized deposit is a bank deposit, so the bank can pay interest under its normal rules. Stablecoins usually pay no interest, and some laws forbid it.'
  - question: 'Can tokenized deposits move to public blockchains?'
    answer: 'Usually they stay on a permissioned network that the bank controls. A bridge can connect that network to public chains, under rules that the bank sets. On Hyper 0X, bridges connect each private L2 to EVM chains, Solana and Sui.'
---

A tokenized deposit is a bank deposit recorded as a token on a blockchain. It stays a claim on the bank, like any other deposit. A stablecoin is a token with a steady value that an issuer backs with a reserve, usually cash and short-term government bonds. Both keep a stable price, but they differ in who owes you the money, who can hold them and where they run.

## What is a tokenized deposit?

A tokenized deposit is the money in a bank account, in a new form. The bank records the deposit as a token on a blockchain, a shared ledger that many computers keep in sync. The token is a liability of the bank, so the holder has a claim on the bank. The bank keeps its normal balance sheet. It can lend against the deposits and pay interest on them, under its normal banking rules.

Deposit insurance can apply in the same way as for other deposits, depending on the country. Tokenized deposits usually run on a permissioned blockchain, where the bank controls who can join. Only customers who pass the KYC (know your customer) checks of the bank can hold them. Early uses focus on business clients. Examples are treasury payments, transfers between group companies and settlement of tokenized assets.

## What is a stablecoin?

A stablecoin is a token that keeps a steady value, usually one US dollar or one euro. The issuer holds a reserve that backs each token one to one. The holder has a claim on the issuer, not on a bank account. In many cases, only approved customers can redeem directly with the issuer. Other holders sell the stablecoin on a market.

Most stablecoins run on public blockchains. Anyone with a wallet can hold and send them, at any hour. The issuer can usually freeze the tokens at a specific address, for example to follow a court order. Laws in several markets now require full reserves and regular reserve reports. Our post on [proof of reserve](../proof-of-reserve-explained/) explains how those reports work.

## How do tokenized deposits and stablecoins compare?

The main difference is the balance sheet behind the token. The table shows how that one difference changes everything else.

| | Tokenized deposit | Stablecoin |
|---|---|---|
| Who issues it | A licensed bank | A stablecoin issuer, sometimes a bank |
| Who owes the money | The bank, like any deposit | The issuer |
| What backs it | The balance sheet and capital of the bank | A separate reserve, usually cash and short-term government bonds |
| Interest | The bank can pay interest | Usually none |
| Deposit insurance | Can apply, depending on the country | Usually does not apply |
| Who can hold it | Bank customers who passed KYC | Anyone with a wallet, unless the issuer blocks an address |
| Where it runs | Usually a permissioned blockchain | Usually public blockchains |
| Reach | Clients of the bank, or a group of banks on a shared network | Any wallet or platform that accepts it |
| Main risks | The health of the bank, and limited reach | The quality of the reserve, the issuer and freezes |

## Which one is safer?

Neither is safer in every case, because the risks are different. A tokenized deposit has the protection of bank regulation, capital rules and supervision. Deposit insurance can also cover it up to a limit. Its main limit is reach: it works only inside the network of the bank or its partners.

A stablecoin depends on its reserve. A strong, separate reserve gives holders a clear claim on real assets. A weak or mixed reserve does not. A stablecoin can also trade below its peg on a market during stress, even when the reserve is full. Before you hold or accept any stablecoin, check who issues it and how the issuer reports its reserve.

## When does each one fit?

Tokenized deposits fit best when the money stays inside a regulated circle:

- **Treasury payments.** A business client moves cash between its own accounts and group companies at any hour.
- **Settlement of tokenized assets.** A bank client buys a tokenized bond or fund unit with bank money on the same ledger.
- **Interest and protection.** The client wants to keep earning interest and keep the protections of a deposit.

Stablecoins fit best when you need reach beyond one bank:

- **Open payments.** Customers and merchants pay from wallets that they already use. See our guide to [blockchain payments for merchants](../blockchain-payments-for-merchants/).
- **Cross-border transfers.** Value moves between platforms and countries without a direct bank link.
- **Public markets.** Investors on public chains settle trades in a currency that they already hold.

Many firms can use both. A bank can issue tokenized deposits to its clients and let them convert to stablecoins at the edge of its network. Our comparison of [permissioned and permissionless blockchains](../permissioned-vs-permissionless-blockchain/) explains where each type of network fits.

## Why does the money need to be on the same ledger as the asset?

When the cash and the asset are on the same ledger, a trade can settle in one step. Tokenized deposits and stablecoins both put the cash leg on chain. Without them, the asset moves on chain but the cash moves by bank wire, later and only in banking hours. Until the cash arrives, one side has delivered without payment.

With both legs on one ledger, [atomic settlement](../atomic-settlement/) moves the asset and the payment together, or it moves neither. No party carries the risk of a half-settled trade. This is why money on chain matters for every tokenized asset. Our [asset tokenization guide](../asset-tokenization-guide/) shows the full launch flow.

## How does Hyper 0X support tokenized money?

On [Hyper 0X](../../products/hyper-0x/), the Buckleson blockchain, a bank can run its tokenized deposit on its own private L2. An L2 is a private blockchain that settles on a main chain. Compliance as code runs before a transaction executes. So KYC status, client limits and maker-checker approvals apply to every transfer. In a maker-checker approval, one person prepares a transaction and a second person approves it.

Per-party encryption keeps balances and payments private to the parties. Each transfer is final in one pass, with no reorgs (rewrites of recent blocks). Every L2 settles on the same Hyper 0X L1. So banks on separate L2s settle to one shared record, and each bank keeps its client data private. Bridges connect each L2 to EVM chains, Solana and Sui. Clients can then reach stablecoins on public chains when the rules of the bank allow it.

Our [custom blockchain services](../../services/custom-blockchains/) set up the L2, the rules and the bridges with your team. [H0X Pay](../../products/h0x-pay/) is coming soon from Buckleson. It will let users pay and get paid in crypto, and every payment will settle on Hyper 0X.

## Where should you start?

1. Decide who must hold the token: only your clients, or anyone with a wallet.
2. Check your licences, and the rules that apply to each option in your markets.
3. List the payments and settlements that you want to move on chain first.
4. Choose where the token runs: a private L2, a public chain or both, with a bridge.
5. Start a pilot with one use case and a small group of clients.

Book a call with a Buckleson engineer to plan your tokenized deposit or stablecoin pilot.
