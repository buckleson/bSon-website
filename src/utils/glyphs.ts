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

// ---- UI icons -------------------------------------------------------------
// MingCute (Apache-2.0), from @iconify-json/mingcute: bold, rounded, one
// colour (currentColor), for places where the icon must say what an item is
// at a glance (navigation, topics, covers, diagrams). Names without a style
// suffix get the filled style; "-line" names keep the outline style.
const MINGCUTE = JSON.parse(readFileSync(join(process.cwd(), 'node_modules', '@iconify-json', 'mingcute', 'icons.json'), 'utf8')) as {
  icons: Record<string, { body: string; width?: number; height?: number }>;
  width?: number;
  height?: number;
};

/** One UI icon's markup for the page sprite (see UiSprite). */
export function uiSymbol(name: string): { body: string; size: number } {
  const key = name.endsWith('-line') || name.endsWith('-fill') ? name : `${name}-fill`;
  const icon = MINGCUTE.icons[key];
  if (!icon) throw new Error(`Unknown UI icon "${name}" (MingCute "${key}")`);
  return { body: icon.body, size: icon.width ?? MINGCUTE.width ?? 24 };
}

/**
 * Older icon names (Phosphor and Lucide-style) mapped to MingCute, so the
 * whole site shares one bold, rounded icon style. Names MingCute already has
 * map to themselves; anything without a good match stays on Phosphor.
 */
const TO_MINGCUTE: Record<string, string> = {
  'chats-circle': 'chat-3', 'arrow-up-right': 'arrow-right-up', 'lock-key': 'lock', 'file-text': 'file', 'caret-down': 'down',
  list: 'menu', x: 'close', 'caret-right': 'right', 'caret-left': 'left', article: 'news', linked: 'link', 'shield-check': 'safe-shield',
  coins: 'coin', crosshair: 'aiming-2', 'credit-card': 'bank-card', robot: 'ai', bot: 'ai', 'plus-circle': 'add-circle', plugs: 'plugin-2',
  database: 'server', users: 'group', 'chart-line-up': 'trending-up', 'trend-up': 'trending-up', buildings: 'building-4', 'chart-pie-slice': 'chart-pie',
  user: 'user-3', 'user-round': 'user-3', 'users-three': 'group-3', handshake: 'hand-heart', scroll: 'document', 'seal-check': 'safety-certificate',
  'badge-check': 'safety-certificate', prohibit: 'forbid-circle', 'octagon-x': 'forbid-circle', 'eye-slash': 'eye-close', 'eye-off': 'eye-close',
  'link-simple': 'link', 'link-simple-break': 'unlink', path: 'route', coffee: 'teacup', 'magnifying-glass': 'search', 'approve-check': 'check-circle',
  puzzle: 'plugin', 'piggy-bank': 'pig-money', gem: 'diamond', 'qr-code': 'qrcode', zap: 'flash', 'arrow-left-right': 'transfer-horizontal',
  'arrows-left-right': 'transfer-horizontal', 'key-round': 'key-2', key: 'key-2', 'chart-candlestick': 'chart-bar', 'gamepad-2': 'game-2',
  'game-controller': 'game-2', 'scan-search': 'scan', receipt: 'bill', gauge: 'dashboard-2', 'identification-card': 'idcard', syringe: 'bug',
  'file-lock': 'file-locked', funnel: 'filter', 'hand-palm': 'hand', 'chat-text': 'chat-1', plug: 'plugin', 'paper-plane-tilt': 'send-plane',
  'arrows-clockwise': 'refresh-2', 'device-mobile': 'cellphone', smartphone: 'cellphone', scales: 'balance', 'book-open-text': 'book-2',
  swap: 'transfer-3', storefront: 'store', 'download-simple': 'download', 'shopping-cart': 'shopping-cart-1', 'tree-structure': 'sitemap',
  stack: 'layers', vault: 'safe-box', 'plugs-connected': 'plugin-2', 'rocket-launch': 'rocket', lightbulb: 'bulb', 'envelope-simple': 'mail',
  'git-diff': 'git-compare', 'calendar-blank': 'calendar', binoculars: 'search-3', 'lock-simple': 'lock', 'cloud-arrow-up': 'upload',
  'terminal-window': 'terminal-box', 'shield-warning': 'safe-alert', calculator: 'currency-dollar', 'list-checks': 'list-check', 'text-aa': 'font',
  'cube-transparent': 'box-2', 'list-dashes': 'list-check-2', wrench: 'tool', 'clipboard-text': 'clipboard', 'brackets-curly': 'code',
  'hard-drives': 'server', 'chalkboard-teacher': 'presentation-1', blocks: 'cube', landmark: 'bank', 'git-fork': 'git-branch',
  quotes: 'quote-left', 'linkedin-logo': 'linkedin', 'squares-four': 'grid',
};

/** The MingCute name for an older icon name, if there is a good match. */
export function mingcuteFor(name: string): string | undefined {
  const mapped = TO_MINGCUTE[name] ?? name;
  return MINGCUTE.icons[`${mapped}-fill`] ? mapped : undefined;
}
