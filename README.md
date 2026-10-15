# Buckleson website

Marketing site for Buckleson: custom blockchain solutions, powered by **Hyper 0X**.
Built with [Astro](https://astro.build) on the MIT-licensed
[ScrewFast](https://github.com/mearashadowfax/ScrewFast) template.

Live: https://buckleson.com/ (GitHub Pages, custom domain)

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:4321/
pnpm build      # type-check + static build into dist/
```

## Where things live

- `src/copy/en.ts`: page copy (home, services, products index, contact, blog index)
- `src/data_files/`: FAQs, features, pricing, navigation, site constants
- `src/content/products/en/`: one file per product
- `src/content/blog/en/`, `src/content/insights/en/`: articles
- `src/content/docs/`: Hyper 0X docs (Starlight)
- `src/images/diagrams/`: architecture diagrams (made with [archify](https://github.com/tt-a1i/archify))
- `prompts.md`: images still to be generated

## Deploy and hosting

- **Branches:** work on `redesign`; `.github/workflows/check.yml` builds it
  (type-check, build, smoke tests) and uploads `dist` as an artifact.
  Merging into `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
- **Domain:** https://buckleson.com, set in the repository's Pages settings and
  in `public/CNAME`. The site is served from the domain root, so
  `astro.config.mjs` has `site: 'https://buckleson.com'` and no `base`.
  `SITE` in `src/data_files/constants.ts` uses the same origin.
- **DNS** (already in place): `buckleson.com` has A records to GitHub Pages
  (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and
  `www.buckleson.com` points to GitHub Pages too; GitHub redirects `www`,
  `http` and the old `buckleson.github.io/bSon-website/...` URLs to
  `https://buckleson.com/...`. HTTPS is enforced.
- **Search engines:** `robots.txt` lists `sitemap-index.xml`; `llms.txt` and
  `llms-full.txt` summarise the site for AI assistants. After a deploy with
  new pages, run `node scripts/indexnow.mjs` to notify Bing and the other
  IndexNow engines (Bing also feeds ChatGPT search). For Google, add the
  domain in Google Search Console (DNS TXT verification) and submit
  `https://buckleson.com/sitemap-index.xml` once.
