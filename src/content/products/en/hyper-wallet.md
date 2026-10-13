---
title: 'Hyper Wallet & SDKs'
description: 'Exchange and wallet in one app, plus SDKs to launch your own neobank'
main:
  id: 3
  content: |
    Hyper Wallet is our own wallet and exchange in a single application, built on Hyper 0X. Users trade, hold and move assets in one place, with one unified transaction cost instead of paying exchange fees and wallet fees separately. With the Hyper Wallet SDKs, businesses can launch their own neobank, send and receive payments, and create their own payment gateway on the same rails.
  imgCard: '@/images/product-image-3.avif'
  imgMain: '@/images/product-image-main-3.avif'
  imgAlt: 'Hyper Wallet app'
tabs:
  - id: 'tabs-with-card-item-1'
    dataTab: '#tabs-with-card-1'
    title: 'Overview'
  - id: 'tabs-with-card-item-2'
    dataTab: '#tabs-with-card-2'
    title: 'Specifications'
  - id: 'tabs-with-card-item-3'
    dataTab: '#tabs-with-card-3'
    title: 'Architecture'
longDescription:
  title: 'Launch Your Own Neobank'
  subTitle: |
    Hyper Wallet has three layers, all settled on Hyper 0X: an exchange layer, a custody layer and an integration layer. The SDKs expose the same wallet, payments and settlement to your apps, so you can embed wallets in hours, accept and send payments, and run your own payment gateway. Games and apps can embed in-app wallets instantly, and other chains are reached through Hyper 0X bridge adapters.
  btnTitle: 'Get the SDKs'
  btnURL: '/contact'
descriptionList:
  - title: 'Zero Double Commissions'
    subTitle: 'One unified transaction cost. Other wallets add up to about 0.875% on top of exchange fees.'
  - title: 'Atomic Settlement'
    subTitle: 'Both legs of a trade settle in one step or not at all, so neither side is ever left exposed.'
  - title: 'Developer-First SDKs'
    subTitle: 'Embed wallets, payments and a payment gateway into your own apps and games.'
specificationsLeft:
  - title: 'On-Chain Order Book'
    subTitle: 'A central limit order book runs inside Hyper 0X consensus. Every validator computes the same fills, so nobody can front-run.'
  - title: 'Self-Custody, Multi-Chain'
    subTitle: 'Hold assets across chains through Hyper 0X bridge adapters, with per-party encrypted records.'
  - title: 'Payments & Gateways'
    subTitle: 'Send and receive payments and run your own branded payment gateway with the SDKs.'
  - title: 'Simple Status'
    subTitle: 'Users only ever see pending, confirmed or failed. No reconciling across apps.'
tableData:
  - feature: ['Metric', 'Value']
    description:
      - ['Transactions processed', '2M+']
      - ['Portfolios', '33K+']
      - ['Fees saved for users', '$128K+']
      - ['Order types', 'Limit, market']
      - ['Settlement', 'Atomic, on Hyper 0X']
blueprints:
  first: '@/images/diagrams/wallet-architecture.png'
---
