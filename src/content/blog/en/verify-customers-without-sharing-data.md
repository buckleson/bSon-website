---
title: 'How Can You Verify a Customer Without Seeing Their Data?'
description: 'You can verify a customer without seeing their data. One trusted party checks the documents once, and others check a signed result or a proof of one fact.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-15
readTime: 6
tags: ['Data privacy', 'Enterprise blockchain']
faqs:
  - question: 'Can a fintech rely on an identity check that another firm did?'
    answer: 'Often, yes. In many countries, a regulated firm can rely on a check by another regulated firm, but it keeps the responsibility for the result. Ask your compliance team which checks you can reuse and which records you must keep.'
  - question: 'How is a privacy proof different from encryption?'
    answer: 'Encryption hides data from everyone who does not hold the key. Anyone with the key sees all of the data after decryption. A proof shows that one statement about the data is true, and the provider that checks it never sees the data.'
  - question: 'Does the blockchain hold personal data in this design?'
    answer: 'Not in a good design. The ledger holds hash commitments (fingerprints that do not reveal the data), the checker behind each result and the status of each result. The documents stay with the checker that saw them.'
---

You can verify a customer without seeing their data if you check a signed result or a proof instead of the documents. One trusted party checks the passport once and signs the answers that others need, such as "over 18: yes". Other providers check that signature and keep no copy of the passport. A blockchain adds a shared record of which checks happened, who signed them and which ones are still valid.

## Why is it risky to copy customer documents?

Every copy of a customer document is one more place where it can leak. Take a fintech that offers savings accounts in an app. Before a first deposit, it must confirm three facts. The customer passed identity checks (KYC, or know your customer), is over 18 and lives in an allowed country.

Today, the customer often uploads a passport and a utility bill. The fintech stores copies and sends them to partners, such as a card issuer. Say that it has four partners. One passport now sits in five databases.

- **One weak system is enough.** An attacker needs to break into only the weakest of the five.
- **Each copy shows too much.** The fintech needs three answers, not a name, a photo and a passport number.
- **A leak lasts.** A customer can change a password, but not a date of birth or a face.

## How do reusable identity checks work?

A reusable check means that one trusted checker, such as a bank or a licensed identity firm, does the full check once. It signs the result with a digital signature, a seal that proves who signed and that nobody changed the content. The flow has five steps:

1. **The checker sees the documents once.** It confirms that the person matches the passport.
2. **The checker signs the result.** The result holds the answers, the date of the check and the name of the checker.
3. **The customer keeps the result.** A wallet app on the phone holds it under a key that only the customer controls.
4. **The fintech checks the signature.** It confirms that an approved checker signed the result.
5. **The fintech checks the status.** It confirms that the checker has not revoked (withdrawn) the result.

The next provider reuses the same result, so the customer uploads nothing new. Our post on [compliance as code](../compliance-as-code-blockchain/) shows how a chain runs checks like these before a transaction executes.

## What is selective disclosure?

Selective disclosure means that the customer shares only the items that one provider needs. The checker signs each item in a way that lets the customer hide the others, and the signature still checks out.

In the example, the signed result holds five items: name, date of birth, country, "over 18: yes" and "identity check passed". The customer shows the fintech the last three and hides the name and the date of birth. Our guide on [how to stop LLM data leaks](../stop-llm-data-leaks-pii-redaction/) applies the same idea to AI agents.

## How can you prove a fact without revealing the data?

Use a zero-knowledge proof: a proof that a statement is true that shows nothing else. "Over 18" is a fact, and a date of birth is the data behind it. The proof gives a provider the fact without the data.

The phone of the customer creates the proof from the signed result. In the example, it proves that the signed date of birth is more than 18 years ago. The fintech checks the proof and learns "yes", but not the year of birth.

The same works for the country: the phone proves that it is on the allowed list without naming it. Each proof is new, so two providers cannot easily match their records through it.

## How do the three methods compare?

A proof shares the least, and a copy of the documents shares the most.

