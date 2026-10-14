---
title: 'Tokenized Gold Explained: Backing, Audits and ETFs'
description: 'Tokenized gold is a blockchain token backed by real gold in a vault. How it is backed and audited, and how it compares with gold ETFs and physical bullion.'
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
    answer: 'No. A gold-backed token tracks the price of gold, not a currency, so its value in dollars or euros rises and falls with the gold market.'
  - question: 'Who regulates tokenized gold?'
    answer: 'It depends on the country and the legal structure. Some issuers operate as regulated trust companies, and in the EU tokens that reference commodities can fall under the Markets in Crypto-Assets Regulation (MiCA). Ask which regulator oversees the issuer and the custodian.'
---

Tokenized gold is a digital token on a blockchain that represents ownership of physical gold held in a vault, usually one token per troy ounce or per gram. The issuer buys the gold, a custodian stores it, and independent firms check that the gold in the vault matches the tokens in circulation. Compared with a gold ETF or bars at home, it trades around the clock, can be bought in tiny fractions and moves between wallets in minutes, but you rely on the issuer, the custodian and the token's code.

## What is tokenized gold?

A token is a digital record of ownership on a blockchain, a shared ledger that many computers keep in sync. With tokenized gold, each token is a claim on a specific amount of real gold. Well-known examples include PAX Gold (PAXG) and Tether Gold (XAUT), where one token corresponds to one troy ounce of gold.

The gold behind these tokens is typically held as London Good Delivery bars, the wholesale standard set by the London Bullion Market Association (LBMA). Each bar weighs around 400 troy ounces, far more than most people would ever buy. Tokens split that bar into pieces small enough for anyone, and each piece can be sent to another wallet like any other crypto-asset.

Tokenized gold is one example of a broader idea: putting real-world assets on a blockchain. Our [asset tokenization guide](../asset-tokenization-guide/) walks through how any asset, from funds to invoices, gets tokenized.

## How is tokenized gold backed?

Backing is the promise that real gold sits behind every token. How strong that promise is depends on four things.

1. **Allocated or unallocated.** Allocated gold means specific, numbered bars are set aside for token holders. Unallocated gold is a general claim on a pool, which leaves you closer to being a creditor of the custodian.
2. **The legal structure.** Strong designs hold the gold in a trust or a special-purpose vehicle that is separate from the issuer, so creditors cannot claim it if the issuer fails.
3. **The custodian.** Look for a professional vault operator, ideally an LBMA member vault, with insurance and a published bar list.
4. **Minting and burning rules.** New tokens should only be created when matching gold is bought and placed in custody, and destroyed when gold is redeemed or sold.

## How is tokenized gold audited?

The good news is that half the check is already public. Anyone can read the total number of tokens directly from the blockchain at any moment. The other half, the gold itself, needs an independent check.

- **Attestation.** An accounting firm confirms that, on a given date, the gold in the vault matched or exceeded the tokens in circulation. Issuers typically publish these monthly or quarterly.
- **Full audit.** A broader review of the issuer's controls and finances over a period. It is deeper than an attestation, and less common.
- **Bar lists.** A published list of serial numbers, weights and purity for every bar held, so the same bar cannot quietly back two products.
- **Proof of reserve.** A term for any method that links the reserve data to the on-chain supply, sometimes updated automatically.

When you read a report, check the date, the firm, whether it covers allocated bars, and whether the gold figure is at least equal to the token supply on that date.

## How does tokenized gold compare with ETFs and physical gold?

| | Tokenized gold | Gold ETF | Physical gold |
|---|---|---|---|
| What you own | A token backed by gold in a vault | Shares in a fund that holds gold | The bars or coins themselves |
| When you can trade | Around the clock | Stock exchange hours | Dealer hours |
| Smallest purchase | Small fractions of an ounce | One share, or less where brokers allow | One coin or small bar, often at a premium |
| Ongoing costs | Network and platform fees; some charge custody fees | An annual expense ratio | Storage and insurance |
| Where it is held | A crypto wallet | A brokerage account | A safe, vault or bank box |
| Extra risks beyond the gold price | Issuer, custodian and smart contract | Fund and broker | Theft, storage and resale spread |

ETFs are the most familiar route for investors with a brokerage account, and most ETF holders cannot swap their shares for bars. Physical gold removes the middleman but adds storage, insurance and a dealer's buy-sell spread. Tokenized gold sits in between: a claim on vaulted gold, often allocated bars, held in a wallet you control, that can settle in minutes at any hour.

## What are the risks of tokenized gold?

- **Gold price risk.** Gold can fall in value and pays no interest or dividends. Investing in it carries the same market risk however you hold it.
- **Issuer and custodian risk.** The token is only as good as the gold, the vault and the legal structure behind it.
- **Smart contract risk.** A smart contract is the program on the blockchain that issues and moves tokens. A bug or a stolen admin key could cause losses, so look for audited code and controlled upgrades.
- **Freezes.** Many issuers can freeze tokens to comply with court orders. That helps after theft, but it means your control is not absolute.
- **Liquidity.** On thin markets the token can trade slightly above or below the gold price.
- **Rules and taxes.** Regulation and tax treatment differ by country, and tokenized gold may be taxed differently from bars or ETFs.

## What does launching a tokenized gold product involve?

Imagine an asset issuer that already stores gold for clients and wants to offer it in a mobile app. It places allocated Good Delivery bars in a trust with an independent vault, mints one token per gram on its own ledger, publishes bar lists and monthly attestations, and lets users buy as little as a single gram.

On [Hyper 0X](../../products/hyper-0x/), that issuer would run its own private L2, a dedicated blockchain layer with its own rules. KYC, country restrictions and investor limits are checked before a transfer executes, and investor records stay encrypted per party. Trades between gold and cash settle in one step, as explained in [atomic settlement](../atomic-settlement/). Our [asset tokenization services](../../services/#asset-tokenization) cover the token, the rules and the investor app.

## Where does H0X Pay fit?

[H0X Pay](../../products/h0x-pay/) is coming soon from Buckleson. Its first roadmap phase is tokenized gold, bought in small slices from everyday payments through an investment plan you set once. Index funds, tokenized stocks and bonds are planned next. Read [what micro-investing is](../what-is-micro-investing/) to see how slice-of-every-payment plans work, and their pros and cons.

## Where should you start?

1. Decide why you want gold exposure and how much of your savings it should be.
2. Compare the three routes: tokenized gold, an ETF or physical bullion, using the table above.
3. For any token, read the backing structure, the custodian, the latest attestation and the redemption terms.
4. Check the rules and tax treatment in your country, and remember that the value can fall.

If you want to buy gold in small slices from everyday payments, H0X Pay is coming soon. Book a call to join the early-access list, or to talk about launching your own tokenized asset.
