import type { CollectionEntry } from 'astro:content';
import { slugOf } from '@utils/content';

/**
 * Blog organisation: five categories (derived from each post's tags, so the
 * posts need no extra field), the colour icons on each post's cover, and the
 * reading paths ("start here" catalogues) on the blog index.
 */
export type CategoryId = 'ai-security' | 'infrastructure' | 'tokenization' | 'wallets' | 'gaming';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  blurb: string;
  /** The topic's strong colour (icons) and soft tint (fills). */
  accent: string;
  tint: string;
}

export const categories: Category[] = [
  { id: 'ai-security', label: 'AI-agent security', icon: 'ai', blurb: 'Gates, receipts and kill switches for agents that act on their own.', accent: '#7c3aed', tint: '#efe8ff' },
  { id: 'infrastructure', label: 'Blockchain infrastructure', icon: 'sitemap', blurb: 'L1s and L2s, finality, encryption and how to choose a partner.', accent: '#2563eb', tint: '#e4edff' },
  { id: 'tokenization', label: 'Tokenization', icon: 'coin', blurb: 'Gold, funds and other real assets on a chain investors can check.', accent: '#c2410c', tint: '#ffeedb' },
  { id: 'wallets', label: 'Wallets & payments', icon: 'laptop', blurb: 'Wallets, SDKs, account abstraction and payments that settle.', accent: '#047857', tint: '#dcf5ea' },
  { id: 'gaming', label: 'Web3 gaming', icon: 'trophy', blurb: 'Play, predict and earn, with results nobody can edit.', accent: '#e11d48', tint: '#ffe4ea' },
];

export const categoryById = (id: CategoryId) => categories.find(c => c.id === id)!;

export function categoryOf(post: CollectionEntry<'blog'>): Category {
  const tags = post.data.tags;
  const has = (...names: string[]) => names.some(name => tags.includes(name));
  if (has('AI-agent security', 'AI audit trails')) return categoryById('ai-security');
  if (has('Web3 gaming')) return categoryById('gaming');
  if (has('Asset tokenization', 'Tokenized gold', 'Real-world assets', 'Micro-investing')) return categoryById('tokenization');
  if (has('Crypto wallets', 'Wallet SDKs', 'Account abstraction', 'Payments')) return categoryById('wallets');
  return categoryById('infrastructure');
}