| Topic | Copy the documents | Share a signed result | Share a proof |
|---|---|---|---|
| What the fintech receives | A passport scan and a utility bill | Signed answers from one checker | A proof for each fact |
| What a breach exposes | Name, photo, date of birth, address and passport number | The items that the customer shared | Only that each fact is true |
| Can providers link their records? | Yes, through the passport number | Yes, through the same signature | Much harder, because each proof is new |
| Can the checker revoke it? | No | Yes, through a shared status record | Yes, through a shared status record |
| Effort to build | Low, and common today | Medium | Higher, because the method is newer |

## Where does a blockchain help?

A blockchain gives all providers one shared record of checks, signers and revocations. It is a tamper-evident ledger that many firms keep in sync: any change to an old entry shows. It helps in three places:

- **A record of checks and signers.** The ledger lists the approved checkers and shows which checker signed each result, and when.
- **Revocation.** A checker marks a result as revoked, for example after it finds fraud. Every provider sees the change on its next check.
- **An audit trail without the documents.** Each check by the fintech leaves an entry: a fingerprint of the result, the rule and the time. No passport goes on the ledger.

The ledger does not need the personal data. It holds hash commitments, fingerprints that prove what the ledger recorded and when without revealing it. So the blockchain protects privacy and still gives each business the facts it needs.

A permissioned blockchain fits this job, because only known, approved firms validate its records. Read [permissioned vs permissionless blockchains](../permissioned-vs-permissionless-blockchain/) for the difference, and [blockchain use cases beyond payments](../blockchain-use-cases-beyond-payments/) for more shared records.

## What are the limits of private customer checks?

These designs remove copies, but four hard problems remain:

- **The first check.** Someone must still see the documents once. If that check is weak, every provider that reuses it repeats the mistake. Choose checkers with care, and remove one that fails.
- **Lost keys.** A lost phone means a revoked result and a fresh check. If a checker loses control of its signing key, every provider must stop trusting that key at once. The shared record shows that change to all of them.
- **Legal duties.** Laws in many countries require regulated firms to keep evidence of each identity check for years. So someone, often the checker, still stores the documents under strong protection. Ask your lawyers which records you must keep.
- **Agreement.** Every provider must accept the same checkers, result format and revocation rules. That takes a written agreement as well as code.

## How does Hyper 0X support private customer checks?

[Hyper 0X](../../products/hyper-0x/), the Buckleson blockchain, gives you the base for these patterns. Each company gets a private L2, a private blockchain with its own rules that settles on a shared main chain, the L1. You build the signed results, proofs and revocation records on that L2, and Hyper 0X gives the parts underneath:

- **Compliance as code.** The chain checks KYC status, limits and approvals before a transaction executes. A rule can accept deposits only from customers with a valid, unrevoked result.
- **Per-party encryption.** Hyper 0X encrypts each record separately for each party, so only the parties to a record can read it.
- **Hash commitments.** The ledger keeps a fingerprint of each record, so an auditor can confirm a check without the documents.
- **Final in one pass.** Hyper 0X never reorders or undoes a transaction, so a recorded check or revocation stays on the record.
- **Post-quantum-resistant connections.** Data stays encrypted in transit, in use, on the ledger and at rest.

Read [blockchain data encryption: the four layers](../blockchain-data-encryption-four-layers/) for the details. Our [custom blockchain team](../../services/custom-blockchains/) builds the L2, the rules and the record of checks with you.

## Where should you start?

1. List the facts that each provider needs, such as "over 18", not the documents behind them.
2. Find every copy of identity documents that you and your partners hold.
3. Mark the records that the law requires you to keep, and plan to remove the rest.
4. Agree with your partners on the approved checkers and the format of a signed result.
5. Start with signed results, and add proofs for the most sensitive facts.
6. Pilot the flow with one partner on a private L2 that records checks, signers and revocations.

Book a call with a Buckleson engineer to design customer checks that keep documents out of your systems.
