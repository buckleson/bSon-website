import faqs from '@data/faqs.json';
import features from '@data/features.json';
import pricing from '@data/pricing.json';

/**
 * English copy table. `Copy` (see `./index.ts`) is the shape of this table.
 *
 * Paths are site-relative (`/products`); callers run them through
 * `localePath()` from `@utils/locale`, which adds the deploy base path.
 */
const accent = (text: string) =>
  `<span class="text-violet-600 dark:text-violet-400">${text}</span>`;

export const en = {
  site: {
    /** Default `<meta name="description">` when a page sets none. */
    description:
      'Buckleson builds custom blockchains for enterprises. Hyper 0X, our own post-quantum-resistant L1, powers Pavii AI-agent security, Hyper Wallet and every solution we ship.',
    /** schema.org `WebSite.description` in every page's `isPartOf`. */
    descriptionShort: 'Custom blockchain solutions, powered by Hyper 0X.',
    ogTitle: 'Buckleson: Custom Blockchains, Powered by Hyper 0X',
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
    footer: {
      /** Section titles and link labels for `footerSections` in `@data/navigation`, keyed by id. */
      sectionTitles: {
        ecosystem: 'Ecosystem',
        company: 'Company',
      },
      links: {
        documentation: 'Hyper 0X Docs',
        tools: 'Products',
        services: 'Services',
        blog: 'Blog',
        customers: 'Contact',
      },
      hiringBadge: "We're hiring!",
      stayUpToDate: 'Stay up to date',
      stayUpToDateContent:
        'Product launches, Hyper 0X updates and engineering notes. No spam.',
      newsletterDemoMessage:
        'Thanks! (Demo only — wire an email service to collect real subscribers.)',
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
    demoFallbackMessage: 'Demo only — this form is not connected to a backend.',
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

  insights: {
    readMore: 'Read more',
    tableOfContents: 'Table of Contents:',
    ogSection: 'Insights',
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
    banner: 'Coming soon: H0X Pay and HyperRun',
    hero: {
      title: `We Build ${accent('Custom Blockchains')}`,
      subTitle:
        'Buckleson engineers private, post-quantum-resistant blockchains for enterprises. Every solution runs on Hyper 0X, our own L1, with a dedicated L2 for each customer.',
      primaryBtn: 'Explore Products',
      secondaryBtn: 'Talk to Our Team',
      imageAlt: 'Buckleson products running on the Hyper 0X blockchain',
    },
    clients: {
      title: 'One Chain, Many Products',
      subTitle:
        'Every Buckleson product signs, settles and logs on Hyper 0X, so all of them write to the same record.',
    },
    featuresGeneral: {
      title: 'Why Hyper 0X Is Hard to Copy',
      subTitle:
        "Hyper 0X is our own permissioned L1, engineered from scratch. We control the fees, the roadmap and the security model, so we can build what enterprises actually need instead of inheriting a public chain's limits.",
      imageAlt: 'Hyper 0X architecture overview',
    },
    featuresNavs: {
      title: `Products built on ${accent('Hyper 0X')}, live today.`,
      tabs: {
        tools: {
          heading: 'Hyper 0X',
          content:
            'Our own L1 with deterministic aBFT finality, hybrid post-quantum encryption and an L2 for every customer. Compliance rules run as code before any transaction executes.',
          alt: 'Hyper 0X blockchain architecture',
        },
        dashboard: {
          heading: 'Pavii',
          content:
            'Connect Claude, Codex, ChatGPT, Grok, OpenCode or your own agents. Every call passes six security gates, uses fewer tokens and leaves a tamper-proof receipt on Hyper 0X.',
          alt: 'Pavii AI-agent security flow',
        },
        features: {
          heading: 'Hyper Wallet & SDKs',
          content:
            'An exchange and a wallet in one app, with no double commissions. Our SDKs let you launch your own neobank or payment gateway on the same rails.',
          alt: 'Hyper Wallet architecture',
        },
      },
    },
    testimonials: {
      title: 'Proven in Production',
      subTitle:
        'Hyper 0X already powers live products and enterprise pilots. The numbers below come from our own products.',
      quotes: [
        {
          content:
            '10x Technologies is running an enterprise pilot of the Hyper 0X blockchain-based AI training and inference module, validating our security architecture in a real-world environment.',
          author: '10x Technologies',
          role: 'Enterprise pilot | AI training & inference',
        },
      ],
      statistics: [
        {
          count: '2M+',
          description: 'transactions processed through Hyper Wallet',
        },
        {
          count: '33K+',
          description: 'portfolios managed on Hyper Wallet',
        },
        {
          count: '$128K+',
          description: 'saved by users in wallet fees',
        },
        {
          count: '100M+',
          description: 'AI tokens saved by Pavii across 82K+ queries',
        },
      ],
    },
    faqTitle: 'Frequently<br />asked questions',
    heroAlt: {
      title: "Let's Build Your Chain",
      subTitle:
        'Tell us what you need to put on-chain. Our forward-deployed engineers will design your L2 on Hyper 0X with you, from pilot to production.',
      btn: 'Contact Us',
    },
  },

  services: {
    title: 'Services',
    metaDescription:
      'Buckleson builds custom blockchain solutions: asset tokenization, private L1/L2 networks, custom wallets and exchanges, wallet SDKs and blockchain-based security for AI agents.',
    ogTitle: 'Custom Blockchain Services | Buckleson',
    intro: {
      title: 'We Build Custom Blockchain Solutions',
      subTitle:
        'From bringing your assets on-chain to securing your AI agents, we design, build and run blockchain systems on Hyper 0X for enterprises and end users. You get your own L2 with your own rules, settled on one shared, verifiable record.',
      cta: 'Book a Consultation',
    },
    articles: {
      guidance: {
        title: 'Custom Blockchains & Asset Tokenization',
        subTitle:
          'We help you bring your assets on-chain, from gold and funds to invoices and other real-world assets, and give enterprises and end users secure access to blockchain. We build your own private L2 on Hyper 0X with its own policies, privacy and bridges, so your AI and other applications get the confidentiality they need.',
        imageAlts: [
          'Custom L2 networks settling on Hyper 0X',
          'Asset tokenization on Hyper 0X',
        ],
      },
      craftsmanship: {
        title: 'Custom Wallets, Exchanges & Compliance',
        subTitle:
          'We build custom wallets and exchanges for your business, the same way we built Hyper Wallet. Atomic settlement, on-chain order books and account abstraction come standard. We also manage your existing crypto compliance, with limits, KYC and maker-checker approvals enforced as code before any transaction runs.',
        imageAlts: ['Custom wallet and exchange architecture'],
        cta: 'See Hyper Wallet',
      },
      oversight: {
        title: 'Wallet SDKs for Your Internal Apps',
        subTitle:
          'We build custom wallet SDK support into your internal applications, so day-to-day activity is secured and closely monitored. Every transfer is signed, policy-checked and recorded on Hyper 0X, giving your team one audit trail across every app.',
        imageAlts: [
          'Wallet SDK embedded into internal apps',
          'Monitoring internal wallet activity',
        ],
      },
      maintenance: {
        title: 'Agentic Security on the Blockchain',
        subTitle:
          'We secure how your AI agents run, not what they think. Built on Pavii and Hyper 0X, our agentic security solutions stop prompt injection, data leaks, rogue agents and log tampering, and every action leaves a signed, verifiable receipt on-chain.',
        imageAlts: ['Pavii six-gate security flow for AI agents'],
      },
      bespoke: {
        title: 'Forward-Deployed Engineering',
        subTitle:
          "We don't just hand over software. Our engineers work inside your stack to connect Hyper 0X with your existing systems, public chains, bank DLTs and APIs, and stay with you from pilot to production-grade rollout.",
        imageAlts: [
          'Hyper 0X integrations with existing systems',
          'Engineers integrating Hyper 0X',
        ],
        cta: 'Start a Pilot',
      },
    },
    stats: {
      title: 'Built for Institutional Scale',
      subTitle:
        'We own the chain, we ship the products that run on it, and we engineer both for data-intensive work where the record has to be right the first time.',
      mainStatTitle: '4',
      mainStatSubTitle:
        'products in production on Hyper 0X: Hyper 0X, Hyper Wallet, Wallet SDKs and Pavii',
      stats: [
        { stat: '1', description: 'dedicated L2 for each institution' },
        { stat: '4', description: 'layers of encryption' },
        { stat: '2M+', description: 'transactions processed' },
      ],
    },
  },

  contact: {
    title: 'Contact',
    metaDescription:
      'Talk to Buckleson about custom blockchains, asset tokenization, wallets, exchanges or AI-agent security.',
    ogTitle: 'Contact Us | Buckleson',
    heading: 'Contact us',
    subTitle:
      "Want to put your assets on-chain, launch your own L2 or secure your AI agents? Tell us about it and we'll get back to you.",
    formTitle: 'Fill in the form below',
    formSubTitle: "We'll get back to you in 1-2 business days.",
    firstName: 'First Name',
    lastName: 'Last Name',
    details: 'Details',
    send: 'Send Message',
    demoMessage:
      'Thanks! (Demo only — wire a form endpoint to receive real messages.)',
    knowledgeHeading: 'Documentation',
    knowledgeContent: 'Learn how Hyper 0X works under the hood.',
    knowledgeLink: 'Read the Hyper 0X docs',
    faqHeading: 'FAQ',
    faqContent: 'Explore our FAQ for quick, clear answers to common queries.',
    faqLink: 'Visit FAQ',
    websiteHeading: 'Website',
    websiteContent: 'Learn more about Buckleson at',
    emailHeading: 'Contact us by email',
    emailContent: 'Prefer the written word? Drop us an email at',
  },

  blogIndex: {
    title: 'Blog',
    metaDescription:
      'Engineering notes from Buckleson on Hyper 0X, post-quantum security, AI-agent security and on-chain finance.',
    ogTitle: 'Blog | Buckleson',
    heading: 'Notes from the Chain',
    subTitle:
      'Engineering deep-dives, product updates and security research from the team building Hyper 0X.',
    insightsHeading: 'Insights',
    insightsSubTitle:
      'Short explainers on the ideas behind Hyper 0X and the products that run on it.',
    noPosts: 'No blog posts yet. Check back soon.',
    noInsights: 'No insights yet. Check back soon.',
  },

  productsIndex: {
    title: 'Products',
    metaDescription:
      'Hyper 0X, Pavii, Hyper Wallet & SDKs, H0X Pay and HyperRun: the Buckleson products built on our own blockchain.',
    ogTitle: 'Products | Buckleson',
    heading: 'Products',
    subTitle:
      'Everything we ship runs on Hyper 0X, our own L1. Start with the chain itself, secure your AI agents with Pavii, move money with Hyper Wallet, and watch for H0X Pay and HyperRun, both coming soon.',
    customerStories: 'Proof Points',
    testimonials: {
      title: 'Proof Points',
      quotes: [
        {
          content:
            '"10x Technologies is piloting the Hyper 0X blockchain-based AI training and inference module in a live enterprise environment."',
          author: '10x Technologies',
          role: 'Enterprise pilot | Hyper 0X',
          avatarAlt: 'Buckleson logo',
        },
        {
          content:
            '"Hyper Wallet has processed over 2 million transactions across 33,000+ portfolios, and saved users more than $128K in fees."',
          author: 'Hyper Wallet',
          role: 'Live product | Hyper 0X',
          avatarAlt: 'Hyper Wallet logo',
        },
        {
          content:
            '"Pavii cut token usage by 30–60% on a real Claude Code task, and has saved over 100 million tokens across 82,000+ queries."',
          author: 'Pavii',
          role: 'Live product | AI-agent security',
          avatarAlt: 'Pavii logo',
        },
      ],
    },
    stats: {
      title: 'Why Build on Hyper 0X?',
      subTitle:
        "Most blockchains make you inherit someone else's fees, roadmap and outages. Hyper 0X is ours, so every product we build, and every chain we build for you, gets the same enterprise-grade foundation.",
      benefits: [
        'Deterministic finality: no reorgs, no front-running.',
        'Post-quantum-resistant encryption on every connection, plus four layers of data protection.',
        'An L2 for every customer, with its own rules and bridges, on one shared record.',
      ],
    },
  },

  /** JSON data for FAQs, features and pricing. */
  data: { faqs, features, pricing },
};
