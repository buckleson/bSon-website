import type { APIRoute } from 'astro';
import { SITE, ORGANIZATION } from '@data/constants';
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
    [
      '## About Buckleson',
      `URL: ${SITE.origin}${localePath('en', '/about/')}`,
      copy.about.lead,
      `Founder: ${ORGANIZATION.founder.name}, ${ORGANIZATION.founder.jobTitle}.`,
      '### Our story',
      ...copy.about.story.steps.map(step => `- ${step.title} ${step.text}`),
      copy.about.story.belief,
      '### Our vision',
      copy.home.vision.statement,
      ...copy.home.vision.story,
      '### Mission, vision, goal and moat',
      ...copy.about.pillars.items.map(item => `- ${item.label}: ${item.title} ${item.text}`),
      '### Where blockchain does what a database cannot',
      copy.about.beyond.body,
      ...copy.about.beyond.items.map(item => `- ${item.title}: ${item.text}`),
      ...copy.about.faq.items.map(f => `Q: ${f.question}\nA: ${f.answer}`),
    ].join('\n\n'),
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
