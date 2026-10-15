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
      'We build custom blockchains, wallets, exchanges and AI-agent security for enterprises. All of it runs on Hyper 0X, our own L1, with a private L2 for every customer.',
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
    claim: 'This block',
    payoff: 'does not exist.',
    content:
      'We cannot find this page. Possibly the link is old, or we moved the page. Each block below opens a live page. Select one to continue.',
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
      lead: 'We build blockchain infrastructure',
      phrases: ['for banks.', 'for asset issuers.', 'for fintechs.', 'for AI teams.'],
      intro:
        'We solve real-world problems with blockchain. On Hyper 0X, our own chain, you get security and speed together.',
      primaryBtn: 'Book a call',
      secondaryBtn: 'See our products',
      counterLabel: 'transactions settled through Hyper Wallet',
      chips: ['Custom blockchains', 'Asset tokenization', 'Wallets & exchanges', 'AI-agent security'],
    },
    glanceIntro: {
      label: 'At a glance',
      statement:
        'Every product we ship and every chain we build for a client runs on Hyper 0X. So all of them share the same base: final in one pass, private by default and post-quantum-resistant.',
      pilot: {
        company: '10x Technologies',
        text: 'Runs a pilot of the Hyper 0X module for AI training and inference, in a real enterprise environment.',
      },
    },
    logos: 'Works with',
    why: {
      label: 'Why Hyper 0X',
      claim: 'Banks cannot control a public chain.',
      payoff: 'So we built our own.',
      body:
        'On a public chain, you pay its fees and follow its roadmap. When that chain stops, your application stops too. On Hyper 0X, you set the rules for your own L2.',
      cards: [
        {
          figure: 'chain-rack',
          tags: ['Hyper 0X', 'L1 + private L2s'],
          title: 'How our blockchain works',
          text: 'Hyper 0X is one L1, the main chain that settles every transaction. Each L2 has its own privacy and size. Add, change or remove an L2 at any time. Blocks grow when traffic is high and shrink when it is low.',
          stat: '1 pass',
          statLabel: 'to final, with no rewritten blocks',
          cta: { title: 'Explore Hyper 0X', url: '/products/hyper-0x/' },
        },
        {
          figure: 'pavii-gates',
          tags: ['Pavii', 'AI-agent security'],
          title: 'How we protect AI agents',
          text: 'Pavii checks every prompt and tool call at six gates: injection, privacy, supply chain, budget, egress (outbound data) and output. It lets safe calls through and stops malicious ones. Each decision gets a receipt on Hyper 0X.',
          stat: '100M+',
          statLabel: 'AI tokens saved across 82K+ queries',
          cta: { title: 'Explore Pavii', url: '/products/pavii/' },
        },
        {
          figure: 'cipher-tower',
          tags: ['Encryption', 'Post-quantum-resistant'],
          title: 'Four layers of encryption',
          text: 'Every connection uses a hybrid X25519 and ML-KEM-768 key exchange. Each party has its own encrypted record. The master keys stay in an HSM, a hardware device that protects keys.',
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
      body: 'Three products are live, and two will launch soon. Open a product to see how it works.',
      cta: { title: 'All products', url: '/products/' },
    },
    services: {
      label: 'Services',
      claim: 'Tell us what to put on-chain.',
      payoff: 'We will build it with you.',
      body: 'Our engineers work with your team, from the first pilot to production. Every project gets its own private L2, a blockchain that settles on Hyper 0X.',
      items: [
        {
          id: 'custom-blockchains',
          title: 'Custom blockchains',
          line: 'Get your own blockchain on a base that is already live.',
          included: ['A private L2 with your rules', 'Bridges to public chains', 'A connection to your core systems'],
          outcome: 'Your chain, your rules',
          mock: 'chain',
        },
        {
          id: 'asset-tokenization',
          title: 'Asset tokenization',
          line: 'Put gold, funds, invoices or property on a chain.',
          included: ['One token for each asset in custody', 'KYC (identity checks) and limits as code', 'A secondary market with all-or-nothing trades'],
          outcome: 'Sell assets in $10 units',
          mock: 'token',
        },
        {
          id: 'wallets-exchanges',
          title: 'Wallets & exchanges',
          line: 'A wallet or exchange with your brand, on technology already in production.',
          included: ['BTC, ETH, SOL and more, with user-held keys', 'An on-chain order book', 'Payment and gateway SDKs'],
          outcome: 'Built on 2M+ live transactions',
          mock: 'wallet',
        },
        {
          id: 'ai-agent-security',
          title: 'AI-agent security',
          line: 'Let AI agents work while you control what they can do.',
          included: ['Six security gates per call', 'Tamper-proof receipts on-chain', 'Budgets and a kill switch'],
          outcome: '30 to 60% fewer tokens',
          mock: 'agent',
        },
      ],
    },
    process: {
      label: 'How we work',
      claim: 'From a first call',
      payoff: 'to a live chain.',
      body: 'Start with a small pilot. You see it work before you decide on production.',
      steps: [
        { title: 'Discovery call', text: 'We learn your use case, your data and your rules.', stage: 'Scope', artifact: 'A one-page pilot scope' },
        { title: 'Pilot on your L2', text: 'We build one use case with one engineer. We agree on the success measures at the start.', stage: 'Prove', artifact: 'A working L2 and a block explorer' },
        { title: 'Security review', text: 'We review the compliance rules, keys and bridges before launch.', stage: 'Protect', artifact: 'A signed review checklist' },
        { title: 'Production', text: 'Your chain goes live. We continue to run it and grow it with you.', stage: 'Run', artifact: 'A live chain with support' },
      ],
    },
    how: {
      label: 'See it run',
      claim: 'Watch a transaction',
      payoff: 'move through the system.',
      body: 'Select a flow. Each step lights up when it happens.',
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
        "We believe blockchain is more than crypto. It is the most underrated technology we have. It keeps people's data private and still shows a business the facts.",
      story: [
        'Crypto made blockchain famous for payments. But a blockchain also lets companies that do not trust each other work from one shared record.',
        'It can prove a fact, such as “this customer passed identity checks”, without showing the documents behind it. I started Buckleson to build systems like this, where a normal database is not enough.',
      ],
      person: { name: 'Vijay', role: 'Founder' },
      cta: { title: 'Read our story', url: '/about/' },
    },
    glance: {
      title: 'Buckleson at a glance',
      facts: [
        { term: 'Who we are', detail: 'A blockchain infrastructure company that builds its own blockchain and the products that run on it.' },
        { term: 'What we build', detail: 'Custom blockchains, asset tokenization, crypto wallets and exchanges, and security for AI agents.' },
        { term: 'Main product', detail: 'Hyper 0X: a permissioned, post-quantum-resistant L1 with a private L2 for every customer.' },
        { term: 'Live products', detail: 'Hyper 0X, Pavii and Hyper Wallet & SDKs. H0X Pay and HyperRun will launch soon.' },
        { term: 'Who it is for', detail: 'Banks, fintechs, asset issuers and teams that run AI agents.' },
        { term: 'How to start', detail: 'Book a 30-minute call. Then we plan a pilot on your own L2.' },
      ],
    },
    faq: {
      label: 'FAQ',
      claim: 'Questions,',
      payoff: 'answered.',
      stillUnsure: 'Still unsure?',
      stillUnsureText: 'Talk to an engineer for 30 minutes. We discuss your use case, not a slide deck.',
    },
    latestPosts: {
      label: 'Insights',
      claim: 'What we learn',
      payoff: 'when we build on-chain.',
      cta: 'All articles',
    },
    finalCta: {
      claim: 'Build your next financial product',
      payoff: 'on Hyper 0X.',
      text: 'Talk to one of our engineers for 30 minutes. You get a plan for a pilot on your own L2.',
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
      'Blockchain development services from Buckleson: custom blockchains, private L2s, asset tokenization, wallets and exchanges, wallet SDKs and AI-agent security.',
    intro: {
      title: 'Blockchain Development Services',
      subTitle:
        'We design, build and run blockchain systems for banks, fintechs, asset issuers and AI teams. Each project gets a private L2: its own blockchain that settles on Hyper 0X, the chain we built and run. You set the rules, and every party can verify one shared record.',
      cta: 'Book a call',
    },
    stats: {
      title: 'We run what we sell',
      subTitle: 'These numbers come from our own products in production.',
      items: [
        { value: '2M+', label: 'transactions through Hyper Wallet' },
        { value: '33K+', label: 'portfolios in Hyper Wallet' },
        { value: '$128K+', label: 'saved by users in wallet fees' },
        { value: '100M+', label: 'AI tokens saved by Pavii' },
      ],
    },
    items: [
      {
        id: 'custom-blockchains',
        title: 'Custom blockchains and private L2s',
        content:
          'Get your own blockchain on a base that is already live. We set up a private L2 on Hyper 0X with your sequencer, rules, privacy model and bridges. Then we connect it to your core systems.',
        points: ['Code enforces your rules', 'An encrypted record for each party', 'Bridges to EVM chains, Solana and Sui'],
        diagram: 'hyper0x',
      },
      {
        id: 'asset-tokenization',
        title: 'Asset tokenization',
        content:
          'Put gold, funds, bonds, invoices or property on a chain. We build the token, the compliance rules, the investor wallet and the secondary market. Every trade settles atomically: both sides settle, or neither does.',
        points: ['One token for each asset in custody', 'Identity (KYC) and limit checks before each trade', 'An investor app with your brand'],
        diagram: 'tokenization',
        link: { title: 'Read the tokenization guide', url: '/blog/asset-tokenization-guide/' },
      },
      {
        id: 'wallets-exchanges',
        title: 'Custom wallets, exchanges and compliance',
        content:
          'We build wallets and exchanges the way we built Hyper Wallet: on-chain order books, atomic settlement and no seed phrases. We can also run your existing crypto compliance as code.',
        points: ['An on-chain central limit order book', 'Two-person (maker-checker) approvals', 'Account abstraction for users'],
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
          'We check every prompt and tool call from your AI agents. With Pavii and Hyper 0X, we stop prompt injection, data leaks and agents that break their rules. Every action gets a signed receipt on the chain.',
        points: ['Six security gates per call', 'Tamper-proof receipts', '30 to 60 percent fewer tokens'],
        diagram: 'pavii',
        link: { title: 'See Pavii', url: '/products/pavii/' },
      },
      {
        id: 'forward-deployed-engineering',
        title: 'Forward-deployed engineering',
        content:
          'Our engineers work inside your team, from the pilot to production. They connect Hyper 0X to your systems, public chains, bank ledgers and APIs.',
        points: ['A small pilot first', 'Success measures agreed at the start', 'Support in production'],
        diagram: 'hyper0x',
      },
    ],
  },

  faqPage: {
    title: 'FAQ',
    seoTitle: 'FAQ: Blockchain, Tokenization, Wallets & AI Agents | Buckleson',
    metaDescription:
      'Plain answers to what people ask about enterprise blockchains, AI-agent security, asset tokenization, business crypto wallets and post-quantum encryption.',
    label: 'FAQ',
    claim: 'Clear answers on',
    payoff: 'blockchain and AI security.',
    intro:
      'We answer the questions that banks, fintechs, asset issuers and AI teams ask most, in plain English. Each answer links to a guide with more detail.',
    more: 'Is your question not here?',
    moreText: 'Ask an engineer. A 30-minute call is usually enough to understand your use case.',
  },
  about: {
    title: 'About',
    seoTitle: 'About Buckleson: Our Story, Mission, Vision and Founder',
    metaDescription:
      'Buckleson started as a crypto wallet and built its own blockchain, Hyper 0X. Read our story, mission and vision, and what blockchain can do beyond payments.',
    label: 'About Buckleson',
    claim: 'Blockchain is more than payments.',
    payoff: 'We build what else it can do.',
    lead: 'Buckleson is a blockchain infrastructure company. We started with a crypto wallet. Then we built our own blockchain, Hyper 0X. Today we build private blockchains, tokenized assets, wallets and AI-agent security for banks, fintechs, asset issuers and AI teams.',
    story: {
      label: 'Our story',
      title: 'From a wallet to our own blockchain.',
      steps: [
        {
          title: 'We started with a wallet.',
          text: 'Our first product was Hyper Wallet, a crypto wallet and exchange in one app. Today it has 33K+ portfolios and 2M+ transactions.',
        },
        {
          title: 'We saw the hidden charges.',
          text: 'Many wallets earn money from charges that users do not see. Examples are a worse price on each swap or a wallet fee on top of the exchange fee. We wanted to remove these charges, not hide them better.',
        },
        {
          title: 'We built a blockchain that works as an order book.',
          text: 'So we built our own blockchain, Hyper 0X. An order book runs inside its consensus, so the chain matches buy and sell orders itself, like an exchange that no single party runs. Users pay one fee, not two. Hyper Wallet users have saved $128K+ in wallet fees.',
        },
        {
          title: 'We met the blockchain trilemma.',
          text: 'Most blockchains give up one of three things: decentralization, scalability or security. We built Hyper 0X as a modular chain that keeps all three.',
        },
        {
          title: 'Microservices gave us the answer.',
          text: 'Good software splits one large system into small services. We did the same with a blockchain. Each application or policy gets its own L2. L3s on top of an L2 are coming soon. When one application needs more transactions, only its L2 grows. The shared L1 does the final settlement and audit for all of them, and no single node sets the order of transactions.',
        },
        {
          title: 'Today',
          text: 'Hyper 0X runs our own products and the private chains that we build for banks, fintechs, asset issuers and AI teams. Pavii protects AI agents on it. H0X Pay and HyperRun will launch next.',
        },
      ],
      belief: 'We believe blockchain is one of the most underrated technologies. Payments are only the start.',
    },
    stats: [
      { value: '2M+', label: 'transactions through Hyper Wallet' },
      { value: '33K+', label: 'portfolios in Hyper Wallet' },
      { value: '$128K+', label: 'saved by users in wallet fees' },
      { value: '100M+', label: 'AI tokens saved by Pavii' },
    ],
    pillars: {
      label: 'What drives us',
      claim: 'Why we exist,',
      payoff: 'and what makes us different.',
      items: [
        {
          label: 'Mission',
          title: 'Solve what a database cannot.',
          text: 'We use blockchain where a normal database is not enough: records that many companies share, privacy with proof, and ownership that everyone can check.',
        },
        {
          label: 'Vision',
          title: 'Records that nobody can secretly change.',
          text: 'We want critical systems to run on shared records that nobody can secretly edit, while each person keeps control of their own data.',
        },
        {
          label: 'Goal',
          title: 'A blockchain for every application.',
          text: 'We want any company to start its own chain as easily as a cloud server. Each application gets a private L2, with settlement and audit on one shared L1.',
        },
        {
          label: 'Moat',
          title: 'We own every layer.',
          text: 'We built the L1, the L2s, the wallet and the AI security gateway ourselves. So we control fees, roadmap and security, and we test every idea in our own products first.',
        },
      ],
    },
    beyond: {
      label: 'Beyond payments',
      claim: 'Where blockchain does',
      payoff: 'what a database cannot.',
      body: 'A database works when one company owns the data and everyone trusts that company. Many real problems have no such owner. That is where a blockchain helps.',
      items: [
        {
          icon: 'idcard',
          title: 'Prove a fact, keep the data private',
          text: 'Check that a customer passed identity checks, is old enough or has enough funds, without seeing their documents. The proof is enough, and the data stays with its owner.',
          url: '/blog/verify-customers-without-sharing-data/',
        },
        {
          icon: 'group-3',
          title: 'Run one process across many companies',
          text: 'A shipment, a loan or an insurance claim can involve five companies. On a shared ledger, each party sees the same steps and only its own private data. Nobody has to own the database.',
          url: '/services/custom-blockchains/',
        },
        {
          icon: 'coin',
          title: 'Own a part of a large asset',
          text: 'Split a building, a fund or a bar of gold into small units. Each owner can prove what they own, and units trade and settle in one step.',
          url: '/services/asset-tokenization/',
        },
        {
          icon: 'safe-lock',
          title: 'Audit without exposing everything',
          text: 'Each party keeps its records encrypted, and the ledger keeps a fingerprint of each one. An auditor can confirm that nothing changed and read only what it has a key for.',
          url: '/blog/blockchain-data-encryption-four-layers/',
        },
        {
          icon: 'list-check',
          title: 'Rules that run before money moves',
          text: 'Limits, approvals and identity checks run before a transaction executes. A breach does not happen, so nobody has to undo it later.',
          url: '/blog/compliance-as-code-blockchain/',
        },
        {
          icon: 'ai',
          title: 'AI agents that you can audit',
          text: 'Every action of an AI agent leaves a signed receipt on the chain. Nobody can secretly change it, so you can give agents real work.',
          url: '/products/pavii/',
        },
      ],
      note: 'And payments too: they settle in one pass, with one fee.',
      more: { title: 'What blockchain can do beyond payments', url: '/blog/blockchain-use-cases-beyond-payments/' },
    },
    faq: {
      label: 'Questions about us',
      claim: 'About Buckleson,',
      payoff: 'in short answers.',
      items: [
        {
          question: 'Who founded Buckleson?',
          answer: 'Vijay founded Buckleson. The company started with a crypto wallet, Hyper Wallet, and then built its own blockchain, Hyper 0X.',
        },
        {
          question: 'Why did Buckleson build its own blockchain?',
          answer: 'Many wallets earn money from hidden charges. Buckleson built Hyper 0X with an order book inside its consensus, so users pay one fee, not two. Then the team made it modular: a private L2 for each application and one shared L1 for settlement and audit.',
        },
        {
          question: 'What can a blockchain do besides payments?',
          answer: 'A blockchain can prove a fact without showing private data. It lets many companies run one process on a shared record. It splits large assets into small units that owners can verify. It also runs rules before a transaction executes and keeps a record of AI agent actions that nobody can secretly change.',
        },
        {
          question: 'How does Hyper 0X handle the blockchain trilemma?',
          answer: 'Hyper 0X splits the work, like microservices. Each application gets its own L2, so it can grow alone, and L3s on top of an L2 are coming soon. The shared L1 does the final settlement and audit with leaderless consensus, so no single node sets the order of transactions.',
        },
      ],
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
    bookContent: 'In the call, we learn about your use case and suggest a first pilot.',
    bookBtn: 'Choose a time',
    formTitle: 'Or send us the details',
    formNote: 'The button below opens your email app with a message to vijay@buckleson.com, ready to send.',
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
    seoTitle: 'Blockchain, Tokenization & AI Security Guides | Buckleson',
    metaDescription:
      'Plain guides to private L2s, asset tokenization, crypto wallets, post-quantum security and AI-agent security, from the engineers who built Hyper 0X.',
    heading: 'Guides from our engineers',
    subTitle:
      'Learn how to build with blockchain, from custom chains and tokenized assets to wallets and AI-agent security. The team that built Hyper 0X writes every guide.',
    noPosts: 'No posts yet. Come back soon.',
  },

  productsIndex: {
    title: 'Products',
    seoTitle: 'Blockchain Products: Hyper 0X, Pavii, Hyper Wallet | Buckleson',
    metaDescription:
      "Buckleson's blockchain products: the Hyper 0X enterprise blockchain, Pavii AI-agent security and Hyper Wallet & SDKs, with H0X Pay and HyperRun coming soon.",
    heading: 'Blockchain products built on Hyper 0X',
    subTitle:
      'Every product we ship runs on Hyper 0X, our own blockchain. Start with the chain, protect your AI agents with Pavii, or launch your own wallet with Hyper Wallet & SDKs.',
    soonHeading: 'Coming soon',
    why: {
      title: 'Why build on Hyper 0X?',
      subTitle:
        'On a public blockchain, you accept the fees, the roadmap and the outages of someone else. Hyper 0X is ours. Every product we build, and every chain we build for you, runs on it.',
      benefits: [
        'Final in one pass: blocks never change, and nobody can trade ahead of your order.',
        'Post-quantum-resistant encryption on every connection.',
        'Every customer gets a private L2: its own chain that settles on one shared record.',
      ],
    },
    cta: {
      title: 'Not sure where to start?',
      subTitle: 'Book a 30-minute call. We will match your use case to the right product or to a custom chain.',
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
            'Hyper Wallet processed more than 2 million transactions for 33,000+ portfolios. It saved its users more than $128K in wallet fees.',
          author: 'Hyper Wallet',
          role: 'Live product | Hyper 0X',
          avatarAlt: 'Hyper Wallet logo',
        },
        {
          content:
            'Pavii cut token use by 30 to 60 percent on one measured Claude Code task. It saved more than 100 million tokens across 82,000+ queries.',
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
