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
    answer: 'No. After a payment is final on the network, only the merchant can send money back. Merchants still need a clear refund policy, and consumer protection laws continue to apply.'
  - question: 'Do merchants need a crypto wallet to accept blockchain payments?'
    answer: 'Yes. Funds have to arrive at a wallet address. A payment gateway can manage that wallet for you. Or you can hold the keys yourself in a business wallet with approval rules.'
  - question: 'Are blockchain payments cheaper than card payments?'
    answer: 'Often, but not always. Network fees vary by chain and by how busy the chain is. Gateways and currency conversion add their own costs. Compare the full cost per payment, and remember that there are no chargeback fees.'
---

To accept blockchain payments, a merchant shows the customer a payment request, and the customer pays from their own wallet. The request is usually a QR code, a link or an invoice with the amount and a wallet address. After the network makes the payment final, the money sits in the merchant's wallet. A chargeback (a forced refund through the card network) cannot pull it back. Many merchants choose stablecoins (tokens with a steady value) to avoid price swings, then keep them or convert them to local currency. The key decisions are which assets and networks to accept, how to treat finality and refunds, and whether to use a gateway or build in-house.

## How does a blockchain payment work at checkout?

The flow looks different from a card payment, but it is simple:

1. **Create a payment request.** Your system generates an invoice. The invoice shows the amount, the asset (for example a dollar stablecoin), the network, a wallet address, a reference and an expiry time.
2. **Show it to the customer.** Online, that is a button or link. In a shop, it is a QR code on a screen or receipt.
3. **The customer pays.** They scan or click, check the amount in their wallet and approve. Their wallet broadcasts the transaction.
4. **Watch the network.** Your gateway or your own node (a server that follows the network) sees the transaction arrive. It matches the transaction to the invoice by address or reference.
5. **Wait for finality.** When no one can reverse the payment, mark the order as paid. Then release the goods.
6. **Settle your way.** Keep the funds in a business wallet, pay suppliers with them, or convert them to your local currency.

## What is the difference between settlement and finality?

Settlement is when money actually moves to you. Finality is the point after which no one can undo a payment. With cards, the two are far apart. A card payment gets approval in seconds. But funds usually reach the merchant one to three business days later. The customer can also file a chargeback months after that.

On a blockchain, settlement and finality arrive together. The speed depends on the network:

- **Probabilistic finality.** On Bitcoin, each new block makes a payment harder to reverse. A common rule for large amounts is to wait for six confirmations, about an hour.
- **Checkpoint finality.** Ethereum finalizes blocks after two epochs (fixed groups of blocks), roughly 13 minutes.
- **Deterministic finality.** Some chains use Byzantine fault tolerant (BFT) consensus, a voting method that still works when some validators fail or cheat. These chains treat a transaction as final when the network confirms it. [Hyper 0X](../../products/hyper-0x/), the Buckleson blockchain, works this way: final in one pass, with no reorganizations (rewrites of recent blocks).

For a coffee, a merchant can accept a payment the moment it appears. For a car, wait for finality. Set a policy per order size. Our post [blockchain finality explained](../blockchain-finality-explained/) goes deeper.

## How do blockchain payments compare with card payments?

| Topic | Card payment | Blockchain payment |
|---|---|---|
| When funds settle | Usually one to three business days | At network finality, from seconds to about an hour |
| Chargebacks | Yes, often months later | No, the merchant sends any refunds |
| Typical costs | Interchange, scheme and processor fees | Network fee plus any gateway and conversion fees |
| Cross-border | Currency conversion and extra fees | The same flow worldwide, with conversion only at the edges |
| What the customer needs | A card | A wallet holding the asset |

## Why do many merchants prefer stablecoins?

A stablecoin is a token designed to hold a steady value, usually one US dollar or one euro. Reserves such as cash and short-term government debt back the most widely used ones. USDC and USDT are the largest dollar stablecoins. If you accept them, a $100 order is still worth about $100 when you settle. That is not true of Bitcoin or Ether.

Regulation is also catching up. In the EU, the stablecoin rules of the Markets in Crypto-Assets Regulation (MiCA) started to apply in June 2024. In the United States, the GENIUS Act of 2025 set federal rules for payment stablecoins. Still, check who issues each stablecoin and how the issuer holds and reports its reserves. Also check which networks it runs on.

## What fees should merchants expect?

Blockchain payments remove card interchange (the fee that the card-issuing bank takes), but they are not free. Budget for:

- **Network fees.** Each transaction pays a fee to the network, often called gas. The amount depends on the chain and how busy it is. Some apps pay this fee for their users.
- **Gateway fees.** Payment processors usually charge per transaction or per month.
- **Conversion costs.** When you convert stablecoins into local currency, you pay a spread (the gap between buy and sell prices) or a fee. Bank transfer costs come on top.
- **Operations.** Wallet security, reconciliation and accounting take staff time.

Compare the total cost per order. Remember that blockchain payments also remove chargeback fees and the fraud losses linked to them.

## How do refunds and disputes work without chargebacks?

Customers cannot reverse a payment, so refunds become the merchant's job. Send the refund in the same asset to an address that the customer confirms. Record the link to the original order. If you refund in a volatile coin, decide in advance how you handle price changes. Your published refund policy and local consumer protection law still apply.

## What about compliance, tax and accounting?

If you use a gateway that holds funds for you, it usually does three things:

- It runs KYC (know-your-customer) checks on your business.
- It screens payments against sanctions lists.
- It follows the FATF Travel Rule. This rule requires crypto service providers to share sender and recipient details for transfers between them.

For accounting, record the value of each payment in local currency at the time you received it. Tax treatment varies by country, so involve your accountant before launch.

## Should you use a payment gateway or build your own?

Imagine an online electronics retailer that sells to customers in 30 countries. A hosted gateway gets it live quickly, but the gateway can hold the funds and set the rules. An in-house build gives full control, but the retailer must then run wallets, nodes and reconciliation. A middle path is a wallet SDK (software development kit). This is a set of ready-made wallet and payment components that the retailer embeds under its own brand. See [what a wallet SDK is](../what-is-a-wallet-sdk/) and [how to launch your own crypto wallet](../how-to-launch-a-crypto-wallet/).

Settlement design matters too. Say the retailer converts stablecoins to another asset, or pays a supplier in a swap. Both sides must move together. [Atomic settlement](../atomic-settlement/) means that both legs complete in one step, or neither does. Then no one is left exposed.

## Where does H0X Pay fit?

[H0X Pay](../../products/h0x-pay/) is coming soon from Buckleson. It will let you pay and get paid in crypto with links, QR codes and invoices, settled on Hyper 0X. It will also let you invest a small slice of every payment in tokenized assets, starting with gold. Payments are a later phase of the H0X Pay roadmap. Businesses that want a branded checkout today can use the payments and payment gateway in the [Hyper Wallet SDKs](../../products/hyper-wallet/).

## Where should you start?

1. Pick one stablecoin and one or two networks that your customers already use.
2. Write a finality policy: how long to wait before you release goods, by order size.
3. Choose a gateway, a wallet SDK or an in-house build. Decide who holds the keys.
4. Agree refund rules, accounting treatment and tax handling with your finance team.
5. Run a pilot with a small share of orders before the full rollout.

For branded payments, see our [wallet SDK services](../../services/wallet-sdks/). Join the H0X Pay early-access list too. Book a call to talk it through.
