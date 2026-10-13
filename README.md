# Buckleson website

Marketing site for Buckleson: custom blockchain solutions, powered by **Hyper 0X**.
Built with [Astro](https://astro.build) on the MIT-licensed
[ScrewFast](https://github.com/mearashadowfax/ScrewFast) template.

Live: https://buckleson.github.io/bSon-website/

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:4321/bSon-website/
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

## Deploy

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
To move to a custom domain (e.g. www.buckleson.com), set `site` to the domain and
remove `base` in `astro.config.mjs`, and update `SITE.url` in
`src/data_files/constants.ts`.
