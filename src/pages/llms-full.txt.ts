import type { APIRoute } from 'astro';
import { SITE } from '@data/constants';
import { getCopy } from '@/copy';
import { entriesFor, pathFor } from '@utils/content';
import { localePath } from '@utils/locale';

/** llms-full.txt: every product page, the FAQ and every blog post as plain text. */
// MDX posts carry import lines and component tags; keep only the prose.
const plain = (body = '') =>
  body
    .replace(/^import .*$/gm, '')
    .replace(/^<[A-Z][^>]*\/>\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const GET: APIRoute = async () => {
  const copy = getCopy('en');
  const products = await entriesFor('products', 'en');
  const posts = await entriesFor('blog', 'en');

  const sections = [
    `# ${SITE.title}\n\n${copy.site.description}`,
    ...products.map(product => {
      const data = product.data;
      return [
        `## ${data.title}${data.status === 'coming-soon' ? ' (coming soon)' : ''}`,
        `URL: ${SITE.origin}${pathFor(product)}`,
        data.summary.trim(),
        ...data.features.map(f => `- ${f.title}: ${f.subTitle}`),
        ...data.details.items.map(d => `- ${d.title}: ${d.subTitle}`),
        ...data.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`),
      ].join('\n\n');
    }),
    [
      '## Frequently asked questions',
      `URL: ${SITE.origin}${localePath('en', '/faq/')}`,
      ...copy.data.faqs.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`),
      ...copy.data.faqs.topics.flatMap(topic => [`### ${topic.label}`, ...topic.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`)]),
    ].join('\n\n'),
    ...posts.map(post =>
      [`## ${post.data.title}`, `URL: ${SITE.origin}${pathFor(post)}`, plain(post.body)].join('\n\n')
    ),
  ];
  return new Response(sections.join('\n\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
