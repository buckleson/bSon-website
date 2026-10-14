import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
// Logo paths: Simple Icons (CC0, simpleicons.org); OpenAI and Grok marks from
// LobeHub icons (MIT, github.com/lobehub/lobe-icons). Trademarks belong to
// their owners and are used only to say which models we work with.
import icons from '@data/brand-icons.json';

/**
 * Build-time icon helpers. `glyph()` returns the inner markup of a Phosphor
 * duotone icon (viewBox 0 0 256 256, fill = currentColor); `brand()` returns
 * a Simple Icons logo path (viewBox 0 0 24 24). Both are inlined at build
 * time, so no icon code ships to the browser.
 */

const PHOSPHOR_DIR = join(process.cwd(), 'node_modules', '@phosphor-icons', 'core', 'assets', 'duotone');

/** Older (Lucide-style) names used in content, mapped to Phosphor names. */
const ALIAS: Record<string, string> = {
  activity: 'pulse',
  'arrow-left-right': 'arrows-left-right',
  'badge-check': 'seal-check',
  blocks: 'cube',
  bot: 'robot',
  'chart-candlestick': 'chart-line-up',
  download: 'download-simple',
  'eye-off': 'eye-slash',
  'file-check': 'file-lock',
  'gamepad-2': 'game-controller',
  gem: 'diamond',
  'key-round': 'key',
  landmark: 'bank',
  layers: 'stack',
  'layout-grid': 'squares-four',
  'octagon-x': 'prohibit',
  radar: 'broadcast',
  repeat: 'arrows-clockwise',
  scale: 'scales',
  'scan-search': 'scan',
  server: 'hard-drives',
  smartphone: 'device-mobile',
  sparkles: 'sparkle',
  store: 'storefront',
  'trending-up': 'trend-up',
  'user-round': 'user-circle',
  zap: 'lightning',
  mail: 'envelope-simple',
  'message-square': 'chat-text',
  'clipboard-list': 'clipboard-text',
  rocket: 'rocket-launch',
};

const cache = new Map<string, string>();

export function glyph(name: string): string {
  const key = ALIAS[name] ?? name;
  let inner = cache.get(key);
  if (!inner) {
    const file = join(PHOSPHOR_DIR, `${key}-duotone.svg`);
    if (!existsSync(file)) throw new Error(`Unknown icon "${name}" (Phosphor "${key}")`);
    inner = readFileSync(file, 'utf8')
      .replace(/^[\s\S]*?<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
      .trim();
    cache.set(key, inner);
  }
  return inner;
}

export interface Brand {
  title: string;
  hex: string;
  /** Logo path (viewBox 0 0 24 24); absent for marks we render as a monogram. */
  path?: string;
  monogram?: string;
  /** SVG fill-rule for paths that need it. */
  rule?: 'evenodd';
}

const BRANDS = {
  claude: { ...icons.claude, title: 'Claude' },
  gemini: { ...icons.gemini, title: 'Gemini' },
  openai: icons.openai,
  grok: icons.grok,
  ethereum: { ...icons.ethereum, hex: '627EEA' },
  solana: icons.solana,
  sui: icons.sui,
  bitcoin: icons.bitcoin,
  binance: icons.binance,
  coinbase: icons.coinbase,
  tether: icons.tether,
} satisfies Record<string, Brand>;

export type BrandKey = keyof typeof BRANDS;

export function brand(key: BrandKey): Brand {
  return BRANDS[key];
}