/** Cover icons per post: the main topic and three related ideas (MingCute icons, drawn in black). */
const COVERS: Record<string, [string, string, string, string]> = {
  'account-abstraction-no-seed-phrases': ['cellphone', 'key-2', 'safe-lock', 'check-circle'],
  'ai-agent-hallucination-risk': ['sparkles', 'warning', 'search-ai', 'check-circle'],
  'ai-agent-identity': ['idcard', 'ai', 'key-2', 'safe-shield'],
  'ai-agent-kill-switch': ['alert-octagon', 'ai', 'close-circle', 'bill'],
  'ai-agent-memory-poisoning': ['book-4', 'ai', 'warning', 'history'],
  'ai-agent-tool-calling-security': ['tool', 'ai', 'safe-shield', 'file-locked'],
  'ai-bill-of-materials': ['list-check', 'plugin', 'cube-3d', 'safe-shield'],
  'asset-tokenization-guide': ['coin', 'building-2', 'safe-box', 'trending-up'],
  'atomic-settlement': ['transfer-3', 'check-circle', 'coin', 'lock'],
  'blockchain-data-encryption-four-layers': ['safe-lock', 'lock', 'safe-box', 'cloud'],
  'blockchain-finality-explained': ['check-circle', 'time', 'link-2', 'safe-shield'],
  'blockchain-payments-for-merchants': ['store', 'bill', 'coin', 'check-circle'],
  'custodial-vs-non-custodial-wallet': ['key-2', 'bank', 'safe-box', 'cellphone'],
  'denial-of-wallet-ai': ['dashboard-2', 'coin', 'alert', 'ai'],
  'dynamic-blocks': ['trending-up', 'server', 'dashboard-2', 'trending-up'],
  'esports-prediction-on-blockchain': ['trophy', 'game-1', 'target', 'check-circle'],
  'how-to-choose-a-blockchain-development-company': ['briefcase', 'group-3', 'checkbox', 'building-4'],
  'how-to-launch-a-crypto-wallet': ['laptop', 'coin', 'safe-lock', 'earth'],
  'how-to-secure-ai-agents': ['safe-shield', 'ai', 'warning', 'bill'],
  'layer-1-vs-layer-2-blockchain': ['sitemap', 'link-2', 'server', 'cube-3d'],
  'mcp-server-security-risks': ['plugin', 'ai', 'warning', 'safe-shield'],
  'multi-agent-cascading-failures': ['group-3', 'ai', 'close-circle', 'link-2'],
  'multi-chain-crypto-wallet-guide': ['earth', 'link-2', 'coin', 'cellphone'],
  'permissioned-vs-permissionless-blockchain': ['group-3', 'bank', 'earth', 'lock'],
  'play-to-earn-games-explained': ['game-2', 'trophy', 'coin', 'group-2'],
  'post-quantum-resistant-blockchain': ['cube-3d', 'safe-lock', 'shield', 'key-2'],
  'private-l2-vs-public-blockchain': ['lock', 'sitemap', 'earth', 'building-2'],
  'proof-of-execution-ai': ['bill', 'ai', 'check-circle', 'link-2'],
  'stop-llm-data-leaks-pii-redaction': ['file-locked', 'user-warning', 'ai', 'safe-shield'],
  'tokenized-gold-explained': ['pig-money', 'safe-box', 'coin', 'certificate'],
  'web3-gaming-wallets': ['game-1', 'cellphone', 'coin', 'key-2'],
  'what-is-a-wallet-sdk': ['terminal-box', 'laptop', 'plugin', 'coin'],
  'what-is-micro-investing': ['chart-bar', 'coin', 'pig-money', 'calendar'],
  'what-is-prompt-injection': ['warning', 'ai', 'document-2', 'safe-shield'],
  'compliance-as-code-blockchain': ['file-code', 'scale', 'list-check', 'safe-shield'],
  'proof-of-reserve-explained': ['safe-box', 'certificate', 'balance', 'coin'],
  'tokenized-deposits-vs-stablecoins': ['bank', 'currency-dollar', 'transfer-3', 'coin'],
  'mev-protection-explained': ['transfer-3', 'wallet-4', 'list-ordered', 'safe-shield'],
  'signed-match-results-gaming': ['game-2', 'quill-pen', 'trophy', 'file-locked'],
  'system-prompt-leakage': ['ai', 'eye', 'key-2', 'safe-shield'],
  'mpc-vs-multisig-wallets': ['key-2', 'group', 'faceid', 'safe-shield'],
  'shadow-ai-agents': ['incognito-mode', 'ai', 'radar', 'list-check'],
  'tokenized-bonds-explained': ['certificate', 'coin', 'calendar', 'transfer-3'],
  'web3-game-economy-design': ['game-2', 'coin', 'balance', 'flask'],
  'what-is-a-blockchain-bridge': ['bridge', 'transfer-3', 'safe-lock', 'check-circle'],
  'verify-customers-without-sharing-data': ['user-hide', 'passport', 'seal', 'link-2'],
  'blockchain-use-cases-beyond-payments': ['cube-3d', 'idcard', 'group-3', 'fingerprint'],
  'blockchain-vs-database': ['server', 'cube-3d', 'list-check', 'balance'],
};

export function coverIcons(post: CollectionEntry<'blog'>): [string, string, string, string] {
  const category = categoryOf(post);
  return COVERS[slugOf(post)] ?? [category.icon, 'link-2', 'lock', 'check-circle'];
}

/** Reading paths: short, ordered catalogues for a goal. */
export const readingPaths: { id: string; title: string; text: string; icon: string; category: CategoryId; slugs: string[] }[] = [
  {
    id: 'start',
    title: 'New to blockchain? Start here',
    text: 'The ideas behind every chain we build, in the order they make sense.',
    icon: 'bulb',
    category: 'infrastructure',
    slugs: ['blockchain-vs-database', 'blockchain-use-cases-beyond-payments', 'layer-1-vs-layer-2-blockchain', 'private-l2-vs-public-blockchain', 'permissioned-vs-permissionless-blockchain', 'blockchain-finality-explained'],
  },
  {
    id: 'agents',
    title: 'Secure your AI agents',
    text: 'From the first attack to a record nobody can erase.',
    icon: 'safe-shield',
    category: 'ai-security',
    slugs: ['how-to-secure-ai-agents', 'what-is-prompt-injection', 'ai-agent-tool-calling-security', 'ai-agent-kill-switch', 'proof-of-execution-ai'],
  },
  {
    id: 'tokenize',
    title: 'Launch a tokenized asset',
    text: 'What it takes to put gold, funds or bonds on a chain.',
    icon: 'coin',
    category: 'tokenization',
    slugs: ['asset-tokenization-guide', 'proof-of-reserve-explained', 'tokenized-gold-explained', 'atomic-settlement', 'what-is-micro-investing'],
  },
  {
    id: 'wallet',
    title: 'Build a wallet',
    text: 'Custody, keys, SDKs and the launch plan.',
    icon: 'laptop',
    category: 'wallets',
    slugs: ['how-to-launch-a-crypto-wallet', 'custodial-vs-non-custodial-wallet', 'account-abstraction-no-seed-phrases', 'what-is-a-wallet-sdk'],
  },
];

/** The reading path a post belongs to (the first that lists it), with its place in it. */
export function pathOf(slug: string) {
  const path = readingPaths.find(p => p.slugs.includes(slug));
  return path ? { path, index: path.slugs.indexOf(slug) } : undefined;
}
