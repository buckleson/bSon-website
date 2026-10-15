---
title: 'Play-to-Earn Games Explained: What Broke and What Works'
description: 'Play-to-earn games reward players with crypto for playing. See why early P2E economies collapsed and what a sustainable, skill-based model looks like.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['Web3 gaming', 'Play-to-earn']
diagram: 'hyperrun'
faqs:
  - question: 'Can you really make money from play-to-earn games?'
    answer: 'Some players do, but no game can guarantee earnings. In token-based games, income depends on the token price, which can fall sharply. In skill-based games, rewards go mainly to players who win, so most players earn little or nothing.'
  - question: 'What is the difference between play-to-earn and play-and-earn?'
    answer: 'Play-to-earn puts earning first, so people play mainly for income. Play-and-earn, a term that many studios now prefer, puts the game first. It treats rewards as a bonus for people who will play with or without them.'
  - question: 'Do you need to buy NFTs to start a play-to-earn game?'
    answer: 'Many early games required it. This created a costly barrier and a dependence on new buyers. Newer designs increasingly let people start for free and earn or buy items later.'
---

Play-to-earn (P2E) games reward players with crypto tokens or NFTs that have real-world value. So time in the game can turn into money. The first big wave, led by Axie Infinity in 2021, collapsed. The games paid rewards in tokens whose value depended on new players who bought in, not on people who enjoyed the game. A sustainable model pays for skill, not grinding (repetitive play for rewards). It funds rewards from real revenue and makes results and payouts verifiable.

## What is a play-to-earn game?

In a traditional game, the items that you earn stay inside the game, and the publisher owns them. In a play-to-earn game, a blockchain records the rewards. A blockchain is a shared ledger that no single company controls. The rewards usually take two forms. **Tokens** are in-game currencies that players can trade for other crypto or cash. **NFTs** (non-fungible tokens) are unique items, such as characters, skins or land, that players can sell to each other.

Players can sell these rewards, so playing becomes a way to earn. That idea attracted millions of players, especially in countries where game earnings were able to compete with local wages.

## How did early play-to-earn economies work?

Axie Infinity is the best-known example. New players had to buy three NFT creatures, called Axies, to play at all. Players earned a token called Smooth Love Potion (SLP). They sold SLP on exchanges or used it to breed new Axies. They then sold those Axies to the next wave of players.

When prices rose, the cost of entry climbed out of reach for many people. That gave rise to "scholarships". Owners lent their Axies to players, often in the Philippines, and took a share of the SLP that the players earned. For a while, the economy looked like a new kind of job.

## What went wrong with early P2E?

The model had structural problems that showed up as soon as growth slowed.

1. **Rewards were inflationary.** The game kept minting (creating) new tokens to pay players, but there were few reasons to hold or spend them. Supply grew faster than demand, and SLP lost almost all of its value.
2. **Money came mostly from new players.** The cash that went out to earners came largely from newcomers who bought in. When new-player growth slowed, rewards shrank, players left, and prices fell further.
3. **Paying to start.** An upfront NFT purchase made the game an investment before it was a game. It also shut out the people that the game set out to help.
4. **The game rewarded time, not skill.** The best pay went to players who repeated the same tasks. This invited bots and multiple accounts, which drained the reward pool.
5. **Players came to extract, not to play.** When people play only for income, they leave the moment income drops.
6. **Security failures.** Axie Infinity used the Ronin bridge, a link that moves tokens between blockchains. In March 2022, attackers hacked it for more than $600 million. This is a reminder that the infrastructure under a game economy matters as much as its design.

## What does a sustainable play-to-earn model look like?

The lessons point to a different design, often called play-and-earn or skill-based earning.

- **The game comes first.** The game must be fun to play even with no rewards at all.
- **Rewards come from real revenue.** Entry fees, sponsorships, cosmetics or advertising fund the prize pools, not newly printed tokens.
- **Skill earns rewards, not hours.** Wins, rankings and tournament results drive payouts. This makes bots and grinding far less profitable.
- **Payouts hold their value.** A stable payout asset avoids the death spiral of a falling game token.
- **Results are verifiable.** The game server signs match results, and code that anyone can check makes the payouts.
- **Easy onboarding.** Players get a wallet without seed phrases (lists of backup words) or gas tokens (tokens that pay network fees). They can start in minutes.

| Topic | Early play-to-earn | Sustainable skill-based model |
|---|---|---|
| Where reward money comes from | New tokens and new players | Revenue: fees, sponsors, cosmetics |
| What earns rewards | Time spent grinding | Skill, wins and rankings |
| Cost to start | Upfront NFT purchase | Free or low-cost entry |
| Payout asset | A volatile game token | A stable or widely traded asset |
| How results are trusted | The operator's database | Signed results and on-chain payouts |

## Is play-to-earn legal?

It depends on where you live. In many countries, real-money payouts for wins can bring a game under gambling, gaming or prize-competition rules, especially when players pay to enter. Some places treat contests of skill differently from games of chance. But each country, and sometimes each state, draws that line in a different place. Age limits, identity checks and tax reporting on earnings can also apply. Studios need legal advice for every market before launch, and players need to check local rules before they play for money.

## What does this look like for a studio?

Imagine a mid-sized studio that builds a competitive shooter. Instead of a reward token, it funds a weekly prize pool from tournament entry fees and cosmetic sales. The game server signs every match result. A smart contract, a program on the blockchain that runs exactly as written, checks the signature and pays winners automatically. Players sign in with a passkey (a device sign-in such as a fingerprint) and never see a seed phrase. See [how web3 gaming wallets work](../web3-gaming-wallets/).

Fans can be part of the economy too, when they predict results. That adds its own design and legal questions. Our post on [how blockchain makes esports predictions transparent](../esports-prediction-on-blockchain/) covers them. The idea of a signed, tamper-evident record comes from the same thinking as [proof of execution](../proof-of-execution-ai/).

## How will HyperRun approach play-to-earn?

[HyperRun](../../products/hyperrun/) is coming soon from Buckleson. It is a realistic first-person shooter. In its planned design, people earn in three ways:

- Players earn through gameplay and wins.
- Fans earn when they predict matches and players.
- Skilled gamers get sponsorship through the predictions that other players make on them.

The diagram at the top of this page shows the planned flow.

To keep it fair, HyperRun will sign every match result before any payout. Then no one can change the result afterwards. The plan is for a rewards contract on [Hyper 0X](../../products/hyper-0x/), the Buckleson blockchain, to resolve predictions and pay out. Players and fans will get an in-game wallet built with the Hyper Wallet SDK. As with any game that offers real-money rewards or predictions, the rules that apply will vary by country.

## Where should you start?

1. Make the game fun before you add any reward.
2. Decide where reward money comes from. Make sure that it does not depend on new players who buy in.
3. Reward skill and results. Invest in anti-cheat from day one.
4. Sign results. Pay out through code that anyone can verify.
5. Get legal advice for each market on real-money rewards and predictions.

HyperRun is coming soon, with signed results and on-chain payouts at its core. Book a call to get notified at launch, or to talk about in-game wallets for your own studio.
