---
title: 'MPC vs Multisig Wallets: Which Is Safer?'
description: 'MPC wallets split one key into shares, and multisig wallets need several full keys. Neither is always safer. Compare theft risk, recovery, approvals and costs.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-15
readTime: 6
tags: ['Crypto wallets', 'Wallet SDKs']
faqs:
  - question: 'Can an MPC wallet be non-custodial?'
    answer: 'Yes, if no single provider holds enough shares to sign without the user. If the provider can sign alone, the wallet is custodial in practice. Ask every provider how many shares it holds and who can start a signature.'
  - question: 'Do multisig wallets cost more to use?'
    answer: 'On many chains, yes. The chain must check several signatures or run a contract, and that costs more in network fees. An MPC wallet makes one normal signature, so its fee matches the fee of a single-key wallet.'
  - question: 'What happens when a key holder leaves the company?'
    answer: 'Remove that person at once. In an MPC wallet, you refresh the shares, so the old share stops working and the address stays the same. In a multisig wallet, the other signers replace the key with a transaction on the chain.'
---

Neither model is safer in every case. An MPC wallet splits one private key into shares that sign together, so the full key never exists in one place. A multisig wallet uses several full keys, and a set number of them must sign each transaction. Both remove the single point of failure of a one-key wallet. The safer choice depends on who holds the shares or keys, how you recover access and how you approve transfers.

## What is an MPC wallet?

A private key is the secret number that signs transactions. Whoever holds it controls the funds. MPC, or multi-party computation, lets several parties compute a result together without any party seeing the inputs of the others. An MPC wallet uses it to create and use a key that no single party ever holds.

The shares sit on different devices, for example a phone, a server and a backup. To sign, a set number of shares, such as two of three, run a joint process. The output is one normal signature. The blockchain sees an ordinary wallet and cannot tell that several parties signed.

You can also refresh the shares. The parties create new shares for the same key, and the old shares stop working. The wallet address does not change.

## What is a multisig wallet?

A multisig (multi-signature) wallet uses several separate private keys. Each signer holds one full key. A rule on the chain says how many signatures a transaction needs, for example two of three. On some chains this rule is part of the chain itself. On others, a smart contract (a program on the blockchain) applies it.

Because the rule lives on the chain, anyone can check it. The record shows which keys signed each transaction. To add or remove a signer, the current signers approve a change on the chain. On some chains, that change means a new wallet address.

## How do MPC and multisig wallets compare?

The table compares the two models side by side.

| Topic | MPC wallet | Multisig wallet |
|---|---|---|
| How control splits | One key, split into shares | Several full keys |
| What the chain sees | One normal signature | Several signatures or a contract call |
| Where the approval rule lives | In the signing software, off the chain | On the chain, open to anyone |
| Chain support | Any chain with a supported signature type | Only chains with multisig or smart contracts |
| Network fees | The same as a single-key wallet | Often higher, because of the extra checks |
| Change of signers | Refresh the shares, same address | A transaction on the chain, sometimes a new address |
| Record of who signed | In the logs of the provider | On the chain, for each transaction |
| Main weak point | The signing software and who holds the shares | The key storage of each signer and contract bugs |

## Which model is safer against theft?

Both models stop a thief who takes one key or one share. The real question is who can reach enough shares or keys to sign. If a provider holds two of three MPC shares, it can move funds alone. Then the wallet is custodial in practice, as our post on [custodial vs non-custodial wallets](../custodial-vs-non-custodial-wallet/) explains.

Two risks remain in both models. First, signers can collude. Signers who share one laptop give little more protection than one signer. Second, people still approve what they see, and a fake invoice or a fake signing screen can trick them. So the strongest setups also check the transfer itself, not only the number of signatures.

Each model also has its own risk. A bug in MPC signing software can leak shares. A bug in a multisig contract can lock or expose the funds. Choose software with independent security reviews.

## How does recovery work in each model?

The two models recover access in different ways.

1. **MPC.** If a user loses the phone with one share, the other shares still give access. The parties refresh the shares onto a new device, and the old share stops working.
2. **Multisig.** If a signer loses a key, the other signers approve a change that adds a new key. This works only while enough signers can still sign.
3. **Both.** If too many shares or keys go missing at the same time, nobody can move the funds again. Keep backups in separate places, and test recovery before you hold real money.

## How do passkey wallets compare?

A passkey wallet keeps one key on the device of the user, inside the secure chip of the phone. A face scan or a fingerprint gives access to it. With account abstraction, the account itself is a smart contract with its own rules. The rules can set spending limits, add a second device and let an app pay the network fees. Recovery is part of the account design, so a lost phone is not a lost wallet.

Passkey wallets solve a different problem. MPC and multisig split control among several people or devices. A passkey wallet makes the control of one person simple and safe. A smart account can also combine both ideas: a passkey for daily use and a second approval for large transfers. Read [account abstraction without seed phrases](../account-abstraction-no-seed-phrases/) for the full model.

## Which teams fit which model?

Match the model to who holds the money and who approves a transfer.

- **Consumer apps and neobanks.** Use passkey wallets with account abstraction, so users sign with a face scan and keep their own keys.
- **Fintechs that run wallets on many chains.** MPC fits well, because one setup works on every chain with a supported signature type.
- **Treasuries and funds on one chain.** Multisig fits well when the board wants every approval on the public record.
- **Banks and regulated custodians.** Use maker-checker approvals, where one person proposes a transfer and a second person approves it. MPC or keys in a hardware security module (HSM) both work here.

## What does this look like for a fintech?

Take a fintech with a retail app and a made-up $5M treasury. Retail users get passkey wallets, with the keys on their phones. The treasury needs two people for every transfer. The fintech picks a two-of-three setup: the finance lead, the treasury officer and a backup in a safe.

One day, the treasury officer loses a laptop. With MPC, the team refreshes the shares, and the share on the laptop stops working. With multisig, the finance lead and the backup approve a change that replaces the lost key. In both cases the treasury stays safe, because one share or one key cannot sign alone.

## How does Hyper 0X handle wallet keys and approvals?

[Hyper 0X](../../products/hyper-0x/), the Buckleson blockchain, puts approval rules on the chain. It runs compliance as code: the chain checks limits, KYC and maker-checker approvals before a transaction executes. So a large or unusual transfer waits for a second person. With account abstraction, users sign in with a face scan or a passkey, not a seed phrase.

[Hyper Wallet](../../products/hyper-wallet/) is a non-custodial wallet and exchange in one app. Non-custodial means that the private keys stay on the device of the user. It runs on many chains, in production, with 2M+ transactions and 33K+ portfolios. Banks and fintechs use the Hyper Wallet SDKs to launch their own wallet, neobank or payment gateway on Hyper 0X. A business that needs custody can add it through the SDKs. See [what a wallet SDK is](../what-is-a-wallet-sdk/) for how SDKs work.

Our [wallet and exchange services](../../services/wallets-exchanges/) build the same kind of wallet for you, with no seed phrases, maker-checker approvals and compliance as code. For build versus white-label, read [how to launch a crypto wallet](../how-to-launch-a-crypto-wallet/).

## Where should you start?

1. List every wallet that you run, the funds in each and who can move them.
2. Decide who must approve each type of transfer, and write the rule down.
3. Pick the key model for each wallet: passkeys for users, MPC or multisig for shared funds.
4. Check who holds enough shares or keys to sign alone.
5. Put limits and maker-checker approvals into code that runs before each transfer.
6. Test recovery for a lost device and for a signer who leaves, before you go live.

Book a call with a Buckleson engineer to choose the right wallet model for your team.
