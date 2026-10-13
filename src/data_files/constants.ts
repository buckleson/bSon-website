import hyper0xLogo from '@images/brand/hyper-0x.png';
import paviiLogo from '@images/brand/pavii.png';
import hyperWalletLogo from '@images/brand/hyper-wallet.png';
import { localePath } from '@utils/locale';

/** Every "book a call" button links here. */
export const BOOKING_URL = 'https://cal.com/buckleson-group/30min';

export const SITE = {
  title: 'Buckleson',
  tagline: 'Custom blockchain solutions, powered by Hyper 0X',
  description:
    'Buckleson builds custom blockchains for enterprises. Hyper 0X, our own post-quantum-resistant L1, powers Pavii AI-agent security, Hyper Wallet and every solution we ship.',
  description_short: 'Custom blockchain solutions, powered by Hyper 0X.',
  /** Scheme + host the site is served from (no path). */
  origin: 'https://buckleson.github.io',
  /** Home page URL, including the deploy base path. */
  url: 'https://buckleson.github.io/bSon-website',
  author: 'Buckleson',
};

/** schema.org Organization facts. Add social profile URLs to `sameAs`. */
export const ORGANIZATION = {
  email: 'vijay@buckleson.com',
  sameAs: [] as string[],
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
  ],
};


export const partnersData = [
  {
    logo: hyper0xLogo,
    name: 'Hyper 0X',
    tagline: 'Our own post-quantum-resistant L1',
    href: localePath('en', '/products/hyper-0x/'),
  },
  {
    logo: paviiLogo,
    name: 'Pavii',
    tagline: 'Security gates for AI agents',
    href: localePath('en', '/products/pavii/'),
  },
  {
    logo: hyperWalletLogo,
    name: 'Hyper Wallet',
    tagline: 'Exchange, wallet and SDKs in one',
    href: localePath('en', '/products/hyper-wallet/'),
  },
  {
    name: 'H0X Pay',
    tagline: 'Payments on Hyper 0X',
    href: localePath('en', '/products/h0x-pay/'),
    soon: true,
  },
  {
    name: 'HyperRun',
    tagline: 'Play, predict and earn',
    href: localePath('en', '/products/hyperrun/'),
    soon: true,
  },
];
