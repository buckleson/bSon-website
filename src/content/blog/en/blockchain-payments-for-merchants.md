---
title: 'Blockchain Payments for Merchants: How to Accept Them'
description: 'How merchants can accept blockchain payments: checkout flow, settlement and finality, stablecoins versus volatile coins, fees, refunds and compliance basics.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['Payments', 'Settlement']
faqs:
  - question: 'Can a customer reverse a blockchain payment?'
    answer: 'No. Once a payment is final on the network, only the merchant can send money back. Merchants still need a clear refund policy, and consumer protection laws continue to apply.'
  - question: 'Do merchants need a crypto wallet to accept blockchain payments?'
    answer: 'Yes, funds have to arrive at a wallet address. A payment gateway can manage that wallet for you, or you can hold the keys yourself in a business wallet with approval rules.'
  - question: 'Are blockchain payments cheaper than card payments?'
    answer: 'Often, but not always. Network fees vary by chain and by how busy it is, and gateways and currency conversion add their own costs. Compare the full cost per payment, including the lack of chargeback fees.'
---

To accept blockchain payments, a merchant shows the customer a payment request, usually a QR code, a link or an invoice with the amount and a wallet address, and the customer pays from their own wallet. Once the network makes the payment final, the money sits in the merchant's wallet with no chargeback risk. Many merchants choose stablecoins to avoid price swings, then keep them or convert them to local currency. The key decisions are which assets and networks to accept, how to treat finality and refunds, and whether to use a gateway or build in-house.

## How does a blockchain payment work at checkout?

The flow looks different from a card payment, but it is simple:

1. **Create a payment request.** Your system generates an invoice with the amount, the asset (for example a dollar stablecoin), the network, a wallet address, a reference and an expiry time.
2. **Show it to the customer.** Online, that is a button or link. In a shop, it is a QR code on a screen or receipt.
3. **The customer pays.** They scan or click, check the amount in their wallet and approve. Their wallet broadcasts the transaction.
4. **Watch the network.** Your gateway or node sees the transaction arrive and matches it to the invoice by address or reference.
5. **Wait for finality.** Once the payment cannot be reversed, you mark the order as paid and release the goods.
6. **Settle your way.** Keep the funds in a business wallet, pay suppliers with them, or convert them to your local currency.

## What is the difference between settlement and finality?

Settlement is when money actually moves to you. Finality is the point after which a payment can no longer be undone. With cards, the two are far apart. A card payment is approved in seconds, but funds usually reach the merchant one to three business days later, and the customer can file a chargeback months after that.

On a blockchain, settlement and finality arrive together, but how fast depends on the network:

- **Probabilistic finality.** On Bitcoin, each new block makes a payment harder to reverse. Waiting for six confirmations, about an hour, is a common rule for large amounts.
- **Checkpoint finality.** Ethereum finalizes blocks after two epochs, roughly 13 minutes.
- **Deterministic finality.** Chains that use Byzantine fault tolerant (BFT) consensus treat a transaction as final as soon as it is confirmed. [Hyper 0X](../../products/hyper-0x/) works this way: final in one pass, with no reorganizations.

For a coffee, a merchant might accept a payment the moment it appears. For a car, they should wait for finality. Set a policy per order size; [blockchain finality explained](../blockchain-finality-explained/) goes deeper.

## How do blockchain payments compare with card payments?

| | Card payment | Blockchain payment |
|---|---|---|
| When funds settle | Usually one to three business days | At network finality, from seconds to about an hour |
| Chargebacks | Yes, often months later | No; refunds are sent by the merchant |
| Typical costs | Interchange, scheme and processor fees | Network fee plus any gateway and conversion fees |
| Cross-border | Currency conversion and extra fees | The same flow worldwide; conversion only at the edges |
| What the customer needs | A card | A wallet holding the asset |

## Why do many merchants prefer stablecoins?

A stablecoin is a token designed to hold a steady value, usually one US dollar or one euro. The most widely used ones are backed by reserves such as cash and short-term government debt. USDC and USDT are the largest dollar stablecoins. Accepting them means a $100 order is still worth about $100 when you settle, which is not true of Bitcoin or Ether.

Regulation is also catching up. In the EU, the stablecoin rules of the Markets in Crypto-Assets Regulation (MiCA) have applied since June 2024. In the United States, the GENIUS Act of 2025 set federal rules for payment stablecoins. Still, check who issues each stablecoin, how its reserves are held and reported, and which networks it runs on.

## What fees should merchants expect?

Blockchain payments remove card interchange, but they are not free. Budget for:

- **Network fees.** Each transaction pays the network, often called gas. Amounts depend on the chain and how busy it is, and some apps pay this fee for their users.
- **Gateway fees.** Payment processors usually charge per transaction or per month.
- **Conversion costs.** Turning stablecoins into local currency adds a spread or fee, plus bank transfer costs.
- **Operations.** Wallet security, reconciliation and accounting take staff time.

Compare the total cost per order, and remember that blockchain payments also remove chargeback fees and the fraud losses linked to them.

## How do refunds and disputes work without chargebacks?

Because customers cannot reverse a payment, refunds become the merchant's job. Send the refund to an address the customer confirms, in the same asset, and record the link to the original order. Decide in advance how you handle price changes if you refund in a volatile coin. Your published refund policy and local consumer protection law still apply.

## What about compliance, tax and accounting?

If you use a gateway that holds funds for you, it will usually run KYC (know-your-customer) checks on your business, screen payments against sanctions lists and follow the FATF Travel Rule, which requires crypto service providers to share sender and recipient details for transfers between them. For accounting, record each payment's value in local currency at the time you received it. Tax treatment varies by country, so involve your accountant before launch.

## Should you use a payment gateway or build your own?

Imagine an online electronics retailer selling to customers in 30 countries. A hosted gateway gets it live quickly, but the gateway may hold the funds and set the rules. Building in-house gives full control, but means running wallets, nodes and reconciliation. A middle path is a wallet SDK: ready-made wallet and payment components the retailer embeds under its own brand. See [what a wallet SDK is](../what-is-a-wallet-sdk/) and [how to launch your own crypto wallet](../how-to-launch-a-crypto-wallet/).

Settlement design matters too. If the retailer converts stablecoins to another asset or pays a supplier in a swap, both sides should move together. [Atomic settlement](../atomic-settlement/) means both legs complete in one step or neither does, so no one is left exposed.

## Where does H0X Pay fit?

[H0X Pay](../../products/h0x-pay/) is coming soon from Buckleson. It is being designed so you can pay and get paid in crypto with links, QR codes and invoices, settled on Hyper 0X, and invest a small slice of every payment in tokenized assets, starting with gold. Payments are a later phase of the H0X Pay roadmap. Businesses that want a branded checkout today can use the payments and payment gateway in the [Hyper Wallet SDKs](../../products/hyper-wallet/).

## Where should you start?

1. Pick one stablecoin and one or two networks your customers already use.
2. Write a finality policy: how long to wait before releasing goods, by order size.
3. Choose a gateway, a wallet SDK or an in-house build, and decide who holds the keys.
4. Agree refund rules, accounting treatment and tax handling with your finance team.
5. Pilot with a small share of orders before rolling out.

For branded payments, see our [wallet SDK services](../../services/#wallet-sdks), and join the H0X Pay early-access list. Book a call to talk it through.
