// https://developers.google.com/search/docs/crawling-indexing/robots/intro
// Note: crawlers only read robots.txt at the domain root, so this file takes
// effect once the site moves to its own domain (www.buckleson.com).
import type { APIRoute } from 'astro';
import { SITE } from '@data/constants';

// Search and AI-answer crawlers are welcome: we want to be cited.
const robotsTxt = `
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: MistralAI-User
Allow: /

Sitemap: ${SITE.url}/sitemap-index.xml
`.trim();

export const GET: APIRoute = () =>
  new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
