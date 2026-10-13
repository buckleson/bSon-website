/**
 * Navigation structure: stable ids and unlocalised paths. Header labels live
 * in the copy table (`copy.nav.labels`); footer columns carry their own
 * labels because they name products and services, not UI chrome.
 */
export type NavLinkId = 'home' | 'products' | 'services' | 'blog' | 'contact';

export const navLinks: { id: NavLinkId; path: string }[] = [
  { id: 'home', path: '/' },
  { id: 'products', path: '/products/' },
  { id: 'services', path: '/services/' },
  { id: 'blog', path: '/blog/' },
  { id: 'contact', path: '/contact/' },
];

export const footerColumns: { title: string; links: { label: string; path: string }[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'Hyper 0X', path: '/products/hyper-0x/' },
      { label: 'Pavii', path: '/products/pavii/' },
      { label: 'Hyper Wallet & SDKs', path: '/products/hyper-wallet/' },
      { label: 'H0X Pay (soon)', path: '/products/h0x-pay/' },
      { label: 'HyperRun (soon)', path: '/products/hyperrun/' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Custom blockchains', path: '/services/#custom-blockchains' },
      { label: 'Asset tokenization', path: '/services/#asset-tokenization' },
      { label: 'Wallets & exchanges', path: '/services/#wallets-exchanges' },
      { label: 'AI-agent security', path: '/services/#ai-agent-security' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', path: '/blog/' },
      { label: 'Hyper 0X docs', path: '/guides/intro/' },
      { label: 'RSS feed', path: '/rss.xml' },
      { label: 'Contact', path: '/contact/' },
    ],
  },
];
