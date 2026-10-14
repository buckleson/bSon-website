import type { APIRoute, GetStaticPaths } from 'astro';

/**
 * The Anatomy figures' markup as plain files, so pages can load a figure only
 * when it scrolls near (see IsoFigure's `lazy` and iso-kit.ts).
 */
const html = import.meta.glob('../../components/home/figures/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(html).map(path => ({ params: { name: path.match(/([a-z-]+)\.html$/)![1] } }));

export const GET: APIRoute = ({ params }) =>
  new Response(html[`../../components/home/figures/${params.name}.html`], {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
