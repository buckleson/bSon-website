import type { FlowName } from './explainers';

/**
 * One page per service (/services/<id>/). The id matches the services list
 * in src/copy/en.ts. Each page targets its own search term, so the titles do
 * not compete with each other or with the product pages.
 * `intro` is brand voice; everything else describes the work, so it follows
 * the plain-English rules in WRITING.md.
 */
type Figure = 'data-vault' | 'chain-rack' | 'pavii-gates' | 'cipher-tower' | 'token-mint' | 'order-book';

export interface ServicePage {
  id: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  claim: string;
  payoff: string;
  intro: string;
  outcomes: string[];
  mock: 'chain' | 'token' | 'wallet' | 'agent';
  highlight?: { value: string; label: string };
  deliverables: { icon: string; title: string; text: string }[];
  figures: { name: Figure; title: string; text: string }[];
  flow: FlowName;
  steps: { icon: string; title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  related: { title: string; url: string }[];
}

const pilotSteps = (pilot: string, review: string) => [
  { icon: 'phone-call', title: 'Discovery call', text: 'Thirty minutes with an engineer. We map your use case and agree on what success means.' },
  { icon: 'flask', title: 'Pilot on your own L2', text: pilot },
  { icon: 'shield-check', title: 'Security review', text: review },
  { icon: 'rocket-launch', title: 'Production', text: 'We go live together and stay on for support, monitoring and the next use case.' },
];

export const servicePages: ServicePage[] = [
  {
    id: 'custom-blockchains',
    seoTitle: 'Custom Blockchain & Private L2 Development | Buckleson',
    description: 'We build custom blockchains as private L2s on Hyper 0X: your rules, your validators, per-party encryption and bridges to EVM chains, Solana and Sui.',
    eyebrow: 'Service · custom blockchains',
    claim: 'Your own blockchain,',
    payoff: 'without starting from zero.',
    intro: 'Get a private chain that runs your rules from day one. We launch it as an L2 on Hyper 0X, connect it to your systems and run it with you, so you get the control of your own network without building one from scratch.',
    outcomes: ['Your rules as code', 'Per-party encryption', 'Bridges to EVM, Solana and Sui'],
    mock: 'chain',
    highlight: { value: '1 pass', label: 'to a final record, with no reorgs' },
    deliverables: [
      { icon: 'tree-structure', title: 'A private L2 sized for you', text: 'Your own sequencer, rules, privacy model and bridge. Blocks grow when traffic is high and shrink when it is low.' },
      { icon: 'scales', title: 'Compliance as code', text: 'Limits, KYC and maker-checker approvals run before a transaction executes, not after.' },
      { icon: 'lock-key', title: 'Encryption at every stage', text: 'Data stays encrypted in transit, in use, on the ledger and at rest, with post-quantum-resistant key exchange.' },
      { icon: 'arrows-left-right', title: 'Bridges and connectors', text: 'Adapters for EVM chains, Solana and Sui, and SDKs for bank ledgers and core banking APIs.' },
      { icon: 'code', title: 'Smart contracts', text: 'Contracts in Rust today, deployed to your L2 or to the L1. Upgrades need approval.' },
      { icon: 'pulse', title: 'We run it with you', text: 'Monitoring, upgrades and support after launch, from the engineers who built it.' },
    ],
    figures: [
      { name: 'chain-rack', title: 'One L1, an L2 for each use case', text: 'Each application gets its own L2 module. You add or retire one without touching the others, and every L2 settles on the Hyper 0X L1.' },
      { name: 'cipher-tower', title: 'Four layers of encryption', text: 'Each ring is its own lock: in transit, in use, on the ledger and at rest. The owner key stays in a hardware security module.' },
      { name: 'data-vault', title: 'One record, sealed at every stage', text: 'Follow one record through the chain: sealed on the line, worked on without being opened, stamped on the ledger and locked at rest.' },
    ],
    flow: 'hyper0x',
    steps: pilotSteps('We launch a small L2 for one use case, connected to a test copy of your systems.', 'We review the rules, keys, bridges and access with your security team before go-live.'),
    faqs: [
      { question: 'Do we get our own blockchain?', answer: 'Yes. You get a private L2 with your own sequencer, rules, privacy model and bridge. It settles on the Hyper 0X L1, so you get your own network without running a full chain from zero.' },
      { question: 'Can our chain connect to public blockchains?', answer: 'Yes. Bridge adapters connect your L2 to EVM chains, Solana and Sui. SDKs connect it to bank ledgers and core banking APIs.' },
      { question: 'Who runs the chain after launch?', answer: 'We run it with you. Our engineers monitor and upgrade it, and your team keeps control of the rules and the keys.' },
    ],
    related: [
      { title: 'Hyper 0X, our blockchain', url: '/products/hyper-0x/' },
      { title: 'Private L2 vs public blockchain', url: '/blog/private-l2-vs-public-blockchain/' },
      { title: 'Layer 1 vs layer 2', url: '/blog/layer-1-vs-layer-2-blockchain/' },
    ],
  },
  {
    id: 'asset-tokenization',
    seoTitle: 'Asset Tokenization Services | Buckleson',
    description: 'Tokenize gold, funds, bonds, invoices or property. We build the token, the compliance rules, the investor wallet and the market, settled on Hyper 0X.',
    eyebrow: 'Service · asset tokenization',
    claim: 'Turn real assets',
    payoff: 'into tokens people can trust.',
    intro: 'Gold, fund units, bonds, invoices or property, on a chain your investors can check. We build the token, the rules and the app, so every unit is backed one to one and every trade settles in full.',
    outcomes: ['Backed 1:1 in custody', 'Rules before every trade', 'Branded investor app'],
    mock: 'token',
    deliverables: [
      { icon: 'coins', title: 'The token', text: 'A token minted one to one against the asset in custody, with its transfer rules written into it.' },
      { icon: 'seal-check', title: 'Proof of reserve', text: 'Tokens in circulation are checked against what the custodian holds.' },
      { icon: 'identification-card', title: 'Investor rules', text: 'KYC, country rules and investor limits run before each trade.' },
      { icon: 'swap', title: 'Atomic settlement', text: 'Token and payment change hands in one step, or neither does.' },
      { icon: 'device-mobile', title: 'Investor app', text: 'A branded app to buy, hold and sell, built on the Hyper Wallet SDK.' },
      { icon: 'storefront', title: 'Secondary market', text: 'An on-chain order book where investors can trade with each other.' },
    ],
    figures: [
      { name: 'token-mint', title: 'From vault to token, one to one', text: 'Gold goes into the vault, the press mints a token for each unit, and the investor check runs before the token reaches a wallet.' },
      { name: 'cipher-tower', title: 'Investor data stays encrypted', text: 'Records are encrypted in transit, in use, on the ledger and at rest, with a key for each party.' },
    ],
    flow: 'tokenize',
    steps: pilotSteps('We tokenize one asset for a small group of investors on your own L2.', 'We review the custody link, the reserve checks and the investor rules with your compliance team.'),
    faqs: [
      { question: 'Which assets can you tokenize?', answer: 'Gold, fund units, bonds, invoices and property. The asset stays with a custodian, and each token stands for a fixed share of it.' },
      { question: 'How do investors know a token is backed?', answer: 'Tokens are minted one to one against the asset in custody, and the tokens in circulation are checked against the reserve.' },
      { question: 'Can investors trade with each other?', answer: 'Yes. An on-chain order book lets verified investors trade, and each trade settles atomically: both sides settle, or neither does.' },
    ],
    related: [
      { title: 'The asset tokenization guide', url: '/blog/asset-tokenization-guide/' },
      { title: 'Tokenized gold, explained', url: '/blog/tokenized-gold-explained/' },
      { title: 'Atomic settlement', url: '/blog/atomic-settlement/' },
    ],
  },
  {
    id: 'wallets-exchanges',
    seoTitle: 'Crypto Wallet & Exchange Development | Buckleson',
    description: 'We build crypto wallets and exchanges the way we built Hyper Wallet: on-chain order books, atomic settlement, no seed phrases and compliance as code.',
    eyebrow: 'Service · wallets and exchanges',
    claim: 'A wallet and an exchange,',
    payoff: 'built like ours.',
    intro: 'We built Hyper Wallet, and it has carried more than two million transactions. Now we build the same thing for you: a wallet, an exchange or both, with your brand and your compliance rules.',
    outcomes: ['On-chain order book', 'No seed phrases', 'Compliance as code'],
    mock: 'wallet',
    highlight: { value: '2M+', label: 'transactions through the wallet we built for ourselves' },
    deliverables: [
      { icon: 'book-open-text', title: 'On-chain order book', text: 'A central limit order book inside consensus. Every validator calculates the same fills, so nobody can trade ahead of an order.' },
      { icon: 'swap', title: 'Atomic settlement', text: 'Both sides of a trade settle in one step, or neither does. No side is left exposed.' },
      { icon: 'fingerprint', title: 'No seed phrases', text: 'Users sign in with a passkey or a face scan. Apps can pay the network fees for them.' },
      { icon: 'users-three', title: 'Maker-checker approvals', text: 'Large or unusual transfers wait for a second person, as code.' },
      { icon: 'scales', title: 'Compliance as code', text: 'Limits, KYC and sanctions checks run before a transaction executes.' },
      { icon: 'globe', title: 'Many chains', text: 'Bitcoin, Ethereum and other EVM chains, Solana, Tron, TON, XRP, Stellar, Sui and more.' },
    ],
    figures: [
      { name: 'order-book', title: 'A fair order book', text: 'Buy and sell orders meet in the middle, and both sides of a match lock and settle together. Nobody can jump the queue.' },
      { name: 'data-vault', title: 'Customer data, sealed at every stage', text: 'Records stay encrypted on the line, in use, on the ledger and at rest.' },
    ],
    flow: 'wallet',
    steps: pilotSteps('We launch your wallet or exchange for a small group of users on your own L2.', 'We test the order book, the approvals and the limits with your risk team before go-live.'),
    faqs: [
      { question: 'Can you build a crypto exchange for us?', answer: 'Yes. We build exchanges with an on-chain order book and atomic settlement, under your brand and with your compliance rules.' },
      { question: 'Do users need a seed phrase?', answer: 'No. With account abstraction, users sign in with a passkey or a face scan, and the keys stay on their device.' },
      { question: 'Can we run our own compliance rules?', answer: 'Yes. Limits, KYC, sanctions checks and maker-checker approvals run as code before each transaction executes.' },
    ],
    related: [
      { title: 'Hyper Wallet & SDKs', url: '/products/hyper-wallet/' },
      { title: 'How to launch a crypto wallet', url: '/blog/how-to-launch-a-crypto-wallet/' },
      { title: 'Custodial vs non-custodial wallets', url: '/blog/custodial-vs-non-custodial-wallet/' },
    ],
  },
  {
    id: 'wallet-sdks',
    seoTitle: 'Embedded Wallets for Apps and Games | Buckleson',
    description: 'Embed secure wallets, payments and a payment gateway in your apps and games. We integrate the SDK, sign and check every transfer, and keep one audit trail.',
    eyebrow: 'Service · embedded wallets',
    claim: 'Put a wallet',
    payoff: 'inside your app.',
    intro: 'Your customers should never leave your app to pay, get paid or hold an asset. We embed wallets and payments into your apps, games and internal tools, and every transfer lands in one audit trail.',
    outcomes: ['Wallets in your app', 'Payment gateway', 'One audit trail'],
    mock: 'wallet',
    deliverables: [
      { icon: 'device-mobile', title: 'In-app wallets', text: 'Wallets inside your iOS, Android and web apps, with your brand.' },
      { icon: 'game-controller', title: 'Wallets for games', text: 'Players hold and use in-game assets without a separate app.' },
      { icon: 'credit-card', title: 'Payment gateway', text: 'Accept crypto payments with links, QR codes and invoices.' },
      { icon: 'bank', title: 'Neobank in a box', text: 'Accounts, cards and transfers for a fintech launch on Hyper 0X.' },
      { icon: 'list-checks', title: 'One audit trail', text: 'The SDK signs, checks and records every transfer, across all your apps.' },
    ],
    figures: [
      { name: 'data-vault', title: 'Every transfer, sealed', text: 'A transfer stays encrypted on the line, while it is processed, on the ledger and at rest.' },
      { name: 'chain-rack', title: 'One L2 for all your apps', text: 'Your apps share one L2 on Hyper 0X, so every transfer lands in the same record.' },
    ],
    flow: 'wallet',
    steps: pilotSteps('We embed the SDK in one app for a small group of users.', 'We review keys, limits and the audit trail with your security team before go-live.'),
    faqs: [
      { question: 'What is an embedded wallet?', answer: 'A wallet that lives inside your own app. Your users hold, pay and receive without a separate wallet app.' },
      { question: 'Can we use it in a game?', answer: 'Yes. Players can hold and use in-game assets, and payouts go straight to the wallet inside the game.' },
      { question: 'How do we audit transfers across apps?', answer: 'The SDK signs, checks and records every transfer on one L2, so all your apps share one audit trail.' },
    ],
    related: [
      { title: 'Hyper Wallet & SDKs', url: '/products/hyper-wallet/' },
      { title: 'Web3 gaming wallets', url: '/blog/web3-gaming-wallets/' },
      { title: 'Blockchain payments for merchants', url: '/blog/blockchain-payments-for-merchants/' },
    ],
  },
  {
    id: 'ai-agent-security',
    seoTitle: 'AI Agent Security Services for Enterprises | Buckleson',
    description: 'We secure your AI agents end to end: gates on every prompt and tool call, on-chain rules, a kill switch and tamper-proof receipts on Hyper 0X.',
    eyebrow: 'Service · AI-agent security',
    claim: 'Let your AI agents act,',
    payoff: 'and keep them in line.',
    intro: 'AI agents now send emails, move data and run code. We put guardrails around every one of them, with rules nobody can quietly change and a record nobody can quietly erase.',
    outcomes: ['Six gates per call', 'Tamper-proof receipts', '30 to 60 percent fewer tokens'],
    mock: 'agent',
    highlight: { value: '100M+', label: 'AI tokens saved across 82K+ queries' },
    deliverables: [
      { icon: 'magnifying-glass', title: 'Agent risk review', text: 'We list your agents, their tools and their access, and find where each one can do harm.' },
      { icon: 'shield-check', title: 'Pavii on every call', text: 'Every prompt and tool call passes six gates: injection, privacy, supply chain, budget, egress and output.' },
      { icon: 'file-lock', title: 'Rules on chain', text: 'An egress contract on Hyper 0X decides what each agent can send and do.' },
      { icon: 'hand-palm', title: 'Kill switch', text: 'A rule-breaking agent moves from observed, to restricted, to stopped. A person can stop any agent.' },
      { icon: 'receipt', title: 'Tamper-proof receipts', text: 'Every decision is chained to the one before it, so a deleted entry shows as a gap.' },
      { icon: 'gauge', title: 'Lower token spend', text: 'Compact context cut tokens by 30 to 60 percent on one measured Claude Code task.' },
    ],
    figures: [
      { name: 'pavii-gates', title: 'Six gates on every call', text: 'Safe calls pass every gate. A malicious call stops at the gate that catches it, and every decision prints a receipt on Hyper 0X.' },
      { name: 'data-vault', title: 'Agent data stays sealed', text: 'What your agents touch stays encrypted on the line, in use, on the ledger and at rest.' },
      { name: 'cipher-tower', title: 'Four layers of encryption', text: 'Each ring is its own lock, and the owner key stays in a hardware security module.' },
    ],
    flow: 'pavii',
    steps: pilotSteps('We put Pavii in front of one team and its agents, and we watch every call.', 'We tune the gates, the egress rules and the kill-switch steps with your security team.'),
    faqs: [
      { question: 'Which AI agents can you secure?', answer: 'Claude, Claude Code, Codex, ChatGPT, Grok, OpenCode and your own agents, through one gateway.' },
      { question: 'Why use a blockchain for agent security?', answer: 'Rules in a smart contract cannot be quietly changed, and chained receipts on Hyper 0X show any deleted entry as a gap. Auditors can check both.' },
      { question: 'Does it slow our agents down or cost more?', answer: 'Compact context makes calls smaller. On one measured Claude Code task, agents used 30 to 60 percent fewer tokens.' },
    ],
    related: [
      { title: 'Pavii, AI-agent security', url: '/products/pavii/' },
      { title: 'How to secure AI agents', url: '/blog/how-to-secure-ai-agents/' },
      { title: 'How an AI agent kill switch works', url: '/blog/ai-agent-kill-switch/' },
    ],
  },
  {
    id: 'forward-deployed-engineering',
    seoTitle: 'Forward-Deployed Blockchain Engineers | Buckleson',
    description: 'Buckleson engineers work inside your team to connect Hyper 0X to your systems, public chains, bank ledgers and APIs, from a scoped pilot to production.',
    eyebrow: 'Service · forward-deployed engineering',
    claim: 'Our engineers,',
    payoff: 'inside your team.',
    intro: 'Software is half the job. The other half is wiring it into the systems you already run. Our engineers sit with your team until it works in production, not just in a demo.',
    outcomes: ['Scoped pilot first', 'Success measures up front', 'Support through production'],
    mock: 'chain',
    deliverables: [
      { icon: 'users-three', title: 'Engineers in your team', text: 'They join your stand-ups, your channels and your code reviews.' },
      { icon: 'plugs-connected', title: 'Integration work', text: 'Hyper 0X connected to core banking, payment rails, public chains and your APIs.' },
      { icon: 'target', title: 'Success measures first', text: 'We agree on what success means before the pilot starts.' },
      { icon: 'chalkboard-teacher', title: 'Knowledge transfer', text: 'Your team learns to run and extend what we build together.' },
    ],
    figures: [
      { name: 'chain-rack', title: 'Your systems, plugged into Hyper 0X', text: 'Each use case runs on its own L2, and every L2 settles on one L1.' },
      { name: 'pavii-gates', title: 'Agents and automations, kept safe', text: 'When your workflow uses AI agents, every call passes six gates and leaves a receipt.' },
    ],
    flow: 'engagement',
    steps: pilotSteps('A scoped pilot on your own L2, with the success measures agreed at the start.', 'Your security team reviews the design, the keys and the access before production.'),
    faqs: [
      { question: 'What is a forward-deployed engineer?', answer: 'An engineer from our team who works inside yours. They connect our platform to your systems and stay until it runs in production.' },
      { question: 'How does an engagement start?', answer: 'With a 30-minute call, then a scoped pilot on your own L2. We agree on the success measures before we start.' },
      { question: 'Do you hand over the work?', answer: 'Yes. Your team learns to run and extend what we build, and we stay on for support.' },
    ],
    related: [
      { title: 'How to choose a blockchain development company', url: '/blog/how-to-choose-a-blockchain-development-company/' },
      { title: 'Hyper 0X, our blockchain', url: '/products/hyper-0x/' },
      { title: 'About Buckleson', url: '/about/' },
    ],
  },
];

export const servicePage = (id: string) => servicePages.find(page => page.id === id);
