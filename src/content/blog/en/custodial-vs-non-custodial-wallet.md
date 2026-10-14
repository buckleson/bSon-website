---
title: 'Custodial vs Non-Custodial Wallets: Which to Offer?'
description: 'A custodial wallet holds keys for the user. A non-custodial wallet keeps them on the device. Compare licensing, recovery and UX to pick the right model.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 6
tags: ['Crypto wallets', 'Wallet SDKs']
diagram: 'wallet'
faqs:
  - question: 'Is a non-custodial wallet safer than a custodial one?'
    answer: 'It removes the risk that a provider fails or freezes funds, because only the user can move the assets. In exchange, the user carries the risk of lost access. Good recovery design, such as passkeys and account abstraction, greatly reduces that risk.'
  - question: 'Do you need a license to offer a non-custodial wallet?'
    answer: 'Usually not for the wallet software itself, because the provider never controls user funds. Other features in the same app can need licenses, such as fiat on-ramps, trading or custody. Check with counsel in each market.'
  - question: 'Can one app offer both custodial and non-custodial wallets?'
    answer: 'Yes. Many apps give retail users a non-custodial wallet by default and add a custodial account for clients who need one, such as institutions. With the Hyper Wallet SDKs, custody is an optional add-on to the same wallet.'
---

In a custodial wallet, a company holds the private keys and moves funds for the user, much as a bank holds deposits. A non-custodial wallet keeps the keys on the user's own device, so only the user can move the assets. A custodial wallet is easier to recover, but it brings licensing duties and counterparty risk (the risk that the provider fails). A non-custodial wallet removes that risk, but it puts recovery in the user's hands. That is why many fintechs offer non-custodial by default and add custody only where clients need it.

## What is the difference between a custodial and a non-custodial wallet?

A private key, a secret number that signs transactions, controls every crypto asset. Whoever holds the key controls the funds.

In a custodial wallet, the provider holds the keys, often in pooled wallets. Cold storage (keys kept offline) or hardware security modules (HSMs, tamper-resistant devices built to store keys) protect those wallets. The user sees an account balance, as on an exchange. In a non-custodial wallet, also called self-custody, the wallet creates and stores the key on the user's phone or hardware device. The provider supplies the software but cannot move the funds.

| | Custodial | Non-custodial |
|---|---|---|
| Who holds the keys | The provider | The user, on their device |
| Who can move funds | The provider, on instruction | Only the user |
| If the provider fails | Funds can be frozen or lost | Funds stay with the user |
| Recovery | Identity check and support desk | Built into the wallet design |
| Licensing | Usually a regulated activity | Wallet software is often out of scope |
| Best for | Institutions and managed accounts | Retail users, apps, global reach |

## Who carries the risk in each model?

With custody, the user trusts the provider. If the provider suffers a hack, mismanages funds or goes bankrupt, customers can lose access. When the FTX exchange collapsed in November 2022, customers with balances on the platform were not able to withdraw them.

With self-custody, that counterparty risk disappears, but a different risk appears: the user can lose access. A lost phone or a missing backup can cost money. So can a phishing site, a fake site that tricks someone into signing a bad transaction. Nobody can reverse these losses. Good wallet design mostly shrinks this second risk without bringing back the first.

## What licenses does a custodial wallet need?

In most major markets, holding crypto for customers is a regulated activity, because it looks a lot like holding deposits. The details vary by country, so treat this as a map, not legal advice.

- **European Union.** MiCA, the Markets in Crypto-Assets Regulation, makes custody and administration of crypto-assets for clients a licensed service. Providers must get authorization as crypto-asset service providers (CASPs). They must keep client assets segregated and maintain a custody policy. MiCA states that providers of non-custodial wallet hardware or software fall outside its scope.
- **United States.** The state and the business model decide whether a custodian needs money transmitter licenses, a New York BitLicense or a trust charter. Banks also follow guidance from their own regulators.
- **Anti-money-laundering rules.** The Financial Action Task Force (FATF) expects virtual asset service providers to verify customers. FATF also expects them to send sender and recipient details with transfers. This duty is the Travel Rule. FATF guidance says that businesses that only supply wallet software, and never control customer funds, are generally not virtual asset service providers.

