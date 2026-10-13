// https://docs.astro.build/en/guides/content-collections/#defining-collections

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { diagramNames } from './data_files/diagrams';

const item = z.object({ title: z.string(), subTitle: z.string() });
const faq = z.object({ question: z.string(), answer: z.string() });

const productsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/products',
  }),
  schema: z.object({
    title: z.string(),
    /** Full `<title>`, under 60 characters, with the page keyword. */
    seoTitle: z.string(),
    /** Meta description, 140-160 characters. */
    description: z.string(),
    order: z.number(),
    status: z.enum(['live', 'coming-soon']),
    /** One line under the product name. */
    tagline: z.string(),
    /** Two or three plain sentences: what it is. */
    summary: z.string(),
    diagram: z.enum(diagramNames),
    features: z.array(item),
    details: z.object({ title: z.string(), items: z.array(item) }),
    cta: z.object({ title: z.string(), url: z.string() }),
    learnMore: z.array(z.object({ title: z.string(), url: z.string() })).default([]),
    faqs: z.array(faq).default([]),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Meta description, 140-160 characters. */
      description: z.string(),
      author: z.string(),
      role: z.string().optional(),
      authorImage: image(),
      authorImageAlt: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      readTime: z.number(),
      tags: z.array(z.string()).default([]),
      /** Optional architecture diagram shown under the intro. */
      diagram: z.enum(diagramNames).optional(),
      faqs: z.array(faq).default([]),
    }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  products: productsCollection,
  blog: blogCollection,
};
