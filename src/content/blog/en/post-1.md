---
title: 'Why Hyper 0X Is Post-Quantum-Resistant Today'
description: 'Harvest now, decrypt later is a real threat for records that must stay private for decades. Here is how Hyper 0X defends against it.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-01
cardImage: '@/images/blog/post-1.avif'
cardImageAlt: 'Abstract illustration of layered encryption'
readTime: 4
tags: ['hyper-0x', 'security', 'cryptography']
---

Settlement records, medical data and financial agreements often have to stay confidential for decades. That creates a problem: an attacker can record encrypted traffic today and simply wait until a large enough quantum computer exists to decrypt it. This is called **harvest now, decrypt later**, and it is why we built post-quantum resistance into Hyper 0X from day one.

## Hybrid key exchange on every connection

Every connection on Hyper 0X uses a hybrid key exchange: **ML-KEM-768** (standardised by NIST as FIPS 203 in 2024) combined with the classic **X25519** elliptic curve. The two shared secrets are combined, so an attacker would have to break _both_ the lattice problem and the elliptic curve to read anything.

ML-KEM-768 sits at NIST security category 3, roughly equivalent to AES-192. It is the same hybrid group modern browsers now use. The trade-off is size: public keys are about 35 times larger than X25519 alone, and each handshake carries roughly 2.3 KB more. For records that must stay private for decades, that is a price worth paying.

## Four locks in four places

Key exchange protects data on the wire, but that is only the first layer. Hyper 0X protects data in four places, and each layer assumes the one before it has already failed:

1. **In transit:** TLS 1.3 with hybrid X25519 + ML-KEM-768 and AES-256-GCM.
2. **In computation:** per-party keys, so each party's data is only readable by that party.
3. **On the ledger:** hash commitments and per-party encrypted payloads.
4. **At rest:** AES-256-GCM envelope encryption, with master keys held in hardware security modules.

## A note on wording

We will never claim Hyper 0X is immune to every future quantum attack. No honest engineer can promise that. What we can say is that Hyper 0X is **post-quantum-resistant under known attacks**, and that its modular core lets us add or swap encryption layers without a fork as the field evolves.

Want to run your workloads on a chain built for the long term? [Talk to our team](../../contact/).
