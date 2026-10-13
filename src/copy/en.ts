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
      badge: 'Hyper 0X is live · post-quantum-resistant',
      lead: 'We build blockchains',
      phrases: ['for banks.', 'for asset issuers.', 'for fintechs.', 'for AI teams.'],
      intro:
        'Buckleson is a blockchain infrastructure company. We built our own chain, Hyper 0X, and use it to launch custom blockchains, tokenized assets, wallets and AI-agent security.',
      primaryBtn: 'Book a call',
      secondaryBtn: 'See our products',
      counterLabel: 'transactions settled through Hyper Wallet',
      chips: ['Custom blockchains', 'Asset tokenization', 'Wallets & exchanges', 'AI-agent security'],
    },
    glanceIntro: {
      label: 'At a glance',
      statement:
        'We own the chain we build on. So every product we ship and every client we serve gets the same foundation: final in one pass, private by default and built to last.',
      quote: {
        content:
          '10x Technologies is running an enterprise pilot of the Hyper 0X blockchain-based AI training and inference module, validating our security architecture in a real-world environment.',
        author: '10x Technologies',
        role: 'Enterprise pilot',
      },
    },
    logos: 'Connects to',
    why: {
      label: 'Why Hyper 0X',
      claim: "Public chains don't fit banks.",
      payoff: 'So we built our own.',
      body:
        "Renting a public chain means sharing its fees, its roadmap and its outages. Hyper 0X gives every customer a private L2 with their own rules, settled on one shared L1.",
      facts: ['Own L1', 'A private L2 per customer', 'Post-quantum-resistant', 'No seed phrases'],
    },
    products: {
      label: 'Products',
      claim: 'One chain.',
      payoff: 'Five products on top.',
      body: 'Everything we ship runs on Hyper 0X. Open a product to see how it works.',
      cta: { title: 'All products', url: '/products/' },
    },
    services: {
      label: 'Services',
      claim: 'Tell us what to put on-chain.',
      payoff: 'We build it with you.',
      body: 'Four things we build for clients, each on its own private L2. Scroll to switch.',
      items: [
        {
          id: 'custom-blockchains',
          title: 'Custom blockchains',
          line: 'Your own chain, without building one from zero.',
          included: ['Private L2 with your rules', 'Bridges to public chains', 'Connected to your core systems'],
          outcome: 'Your chain, your rules',
          mock: 'chain',
        },
        {
          id: 'asset-tokenization',
          title: 'Asset tokenization',
          line: 'Put gold, funds, invoices or property on-chain.',
          included: ['Tokens minted 1:1 with custody', 'KYC and limits as code', 'Secondary market with atomic swaps'],
          outcome: 'Sell assets in $10 slices',
          mock: 'token',
        },
        {
          id: 'wallets-exchanges',
          title: 'Wallets & exchanges',
          line: 'A branded wallet or exchange on rails already in production.',
          included: ['20+ chains, non-custodial', 'Order book in consensus', 'Payments and gateway SDKs'],
          outcome: 'Built on 2M+ live transactions',
          mock: 'wallet',
        },
        {
          id: 'ai-agent-security',
          title: 'AI-agent security',
          line: 'Let AI agents work without handing them the keys.',
          included: ['Six security gates per call', 'Tamper-proof receipts on-chain', 'Budgets and kill switch'],
          outcome: '30-60% fewer tokens',
          mock: 'agent',
        },
      ],
    },
    process: {
      label: 'How we work',
      claim: 'From a first call',
      payoff: 'to a live chain.',
      body: 'Small first, then production. You see results before you commit.',
      steps: [
        { title: 'Discovery call', text: 'We learn your use case, your data and your rules.', stage: 'Scope' },
        { title: 'Pilot on your L2', text: 'One use case, one engineer, success metrics agreed up front.', stage: 'Prove' },
        { title: 'Security review', text: 'Compliance rules, keys and bridges are reviewed before launch.', stage: 'Harden' },
        { title: 'Production', text: 'Your chain goes live, and we stay on to run and grow it.', stage: 'Run' },
      ],
    },
    how: {
      label: 'See it run',
      claim: 'Watch a transaction',
      payoff: 'move through the system.',
      body: 'Pick a flow. Each step lights up as it happens.',
      tabs: [
        { label: 'Payment', icon: 'cube', system: 'hyper0x' },
        { label: 'Tokenization', icon: 'diamond', system: 'tokenization' },
        { label: 'Wallet trade', icon: 'wallet', system: 'wallet' },
        { label: 'AI agent call', icon: 'robot', system: 'pavii' },
      ],
    },
    vision: {
      label: 'Our vision',
      statement:
        'Money, assets and AI decisions should run on infrastructure you can verify, not just trust. We are building that infrastructure, one chain and one product at a time.',
      cta: { title: 'Read our story', url: '/about/' },
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
    faq: {
      label: 'FAQ',
      claim: 'Questions,',
      payoff: 'answered.',
      stillUnsure: 'Still unsure?',
      stillUnsureText: 'Talk to an engineer for 30 minutes. No slides, just your use case.',
    },
    latestPosts: {
      label: 'Insights',
      claim: 'What we learn',
      payoff: 'building on-chain.',
      cta: 'All articles',
    },
    finalCta: {
      claim: 'Ready to build',
      payoff: 'on Hyper 0X?',
      text: 'Book a 30-minute call. We will map your use case to a pilot on your own L2.',
      btn: 'Book a call',
      email: 'Or email vijay@buckleson.com',
    },
    heroAlt: {
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

  about: {
    title: 'About',
    seoTitle: 'About Buckleson: Our Vision and Story',
    metaDescription:
      'Buckleson is a blockchain infrastructure company. Read our story, why we built our own blockchain, Hyper 0X, and the vision behind our products and services.',
    label: 'About Buckleson',
    claim: 'We build the infrastructure',
    payoff: 'money and AI can trust.',
    story: {
      label: 'Our story',
      title: 'Why we own the whole stack, from consensus to the app in your hand.',
      paragraphs: [
        'Buckleson builds blockchain infrastructure and the products that run on it. We believe that if banks, fintechs and AI teams are going to trust a blockchain with real money and real decisions, someone has to own the whole stack.',
        'So we built Hyper 0X, our own permissioned L1. Every customer gets a private L2, every transaction is final in one pass, and every connection is post-quantum-resistant.',
        'Then we built on it ourselves. Hyper Wallet has processed more than 2 million transactions, and Pavii secures AI agents and has saved more than 100 million tokens.',
        'Today we use the same foundation to build custom blockchains, tokenized assets, wallets and AI-agent security for our clients, with H0X Pay and HyperRun coming next.',
      ],
    },
    stats: [
      { value: '2M+', label: 'transactions through Hyper Wallet' },
      { value: '33K+', label: 'portfolios managed' },
      { value: '$128K+', label: 'saved by users in wallet fees' },
      { value: '100M+', label: 'AI tokens saved by Pavii' },
    ],
    team: {
      label: 'Team',
      claim: 'Engineers, not',
      payoff: 'generalists.',
    },
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
