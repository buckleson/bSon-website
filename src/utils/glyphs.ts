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
  openai: { ...icons.openai, rule: 'evenodd' as const },
  grok: { ...icons.grok, rule: 'evenodd' as const },
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

// ---- Colour icons --------------------------------------------------------
// Fluent UI System Color Icons (MIT, Microsoft), from @iconify-json/fluent-color.
// Multi-colour icons for places where the icon must say what the item is at a
// glance (the navigation). Gradient ids get a per-use suffix, so a copy inside
// a hidden menu never breaks the colours of a visible copy.
const FLUENT = JSON.parse(readFileSync(join(process.cwd(), 'node_modules', '@iconify-json', 'fluent-color', 'icons.json'), 'utf8')) as {
  icons: Record<string, { body: string; width?: number; height?: number }>;
  width?: number;
  height?: number;
};
let colorUses = 0;

/** One icon's markup for the page sprite: ids prefixed with the icon name. */
export function colorSymbol(name: string): { body: string; size: number } {
  const key = [24, 20, 28, 32, 48, 16].map(size => `${name}-${size}`).find(k => FLUENT.icons[k]);
  if (!key) throw new Error(`Unknown colour icon "${name}"`);
  const icon = FLUENT.icons[key];
  const size = icon.width ?? FLUENT.width ?? Number(key.split('-').pop());
  const body = icon.body
    .replace(/id="([^"]+)"/g, (_, id) => `id="ci-${name}-${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#ci-${name}-${id})`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#ci-${name}-${id}"`);
  return { body, size };
}

export function colorIcon(name: string): { body: string; size: number } {
  const key = [24, 20, 28, 32, 48, 16].map(size => `${name}-${size}`).find(k => FLUENT.icons[k]);
  if (!key) throw new Error(`Unknown colour icon "${name}"`);
  const icon = FLUENT.icons[key];
  const size = icon.width ?? FLUENT.width ?? Number(key.split('-').pop());
  const uid = ++colorUses;
  const body = icon.body
    .replace(/id="([^"]+)"/g, (_, id) => `id="${id}-${uid}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${id}-${uid})`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${id}-${uid}"`);
  return { body, size };
}
