// Tell IndexNow search engines (Bing, Yandex, Seznam, Naver and others)
// that the pages in the live sitemap are new or changed. Bing's index also
// feeds ChatGPT search, so this helps new pages show up there sooner.
//
// Run after a deploy: `node scripts/indexnow.mjs`
// (optionally pass page URLs to submit only those).
// The key file lives in public/<key>.txt and is served at the site root.
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SITE = 'https://buckleson.com';
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const keyFile = readdirSync(publicDir).find(name => /^[a-f0-9]{32}\.txt$/.test(name));
if (!keyFile) throw new Error('No IndexNow key file (32 hex characters + .txt) in public/.');
const key = keyFile.replace('.txt', '');

async function sitemapUrls() {
  const index = await (await fetch(`${SITE}/sitemap-index.xml`)).text();
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const urls = [];
  for (const map of maps) {
    const xml = await (await fetch(map)).text();
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
  }
  return urls;
}

const urlList = process.argv.slice(2).length ? process.argv.slice(2) : await sitemapUrls();
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${keyFile}`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${response.status} ${response.statusText}`);
if (!response.ok && response.status !== 202) process.exitCode = 1;
