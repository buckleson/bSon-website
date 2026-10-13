import type { ImageMetadata } from 'astro';
import hyper0xLight from '@images/diagrams/hyper0x-light.webp';
import hyper0xDark from '@images/diagrams/hyper0x-dark.webp';
import paviiLight from '@images/diagrams/pavii-light.webp';
import paviiDark from '@images/diagrams/pavii-dark.webp';
import walletLight from '@images/diagrams/wallet-light.webp';
import walletDark from '@images/diagrams/wallet-dark.webp';
import platformLight from '@images/diagrams/platform-light.webp';
import platformDark from '@images/diagrams/platform-dark.webp';
import h0xpayLight from '@images/diagrams/h0xpay-light.webp';
import h0xpayDark from '@images/diagrams/h0xpay-dark.webp';
import hyperrunLight from '@images/diagrams/hyperrun-light.webp';
import hyperrunDark from '@images/diagrams/hyperrun-dark.webp';
import tokenizationLight from '@images/diagrams/tokenization-light.webp';
import tokenizationDark from '@images/diagrams/tokenization-dark.webp';

/**
 * Architecture diagrams (made with archify; sources in `../.archify`), each
 * rendered once per theme. Components show the light or dark file to match
 * the site theme.
 */
export const diagrams = {
  hyper0x: {
    light: hyper0xLight,
    dark: hyper0xDark,
    alt: 'Hyper 0X architecture: bank, fintech and AI workloads each run on their own L2, settle to the Hyper 0X L1, and connect to public chains through bridges',
  },
  pavii: {
    light: paviiLight,
    dark: paviiDark,
    alt: 'Pavii flow: every AI agent call passes injection, privacy and supply-chain gates, a budget step and an egress contract on Hyper 0X before reaching your systems',
  },
  wallet: {
    light: walletLight,
    dark: walletDark,
    alt: 'Hyper Wallet architecture: users and partner apps trade through one wallet and order book, with atomic settlement on Hyper 0X',
  },
  platform: {
    light: platformLight,
    dark: platformDark,
    alt: 'Buckleson platform: Hyper Wallet, H0X Pay, HyperRun, custom L2s and Pavii all settle on the Hyper 0X L1, with bridges to public chains',
  },
  h0xpay: {
    light: h0xpayLight,
    dark: h0xpayDark,
    alt: 'H0X Pay flow: payments trigger investment plans that buy tokenized assets on the Hyper Wallet order book, all settled on Hyper 0X',
  },
  hyperrun: {
    light: hyperrunLight,
    dark: hyperrunDark,
    alt: 'HyperRun flow: signed match results and fan predictions feed a rewards contract that pays out to in-game wallets on Hyper 0X',
  },
  tokenization: {
    light: tokenizationLight,
    dark: tokenizationDark,
    alt: 'Asset tokenization: an issuer deposits assets into custody, tokens are minted under compliance rules on your L2, and investors trade them with atomic settlement',
  },
} satisfies Record<string, { light: ImageMetadata; dark: ImageMetadata; alt: string }>;

export type DiagramName = keyof typeof diagrams;

export const diagramNames = Object.keys(diagrams) as [DiagramName, ...DiagramName[]];
