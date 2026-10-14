---
title: 'Web3 Gaming Wallets: How Players Skip Seed Phrases'
description: 'How web3 games give players wallets without seed phrases: embedded wallets through SDKs, passkeys, sponsored fees and session keys, and what players really own.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['Web3 gaming', 'Wallet SDKs']
faqs:
  - question: 'Do players need to buy crypto to start a web3 game?'
    answer: 'Not necessarily. With sponsored fees, the game pays the network costs, so a new player can receive and use items without holding any crypto. A player only needs to buy crypto if the game sells items for it.'
  - question: 'What happens to my game items if I lose my phone?'
    answer: 'It depends on the wallet design. Smart accounts and passkeys synced across devices let you recover access without a seed phrase. Check the recovery options before you put anything valuable in a game wallet.'
  - question: 'Can I move my game items to another wallet?'
    answer: 'If the items are standard tokens and the game allows transfers, yes. Some games lock items to an account or restrict trading. So read the rules before you assume that an item can leave the game.'
---

Web3 games now give players a wallet without seed phrases by embedding it in the game through a wallet SDK. The player signs in with an email, a social account or a passkey. The SDK creates the wallet in the background. The game can pay network fees, so the player never needs a gas token (the native coin of the network that pays transaction fees). A blockchain records the items in that wallet under the player's account. But what that ownership means in practice depends on the design of the game.

## Why are seed phrases a problem for games?

A seed phrase is a list of words, usually 12 or 24, that can restore a crypto wallet. Whoever has the words controls the funds, and whoever loses them loses everything. It is a hard sell to ask a new player to write down 24 words before their first match.

The classic setup adds more friction. Players install a browser extension and buy a gas token on an exchange. Then they approve a pop-up for every in-game action. Each step loses players. Games compete on the first few minutes of experience, and seed phrases ruin those minutes.

## What is an embedded wallet?

An embedded wallet lives inside the game itself instead of in a separate app. The studio adds it with a wallet SDK, a ready-made software kit that creates wallets, signs transactions and shows balances. To the player, it looks like a normal game account with an inventory. Under the hood, it is a real blockchain wallet. See [what a wallet SDK is](../what-is-a-wallet-sdk/) for how these kits work.

The main question is where the private key (the secret that signs transactions) lives. Common options are:

- **On the player's device,** where the phone's secure hardware protects it. A face scan or fingerprint gives access to it.
- **Split into shares** with multi-party computation (MPC). The player and a provider each hold part of the key, so neither can sign alone.
- **With a custodian,** where the game or a provider holds the key for the player, like a bank holds cash.

## How do players sign in without a seed phrase?

Three technologies do most of the work.

**Passkeys** are sign-in credentials based on the FIDO2 and WebAuthn standards. The phone creates a key pair and keeps the private part in secure hardware. A face scan or fingerprint gives access to the private part. Passkeys can sync across a player's devices, which helps recovery.

**Smart accounts** use account abstraction: the account is a small program with its own rules, rather than one private key that controls everything. On Ethereum, the standard for this is ERC-4337, which went live on mainnet in 2023. The Pectra upgrade in May 2025 added EIP-7702, which lets ordinary accounts use smart-account features. Smart accounts allow recovery through backup devices or trusted contacts. Our post on [account abstraction without seed phrases](../account-abstraction-no-seed-phrases/) explains it in more depth.

**Social or email login** links the wallet to an account the player already has. It is the easiest start. But the security of the wallet then depends on that account and on how the provider protects the key.

## How do games hide gas fees and pop-ups?

Two more techniques make the wallet invisible during play.

- **Sponsored fees.** The game pays the network fees for its players, often through a service called a paymaster. Players never need to hold a gas token.
- **Session keys.** The player approves a temporary key with narrow limits, for example "this match only, game items only, nothing above a set value". The game can then sign routine actions without interrupting play. Anything outside the limits still needs the player's approval.

## Custodial, non-custodial or MPC: which should a game choose?

| | Custodial | Non-custodial embedded | MPC (split key) |
|---|---|---|---|
| Who controls the key | The game or a provider | The player's device or passkey | Shared between player and provider |
| Recovery | The provider restores access | Built into the account design | A backup share restores the key |
| Regulatory weight | Higher. Holding user assets can need a license | Lower | Depends on who can move funds |
| Best fit | Closed economies, simple onboarding | Players who want full control | A balance of ease and control |

Some studios start custodial for speed and move to non-custodial wallets later. If the game pays out real money, involve legal counsel early. Many countries regulate the holding of player assets. For the wider trade-offs, see [custodial vs non-custodial wallets](../custodial-vs-non-custodial-wallet/).

## What do players really own?

A token in a player's wallet is real. It sits on a public or shared record, and any change to it shows up on that record. That is a genuine change from items that live only in a publisher's database.

Ownership has limits, though. The image and stats of an item usually live on the game's servers. The game's rules decide what the item does, and other games rarely recognize it. If a game shuts down, the token remains, but its use inside the game can end. Honest studios explain this clearly in their terms.

## What does this look like for a studio?

Imagine a mobile studio that launches a season of tournaments with token rewards. A new player installs the game, signs in with a passkey and plays within a minute. The SDK creates the embedded wallet silently. The studio sponsors all network fees, and a session key handles in-match actions.

When the player wins, a reward lands in the wallet and appears in the inventory. Spending limits and an allow-list of approved contracts protect against phishing (tricks that make players sign bad transactions). For what makes reward economies work, read [play-to-earn games explained](../play-to-earn-games-explained/).

## How will HyperRun handle player wallets?

[HyperRun](../../products/hyperrun/) is coming soon from Buckleson. It is a realistic first-person shooter. We plan to give players and fans an in-game wallet built with the Hyper Wallet SDK. We also plan to make payouts from a rewards contract on Hyper 0X, our blockchain, based on signed match results.

Studios do not have to wait. The [Hyper Wallet](../../products/hyper-wallet/) SDKs are available today to embed wallets and payments in your own app or game. Hyper Wallet is non-custodial by default, with custody available through the SDKs for businesses that need it. On [Hyper 0X](../../products/hyper-0x/), account abstraction lets users sign in with a face scan or passkey, and apps can pay the fees for them.

## Where should you start?

1. Decide who holds the keys: the player, the studio, or both.
2. Choose sign-in methods, with passkeys as the default and a clear recovery path.
3. Sponsor network fees so new players never need a gas token.
4. Set spending limits and session-key rules before launch.
5. Explain in plain words what players own and what happens if the game ends.

For in-game wallets, see our [wallet SDK services](../../services/wallet-sdks/). Book a call to see the Hyper Wallet SDKs, or to get notified when HyperRun launches.
