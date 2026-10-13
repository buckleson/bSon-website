import type { BrandKey } from '@utils/glyphs';

/**
 * Animated system diagrams. Each one is a set of icon nodes on a 900x430
 * grid, the connections between them, and a numbered story: packets travel
 * along the connections step by step so a first-time visitor sees how a
 * transaction actually moves. Layouts follow the archify diagrams in
 * `../.archify`, simplified for the animation.
 */

export type Tone = 'external' | 'chain' | 'guard';

export interface SystemNode {
  id: string;
  /** Grid column (0-3) and row (0-2). */
  col: number;
  row: number;
  icon?: string;
  brand?: BrandKey;
  label: string;
  sub: string;
  tone?: Tone;
}

export interface SystemStep {
  /** Edge ids in travel order; prefix with `-` to travel an edge backwards. */
  path: string[];
  packet: string;
  caption: string;
  /** The packet is stopped at the end of its path. */
  blocked?: boolean;
}

export interface SystemSpec {
  title: string;
  nodes: SystemNode[];
  edges: [id: string, from: string, to: string][];
  steps: SystemStep[];
}

export const systems = {
  hyper0x: {
    title: 'How a payment moves through Hyper 0X',
    nodes: [
      { id: 'user', col: 0, row: 0, icon: 'fingerprint', label: 'Customer', sub: 'signs with passkey' },
      { id: 'app', col: 0, row: 1, icon: 'smartphone', label: 'Your app', sub: 'Hyper Wallet SDK' },
      { id: 'policy', col: 1, row: 0, icon: 'shield-check', label: 'Compliance', sub: 'KYC · limits', tone: 'guard' },
      { id: 'l2', col: 1, row: 1, icon: 'layers', label: 'Your private L2', sub: 'your rules', tone: 'chain' },
      { id: 'validators', col: 2, row: 0, icon: 'server', label: 'Validators', sub: 'aBFT consensus' },
      { id: 'l1', col: 2, row: 1, icon: 'blocks', label: 'Hyper 0X L1', sub: 'final in one pass', tone: 'chain' },
      { id: 'ledger', col: 3, row: 1, icon: 'database', label: 'Shared record', sub: 'encrypted per party' },
      { id: 'bridge', col: 2, row: 2, icon: 'arrow-left-right', label: 'Bridge', sub: 'k-of-n signers' },
      { id: 'chains', col: 3, row: 2, brand: 'ethereum', label: 'Public chains', sub: 'EVM · Solana · Sui' },
    ],
    edges: [
      ['e1', 'user', 'app'],
      ['e2', 'app', 'l2'],
      ['e3', 'l2', 'policy'],
      ['e4', 'l2', 'l1'],
      ['e5', 'l1', 'validators'],
      ['e6', 'l1', 'ledger'],
      ['e7', 'l1', 'bridge'],
      ['e8', 'bridge', 'chains'],
    ],
    steps: [
      { path: ['e1'], packet: 'Pay $250', caption: 'A customer signs a payment with a passkey. No seed phrase, no gas token.' },
      { path: ['e2'], packet: 'Pay $250', caption: 'Your app sends it to your private L2 on Hyper 0X.' },
      { path: ['e3'], packet: 'Check', caption: 'Compliance rules run before anything executes: KYC, limits, approvals.' },
      { path: ['e1', 'e2', 'e3'], packet: 'Pay $90,000', caption: 'A payment over the limit is stopped before it runs. Nothing to unwind.', blocked: true },
      { path: ['e4', 'e5'], packet: 'Order', caption: 'Validators order it fairly and finalise it in one pass. No reorgs.' },
      { path: ['e6'], packet: 'Final', caption: 'It lands on one shared record that only the parties can read.' },
      { path: ['e7', 'e8'], packet: 'Bridge', caption: 'Need another chain? A k-of-n bridge moves it to Ethereum, Solana or Sui.' },
    ],
  },
  wallet: {
    title: 'How a trade settles in Hyper Wallet',
    nodes: [
      { id: 'exch', col: 0, row: 0, brand: 'binance', label: 'Exchanges', sub: 'Binance · Coinbase' },
      { id: 'trader', col: 0, row: 1, icon: 'user', label: 'Trader', sub: 'places an order' },
      { id: 'wallet', col: 1, row: 1, icon: 'wallet', label: 'Hyper Wallet', sub: 'non-custodial', tone: 'chain' },
      { id: 'chains', col: 0, row: 2, brand: 'bitcoin', label: '20+ chains', sub: 'BTC · ETH · SOL' },
      { id: 'seller', col: 2, row: 0, icon: 'user-round', label: 'Counterparty', sub: 'sells 0.5 ETH' },
      { id: 'book', col: 2, row: 1, icon: 'chart-candlestick', label: 'Order book', sub: 'price, then time' },
      { id: 'swap', col: 2, row: 2, icon: 'repeat', label: 'Best-route swap', sub: 'MEV-protected', tone: 'guard' },
      { id: 'l1', col: 3, row: 1, icon: 'blocks', label: 'Hyper 0X', sub: 'atomic settlement', tone: 'chain' },
    ],
    edges: [
      ['d1', 'exch', 'wallet'],
      ['d2', 'trader', 'wallet'],
      ['d3', 'wallet', 'book'],
      ['d4', 'seller', 'book'],
      ['d5', 'book', 'l1'],
      ['d6', 'chains', 'wallet'],
      ['d7', 'wallet', 'swap'],
    ],
    steps: [
      { path: ['d1'], packet: '+1,250 USDC', caption: 'Top up straight from Binance or Coinbase. Your address is filled in.' },
      { path: ['d2', 'd3'], packet: 'Buy 0.5 ETH', caption: 'Place an order. The order book runs inside Hyper 0X consensus.' },
      { path: ['d4'], packet: 'Sell 0.5 ETH', caption: 'A seller matches by price, then time. Nobody can front-run.' },
      { path: ['d5'], packet: 'ETH ⇄ USDC', caption: 'Both legs settle in one step on Hyper 0X: both or neither.' },
      { path: ['d6'], packet: 'BTC · SOL', caption: 'Hold Bitcoin, Ethereum, Solana, TON, XRP and more in the same app.' },
      { path: ['d7'], packet: 'Swap', caption: 'Or swap any coin at the best route, with MEV protection.' },
    ],
  },
  tokenization: {
    title: 'How an asset becomes a token',
    nodes: [
      { id: 'issuer', col: 0, row: 0, icon: 'landmark', label: 'Asset issuer', sub: 'real-world assets' },
      { id: 'custody', col: 0, row: 1, icon: 'vault', label: 'Custodian', sub: 'proof of reserve' },
      { id: 'rules', col: 1, row: 0, icon: 'shield-check', label: 'Compliance', sub: 'KYC · limits', tone: 'guard' },
      { id: 'mint', col: 1, row: 1, icon: 'coins', label: 'Token issuance', sub: '1 token = 1 gram', tone: 'chain' },
      { id: 'investor', col: 2, row: 0, icon: 'user', label: 'Investor', sub: 'buys from $10' },
      { id: 'l2', col: 2, row: 1, icon: 'layers', label: 'Your L2', sub: 'on Hyper 0X', tone: 'chain' },
      { id: 'app', col: 3, row: 0, icon: 'smartphone', label: 'Investor app', sub: 'your brand' },
      { id: 'market', col: 3, row: 1, icon: 'repeat', label: 'Secondary market', sub: 'atomic swaps' },
      { id: 'chains', col: 3, row: 2, brand: 'ethereum', label: 'Public chains', sub: 'when rules allow' },
    ],
    edges: [
      ['t1', 'issuer', 'custody'],
      ['t2', 'custody', 'mint'],
      ['t3', 'mint', 'rules'],
      ['t4', 'mint', 'l2'],
      ['t5', 'investor', 'app'],
      ['t6', 'app', 'market'],
      ['t7', 'market', 'l2'],
      ['t8', 'market', 'chains'],
    ],
    steps: [
      { path: ['t1'], packet: 'Gold bar', caption: 'An issuer places the real asset with a custodian, who proves the reserve.' },
      { path: ['t2'], packet: '1,000 g', caption: 'Tokens are minted one-to-one with what sits in custody.' },
      { path: ['t3'], packet: 'Rules', caption: 'Compliance is written as code: KYC, countries, investor limits.' },
      { path: ['t4'], packet: 'Tokens', caption: 'The tokens live on your own L2, private by default.' },
      { path: ['t5', 't6'], packet: 'Buy $10', caption: 'An investor buys a slice in your branded app.' },
      { path: ['t5', 't6'], packet: 'No KYC', caption: 'A buyer without KYC is blocked before the trade runs.', blocked: true },
      { path: ['t7'], packet: 'Settle', caption: 'The trade settles atomically: tokens and cash move together.' },
      { path: ['t8'], packet: 'Bridge', caption: 'When your rules allow, tokens can reach public chains.' },
    ],
  },
  pavii: {
    title: 'How Pavii checks an AI agent call',
    nodes: [
      { id: 'agents', col: 0, row: 0, brand: 'claude', label: 'AI agents', sub: 'Claude · Codex · GPT' },
      { id: 'gateway', col: 0, row: 1, icon: 'radar', label: 'Pavii gateway', sub: 'sees every call', tone: 'chain' },
      { id: 'budget', col: 1, row: 2, icon: 'gauge', label: 'Budget', sub: '30-60% fewer tokens' },
      { id: 'inject', col: 1, row: 1, icon: 'scan-search', label: 'Injection check', sub: 'text is data', tone: 'guard' },
      { id: 'privacy', col: 2, row: 1, icon: 'eye-off', label: 'Privacy gate', sub: 'redacts secrets', tone: 'guard' },
      { id: 'ledger', col: 2, row: 2, icon: 'blocks', label: 'Receipts', sub: 'chained on Hyper 0X', tone: 'chain' },
      { id: 'egress', col: 3, row: 1, icon: 'file-check', label: 'Egress contract', sub: 'on Hyper 0X', tone: 'guard' },
      { id: 'systems', col: 3, row: 0, icon: 'database', label: 'Your systems', sub: 'tools · data · APIs' },
    ],
    edges: [
      ['p1', 'agents', 'gateway'],
      ['p2', 'gateway', 'inject'],
      ['p3', 'inject', 'privacy'],
      ['p4', 'privacy', 'egress'],
      ['p5', 'egress', 'systems'],
      ['p6', 'egress', 'ledger'],
      ['p7', 'gateway', 'budget'],
    ],
    steps: [
      { path: ['p1'], packet: 'Tool call', caption: 'An agent calls a tool. Every call goes through the Pavii gateway.' },
      { path: ['p7'], packet: 'Tokens', caption: 'Budgets and compaction cut token spend by 30 to 60 percent.' },
      { path: ['p2', 'p3'], packet: 'Read CRM', caption: 'Injected instructions are caught and secrets are redacted.' },
      { path: ['p1', 'p2'], packet: 'Ignore rules', caption: 'A hidden prompt in a PDF tries to take over the agent. Blocked.', blocked: true },
      { path: ['p4', 'p5'], packet: 'Allowed', caption: 'The egress contract allows the action and it reaches your systems.' },
      { path: ['p6'], packet: 'Receipt', caption: 'A signed receipt is chained on Hyper 0X. Nothing can be quietly deleted.' },
    ],
  },
  h0xpay: {
    title: 'How H0X Pay invests a slice of every payment',
    nodes: [
      { id: 'merchant', col: 1, row: 0, icon: 'store', label: 'Merchant', sub: 'paid instantly' },
      { id: 'you', col: 0, row: 1, icon: 'user', label: 'You', sub: 'pay as usual' },
      { id: 'app', col: 1, row: 1, icon: 'smartphone', label: 'H0X Pay', sub: 'coming soon', tone: 'chain' },
      { id: 'plan', col: 2, row: 1, icon: 'piggy-bank', label: 'Investment plan', sub: '2% of each payment' },
      { id: 'book', col: 2, row: 2, icon: 'chart-candlestick', label: 'Order book', sub: 'best price' },
      { id: 'l1', col: 3, row: 2, icon: 'blocks', label: 'Hyper 0X', sub: 'settles everything', tone: 'chain' },
      { id: 'gold', col: 3, row: 1, icon: 'gem', label: 'Tokenized gold', sub: 'then funds · stocks' },
    ],
    edges: [
      ['h1', 'you', 'app'],
      ['h2', 'app', 'merchant'],
      ['h3', 'app', 'plan'],
      ['h4', 'plan', 'book'],
      ['h5', 'book', 'l1'],
      ['h6', 'l1', 'gold'],
    ],
    steps: [
      { path: ['h1', 'h2'], packet: '$40', caption: 'You pay a merchant with H0X Pay. They are paid instantly.' },
      { path: ['h3'], packet: '$0.80', caption: 'Your plan sets aside a small slice of every payment.' },
      { path: ['h4'], packet: 'Buy gold', caption: 'The slice buys tokenized gold at the best price.' },
      { path: ['h5', 'h6'], packet: '+0.01 g', caption: 'It settles on Hyper 0X and your gold balance grows.' },
    ],
  },
  hyperrun: {
    title: 'How HyperRun pays players and fans',
    nodes: [
      { id: 'fans', col: 1, row: 0, icon: 'users', label: 'Fans', sub: 'back a player' },
      { id: 'predict', col: 2, row: 0, icon: 'trending-up', label: 'Predictions', sub: 'players & matches' },
      { id: 'player', col: 0, row: 1, icon: 'gamepad-2', label: 'Player', sub: 'joins a match' },
      { id: 'game', col: 1, row: 1, icon: 'crosshair', label: 'HyperRun', sub: 'realistic FPS', tone: 'chain' },
      { id: 'result', col: 2, row: 1, icon: 'badge-check', label: 'Signed result', sub: 'tamper-proof', tone: 'guard' },
      { id: 'rewards', col: 3, row: 1, icon: 'trophy', label: 'Rewards contract', sub: 'on Hyper 0X', tone: 'chain' },
      { id: 'wallet', col: 3, row: 2, icon: 'wallet', label: 'In-game wallet', sub: 'Hyper Wallet SDK' },
    ],
    edges: [
      ['r1', 'player', 'game'],
      ['r2', 'fans', 'predict'],
      ['r3', 'game', 'result'],
      ['r4', 'result', 'rewards'],
      ['r5', 'predict', 'rewards'],
      ['r6', 'rewards', 'wallet'],
    ],
    steps: [
      { path: ['r1'], packet: 'Match', caption: 'A player joins a realistic FPS match.' },
      { path: ['r2'], packet: 'Back Ava', caption: 'Fans predict outcomes and back the players they believe in.' },
      { path: ['r3'], packet: 'Win', caption: 'When the match ends, the result is signed so it cannot be changed.' },
      { path: ['r4', 'r6'], packet: 'Reward', caption: 'The rewards contract pays the player into their in-game wallet.' },
      { path: ['r5', 'r6'], packet: 'Payout', caption: 'Correct predictions pay out too, and great players get sponsored.' },
    ],
  },
} satisfies Record<string, SystemSpec>;

export type SystemName = keyof typeof systems;
