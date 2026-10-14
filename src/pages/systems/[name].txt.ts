import type { APIRoute, GetStaticPaths } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import SystemDiagram from '@components/ui/SystemDiagram.astro';
import { systems, type SystemName } from '@data/systems';

/**
 * Each system diagram as a plain HTML fragment, so the home "See it run" tabs
 * can load a hidden tab's diagram on idle or when it opens (the page already
 * carries the diagram styles and script through the first tab).
 */
export const getStaticPaths: GetStaticPaths = () => Object.keys(systems).map(name => ({ params: { name } }));

export const GET: APIRoute = async ({ params }) => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(SystemDiagram, { props: { name: params.name as SystemName } });
  const fragment = html.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '').trim();
  return new Response(fragment, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
