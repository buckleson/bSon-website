/**
 * Navigation: the header mega menus (Cloudflare-style: icon, title and a short
 * benefit line per item) and the footer columns. Paths are site-relative;
 * components run them through `localePath()`.
 */

export interface MenuItem {
  title: string;
  desc: string;
  href: string;
  /** MingCute UI icon name (see uiSymbol in utils/glyphs.ts). */
  icon: string;
  badge?: string;
}

export interface MegaMenu {
  id: string;
  label: string;
  columns: { heading: string; items: MenuItem[] }[];
  footer: { primary: { label: string; href: string }; links: { label: string; href: string }[] };
}

export const megaMenus: MegaMenu[] = [
  {
    id: 'products',
    label: 'Products',
    columns: [
      {
        heading: 'Platform',
        items: [
          { title: 'Hyper 0X', desc: 'Our own L1, a private L2 for you', href: '/products/hyper-0x/', icon: 'link-2' },
        ],
      },
      {
        heading: 'Products',
        items: [
          { title: 'Pavii', desc: 'Security for every AI agent call', href: '/products/pavii/', icon: 'safe-shield' },
          { title: 'Hyper Wallet & SDKs', desc: 'Wallet, exchange and white-label SDKs', href: '/products/hyper-wallet/', icon: 'laptop' },
        ],
      },
      {
        heading: 'Coming soon',
        items: [
          { title: 'H0X Pay', desc: 'Invest a slice of every payment', href: '/products/h0x-pay/', icon: 'coin', badge: 'Soon' },
          { title: 'HyperRun', desc: 'Play, predict and earn', href: '/products/hyperrun/', icon: 'trophy', badge: 'Soon' },
        ],
      },
    ],
    footer: {
      primary: { label: 'See all products', href: '/products/' },
      links: [
        { label: 'Hyper 0X docs', href: '/guides/intro/' },
        { label: 'How it works', href: '/#how-it-works' },
      ],
    },
  },
  {
    id: 'services',
    label: 'Services',
    columns: [
      {
        heading: 'Build',
        items: [
          { title: 'Custom blockchains', desc: 'Your own private L2', href: '/services/custom-blockchains/', icon: 'sitemap' },
          { title: 'Asset tokenization', desc: 'Real assets, on-chain', href: '/services/asset-tokenization/', icon: 'safe-box' },
          { title: 'Wallets & exchanges', desc: 'With your brand, on our technology', href: '/services/wallets-exchanges/', icon: 'transfer-3' },
        ],
      },
      {
        heading: 'Secure & integrate',
        items: [
          { title: 'Wallet SDKs', desc: 'Wallets inside your own apps', href: '/services/wallet-sdks/', icon: 'terminal-box' },
          { title: 'AI-agent security', desc: 'Gates and receipts for agents', href: '/services/ai-agent-security/', icon: 'ai' },
          { title: 'Forward-deployed engineering', desc: 'Our engineers in your team', href: '/services/forward-deployed-engineering/', icon: 'group-3' },
        ],
      },
    ],
    footer: {
      primary: { label: 'All services', href: '/services/' },
      links: [{ label: 'Start with a pilot', href: '/contact/' }],
    },
  },
  {
    id: 'resources',
    label: 'Resources',
    columns: [
      {
        heading: 'Learn',
        items: [
          { title: 'Blog', desc: 'Guides from our engineers', href: '/blog/', icon: 'news' },
          { title: 'FAQ', desc: 'Blockchain and AI security, answered', href: '/faq/', icon: 'question' },
          { title: 'Hyper 0X docs', desc: 'How the chain works', href: '/guides/intro/', icon: 'book-2' },
          { title: 'RSS feed', desc: 'Every new article', href: '/rss.xml', icon: 'announcement' },
        ],
      },
      {
        heading: 'Popular guides',
        items: [
          { title: 'Asset tokenization', desc: 'Launch tokenized assets', href: '/blog/asset-tokenization-guide/', icon: 'coin' },
          { title: 'Secure AI agents', desc: '8 attacks and how to stop them', href: '/blog/how-to-secure-ai-agents/', icon: 'safe-lock' },
          { title: 'Prompt injection', desc: 'How it works, how to stop it', href: '/blog/what-is-prompt-injection/', icon: 'warning' },
          { title: 'Layer 1 vs layer 2', desc: 'One L1, many L2s', href: '/blog/layer-1-vs-layer-2-blockchain/', icon: 'server' },
        ],
      },
    ],
    footer: {
      primary: { label: 'All articles', href: '/blog/' },
      links: [{ label: 'What is Hyper 0X?', href: '/guides/intro/' }],
    },
  },
  {
    id: 'company',
    label: 'Company',
    columns: [
      {
        heading: 'Buckleson',
        items: [
          { title: 'About us', desc: 'Our vision and story', href: '/about/', icon: 'building-2' },
          { title: 'Contact', desc: 'Talk to an engineer', href: '/contact/', icon: 'mail' },
          { title: 'Book a call', desc: '30 minutes, your use case', href: 'https://cal.com/buckleson-group/30min', icon: 'calendar-month' },
        ],
      },
    ],
    footer: {
      primary: { label: 'About Buckleson', href: '/about/' },
      links: [{ label: 'vijay@buckleson.com', href: 'mailto:vijay@buckleson.com' }],
    },
  },
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
      { label: 'Custom blockchains', path: '/services/custom-blockchains/' },
      { label: 'Asset tokenization', path: '/services/asset-tokenization/' },
      { label: 'Wallets & exchanges', path: '/services/wallets-exchanges/' },
      { label: 'AI-agent security', path: '/services/ai-agent-security/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', path: '/about/' },
      { label: 'Blog', path: '/blog/' },
      { label: 'FAQ', path: '/faq/' },
      { label: 'Hyper 0X docs', path: '/guides/intro/' },
      { label: 'Contact', path: '/contact/' },
    ],
  },
];
