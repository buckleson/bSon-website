import type { APIRoute, GetStaticPaths } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProductArt from '@components/ui/ProductArt.astro';

/**
 * Each product scene as a plain HTML fragment, so the home accordion can load
 * the scenes of closed panels only when they open (the page already carries
 * the scene styles and script through the first, open panel).
 */
const products = ['hyper-0x', 'pavii', 'hyper-wallet', 'h0x-pay', 'hyperrun'] as const;

export const getStaticPaths: GetStaticPaths = () => products.map(product => ({ params: { product } }));

export const GET: APIRoute = async ({ params }) => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(ProductArt, { props: { product: params.product as (typeof products)[number], fill: true } });
  const fragment = html.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '').trim();
  return new Response(fragment, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
