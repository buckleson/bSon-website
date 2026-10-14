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
      'Buckleson is a blockchain infrastructure company. We build custom blockchains, tokenize real-world assets, launch crypto wallets and protect AI agents.',
    /** schema.org `WebSite.description` in every page's `isPartOf`. */
    descriptionShort: 'Blockchain infrastructure company: custom blockchains, asset tokenization, wallets and AI-agent security on Hyper 0X.',
    ogTitle: 'Buckleson: Blockchain Development & Infrastructure Company',
    ogDescription:
      'We build custom blockchains, wallets, exchanges and AI-agent security for enterprises. All of it runs on Hyper 0X, our own L1, with an L2 for every customer.',
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
      'Write a valid email address so that we can reply to you',
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
    eyebrow: 'Error 404 · block not found',
    claim: 'This block was',
    payoff: 'never minted.',
    content:
      'We searched every validator on Hyper 0X and came back empty. The link may be old, or the page has moved. Every other block below is live, so pick one and keep going.',
    terminal: [
      { kind: 'cmd', text: 'hyper0x block get 404' },
      { kind: 'info', text: 'asking 7 validators…' },
      { kind: 'info', text: 'consensus reached in one pass' },
      { kind: 'bad', text: 'block #404: not found' },
      { kind: 'bad', text: 'status: never minted' },
      { kind: 'ok', text: 'suggestion: try a live block below' },
    ],
    chainLabel: 'Live blocks on this chain',
    mint: 'Mint #404',
    missing: 'empty slot',
    goHome: 'Back to home',
    goBack: 'Go back',
  },

  home: {
    metaTitle: 'Buckleson: Blockchain Development & Infrastructure Company',
    banner: 'Coming soon: H0X Pay and HyperRun',
    hero: {
      badge: 'Hyper 0X is live · post-quantum-resistant',
      lead: 'We build blockchains',
      phrases: ['for banks.', 'for asset issuers.', 'for fintechs.', 'for AI teams.'],
      intro:
        'Buckleson is the blockchain infrastructure company behind Hyper 0X, a post-quantum-resistant chain built for real money, real assets and AI that acts on its own. We give every client its own chain, ready for production.',
      primaryBtn: 'Book a call',
      secondaryBtn: 'See our products',
      counterLabel: 'transactions settled through Hyper Wallet',
      chips: ['Custom blockchains', 'Asset tokenization', 'Wallets & exchanges', 'AI-agent security'],
    },
    glanceIntro: {
      label: 'At a glance',
      statement:
        'We own the chain we build on. So every product we ship and every chain we launch for a client starts from the same foundation: final in one pass, private by default, and post-quantum-resistant from day one.',
      pilot: {
        company: '10x Technologies',
        text: 'Runs a pilot of the Hyper 0X module for AI training and inference, in a real enterprise environment.',
      },
    },
    logos: 'Works with',
    why: {
      label: 'Why Hyper 0X',
      claim: 'Public chains were never built for banks.',
      payoff: 'So we built our own.',
      body:
        'Renting a public chain means inheriting its fees, its roadmap and its outages. Hyper 0X turns that around: one L1 settles everything, and every application runs on its own L2, shaped around its rules. Launch one for a pilot, scale it when demand spikes, retire it when you move on.',
      cards: [
        {
          figure: 'chain-rack',
          tags: ['Hyper 0X', 'L1 + private L2s'],
          title: 'How our blockchain works',
          text: 'Hyper 0X is one L1 that settles everything. Each application gets its own L2 with its own rules, privacy and size. Add, change or retire an L2 at any time. Blocks grow when traffic is high and shrink when it is low.',
          stat: '1 pass',
          statLabel: 'to final, with no reorgs',
          cta: { title: 'Explore Hyper 0X', url: '/products/hyper-0x/' },
        },
        {
          figure: 'pavii-gates',
          tags: ['Pavii', 'AI-agent security'],
          title: 'How we protect AI agents',
          text: 'Every prompt and tool call from your agents passes six gates: injection, privacy, supply chain, budget, egress and output. Safe calls go through. Pavii stops malicious calls, and every decision gets a receipt on Hyper 0X.',
          stat: '100M+',
          statLabel: 'AI tokens saved across 82K+ queries',
          cta: { title: 'Explore Pavii', url: '/products/pavii/' },
        },
        {
          figure: 'cipher-tower',
          tags: ['Encryption', 'Post-quantum-resistant'],
          title: 'Four layers of encryption',
          text: 'Your data stays encrypted in transit, in use, on the ledger and at rest. Every connection uses hybrid X25519 and ML-KEM-768. Each party has its own encrypted record, and the master keys stay in an HSM.',
          stat: '4 layers',
          statLabel: 'in transit, in use, on the ledger, at rest',
          cta: { title: 'How the layers work', url: '/blog/blockchain-data-encryption-four-layers/' },
        },
      ],
    },
    products: {
      label: 'Products',
      claim: 'One chain.',
      payoff: 'Five products on top.',
      body: 'Everything we ship runs on Hyper 0X, from guardrails for AI agents to a wallet that has already moved more than two million transactions. Open a product and watch it work.',
      cta: { title: 'All products', url: '/products/' },
    },
    services: {
      label: 'Services',
      claim: 'Tell us what to put on-chain.',
      payoff: 'We will build it with you.',
      body: 'From a first pilot to a chain in production, our engineers build alongside your team. Every project gets its own private L2.',
      items: [
        {
          id: 'custom-blockchains',
          title: 'Custom blockchains',
          line: 'Get your own chain without starting from zero.',
          included: ['Private L2 with your rules', 'Bridges to public chains', 'Connected to your core systems'],
          outcome: 'Your chain, your rules',
          mock: 'chain',
        },
        {
          id: 'asset-tokenization',
          title: 'Asset tokenization',
          line: 'Put gold, funds, invoices or property on a chain.',
          included: ['Tokens minted 1:1 with custody', 'KYC and limits as code', 'Secondary market with atomic swaps'],
          outcome: 'Sell assets in $10 slices',
          mock: 'token',
        },
        {
          id: 'wallets-exchanges',
          title: 'Wallets & exchanges',
          line: 'A wallet or exchange with your brand, on technology already in production.',
          included: ['BTC, ETH, SOL and more, non-custodial', 'Order book in consensus', 'Payments and gateway SDKs'],
          outcome: 'Built on 2M+ live transactions',
          mock: 'wallet',
        },
        {
          id: 'ai-agent-security',
          title: 'AI-agent security',
          line: 'Let AI agents work, and keep the keys yourself.',
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
      body: 'Start small, prove it fast, then go to production. You see it working before you commit.',
      steps: [
        { title: 'Discovery call', text: 'We learn your use case, your data and your rules.', stage: 'Scope', artifact: 'A one-page pilot scope' },
        { title: 'Pilot on your L2', text: 'One use case and one engineer. We agree on the success measures at the start.', stage: 'Prove', artifact: 'A working L2 and explorer' },
        { title: 'Security review', text: 'We review the compliance rules, keys and bridges before launch.', stage: 'Harden', artifact: 'A signed-off review checklist' },
        { title: 'Production', text: 'Your chain goes live, and we stay on to run and grow it.', stage: 'Run', artifact: 'A live chain with support' },
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
        'Money, assets and the decisions of AI should run on records that anyone with permission can verify. We are building that layer, and it is already live.',
      story: [
        'We built our own blockchain, Hyper 0X, so we control its fees, roadmap and security model.',
        'Then we built on it ourselves. Hyper Wallet has processed more than 2 million transactions, and Pavii protects AI agents in production.',
        'Today the same foundation runs the private chains we build for banks, fintechs and asset issuers.',
      ],
      cta: { title: 'Read our story', url: '/about/' },
    },
    glance: {
      title: 'Buckleson at a glance',
      facts: [
        { term: 'Who we are', detail: 'A blockchain infrastructure company that builds its own blockchain and the products that run on it.' },
        { term: 'What we build', detail: 'Custom blockchains, asset tokenization, crypto wallets and exchanges, and security for AI agents.' },
        { term: 'Hero product', detail: 'Hyper 0X: a permissioned, post-quantum-resistant L1 with a private L2 for every customer.' },
        { term: 'Live products', detail: 'Hyper 0X, Pavii and Hyper Wallet & SDKs. H0X Pay and HyperRun are coming soon.' },
        { term: 'Who it is for', detail: 'Banks, fintechs, asset issuers and teams that run AI agents.' },
        { term: 'How to start', detail: 'Book a 30-minute call. We then scope a pilot on your own L2.' },
      ],
    },
    faq: {
      label: 'FAQ',
      claim: 'Questions,',
      payoff: 'answered.',
      stillUnsure: 'Still unsure?',
      stillUnsureText: 'Talk to an engineer for 30 minutes. No slides, only your use case.',
    },
    latestPosts: {
      label: 'Insights',
      claim: 'What we learn',
      payoff: 'when we build on-chain.',
      cta: 'All articles',
    },
    finalCta: {
      claim: 'Build the next financial rail',
      payoff: 'on Hyper 0X.',
      text: 'Thirty minutes with one of our engineers is enough to turn your idea into a pilot on your own L2.',
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
        'We design, build and run blockchain systems for banks, fintechs, asset issuers and AI teams. Every project runs on Hyper 0X, the chain we built and operate, so you get your own L2, your own rules and one record that everyone can verify.',
      cta: 'Book a call',
    },
    stats: {
      title: 'Built for institutional scale',
      subTitle: 'We run what we sell. These numbers come from our own products in production.',
      items: [
        { value: '2M+', label: 'transactions through Hyper Wallet' },
        { value: '33K+', label: 'portfolios managed' },
        { value: '$128K+', label: 'saved by users in fees' },
        { value: '100M+', label: 'AI tokens saved by Pavii' },
      ],
    },
    items: [
      {
        id: 'custom-blockchains',
        title: 'Custom blockchains and private L2s',
        content:
          'Get your own blockchain without starting from zero. We set up a private L2 on Hyper 0X with your sequencer, rules, privacy model and bridges. Then we connect it to your core systems.',
        points: ['Your rules, enforced as code', 'Per-party encrypted records', 'Bridges to EVM chains, Solana and Sui'],
        diagram: 'hyper0x',
      },
      {
        id: 'asset-tokenization',
        title: 'Asset tokenization',
        content:
          'Put gold, funds, bonds, invoices or property on a chain. We build the token, the compliance rules, the investor wallet and the secondary market. Every trade settles atomically: both sides settle, or neither does.',
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
          'Put secure wallets, payments and a payment gateway into your internal tools and customer apps. The SDK signs, checks and records every transfer, so you get one audit trail for all your apps.',
        points: ['Launch a neobank or payment gateway', 'In-app wallets for games', 'One audit trail'],
        diagram: 'platform',
      },
      {
        id: 'ai-agent-security',
        title: 'AI-agent security',
        content:
          'We protect how your AI agents act, not what they think. With Pavii and Hyper 0X, we stop prompt injection, data leaks and rogue agents. Every action leaves a signed receipt on the chain.',
        points: ['Six security gates per call', 'Tamper-proof logs', '30 to 60 percent fewer tokens'],
        diagram: 'pavii',
        link: { title: 'See Pavii', url: '/products/pavii/' },
      },
      {
        id: 'forward-deployed-engineering',
        title: 'Forward-deployed engineering',
        content:
          'We do more than deliver software. Our engineers work inside your team. They connect Hyper 0X to your systems, public chains, bank ledgers and APIs, from the pilot to production.',
        points: ['Scoped pilot first', 'Success metrics agreed up front', 'Support through production'],
        diagram: 'hyper0x',
      },
    ],
  },

  faqPage: {
    title: 'FAQ',
    seoTitle: 'Blockchain & AI-Agent Security FAQ | Buckleson',
    metaDescription:
      'Plain answers to what people ask about enterprise blockchains, AI-agent security, asset tokenization, business crypto wallets and post-quantum encryption.',
    label: 'FAQ',
    claim: 'Straight answers on',
    payoff: 'blockchain and AI security.',
    intro:
      'The questions banks, fintechs, asset issuers and AI teams ask most, answered in plain English. Each answer links to a guide that goes deeper.',
    more: 'Is your question not here?',
    moreText: 'Ask an engineer. A 30-minute call is usually enough to map your use case.',
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
        'Buckleson builds blockchain infrastructure and the products that run on it. We started from one belief: if banks, fintechs and AI teams are going to trust a blockchain with real money and real decisions, someone has to own the whole stack and answer for it.',
        'So we built Hyper 0X, our own permissioned L1. Every customer gets a private L2, every transaction is final in one pass, and every connection is post-quantum-resistant.',
        'Then we proved it on ourselves first. Hyper Wallet has processed more than 2 million transactions, and Pavii guards AI agents in production and has saved more than 100 million tokens.',
        'Today that same foundation powers the custom chains, tokenized assets, wallets and AI-agent security we build for clients. H0X Pay and HyperRun are next.',
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
    formNote: 'When you send, your email app opens with the message ready, addressed to vijay@buckleson.com.',
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
      'Clear guides to building with blockchain, from custom chains and tokenized assets to wallets and AI-agent security. Written by the team that built Hyper 0X.',
    noPosts: 'No posts yet. Check back soon.',
  },

  productsIndex: {
    title: 'Products',
    seoTitle: 'Blockchain Products: Hyper 0X, Pavii, Hyper Wallet | Buckleson',
    metaDescription:
      "Buckleson's blockchain products: the Hyper 0X enterprise blockchain, Pavii AI-agent security and Hyper Wallet & SDKs, with H0X Pay and HyperRun coming soon.",
    heading: 'Blockchain products built on Hyper 0X',
    subTitle:
      'Every product we ship runs on Hyper 0X, our own blockchain. Start with the chain itself, put guardrails around your AI agents with Pavii, or launch a wallet on rails that already carry millions of transactions.',
    soonHeading: 'Coming soon',
    why: {
      title: 'Why build on Hyper 0X?',
      subTitle:
        'On most blockchains, you take on the fees, the roadmap and the outages of someone else. Hyper 0X is ours. So every product that we build, and every chain that we build for you, gets the same base.',
      benefits: [
        'Final in one pass: no reorgs, no front-running.',
        'Post-quantum-resistant encryption on every connection.',
        'A private L2 for every customer, on one shared record.',
      ],
    },
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
            '10x Technologies runs a pilot of the Hyper 0X module for AI training and inference, in a live enterprise environment.',
          author: '10x Technologies',
          role: 'Enterprise pilot | Hyper 0X',
          avatarAlt: 'Buckleson logo',
        },
        {
          content:
            'Hyper Wallet has processed more than 2 million transactions across 33,000+ portfolios. It saved users more than $128K in fees.',
          author: 'Hyper Wallet',
          role: 'Live product | Hyper 0X',
          avatarAlt: 'Hyper Wallet logo',
        },
        {
          content:
            'Pavii cut token use by 30 to 60 percent on a real Claude Code task. It has saved more than 100 million tokens across 82,000+ queries.',
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
