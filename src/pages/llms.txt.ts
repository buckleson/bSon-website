import type { APIRoute } from 'astro';
import { SITE, ORGANIZATION } from '@data/constants';
import { getCopy } from '@/copy';
import { entriesFor, pathFor } from '@utils/content';
import { localePath } from '@utils/locale';
import { servicePages } from '@data/services';

/**
 * llms.txt (https://llmstxt.org): a plain summary of the company, products
 * and key pages for AI assistants. Built from the same copy and content as
 * the site, so it never drifts.
 */
export const GET: APIRoute = async () => {
  const copy = getCopy('en');
  const url = (path: string) => `${SITE.origin}${localePath('en', path)}`;
  const products = await entriesFor('products', 'en');
  const posts = await entriesFor('blog', 'en');

  const lines = [
    `# ${SITE.title}`,
    '',
    `> ${copy.site.description}`,
    '',
    ...copy.home.glance.facts.map(fact => `- ${fact.term}: ${fact.detail}`),
    '',
    '## About',
    '',
    `- [About Buckleson](${url('/about/')}): ${ORGANIZATION.story}`,
    `- Founder: ${ORGANIZATION.founder.name}, ${ORGANIZATION.founder.jobTitle}.`,
    `- Belief: ${copy.about.story.belief}`,
    ...copy.about.pillars.items.map(item => `- ${item.label}: ${item.title} ${item.text}`),
    `- Beyond payments: ${copy.about.beyond.items.map(item => `${item.title.toLowerCase()}`).join(', ')}. ${copy.about.beyond.note}`,
    '',
    '## Products',
    '',
    ...products.map(
      product =>
        `- [${product.data.title}](${SITE.origin}${pathFor(product)}): ${product.data.tagline}.${product.data.status === 'coming-soon' ? ' Coming soon.' : ''}`
    ),
    '',
    '## Services',
    '',
    `- [Blockchain development services](${url('/services/')}): custom blockchains, asset tokenization, wallets and exchanges, wallet SDKs, AI-agent security and forward-deployed engineering.`,
    ...servicePages.map(page => {
      const item = copy.services.items.find(entry => entry.id === page.id);
      return `- [${item?.title ?? page.id}](${url(`/services/${page.id}/`)}): ${page.description}`;
    }),
    '',
    '## Guides',
    '',
    ...posts.map(post => `- [${post.data.title}](${SITE.origin}${pathFor(post)}): ${post.data.description}`),
    '',
    '## FAQ',
    '',
    `- [FAQ: blockchain, tokenization, wallets and AI agents](${url('/faq/')}): answers on enterprise blockchains, AI-agent security, asset tokenization, business wallets and post-quantum encryption.`,
    '',
    '## Docs',
    '',
    `- [What is Hyper 0X?](${url('/guides/intro/')})`,
    `- [Hyper 0X consensus](${url('/hyper-0x/consensus/')})`,
    `- [Hyper 0X encryption](${url('/hyper-0x/encryption/')})`,
    '',
    '## Contact',
    '',
    `- Book a call: https://cal.com/buckleson-group/30min`,
    `- Email: vijay@buckleson.com`,
    '',
    '## Optional',
    '',
    `- [Full text for LLMs](${url('/llms-full.txt')})`,
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
