import { readFileSync } from 'node:fs';
import { join } from 'node:path';
// Logo paths extracted from Simple Icons (CC0, simpleicons.org).
import icons from '@data/brand-icons.json';

/**
 * Build-time icon helpers. `lucide()` returns the inner markup of a Lucide
 * icon (24x24, stroke = currentColor); `brand()` returns a Simple Icons logo
 * path (24x24, filled). Both are inlined into SVG at build time, so no icon
 * code ships to the browser.
 */

const LUCIDE_DIR = join(process.cwd(), 'node_modules', 'lucide-static', 'icons');
const cache = new Map<string, string>();

export function lucide(name: string): string {
  let inner = cache.get(name);
  if (!inner) {
    const svg = readFileSync(join(LUCIDE_DIR, `${name}.svg`), 'utf8');
    inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
    cache.set(name, inner);
  }
  return inner;
}

export interface Brand {
  title: string;
  hex: string;
  /** Simple Icons path; absent for marks we render as a monogram. */
  path?: string;
  monogram?: string;
}

const BRANDS = {
  claude: { ...icons.claude, title: 'Claude' },
  gemini: { ...icons.gemini, title: 'Gemini' },
  // OpenAI and xAI logos are not redistributable; show name monograms instead.
  openai: { title: 'OpenAI', hex: '10a37f', monogram: 'AI' },
  grok: { title: 'Grok', hex: '6b7280', monogram: 'G' },
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
