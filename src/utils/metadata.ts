import { SITE, ORGANIZATION } from '@data/constants';
import { getCopy } from '@/copy';
import {
  BASE,
  LOCALE_INFO,
  localePath,
  type MarketingLocale,
} from '@utils/locale';

/**
 * Page-metadata module.
 *
 * Turns what a page knows about itself (locale, path, title, description,
 * kind) into everything the `<head>` needs: title, description, Open Graph
 * fields, canonical and one schema.org JSON-LD graph (Organization, WebSite,
 * the page itself, breadcrumbs and FAQs). Pages never hand-write schema.org
 * objects or the site URL.
 *
 * Pure: takes plain values, returns plain values, so it can be snapshot-tested.
 */

export interface Faq {
  question: string;
  answer: string;
}

/** What kind of thing the page is, for JSON-LD and Open Graph. */
export type PageKind =
  | { type: 'WebPage' | 'CollectionPage' | 'ContactPage' | 'AboutPage' }
  | { type: 'Home' }
  | { type: 'Service'; services: { name: string; description: string }[] }
  | {
      type: 'BlogPosting';
      datePublished: Date;
      dateModified?: Date;
      author: string;
      tags?: string[];
    }
  | { type: 'Product'; status: 'live' | 'coming-soon' };

export interface PageMetadataInput {
  locale: MarketingLocale;
  /** Site-relative pathname of the page (`Astro.url.pathname`). */
  pathname: string;
  /** Short page name, used for breadcrumbs and as the default title. */
  title?: string;
  /** Full `<title>`; when set it replaces `<title> | Buckleson`. */
  seoTitle?: string;
  /** `<meta name="description">`; falls back to the site description. */
  description?: string;
  /** Open Graph / Twitter title; falls back to the page title. */
  ogTitle?: string;
  /** Site-relative path of the page's social image (`/og/<key>.png`). */
  ogImage?: string;
  kind?: PageKind;
  faqs?: Faq[];
  noindex?: boolean;
}

export interface PageMetadata {
  lang: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website' | 'article';
  ogImage: string;
  ogLocale: string;
  canonical: string;
  noindex: boolean;
  articleDates?: { published: string; modified: string };
  jsonLd: Record<string, unknown>;
}

/** Absolute URL for a site-relative path (which already includes the base). */
export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE.origin}/`).href;
}

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const FOUNDER_ID = `${SITE.url}/about/#founder`;

/** Section names for breadcrumb levels, keyed by the first path segment. */
const SECTIONS: Record<string, string> = {
  products: 'Products',
  services: 'Services',
  blog: 'Blog',
  contact: 'Contact',
};

function breadcrumbs(pathname: string, title: string | undefined) {
  const path = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const items = [{ name: 'Home', path: '/' }];
  const section = SECTIONS[segments[0]];
  if (section) items.push({ name: section, path: `/${segments[0]}/` });
  if (segments.length > 1 && title) items.push({ name: title, path });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath('en', item.path)),
    })),
  };
}

export function buildPageMetadata(input: PageMetadataInput): PageMetadata {
  const { locale, pathname, kind = { type: 'WebPage' }, faqs = [] } = input;
  const copy = getCopy(locale);
  const info = LOCALE_INFO[locale];

  const title =
    input.seoTitle ?? (input.title ? `${input.title} | ${SITE.title}` : copy.site.ogTitle);
  const description = input.description ?? copy.site.description;
  const ogTitle = input.ogTitle ?? title;
  const canonical = absoluteUrl(pathname);
  const ogImage = absoluteUrl(`${BASE}${input.ogImage ?? '/og/default.png'}`);

  const organization = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.title,
    url: `${SITE.url}/`,
    logo: { '@type': 'ImageObject', url: absoluteUrl(`${BASE}/brand/buckleson-logo.png`) },
    description: copy.site.description,
    email: ORGANIZATION.email,
    knowsAbout: ORGANIZATION.knowsAbout,
    founder: { '@id': FOUNDER_ID },
    ...(ORGANIZATION.sameAs.length > 0 && { sameAs: ORGANIZATION.sameAs }),
  };
  const founder = {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: ORGANIZATION.founder.name,
    jobTitle: ORGANIZATION.founder.jobTitle,
    image: absoluteUrl(`${BASE}${ORGANIZATION.founder.image}`),
    worksFor: { '@id': ORG_ID },
  };
  const website = {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${SITE.url}/`,
    name: SITE.title,
    description: copy.site.descriptionShort,
    publisher: { '@id': ORG_ID },
    inLanguage: info.inLanguage,
  };

  const page: Record<string, unknown> = {
    '@id': `${canonical}#page`,
    url: canonical,
    name: title,
    description,
    isPartOf: { '@id': SITE_ID },
    inLanguage: info.inLanguage,
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
  };
  let articleDates: PageMetadata['articleDates'];

  switch (kind.type) {
    case 'Home':
      Object.assign(page, { '@type': 'WebPage', about: { '@id': ORG_ID } });
      break;
    case 'BlogPosting': {
      const published = kind.datePublished.toISOString();
      const modified = (kind.dateModified ?? kind.datePublished).toISOString();
      articleDates = { published, modified };
      Object.assign(page, {
        '@type': 'BlogPosting',
        headline: input.title,
        image: ogImage,
        datePublished: published,
        dateModified: modified,
        author: { '@type': 'Organization', name: kind.author, url: `${SITE.url}/` },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: canonical,
        ...(kind.tags?.length && { keywords: kind.tags.join(', ') }),
      });
      break;
    }
    case 'Product':
      Object.assign(page, {
        '@type': 'WebPage',
        mainEntity: {
          '@type': 'SoftwareApplication',
          name: input.title,
          description,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          image: ogImage,
          url: canonical,
          publisher: { '@id': ORG_ID },
          ...(kind.status === 'coming-soon' && { releaseNotes: 'Coming soon' }),
        },
      });
      break;
    case 'Service':
      Object.assign(page, {
        '@type': 'WebPage',
        mainEntity: kind.services.map(service => ({
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: { '@id': ORG_ID },
          areaServed: 'Worldwide',
        })),
      });
      break;
    case 'AboutPage':
      // The About page is about the company: its story and its founder.
      Object.assign(page, {
        '@type': 'AboutPage',
        about: { '@id': ORG_ID },
        mainEntity: { '@id': ORG_ID },
        abstract: ORGANIZATION.story,
      });
      break;
    default:
      page['@type'] = kind.type;
  }

  // The founder node is tiny, so every page carries it with the Organization.
  const graph: Record<string, unknown>[] = [organization, founder, website, page];
  const crumbs = breadcrumbs(pathname, input.title);
  if (crumbs) graph.push(crumbs);
  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return {
    lang: info.lang,
    title,
    description,
    ogTitle,
    ogDescription: description,
    ogType: kind.type === 'BlogPosting' ? 'article' : 'website',
    ogImage,
    ogLocale: info.ogLocale,
    canonical,
    noindex: input.noindex ?? false,
    articleDates,
    jsonLd: { '@context': 'https://schema.org', '@graph': graph },
  };
}
