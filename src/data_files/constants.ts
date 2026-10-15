
/** Every "book a call" button links here. */
export const BOOKING_URL = 'https://cal.com/buckleson-group/30min';

export const SITE = {
  title: 'Buckleson',
  tagline: 'Custom blockchain solutions, powered by Hyper 0X',
  description:
    'Buckleson builds custom blockchains for enterprises. Hyper 0X, our own post-quantum-resistant L1, powers Pavii AI-agent security, Hyper Wallet and every solution we ship.',
  description_short: 'Custom blockchain solutions, powered by Hyper 0X.',
  /** Scheme + host the site is served from (no path). */
  origin: 'https://buckleson.com',
  /** Home page URL, including the deploy base path (none on the custom domain). */
  url: 'https://buckleson.com',
  author: 'Buckleson',
};

/** schema.org Organization facts. Add social profile URLs to `sameAs`. */
export const ORGANIZATION = {
  email: 'vijay@buckleson.com',
  sameAs: [] as string[],
  /** The founder, as a schema.org Person (photo is a public file). */
  founder: { name: 'Vijay', jobTitle: 'Founder', image: '/team/vijay.jpg' },
  /** One-line company origin, used in structured data and llms.txt. */
  story:
    'Buckleson started with a crypto wallet, Hyper Wallet. To remove the hidden charges that many wallets add, it built its own blockchain, Hyper 0X, with an order book inside its consensus. Hyper 0X is modular, like microservices: a private L2 for each application and one shared L1 for settlement and audit. L3s on top of an L2 are coming soon. Today Buckleson also protects AI agents with Pavii, which keeps a receipt of every agent action on Hyper 0X.',
  knowsAbout: [
    'Blockchain development',
    'Custom blockchain networks',
    'Enterprise blockchain',
    'Layer 2 blockchains',
    'Asset tokenization',
    'Real-world asset tokenization',
    'Crypto wallets',
    'Crypto exchanges',
    'Wallet SDKs',
    'Post-quantum cryptography',
    'AI agent security',
    'Smart contracts',
    'Privacy-preserving verification',
    'Fractional ownership',
    'Multi-party business processes',
    'Order book exchanges',
  ],
};


