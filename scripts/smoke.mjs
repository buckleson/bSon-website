// Post-build checks over dist/: every page is reachable, carries unique SEO
// metadata, has one H1 and valid JSON-LD, and every internal link resolves.
// Run after `astro build`: `node scripts/smoke.mjs`.
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
// The site is served from the root of its custom domain (no base path).
const BASE = '';

const REQUIRED_FILES = ['index.html', '404.html', 'robots.txt', 'llms.txt', 'llms-full.txt', 'rss.xml', 'sitemap-index.xml', 'og/default.png'];

// Cheap content assertions for key pages (site-relative route -> needles).
const EXPECTATIONS = {
  '/': ['<html lang="en"', 'We build blockchain infrastructure', '"@type":"FAQPage"', 'data-hero', 'id="services"', 'data-vault', 'chain-rack', 'pavii-gates', 'cipher-tower'],
  '/about/': ['"@type":"AboutPage"', 'Our story'],
  '/faq/': ['"@type":"FAQPage"', 'id="ai-agent-security"', 'ML-KEM'],
  '/products/': ['Hyper 0X', 'Coming soon'],
  '/products/pavii/': ['data-flow', 'data-pm="pavii"', '"@type":"SoftwareApplication"'],
  '/products/h0x-pay/': ['Coming soon'],
  '/contact/': ['data-mail-form', 'cal.com/buckleson-group/30min'],
  '/blog/how-to-secure-ai-agents/': ['"@type":"BlogPosting"', '"@type":"BreadcrumbList"'],
};

// Words that must never ship (template leftovers and brand rules).
const BANNED = [/screwfast/i, /construction/i, /quantum-proof/i, /Hyper[- ]?Tern/i, /Hyper-0x|Hyper-Ox/];

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) out.push(...(await walk(path)));
    else out.push(path);
  }
  return out;
}

const routeOf = file => {
  const rel = '/' + relative(DIST, file).split(sep).join('/');
  return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
};
const decode = text => text.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const first = (html, re) => {
  const value = html.match(re)?.[1]?.trim();
  return value && decode(value);
};

const errors = [];
const fail = (route, message) => errors.push(`${route}: ${message}`);

const files = await walk(DIST);
const fileSet = new Set(files.map(file => '/' + relative(DIST, file).split(sep).join('/')));

for (const required of REQUIRED_FILES) {
  if (!fileSet.has('/' + required)) fail(required, 'missing');
}

const titles = new Map();
const descriptions = new Map();
const pages = files.filter(file => file.endsWith('.html'));

for (const file of pages) {
  const route = routeOf(file);
  const html = await readFile(file, 'utf8');
  if (html.includes('http-equiv="refresh"')) continue; // redirect page
  const isDocs = html.includes('data-pagefind-body') || html.includes('sl-container');

  const title = first(html, /<title>([^<]*)<\/title>/);
  const description = first(html, /<meta name="description" content="([^"]*)"/);
  const noindex = /<meta name="robots" content="noindex/.test(html);

  if (!title) fail(route, 'no <title>');
  if (!description) fail(route, 'no meta description');
  if (!html.includes('rel="canonical"')) fail(route, 'no canonical');

  if (!isDocs && !noindex) {
    if (title && title.length > 65) fail(route, `title too long (${title.length}): ${title}`);
    if (description && (description.length < 70 || description.length > 170)) {
      fail(route, `description length ${description.length}`);
    }
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) fail(route, `${h1s} <h1> elements`);
    for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        JSON.parse(block[1]);
      } catch {
        fail(route, 'invalid JSON-LD');
      }
    }
  }

  if (!noindex && title) {
    if (titles.has(title)) fail(route, `duplicate title with ${titles.get(title)}`);
    titles.set(title, route);
  }
  if (!noindex && description && !isDocs) {
    if (descriptions.has(description)) fail(route, `duplicate description with ${descriptions.get(description)}`);
    descriptions.set(description, route);
  }

  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
  for (const word of BANNED) if (word.test(text)) fail(route, `contains banned text ${word}`);

  // Internal links must resolve to a built file.
  for (const [, href] of html.matchAll(/href="(\/(?!\/)[^"#?]*)/g)) {
    let path = href.slice(BASE.length) || '/';
    if (path.endsWith('/')) path += 'index.html';
    else if (!/\.[a-z0-9]+$/i.test(path)) path += '/index.html';
    if (!fileSet.has(path)) fail(route, `broken link ${href}`);
  }

  const site = route.startsWith(BASE) ? route.slice(BASE.length) : route;
  for (const needle of EXPECTATIONS[site] ?? []) {
    if (!html.includes(needle)) fail(route, `missing ${needle}`);
  }
}

for (const route of Object.keys(EXPECTATIONS)) {
  const path = route === '/' ? '/index.html' : `${route}index.html`;
  if (!fileSet.has(path)) fail(route, 'page not built');
}

if (errors.length) {
  console.error(errors.map(error => `FAIL ${error}`).join('\n'));
  console.error(`\n${errors.length} problem(s) in ${pages.length} pages.`);
  process.exit(1);
}
console.log(`OK   ${pages.length} pages, ${titles.size} unique titles, all internal links resolve.`);
