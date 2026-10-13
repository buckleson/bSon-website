import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site. For a custom domain (www.buckleson.com),
  // set `site` to that domain and remove `base`.
  site: 'https://buckleson.github.io',
  base: '/bSon-website',
  image: {
    domains: ['images.unsplash.com'],
  },
  prefetch: true,
  // Old URLs from the first site version; Astro emits a redirect page for each.
  redirects: {
    '/blog/post-1': '/bSon-website/blog/post-quantum-resistant-blockchain/',
    '/blog/post-2': '/bSon-website/blog/how-to-secure-ai-agents/',
    '/blog/post-3': '/bSon-website/blog/atomic-settlement/',
    '/insights/insight-1': '/bSon-website/blog/dynamic-blocks/',
    '/insights/insight-2': '/bSon-website/blog/proof-of-execution-ai/',
    '/insights/insight-3': '/bSon-website/blog/account-abstraction-no-seed-phrases/',
  },
  integrations: [
    sitemap({
      // Keep error and redirect pages out of the sitemap.
      filter: page => !/\/(404|blog\/post-\d|insights)/.test(page),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
    starlight({
      title: 'Hyper 0X Docs',
      sidebar: [
        { label: 'Start here', items: [{ autogenerate: { directory: 'guides' } }] },
        { label: 'Hyper 0X', items: [{ autogenerate: { directory: 'hyper-0x' } }] },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/buckleson/bSon-website',
        },
      ],
      disable404Route: true,
      customCss: ['./src/assets/styles/starlight.css'],
      favicon: '/favicon.ico',
      components: {
        SiteTitle: './src/components/ui/starlight/SiteTitle.astro',
        Head: './src/components/ui/starlight/Head.astro',
        MobileMenuFooter:
          './src/components/ui/starlight/MobileMenuFooter.astro',
        ThemeSelect: './src/components/ui/starlight/ThemeSelect.astro',
      },
    }),
    mdx(),
  ],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
