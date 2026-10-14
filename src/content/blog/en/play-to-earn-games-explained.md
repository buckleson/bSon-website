---
title: 'Play-to-Earn Games Explained: What Broke and What Works'
description: 'Play-to-earn games reward players with crypto for playing. Why early P2E economies collapsed, and what a sustainable, skill-based play-to-earn model looks like.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['Web3 gaming', 'Play-to-earn']
diagram: 'hyperrun'
faqs:
  - question: 'Can you really make money from play-to-earn games?'
    answer: 'Some players do, but earnings are never guaranteed. In token-based games, income depends on the token price, which can fall sharply. In skill-based games, rewards go mainly to players who win, so most players earn little or nothing.'
  - question: 'What is the difference between play-to-earn and play-and-earn?'
    answer: 'Play-to-earn puts earning first, so people play mainly for income. Play-and-earn, a term many studios now prefer, puts the game first and treats rewards as a bonus for people who would play anyway.'
  - question: 'Do you need to buy NFTs to start a play-to-earn game?'
    answer: 'Many early games required it, which created a costly barrier and a dependence on new buyers. Newer designs increasingly let people start for free and earn or buy items later.'
---

Play-to-earn (P2E) games reward players with crypto tokens or NFTs that have real-world value, so time spent in the game can turn into money. The first big wave, led by Axie Infinity in 2021, collapsed because rewards were paid in tokens whose value depended on new players buying in, not on people enjoying the game. A sustainable model pays for skill rather than grinding, funds rewards from real revenue, and makes results and payouts verifiable.

## What is a play-to-earn game?

In a traditional game, the items you earn stay inside the game, and the publisher owns them. In a play-to-earn game, rewards are recorded on a blockchain, a shared ledger that no single company controls. They usually take two forms. **Tokens** are in-game currencies that can be traded for other crypto or cash. **NFTs** (non-fungible tokens) are unique items, such as characters, skins or land, that players can sell to each other.

Because these rewards can be sold, playing becomes a way to earn. That idea attracted millions of players, especially in countries where game earnings could compete with local wages.

## How did early play-to-earn economies work?

Axie Infinity is the best-known example. New players had to buy three NFT creatures, called Axies, before they could play. Playing earned a token called Smooth Love Potion (SLP), which players sold on exchanges or used to breed new Axies, which were then sold to the next wave of players.

When prices rose, the cost of entry climbed out of reach for many people. That gave rise to "scholarships": owners lent their Axies to players, often in the Philippines, and took a share of the SLP they earned. For a while, the economy looked like a new kind of job.

## What went wrong with early P2E?

The model had structural problems that showed up as soon as growth slowed.

1. **Rewards were inflationary.** The game kept minting new tokens to pay players, but there were few reasons to hold or spend them. Supply grew faster than demand, and SLP lost almost all of its value.
2. **Money came mostly from new players.** The cash flowing out to earners came largely from newcomers buying in. When new-player growth slowed, rewards shrank, players left, and prices fell further.
3. **Paying to start.** An upfront NFT purchase made the game an investment before it was a game, and shut out the people it was meant to help.
4. **Time, not skill, was rewarded.** Grinding the same tasks paid best, which invited bots and multiple accounts that drained the reward pool.
5. **Players came to extract, not to play.** When people play only for income, they leave the moment income drops.
6. **Security failures.** In March 2022, the Ronin bridge used by Axie Infinity was hacked for more than $600 million, a reminder that the infrastructure under a game economy matters as much as its design.

## What does a sustainable play-to-earn model look like?

The lessons point to a different design, often called play-and-earn or skill-based earning.

- **The game comes first.** People should want to play even with no rewards at all.
- **Rewards come from real revenue.** Prize pools are funded by entry fees, sponsorships, cosmetics or advertising, not by printing new tokens.
- **Skill is rewarded, not hours.** Wins, rankings and tournament results drive payouts, which makes bots and grinding far less profitable.
- **Payouts hold their value.** Paying rewards in a stable asset avoids the death spiral of a falling game token.
- **Results are verifiable.** Match results are signed and payouts are made by code that anyone can check.
- **Easy onboarding.** Players get a wallet without seed phrases or gas tokens, so they can start in minutes.

| | Early play-to-earn | Sustainable skill-based model |
|---|---|---|
| Where reward money comes from | New tokens and new players | Revenue: fees, sponsors, cosmetics |
| What earns rewards | Time spent grinding | Skill, wins and rankings |
| Cost to start | Upfront NFT purchase | Free or low-cost entry |
| Payout asset | A volatile game token | A stable or widely traded asset |
| How results are trusted | The operator's database | Signed results and on-chain payouts |

## Is play-to-earn legal?

It depends on where you live. In many countries, paying real money for wins can bring a game under gambling, gaming or prize-competition rules, especially when players pay to enter. Some places treat contests of skill differently from games of chance, but the line is drawn differently in each country, and sometimes in each state. Age limits, identity checks and tax reporting on earnings may also apply. Studios should take legal advice for every market before launch, and players should check local rules before playing for money.

## What does this look like for a studio?

Imagine a mid-sized studio building a competitive shooter. Instead of minting a reward token, it funds a weekly prize pool from tournament entry fees and cosmetic sales. The game server signs every match result. A smart contract, a program on the blockchain that runs exactly as written, checks the signature and pays winners automatically. Players sign in with a passkey and never see a seed phrase; see [how web3 gaming wallets work](../web3-gaming-wallets/).

Fans can be part of the economy too, by predicting results. That adds its own design and legal questions, covered in [how blockchain makes esports predictions transparent](../esports-prediction-on-blockchain/). The idea of a signed, tamper-evident record comes from the same thinking as [proof of execution](../proof-of-execution-ai/).

## How is HyperRun approaching play-to-earn?

[HyperRun](../../products/hyperrun/) is coming soon from Buckleson. It is a realistic first-person shooter being designed so players earn through gameplay and wins, fans earn by predicting matches and players, and skilled gamers get sponsored through other players' predictions on them. The diagram at the top of this page shows the planned flow.

To keep it fair, every match result is to be signed before any payout, so it cannot be changed afterwards. A rewards contract on [Hyper 0X](../../products/hyper-0x/) is planned to resolve predictions and pay out, and players and fans will get an in-game wallet built with the Hyper Wallet SDK. As with any game that offers real-money rewards or predictions, the rules that apply will vary by country.

## Where should you start?

1. Make the game fun before you add any reward.
2. Decide where reward money comes from, and make sure it does not depend on new players buying in.
3. Reward skill and results, and invest in anti-cheat from day one.
4. Sign results and pay out through code that anyone can verify.
5. Get legal advice for each market on real-money rewards and predictions.

HyperRun is coming soon, with signed results and on-chain payouts at its core. Book a call to get notified at launch, or to talk about in-game wallets for your own studio.
