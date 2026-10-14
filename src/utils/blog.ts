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
  /** Two colours for the cover gradient. */
  hues: [string, string];
}

export const categories: Category[] = [
  { id: 'ai-security', label: 'AI-agent security', icon: 'bot', blurb: 'Gates, receipts and kill switches for agents that act on their own.', hues: ['#6d28d9', '#4338ca'] },
  { id: 'infrastructure', label: 'Blockchain infrastructure', icon: 'org', blurb: 'L1s and L2s, finality, encryption and how to choose a partner.', hues: ['#1d4ed8', '#0e7490'] },
  { id: 'tokenization', label: 'Tokenization', icon: 'coin-multiple', blurb: 'Gold, funds and other real assets on a chain investors can check.', hues: ['#c2410c', '#b45309'] },
  { id: 'wallets', label: 'Wallets & payments', icon: 'phone-laptop', blurb: 'Wallets, SDKs, account abstraction and payments that settle.', hues: ['#047857', '#0f766e'] },
  { id: 'gaming', label: 'Web3 gaming', icon: 'trophy', blurb: 'Play, predict and earn, with results nobody can edit.', hues: ['#be185d', '#6d28d9'] },
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

/** Cover icons per post: the main topic and three related ideas (Fluent colour icons). */
const COVERS: Record<string, [string, string, string, string]> = {
  'account-abstraction-no-seed-phrases': ['phone', 'person-key', 'lock-shield', 'checkmark-circle'],
  'ai-agent-hallucination-risk': ['bot-sparkle', 'warning', 'search-sparkle', 'checkmark-circle'],
  'ai-agent-identity': ['contact-card', 'bot', 'person-key', 'shield-checkmark'],
  'ai-agent-kill-switch': ['alert-urgent', 'bot', 'error-circle', 'receipt'],
  'ai-agent-memory-poisoning': ['book-database', 'bot', 'warning', 'history'],
  'ai-agent-tool-calling-security': ['wrench-screwdriver', 'bot', 'shield-checkmark', 'document-lock'],
  'ai-bill-of-materials': ['clipboard-task', 'puzzle-piece', 'molecule', 'shield-checkmark'],
  'asset-tokenization-guide': ['coin-multiple', 'building', 'vault', 'data-trending'],
  'atomic-settlement': ['arrow-sync', 'checkmark-circle', 'coin-multiple', 'lock-closed'],
  'blockchain-data-encryption-four-layers': ['lock-shield', 'lock-closed', 'vault', 'cloud'],
  'blockchain-finality-explained': ['checkmark-circle', 'clock', 'link-multiple', 'shield-checkmark'],
  'blockchain-payments-for-merchants': ['building-store', 'receipt', 'coin-multiple', 'checkmark-circle'],
  'custodial-vs-non-custodial-wallet': ['person-key', 'building-government', 'vault', 'phone'],
  'denial-of-wallet-ai': ['gauge', 'coin-multiple', 'alert', 'bot'],
  'dynamic-blocks': ['data-trending', 'database', 'gauge', 'arrow-trending-lines'],
  'esports-prediction-on-blockchain': ['trophy', 'sport', 'poll', 'checkmark-circle'],
  'how-to-choose-a-blockchain-development-company': ['briefcase', 'people-team', 'checkbox', 'building-multiple'],
  'how-to-launch-a-crypto-wallet': ['phone-laptop', 'coin-multiple', 'lock-shield', 'globe'],
  'how-to-secure-ai-agents': ['shield-checkmark', 'bot', 'warning', 'receipt'],
  'layer-1-vs-layer-2-blockchain': ['org', 'link-multiple', 'database', 'molecule'],
  'mcp-server-security-risks': ['puzzle-piece', 'bot', 'warning', 'shield-checkmark'],
  'multi-agent-cascading-failures': ['agents', 'bot', 'error-circle', 'link-multiple'],
  'multi-chain-crypto-wallet-guide': ['globe', 'link-multiple', 'coin-multiple', 'phone'],
  'permissioned-vs-permissionless-blockchain': ['people-team', 'building-government', 'globe', 'lock-closed'],
  'play-to-earn-games-explained': ['game-chat', 'trophy', 'coin-multiple', 'people-community'],
  'post-quantum-resistant-blockchain': ['molecule', 'lock-shield', 'shield', 'person-key'],
  'private-l2-vs-public-blockchain': ['lock-closed', 'org', 'globe', 'building'],
  'proof-of-execution-ai': ['receipt', 'bot', 'checkmark-circle', 'link-multiple'],
  'stop-llm-data-leaks-pii-redaction': ['document-lock', 'person-warning', 'bot', 'shield-checkmark'],
  'tokenized-gold-explained': ['savings', 'vault', 'coin-multiple', 'certificate'],
  'web3-gaming-wallets': ['sport', 'phone', 'coin-multiple', 'person-key'],
  'what-is-a-wallet-sdk': ['code-block', 'phone-laptop', 'puzzle-piece', 'coin-multiple'],
  'what-is-micro-investing': ['chart-multiple', 'coin-multiple', 'savings', 'calendar'],
  'what-is-prompt-injection': ['warning', 'bot', 'document-text', 'shield-checkmark'],
};

export function coverIcons(post: CollectionEntry<'blog'>): [string, string, string, string] {
  const category = categoryOf(post);
  return COVERS[slugOf(post)] ?? [category.icon, 'link-multiple', 'lock-closed', 'checkmark-circle'];
}

/** Reading paths: short, ordered catalogues for a goal. */
export const readingPaths: { id: string; title: string; text: string; icon: string; category: CategoryId; slugs: string[] }[] = [
  {
    id: 'start',
    title: 'New to blockchain? Start here',
    text: 'The ideas behind every chain we build, in the order they make sense.',
    icon: 'book-open-lightbulb',
    category: 'infrastructure',
    slugs: ['layer-1-vs-layer-2-blockchain', 'private-l2-vs-public-blockchain', 'permissioned-vs-permissionless-blockchain', 'blockchain-finality-explained', 'how-to-choose-a-blockchain-development-company'],
  },
  {
    id: 'agents',
    title: 'Secure your AI agents',
    text: 'From the first attack to a record nobody can erase.',
    icon: 'shield-checkmark',
    category: 'ai-security',
    slugs: ['how-to-secure-ai-agents', 'what-is-prompt-injection', 'ai-agent-tool-calling-security', 'ai-agent-kill-switch', 'proof-of-execution-ai'],
  },
  {
    id: 'tokenize',
    title: 'Launch a tokenized asset',
    text: 'What it takes to put gold, funds or bonds on a chain.',
    icon: 'coin-multiple',
    category: 'tokenization',
    slugs: ['asset-tokenization-guide', 'tokenized-gold-explained', 'atomic-settlement', 'what-is-micro-investing'],
  },
  {
    id: 'wallet',
    title: 'Build a wallet',
    text: 'Custody, keys, SDKs and the launch plan.',
    icon: 'phone-laptop',
    category: 'wallets',
    slugs: ['how-to-launch-a-crypto-wallet', 'custodial-vs-non-custodial-wallet', 'account-abstraction-no-seed-phrases', 'what-is-a-wallet-sdk'],
  },
];

/** The reading path a post belongs to (the first that lists it), with its place in it. */
export function pathOf(slug: string) {
  const path = readingPaths.find(p => p.slugs.includes(slug));
  return path ? { path, index: path.slugs.indexOf(slug) } : undefined;
}
