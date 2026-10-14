import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { getCopy } from '@/copy';
import { entriesFor, slugOf } from '@utils/content';
import { servicePages } from '@data/services';

/**
 * Social share images (1200x630 PNG), one per page, rendered at build time
 * from an SVG template: brand mark, page title and a block-network motif.
 */

interface Card {
  title: string;
  label: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const copy = getCopy('en');
  const products = await entriesFor('products', 'en');
  const posts = await entriesFor('blog', 'en');
  const cards: Record<string, Card> = {
    default: { title: 'We build secure blockchains', label: 'Blockchain infrastructure · Hyper 0X' },
    products: { title: copy.productsIndex.heading, label: 'Products' },
    services: { title: 'Blockchain development services', label: 'Services' },
    blog: { title: 'Guides on building with blockchain', label: 'Blog' },
    contact: { title: 'Talk to a Buckleson engineer', label: 'Contact' },
  };
  for (const product of products) {
    cards[`products-${slugOf(product)}`] = {
      title: product.data.tagline,
      label: product.data.status === 'coming-soon' ? `${product.data.title} · Coming soon` : product.data.title,
    };
  }
  for (const page of servicePages) {
    const item = copy.services.items.find(entry => entry.id === page.id);
    cards[`services-${page.id}`] = { title: `${page.claim} ${page.payoff}`, label: item?.title ?? 'Services' };
  }
  for (const post of posts) {
    cards[`blog-${slugOf(post)}`] = { title: post.data.title, label: post.data.tags[0] ?? 'Blog' };
  }
  return Object.entries(cards).map(([slug, card]) => ({ params: { slug }, props: { ...card } }));
};

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy word wrap by an approximate character budget. */
function wrap(text: string, max: number, lines: number): string[] {
  const out: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > max && line) {
      out.push(line);
      line = word;
    } else line = (line + ' ' + word).trim();
  }
  if (line) out.push(line);
  if (out.length > lines) {
    out.length = lines;
    out[lines - 1] = out[lines - 1].replace(/\s*\S*$/, '') + '…';
  }
  return out;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, label } = props as Card;
  const size = title.length > 48 ? 58 : 68;
  const lines = wrap(title, size === 58 ? 32 : 28, 3);
  const font = "'Space Grotesk', 'Inter', 'DejaVu Sans', 'Segoe UI', Arial, sans-serif";

  const nodes = [
    [930, 150], [1060, 230], [980, 330], [1110, 400], [900, 450], [1040, 520],
  ];
  const edges = [[0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [0, 2]];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="80%" cy="20%" r="70%">
      <stop offset="0" stop-color="#7c3aed" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0b0f1a" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#2b3242"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0b0f1a"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g stroke="#6d28d9" stroke-width="3" opacity="0.8">
    ${edges.map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}"/>`).join('')}
  </g>
  ${nodes.map(([x, y], i) => `<rect x="${x - 22}" y="${y - 22}" width="44" height="44" rx="10" fill="${i === 2 ? '#8b5cf6' : '#161b26'}" stroke="#8b5cf6" stroke-width="3"/>`).join('')}
  <text x="160" y="118" font-family="${font}" font-size="40" font-weight="700" fill="#ffffff">Buckleson</text>
  <text x="72" y="${300 - (lines.length - 1) * size * 0.55}" font-family="${font}" font-size="${size}" font-weight="700" fill="#ffffff">
    ${lines.map((line, i) => `<tspan x="72" dy="${i === 0 ? 0 : size * 1.12}">${escape(line)}</tspan>`).join('')}
  </text>
  <text x="72" y="560" font-family="${font}" font-size="30" font-weight="600" fill="#c4b5fd">${escape(label)}</text>
</svg>`;

  const logo = await sharp(await readFile('public/brand/buckleson-logo.png')).resize(72, 72).png().toBuffer();
  const png = await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: 72, top: 64 }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
