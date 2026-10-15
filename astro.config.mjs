import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages with the custom domain buckleson.com (public/CNAME), served
  // from the domain root, so there is no `base` path.
  site: 'https://buckleson.com',
  image: {
    domains: ['images.unsplash.com'],
  },
  prefetch: true,
  // Old URLs from the first site version; Astro emits a redirect page for each.
  redirects: {
    '/blog/post-1': '/blog/post-quantum-resistant-blockchain/',
    '/blog/post-2': '/blog/how-to-secure-ai-agents/',
    '/blog/post-3': '/blog/atomic-settlement/',
    '/insights/insight-1': '/blog/dynamic-blocks/',
    '/insights/insight-2': '/blog/proof-of-execution-ai/',
    '/insights/insight-3': '/blog/account-abstraction-no-seed-phrases/',
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
  // Inline each page's CSS: no render-blocking stylesheet requests.
  build: {
    inlineStylesheets: 'always',
  },
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
