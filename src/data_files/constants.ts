import ogImageSrc from '@images/social.png';
import hyper0xLogo from '@images/brand/hyper-0x.png';
import paviiLogo from '@images/brand/pavii.png';
import hyperWalletLogo from '@images/brand/hyper-wallet.png';
import { localePath } from '@utils/locale';

export const SITE = {
  title: 'Buckleson',
  tagline: 'Custom blockchain solutions, powered by Hyper 0X',
  description:
    'Buckleson builds custom blockchains for enterprises. Hyper 0X, our own post-quantum-resistant L1, powers Pavii AI-agent security, Hyper Wallet and every solution we ship.',
  description_short: 'Custom blockchain solutions, powered by Hyper 0X.',
  /** Home page URL, including the deploy base path. */
  url: 'https://buckleson.github.io/bSon-website',
  author: 'Buckleson',
};

// Per-locale titles, descriptions and Open Graph text live in `src/copy/`;
// `src/utils/metadata.ts` assembles the <head> from them.
export const OG = {
  image: ogImageSrc,
};

export const partnersData = [
  {
    logo: hyper0xLogo,
    name: 'Hyper 0X',
    href: localePath('en', '/products/hyper-0x/'),
  },
  {
    logo: paviiLogo,
    name: 'Pavii',
    href: localePath('en', '/products/pavii/'),
  },
  {
    logo: hyperWalletLogo,
    name: 'Hyper Wallet',
    href: localePath('en', '/products/hyper-wallet/'),
  },
];