A non-custodial wallet does not make an app regulation-free. Fiat on-ramps (services that change money into crypto), trading, lending or yield features can each bring their own requirements. But a core product without custody often avoids the heaviest duties: safeguarding client assets, capital requirements and the liability that comes with them.

## How does recovery work in each model?

Custodial recovery is familiar. The user proves who they are, often with the same identity checks used at sign-up, and the provider restores access.

Non-custodial recovery has changed a lot. The original method was a seed phrase: 12 to 24 words, defined by the BIP-39 standard, that can rebuild every key. It works, but people lose the words, photograph them or type them into fake sites. Newer approaches remove that burden:

1. **Passkeys and secure hardware.** Passkeys are sign-in keys that replace passwords. The phone's secure chip protects the keys. A face scan or fingerprint gives access to them.
2. **Smart accounts.** With account abstraction, the account is a smart contract (a program on the blockchain) that sets its own rules. The rules include who can help recover the account, such as a second device or trusted guardians. ERC-4337 brought this model to Ethereum and EVM chains (chains that run Ethereum-style smart contracts).
3. **Key splitting.** Multi-party computation (MPC) splits a key into shares, and different devices or parties hold the shares. No single loss is then fatal. One caution: if the provider holds enough shares to move funds alone, the wallet is custodial in practice, whatever the marketing says.

On Hyper 0X, account abstraction is the default: users sign in with a face scan or passkey and never handle a seed phrase. Read more in [account abstraction without seed phrases](../account-abstraction-no-seed-phrases/).

## Which model gives users a better experience?

For years, custodial won on convenience: email sign-in, password resets and no network fees to think about. Non-custodial meant seed phrases, gas tokens (the coins that pay network fees) and confusing errors. Account abstraction closes most of that gap. Apps can pay network fees for users, set spending limits and support recovery, while the keys stay with the user.

Self-custody also does things that custody struggles with. Users can connect to dApps (blockchain apps) through WalletConnect and hold assets from many chains in one place. They can also move funds without waiting for a provider to approve a withdrawal. [Hyper Wallet](../../products/hyper-wallet/) shows this in production: a non-custodial wallet and exchange in one app. It has more than 2 million transactions and 33,000+ portfolios. Its users saved over $128K in wallet fees.

## Why do many fintechs choose non-custodial by default?

For a fintech, the default matters more than the option. Non-custodial by default means:

- **Less to safeguard.** There is no central pool of customer keys for attackers to target.
- **A lighter licensing path in many markets,** because the core wallet is software, not a custody service.
- **Room to grow.** You can switch on regulated features market by market as licenses arrive.
- **User trust.** People who watched exchanges fail value owning their keys.

Custody still has a place. Institutions, fund managers and corporate treasuries often must hold assets with a regulated custodian. Some retail users simply prefer an account they can reset. So the strongest setups are hybrid: non-custodial for everyone, with custody added for the clients and markets that need it, inside one app.

Take a payments fintech with a large retail base and a few corporate clients. It launches a non-custodial wallet for retail users, so it never holds their crypto. For corporate clients that need a custodian, it adds custody with maker-checker approvals (one person proposes a transfer and another approves it). Both groups use the same app and the same records.

That is how the Hyper Wallet SDKs work. The wallet is non-custodial out of the box. Businesses that need custody add it through the SDKs. If the term is new, start with [what a wallet SDK is](../what-is-a-wallet-sdk/).

## Where should you start?

1. Map your users: retail, institutional or both, and in which markets.
2. Get legal advice per market on custody, anti-money-laundering rules and the Travel Rule before you choose.
3. Default to non-custodial unless a client or regulator requires custody.
4. Design recovery first, with passkeys and account abstraction instead of seed phrases.
5. Pick an SDK that supports both models, so custody later is an add-on, not a rebuild. See [how to launch your own crypto wallet](../how-to-launch-a-crypto-wallet/) for build vs white-label.

Hyper Wallet and its SDKs give you a production non-custodial wallet with optional custody, backed by our [wallet SDK services](../../services/#wallet-sdks). Book a call to map the right model for your users.
