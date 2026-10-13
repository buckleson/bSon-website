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
  integrations: [
    sitemap(),
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
