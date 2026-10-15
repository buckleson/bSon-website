---
title: 'How Do Signed Match Results Stop Cheating in Games?'
description: 'A signed match result shows who reported a score and that nobody changed it. See which cheats it stops, which it cannot and how payouts on a blockchain use it.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-15
readTime: 6
tags: ['Web3 gaming', 'Prediction markets']
faqs:
  - question: 'Do signed match results stop aimbots?'
    answer: 'No. A signed result proves who reported the score and that nobody changed it. An aimbot wins a real match on a real server, so the server signs an honest record of an unfair game. You still need anti-cheat tools and checks of player behavior.'
  - question: 'Who signs a match result?'
    answer: 'The game server signs it, with a key kept in a hardware security module. For large prizes, a second independent party, such as a referee, can also sign. The smart contract then pays out only when every required signature is valid.'
  - question: 'Does a signed result need a blockchain?'
    answer: 'No. Any system can check a digital signature. A blockchain adds a shared record that nobody can quietly change, and a smart contract that pays out under published rules. Players and fans can then check the result and the payout themselves.'
---

A signed match result stops cheats that fake or change the outcome of a match. The game server seals the final result with a private key, and anyone can check that seal. So nobody can forge a win, edit a score or claim the same prize twice without detection. It does not stop aimbots or wallhacks during play, so games still need anti-cheat tools.

## What kinds of cheating happen in competitive games?

Cheats in games fall into two groups. Some cheats change how a player plays. Others change what the record says about the match. When prizes, rewards or predictions depend on the result, the second group is as dangerous as the first.

| Type of cheat | Example | Does a signed result stop it? |
|---|---|---|
| Forged result | A modified game client reports a win that never happened | Yes |
| Edited score | Someone with database access changes the score after the match | Yes |
| Replayed result | A player submits the same winning result twice | Yes, with a unique match ID |
| Aimbot or wallhack | Software aims for the player or shows enemies through walls | No, anti-cheat tools handle it |
| Match-fixing | Players agree on the result before the match | No, integrity monitoring handles it |
| Multiple accounts | One person plays as several players to collect more rewards | No, identity checks handle it |

## What is a signed match result?

A signed match result is a small record of a match, sealed with a digital signature. A digital signature is a mathematical seal made with a private key that only the signer holds. Anyone with the matching public key can check the seal. A change to even one character of the record breaks it.

A typical record holds:

- A unique match ID.
- The players or teams.
- The final score and the winner.
- The start time and the end time.
- The game version and the server ID.
- A hash of the match log. A hash is a short fingerprint of data, and any change to the data changes the fingerprint.

The record itself is small. The full match log and the replay stay in storage, and the hash links them to the record. Anyone can later check the result against the raw data. The same idea gives AI agents a receipt for every action, as our post on [proof of execution](../proof-of-execution-ai/) explains.

## Why must the server decide the result, not the device of the player?

The device is in the hands of the player. A player can modify the game client, intercept its traffic or write a script that sends fake messages. So a result from the client proves only what the client chose to say.

An authoritative game server is the opposite. It runs the match, counts the hits and decides the winner from its own state. It accepts player inputs, such as moves and shots, but never a claim from a player about the result. Only the server holds the signing key. A signature from the server means that this server saw this result, and that is the claim that matters.

Protect that key with care. Keep it in a hardware security module (HSM), a tamper-resistant device that stores keys and signs without revealing them. Rotate the key, that is, replace it on a schedule.

## How does a smart contract use the signature?

A smart contract is a program on a blockchain that runs exactly as written. A rewards contract holds the prize money and the payout rules. It pays out only when a signed result passes its checks.

1. **The match ends.** The game server builds the result record and hashes the match log.
2. **The server signs.** The HSM signs the record with the server key.
3. **The result goes on-chain.** The server sends the record and the signature to the contract on the blockchain.
4. **The contract checks the signature.** It compares the seal with the known public key of the game server.
5. **The contract checks the details.** It rejects a match ID that it already paid, a result outside the time window and an unknown server.
6. **The contract pays out.** Winners get their rewards, and predictions on the match resolve. Every step stays on the record.

A forged result fails at step 4, because the forger does not hold the key. An edited score also fails at step 4, because the edit breaks the seal. A replayed result fails at step 5, because the contract already paid that match ID.

## Why do signed results matter for predictions and prizes?

Money raises the stakes of every result. In a prediction market, people back an outcome and earn if they are right. If one insider can change a result, every prediction on that match is at risk.

A signed result gives everyone the same record to check. Fans, players, sponsors and organizers can see who reported the result and that nobody changed it. Disputes start from evidence, not from screenshots. Our post on [esports predictions on blockchain](../esports-prediction-on-blockchain/) covers the full prediction flow and the legal limits.

Signed results also change how rewards work. A game can pay for real wins instead of hours of repeated tasks, because each win carries proof. [Play-to-earn games explained](../play-to-earn-games-explained/) shows why that matters for the game economy.

## What can a signed result not prove?

A signature proves who reported a result and that nobody changed it afterwards. It cannot prove that the match itself was fair. Three gaps remain.

- **Cheats during play.** An aimbot wins a real match on a real server. The server then signs an honest record of an unfair game. Anti-cheat tools and server checks of player behavior still matter.
- **Key theft.** If an attacker steals the signing key, the contract accepts forged results. HSMs, key rotation and alerts on unusual signing activity reduce this risk.
- **One signer.** A single key is a single point of failure. For large prizes, require signatures from two or more independent parties, such as the game server and a referee. Add a short dispute window before money moves.

| Topic | Unsigned result | Signed result |
|---|---|---|
| Who decides the winner | Often the client or an editable database | The game server |
| Can someone change it later? | Yes, without a trace | No, the edit breaks the seal |
| Can the same win pay twice? | Possibly | No, the contract tracks match IDs |
| Who can check it | Only the operator | Anyone with the public key |
| Stops cheats during play? | No | No, anti-cheat tools still apply |

## How will HyperRun use signed results?

[HyperRun](../../products/hyperrun/) is coming soon from Buckleson. It is a realistic first-person shooter where players will earn when they play and win. Fans will predict matches and players, and they will earn when their prediction is correct. Fans will also back good players, and those players will get sponsorship.

HyperRun will sign every match result before any payout. Nobody will be able to change a result after the game signs it. A rewards contract on Hyper 0X, the Buckleson blockchain, will settle the predictions and pay the winners. Players and fans will get an in-game wallet that uses the Hyper Wallet SDK. Read about [web3 gaming wallets](../web3-gaming-wallets/) to see how embedded wallets work without seed phrases.

## Where should you start?

1. List every result in your game that moves money, rewards or rankings.
2. Move the decision on each result to an authoritative server.
3. Sign each result on the server, with the key in an HSM.
4. Put a unique match ID and a hash of the match log in every record.
5. Let a smart contract check the signature before any payout.
6. Keep anti-cheat tools and integrity monitoring for cheats during play.

HyperRun is coming soon with signed results and on-chain payouts built in. Book a call with a Buckleson engineer to plan signed results for your own game.
