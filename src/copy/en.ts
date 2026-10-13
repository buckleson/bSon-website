import faqs from '@data/faqs.json';

/**
 * English copy table. `Copy` (see `./index.ts`) is the shape of this table.
 *
 * Paths are site-relative (`/products`); callers run them through
 * `localePath()` from `@utils/locale`, which adds the deploy base path.
 */
const accent = (text: string) =>
  `<span class="text-orange-600 dark:text-orange-400">${text}</span>`;

export const en = {
  site: {
    /** Default `<meta name="description">` when a page sets none. */
    description:
      'Buckleson is a blockchain infrastructure company. We build custom blockchains, tokenize real-world assets, launch crypto wallets and secure AI agents.',
    /** schema.org `WebSite.description` in every page's `isPartOf`. */
    descriptionShort: 'Blockchain infrastructure company: custom blockchains, asset tokenization, wallets and AI-agent security on Hyper 0X.',
    ogTitle: 'Buckleson: Blockchain Development & Infrastructure Company',
    ogDescription:
      'We build custom blockchains, wallets, exchanges and AI-agent security for enterprises, all running on Hyper 0X: our own L1 with an L2 for every customer.',
  },

  layout: {
    skipToContent: 'Skip to content',
    toggleNavigation: 'Toggle navigation',
    darkTheme: 'Dark Theme Toggle',
    lightTheme: 'Light Theme Toggle',
    toggleTheme: 'Toggle theme',
  },

  nav: {
    /** Labels for `navLinks` in `@data/navigation`, keyed by id. */
    labels: {
      home: 'Home',
      products: 'Products',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
    },
  },

  forms: {
    email: 'Email',
    emailAddress: 'Email address',
    emailPlaceholder: 'Enter your email',
    emailInvalid:
      'Please include a valid email address so we can get back to you',
    subscribe: 'Subscribe',
    phone: 'Phone Number',
  },

  share: {
    share: 'Share',
    shareOn: (platform: string) => `Share on ${platform}`,
    copied: 'Copied',
    copyLink: 'Copy link',
  },

  banner: {
    dismiss: 'Dismiss',
    region: 'Informational banner',
  },

  blog: {
    readMore: 'Read More',
    minRead: (minutes: number) => `${minutes} min read`,
    relatedArticles: 'Related articles',
    wasHelpful: 'Was this post helpful?',
    yes: 'Yes',
    no: 'No',
    ogSection: 'Blog',
  },

  products: {
    ogSection: 'Products',
    tabs: 'Tabs',
  },

  notFound: {
    title: 'Page Not Found',
    subTitle: "This block isn't on our chain.",
    content:
      "The page you're looking for doesn't exist or has moved. Let's get you back on track.",
    goHome: 'Go Home',
    goBack: 'Go Back',
  },

  home: {
    metaTitle: 'Buckleson: Blockchain Development & Infrastructure Company',
    banner: 'Coming soon: H0X Pay and HyperRun',
    hero: {
      lead: 'We help you',
      phrases: [
        'launch your own blockchain',
        'tokenize real-world assets',
        'build crypto wallets & exchanges',
        'secure your AI agents',
      ],
      intro:
        'Buckleson is a blockchain infrastructure company. Everything we build runs on Hyper 0X, our own post-quantum-resistant blockchain.',
      primaryBtn: 'Book a call',
      secondaryBtn: 'Explore Hyper 0X',
      proof: [
        { value: '2M+', label: 'transactions on Hyper Wallet' },
        { value: '33K+', label: 'portfolios managed' },
        { value: '100M+', label: 'AI tokens saved by Pavii' },
      ],
    },
    logos: 'Connects to',
    domains: {
      title: 'What we build',
      subTitle: 'Four things we do every day, all on one secure chain.',
      items: [
        {
          title: 'Custom blockchains',
          content: 'Your own private L2 with your rules, privacy and bridges.',
          href: '/services/#custom-blockchains',
          icon: 'blocks',
        },
        {
          title: 'Asset tokenization',
          content: 'Gold, funds, invoices or property on-chain, compliance built in.',
          href: '/services/#asset-tokenization',
          icon: 'coins',
        },
        {
          title: 'Wallets & exchanges',
          content: 'A branded wallet, exchange or payment gateway from our SDKs.',
          href: '/products/hyper-wallet/',
          icon: 'wallet',
        },
        {
          title: 'AI-agent security',
          content: 'Security gates and tamper-proof receipts for every agent call.',
          href: '/products/pavii/',
          icon: 'shield-check',
        },
      ],
    },
    how: {
      title: 'See how it works',
      subTitle: 'Pick a flow and watch a transaction move through the system, step by step.',
      tabs: [
        { label: 'Payment', icon: 'blocks', system: 'hyper0x' },
        { label: 'Tokenization', icon: 'coins', system: 'tokenization' },
        { label: 'Wallet trade', icon: 'wallet', system: 'wallet' },
        { label: 'AI agent call', icon: 'bot', system: 'pavii' },
      ],
    },
    proof: {
      title: 'Proven in production',
      stats: [
        { count: '2M+', description: 'transactions through Hyper Wallet', icon: 'activity' },
        { count: '33K+', description: 'portfolios managed', icon: 'briefcase' },
        { count: '$128K+', description: 'saved by users in wallet fees', icon: 'piggy-bank' },
        { count: '100M+', description: 'AI tokens saved by Pavii', icon: 'sparkles' },
      ],
      quote: {
        content:
          '10x Technologies is running an enterprise pilot of the Hyper 0X blockchain-based AI training and inference module, validating our security architecture in a real-world environment.',
        author: '10x Technologies',
        role: 'Enterprise pilot, AI training & inference',
      },
    },
    clients: {
      title: 'Products built on Hyper 0X',
      subTitle:
        'Every Buckleson product signs, settles and logs on the same chain, so they all write to one verifiable record.',
    },
    glance: {
      title: 'Buckleson at a glance',
      facts: [
        { term: 'Who we are', detail: 'A blockchain infrastructure company that builds its own blockchain and the products that run on it.' },
        { term: 'What we build', detail: 'Custom blockchains, asset tokenization, crypto wallets and exchanges, and security for AI agents.' },
        { term: 'Hero product', detail: 'Hyper 0X: a permissioned, post-quantum-resistant L1 with a private L2 for every customer.' },
        { term: 'Live products', detail: 'Hyper 0X, Pavii and Hyper Wallet & SDKs. H0X Pay and HyperRun are coming soon.' },
        { term: 'Who it is for', detail: 'Banks, fintechs, asset issuers and teams running AI agents.' },
        { term: 'How to start', detail: 'Book a 30-minute call; we scope a pilot on your own L2.' },
      ],
    },
    latestPosts: {
      title: 'From the blog',
      cta: 'All articles',
    },
    faqTitle: 'Frequently<br />asked questions',
    heroAlt: {
      title: "Let's Build Your Chain",
      subTitle:
        'Tell us what you want to put on-chain. Our engineers will design your L2 on Hyper 0X with you, from pilot to production.',
      btn: 'Book a call',
    },
  },

  services: {
    title: 'Services',
    seoTitle: 'Blockchain Development Services | Buckleson',
    metaDescription:
      'Blockchain development services from Buckleson: custom blockchains and private L2s, asset tokenization, wallets and exchanges, wallet SDKs and AI-agent security.',
    intro: {
      title: 'Blockchain Development Services',
      subTitle:
        'We design, build and run blockchain systems for banks, fintechs, asset issuers and AI teams. Everything runs on Hyper 0X, the blockchain we built, so you get your own L2 with your own rules on one verifiable record.',
      cta: 'Book a call',
    },
    items: [
      {
        id: 'custom-blockchains',
        title: 'Custom blockchains and private L2s',
        content:
          'Your own blockchain without building one from zero. We set up a private L2 on Hyper 0X with your sequencer, policies, privacy model and bridges, and connect it to your core systems.',
        points: ['Your rules, enforced as code', 'Per-party encrypted records', 'Bridges to EVM chains, Solana and Sui'],
        diagram: 'hyper0x',
      },
      {
        id: 'asset-tokenization',
        title: 'Asset tokenization',
        content:
          'Put gold, funds, bonds, invoices or property on-chain. We handle the token, the compliance rules, the investor wallet and the secondary market, with atomic settlement on every trade.',
        points: ['Minted 1:1 with assets in custody', 'KYC and investor limits checked before each trade', 'Branded investor app'],
        diagram: 'tokenization',
        link: { title: 'Read the tokenization guide', url: '/blog/asset-tokenization-guide/' },
      },
      {
        id: 'wallets-exchanges',
        title: 'Custom wallets, exchanges and compliance',
        content:
          'We build wallets and exchanges the way we built Hyper Wallet: on-chain order books, atomic settlement and no seed phrases. We can also run your existing crypto compliance as code.',
        points: ['Central limit order book in consensus', 'Maker-checker approvals', 'Account abstraction for users'],
        diagram: 'wallet',
        link: { title: 'See Hyper Wallet', url: '/products/hyper-wallet/' },
      },
      {
        id: 'wallet-sdks',
        title: 'Wallet SDKs for your apps',
        content:
          'Embed secure wallets, payments and a payment gateway in your internal tools and customer apps. Every transfer is signed, policy-checked and recorded, giving you one audit trail across every app.',
        points: ['Launch a neobank or payment gateway', 'In-app wallets for games', 'One audit trail'],
        diagram: 'platform',
      },
      {
        id: 'ai-agent-security',
        title: 'AI-agent security',
        content:
          'We secure how your AI agents run, not what they think. With Pavii and Hyper 0X we stop prompt injection, data leaks and rogue agents, and every action leaves a signed receipt on-chain.',
        points: ['Six security gates per call', 'Tamper-proof logs', '30 to 60 percent fewer tokens'],
        diagram: 'pavii',
        link: { title: 'See Pavii', url: '/products/pavii/' },
      },
      {
        id: 'forward-deployed-engineering',
        title: 'Forward-deployed engineering',
        content:
          'We do not just hand over software. Our engineers work inside your stack to connect Hyper 0X with your systems, public chains, bank DLTs and APIs, from pilot to production.',
        points: ['Scoped pilot first', 'Success metrics agreed up front', 'Support through production'],
        diagram: 'platform',
      },
    ],
  },

  contact: {
    title: 'Contact',
    seoTitle: 'Contact Buckleson: Talk to a Blockchain Engineer',
    metaDescription:
      'Talk to Buckleson about a custom blockchain, asset tokenization, a crypto wallet or AI-agent security. Book a 30-minute call or email our team directly.',
    heading: 'Talk to a blockchain engineer',
    subTitle:
      'Tell us what you want to put on-chain. A Buckleson engineer will reply, usually within one to two business days.',
    bookTitle: 'Book a 30-minute call',
    bookContent: 'Pick a time that suits you. We will learn your use case and suggest a first pilot.',
    bookBtn: 'Choose a time',
    formTitle: 'Or send us the details',
    formNote: 'Sending opens your email app with the message filled in, addressed to vijay@buckleson.com.',
    name: 'Your name',
    company: 'Company',
    email: 'Work email',
    topic: 'What do you want to build?',
    topics: ['Custom blockchain or private L2', 'Asset tokenization', 'Wallet, exchange or SDKs', 'AI-agent security (Pavii)', 'Something else'],
    details: 'Details',
    send: 'Write the email',
    emailHeading: 'Email',
    docsHeading: 'Documentation',
    docsLink: 'Read the Hyper 0X docs',
  },

  blogIndex: {
    title: 'Blog',
    seoTitle: 'Blockchain Development & Security Blog | Buckleson',
    metaDescription:
      'Guides on custom blockchain development, asset tokenization, private L2s, post-quantum security, AI-agent security and crypto wallet SDKs, from Buckleson.',
    heading: 'Notes from the chain',
    subTitle:
      'Plain-language guides on building with blockchain: custom chains, tokenized assets, wallets and AI-agent security, from the team that built Hyper 0X.',
    noPosts: 'No posts yet. Check back soon.',
  },

  productsIndex: {
    title: 'Products',
    seoTitle: 'Blockchain Products: Hyper 0X, Pavii, Hyper Wallet | Buckleson',
    metaDescription:
      "Buckleson's blockchain products: the Hyper 0X enterprise blockchain, Pavii AI-agent security and Hyper Wallet & SDKs, with H0X Pay and HyperRun coming soon.",
    heading: 'Blockchain products built on Hyper 0X',
    subTitle:
      'Every product we ship runs on Hyper 0X, our own blockchain. Start with the chain itself, secure your AI agents with Pavii, or launch a wallet with Hyper Wallet & SDKs.',
    soonHeading: 'Coming soon',
    cta: {
      title: 'Not sure where to start?',
      subTitle: 'Book a 30-minute call. We will map your use case to the right product or a custom chain.',
      btn: 'Book a call',
    },
    testimonials: {
      title: 'Proof points',
      quotes: [
        {
          content:
            '10x Technologies is piloting the Hyper 0X blockchain-based AI training and inference module in a live enterprise environment.',
          author: '10x Technologies',
          role: 'Enterprise pilot | Hyper 0X',
          avatarAlt: 'Buckleson logo',
        },
        {
          content:
            'Hyper Wallet has processed over 2 million transactions across 33,000+ portfolios, and saved users more than $128K in fees.',
          author: 'Hyper Wallet',
          role: 'Live product | Hyper 0X',
          avatarAlt: 'Hyper Wallet logo',
        },
        {
          content:
            'Pavii cut token usage by 30–60% on a real Claude Code task, and has saved over 100 million tokens across 82,000+ queries.',
          author: 'Pavii',
          role: 'Live product | AI-agent security',
          avatarAlt: 'Pavii logo',
        },
      ],
    },
  },

  /** JSON data for FAQs. */
  data: { faqs },
};
