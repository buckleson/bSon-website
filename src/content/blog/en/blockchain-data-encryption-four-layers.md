---
title: 'Blockchain Data Encryption: The Four Layers That Matter'
description: 'Blockchain data encryption in four layers: in transit, in use, on the ledger and at rest. What each layer protects against, and how Hyper 0X applies all four.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['Cryptography', 'Post-quantum security']
figure: 'cipher-tower'
faqs:
  - question: 'What is the difference between hashing and encryption?'
    answer: 'Hashing turns data into a fixed-length fingerprint. Nobody can turn the fingerprint back into the original data. A hash proves that data has not changed. Encryption scrambles data so that only someone with the right key can read it again. Blockchains depend heavily on hashing, but hashing does not keep data secret.'
  - question: 'Can encrypted data on a blockchain be deleted?'
    answer: 'The ledger entry stays. But if the data is encrypted and you destroy every copy of the key, nobody can read the ciphertext (the encrypted data) again. People often call this technique crypto-shredding. It is one way to make permanent ledgers work with deletion requests. Check with your lawyers that it meets your obligations.'
  - question: 'Who holds the keys on an encrypted blockchain?'
    answer: 'It depends on the layer. The operator manages network and storage keys, ideally inside hardware security modules. The keys to ledger payloads must belong to the parties to each record. On Hyper 0X, only the parties hold the keys to their own payloads.'
---

Blockchains do not encrypt data by default. Public chains use hashes (short fingerprints of data) and digital signatures to prove that data is genuine, but anyone can read the transactions. To keep business data private, encryption must cover four places. These are: in transit between machines, in use during processing, on the ledger (the shared record) itself, and at rest on disk. Hyper 0X applies all four, so a failure at one layer does not expose the data.

## Why is blockchain data not private by default?

Public blockchains are open by design: anyone can check every transaction. Hashes prove that nobody has changed a record, and signatures prove who sent it. Neither hides what the record says. Addresses look anonymous, but chain analysis can often link them to real people and companies.

There is a second problem: replication. Every validator (a computer that checks and records transactions) keeps a full copy of the ledger, often for years. Each copy is another place that data can leak from. Think of a bank that records client positions, an asset issuer that holds investor details, or an AI team that logs prompts. For them, plain-text records on a shared ledger are not acceptable. That is why teams must design encryption in, layer by layer.

## What does encryption in transit protect against?

Data in transit is data that moves between machines: from a wallet to an app, from an app to a validator, or between validators. There are three threats: eavesdropping, tampering with messages on the way, and **harvest now, decrypt later**. In harvest now, decrypt later, an attacker records encrypted traffic today. Then the attacker waits for a quantum computer that can break it.

On [Hyper 0X](../../products/hyper-0x/), every connection uses TLS 1.3, the standard protocol for encrypted connections, with a hybrid key exchange. Key exchange is how two machines agree on a secret key over an open network. Hyper 0X combines classic X25519 with ML-KEM-768, the post-quantum algorithm that NIST published as FIPS 203 in August 2024. So an attacker must break both. AES-256-GCM encrypts the traffic itself. We explain the quantum side in more detail in [what makes a blockchain post-quantum-resistant](../post-quantum-resistant-blockchain/).

## What is encryption in use?

To process data, computers normally decrypt it in memory. At that moment, the data is most exposed. A compromised server, an insider with access to the machine, or another workload on the same hardware can read it. Encryption in use aims to let systems work on data but keep the plaintext (the readable data) from anyone without access rights.

The industry uses several techniques for this. They include trusted execution environments (hardware-isolated areas of a processor) and multi-party computation (parties compute a result together without sharing their inputs). Another technique is homomorphic encryption (computation on data that stays encrypted). Each has its own trade-offs in speed and complexity.

On Hyper 0X, computation runs with per-party keys. The data of each party opens only with the key of that party. So when Hyper 0X processes the transaction of one client, other parties on the network do not see its plaintext.

## How is data encrypted on the ledger?

The ledger is the shared, permanent record, so it needs protection that lasts as long as the data does. Hyper 0X writes two things for each record:

1. A **hash commitment**: a fingerprint that proves exactly what the ledger recorded and when, but does not reveal it.
2. A **per-party encrypted payload**: the contents, encrypted separately for each party to the record, with keys that only those parties hold.

Validators can order and record the transaction and its commitment, but they cannot read the contents. Later, either party can prove to an auditor what the parties agreed. To do this, the party reveals the data and shows that it matches the commitment. This layer protects against other participants, curious validators and anyone who gets a copy of the ledger. It is a big part of why a [permissioned blockchain](../permissioned-vs-permissionless-blockchain/), where only approved organisations run validators, can carry regulated data at all.

## What does encryption at rest add?

Data at rest is data stored on disks, in databases, in backups and in snapshots. The threats are physical and operational: a stolen drive, a leaked backup or a misconfigured storage bucket.

Hyper 0X uses AES-256-GCM **envelope encryption**. It encrypts each piece of data with its own data key. Master keys in hardware security modules (HSMs) then encrypt those data keys. An HSM is a tamper-resistant device that does encryption and never lets its keys out. GCM is a type of authenticated encryption: it also detects if someone has changed stored data. Envelope encryption also makes key rotation (a regular change of master keys) practical: you re-wrap the data keys and do not re-encrypt all the data.

## How do the four layers work together?

Each layer assumes that the layer before it has already failed. If an attacker gets past the network, the ledger is still encrypted. If someone steals a disk, the data on it is still ciphertext.

| Layer | Where the data is | Main threat | How Hyper 0X protects it |
|---|---|---|---|
| In transit | Moving between machines | Eavesdropping, tampering, harvest now, decrypt later | TLS 1.3, hybrid X25519 + ML-KEM-768, AES-256-GCM |
| In use | In processing | Compromised node, insider, neighbouring workload | Per-party keys during computation |
| On the ledger | In the shared record | Other participants and validators who read it | Hash commitments and per-party encrypted payloads |
| At rest | On disks and in backups | Stolen drives, leaked backups | AES-256-GCM envelope encryption, HSM-held master keys |

Think of an asset issuer that runs a tokenized bond on its own private L2. A private L2 is a private blockchain for one application. An investor places an order, and the order travels over hybrid post-quantum-resistant TLS. Hyper 0X processes the trade under per-party keys. The ledger records a commitment and a payload that only the investor and the issuer can read. The disks of the validators store all of it under AES-256-GCM, with master keys in HSMs.

An attacker who taps the network, reads a copy of the ledger or steals a backup sees only ciphertext and fingerprints. Read the [asset tokenization guide](../asset-tokenization-guide/) for the rest of that flow.

## Where should you start?

1. Map your data. Note what goes on-chain, who the parties are and how long each record must stay confidential.
2. Keep personal data off-chain where you can. Store commitments and references on the ledger instead.
3. Decide who holds the keys at each layer. Parties must hold their own payload keys. Master keys belong in HSMs.
4. Put records with a long legal life first in line for post-quantum-resistant key exchange.
5. Test each layer on its own. Assume that the layer has failed. Then check what an attacker can see.

Hyper 0X applies all four layers by default on every private L2. Our [custom blockchain team](../../services/#custom-blockchains) can map them to your data. Book a call to walk through your records layer by layer.
