---
title: 'Tokenized Gold Explained: Backing, Audits and ETFs'
description: 'Tokenized gold is a blockchain token that represents real gold in a vault. See how backing and audits work, and how it compares with gold ETFs and bullion.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['Tokenized gold', 'Real-world assets']
faqs:
  - question: 'Can you redeem tokenized gold for physical bars?'
    answer: 'Some issuers allow it, usually above a minimum amount, for a fee and after identity checks. Others only let you sell the token for cash or crypto. Read the redemption terms before you buy.'
  - question: 'Does tokenized gold hold a stable value like a stablecoin?'
    answer: 'No. A gold-backed token tracks the price of gold, not the price of a currency. Its value in dollars or euros rises and falls with the gold market.'
  - question: 'Who regulates tokenized gold?'
    answer: 'It depends on the country and the legal structure. Some issuers operate as regulated trust companies. In the EU, tokens that reference commodities can fall under the Markets in Crypto-Assets Regulation (MiCA). Ask which regulator oversees the issuer and the custodian.'
---

Tokenized gold is a digital token on a blockchain that represents ownership of physical gold in a vault. Usually one token equals one troy ounce or one gram. The issuer buys the gold, and a custodian stores it. Independent firms check that the gold in the vault matches the tokens in circulation. Compared with a gold ETF or bars at home, it trades around the clock, comes in tiny fractions and moves between wallets in minutes. But you rely on the issuer, the custodian and the code of the token.

## What is tokenized gold?

A token is a digital record of ownership on a blockchain, a shared ledger that many computers keep in sync. With tokenized gold, each token is a claim on a specific amount of real gold. Well-known examples include PAX Gold (PAXG) and Tether Gold (XAUT). For both, one token corresponds to one troy ounce of gold.

The gold behind these tokens is typically in London Good Delivery bars. This is the wholesale standard that the London Bullion Market Association (LBMA) sets. Each bar weighs about 400 troy ounces, far more than most people will ever buy. Tokens split that bar into pieces small enough for anyone. You can send each piece to another wallet like any other crypto-asset.

Tokenized gold is one example of a broader idea: to put real-world assets on a blockchain. Our [asset tokenization guide](../asset-tokenization-guide/) shows how to tokenize any asset, from funds to invoices.

## How is tokenized gold backed?

Backing is the promise that real gold sits behind every token. The strength of that promise depends on four things.

1. **Allocated or unallocated.** Allocated gold means that the vault sets aside specific, numbered bars for token holders. Unallocated gold is a general claim on a pool. With it, you are closer to a creditor of the custodian.
2. **The legal structure.** Strong designs hold the gold in a trust or a special-purpose vehicle (SPV) that is separate from the issuer. Then creditors cannot claim the gold if the issuer fails.
3. **The custodian.** Look for a professional vault operator, ideally an LBMA member vault, with insurance and a published bar list.
4. **Minting and burning rules.** Minting creates new tokens, and burning destroys them. The issuer must mint only when it buys matching gold and puts it in custody. It must burn tokens when gold leaves custody through a redemption or a sale.

## How is tokenized gold audited?

The good news is that half the check is already public. Anyone can read the total number of tokens directly from the blockchain at any moment. The other half, the gold itself, needs an independent check.

- **Attestation.** An accounting firm confirms that, on a given date, the gold in the vault matched or exceeded the tokens in circulation. Issuers typically publish these monthly or quarterly.
- **Full audit.** This is a broader review of the controls and finances of the issuer over a period. It is deeper than an attestation, but less common.
- **Bar lists.** A bar list is a published list of the serial number, weight and purity of every bar in the vault. It stops one bar from quietly backing two products.
- **Proof of reserve.** This term covers any method that links the reserve data to the token supply on the blockchain. Some methods update automatically.

When you read a report, check the date and the firm. Check that it covers allocated bars. Also check that the gold figure is at least equal to the token supply on that date.

## How does tokenized gold compare with ETFs and physical gold?

| | Tokenized gold | Gold ETF | Physical gold |
|---|---|---|---|
| What you own | A token backed by gold in a vault | Shares in a fund that holds gold | The bars or coins themselves |
| When you can trade | Around the clock | Stock exchange hours | Dealer hours |
| Smallest purchase | Small fractions of an ounce | One share, or less where brokers allow | One coin or small bar, often at a premium |
| Ongoing costs | Network and platform fees (some also charge custody fees) | An annual expense ratio | Storage and insurance |
| Where it is held | A crypto wallet | A brokerage account | A safe, vault or bank box |
| Extra risks beyond the gold price | Issuer, custodian and smart contract | Fund and broker | Theft, storage and resale spread |

ETFs are the most familiar route for investors with a brokerage account. But most ETF holders cannot swap their shares for bars. Physical gold removes the middleman but adds storage, insurance and a dealer's buy-sell spread. Tokenized gold sits in between. It is a claim on vaulted gold, often allocated bars, in a wallet that you control. It can settle in minutes at any hour.

## What are the risks of tokenized gold?

- **Gold price risk.** Gold can fall in value, and it pays no interest or dividends. The market risk is the same however you hold it.
- **Issuer and custodian risk.** The token is only as good as the gold, the vault and the legal structure behind it.
- **Smart contract risk.** A smart contract is the program on the blockchain that issues and moves tokens. A bug or a stolen admin key can cause losses. Look for audited code and controlled upgrades.
- **Freezes.** Many issuers can freeze tokens to comply with court orders. That helps after theft, but it means that your control is not absolute.
- **Liquidity.** On thin markets (markets with few buyers and sellers), the token can trade slightly above or below the gold price.
- **Rules and taxes.** Regulation and tax treatment differ by country. The tax on tokenized gold can differ from the tax on bars or ETFs.

## What does launching a tokenized gold product involve?

Imagine an asset issuer that already stores gold for clients. It wants to offer that gold in a mobile app. It places allocated Good Delivery bars in a trust with an independent vault. It mints one token per gram on its own ledger. It publishes bar lists and monthly attestations, and it lets users buy as little as a single gram.

On [Hyper 0X](../../products/hyper-0x/), the Buckleson blockchain, that issuer can run its own private L2, a dedicated blockchain layer with its own rules. Hyper 0X checks KYC (know your customer) status, country restrictions and investor limits before a transfer executes. Investor records stay encrypted per party. Trades between gold and cash settle in one step, as our post on [atomic settlement](../atomic-settlement/) explains. Our [asset tokenization services](../../services/#asset-tokenization) cover the token, the rules and the investor app.

## Where does H0X Pay fit?

[H0X Pay](../../products/h0x-pay/) is coming soon from Buckleson. Its first roadmap phase is tokenized gold. Users will buy it in small slices from everyday payments, through an investment plan that they set once. The roadmap puts index funds, tokenized stocks and bonds next. Read [what micro-investing is](../what-is-micro-investing/) to see how slice-of-every-payment plans work. That post also covers their pros and cons.

## Where should you start?

1. Decide why you want gold exposure and what share of your savings to put in it.
2. Use the table above to compare the three routes: tokenized gold, an ETF or physical bullion.
3. For any token, read the backing structure, the custodian, the latest attestation and the redemption terms.
4. Check the rules and tax treatment in your country. Remember that the value can fall.

If you want to buy gold in small slices from everyday payments, H0X Pay is coming soon. Book a call to join the early-access list, or to talk about the launch of your own tokenized asset.
