import type { APIRoute, GetStaticPaths } from 'astro';
import { figureNames, figureParts, type FigureName } from '@utils/figures';

/**
 * Each figure's drawing (SVG and labels) as a plain file, fetched when the
 * figure scrolls near so pages stay light (see IsoFigure `lazy`).
 */
export const getStaticPaths: GetStaticPaths = () => figureNames.map(name => ({ params: { name } }));

export const GET: APIRoute = ({ params }) =>
  new Response(figureParts(params.name as FigureName).stage, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
