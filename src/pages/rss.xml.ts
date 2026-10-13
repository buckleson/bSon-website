import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '@data/constants';
import { entriesFor, pathFor } from '@utils/content';

/** RSS feed of every blog post, newest first. */
export async function GET(context: APIContext) {
  const posts = await entriesFor('blog', 'en');
  return rss({
    title: `${SITE.title} blog`,
    description: 'Guides on custom blockchains, asset tokenization, wallets and AI-agent security.',
    site: context.site ?? SITE.origin,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: pathFor(post),
      categories: post.data.tags,
    })),
  });
}
