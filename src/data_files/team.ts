import type { ImageMetadata } from 'astro';

/**
 * Team members for the About page. Each card shows the photo (or initials on
 * a coloured card when there is no photo yet), name and role; hovering or
 * focusing a card reveals the bio.
 *
 * MOCK DATA: the five entries below are placeholders requested by the owner
 * until real profiles arrive. Replace names, roles, bios and add photos
 * (square images in src/images/team/, imported here) before sharing widely.
 *   import vijay from '@images/team/vijay.jpg';
 *   { name: '…', role: '…', bio: '…', photo: vijay, linkedin: 'https://…' }
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: ImageMetadata;
  /** Card colour when there is no photo. */
  tint: string;
  linkedin?: string;
  mock?: boolean;
}

export const team: TeamMember[] = [
  {
    name: 'Aarav Mehta',
    role: 'Founder & CEO',
    bio: 'I started Buckleson to give banks and fintechs a chain that they really own. I work with clients every day, and I turn their use case into a pilot on their own L2.',
    tint: '#b8694a',
    mock: true,
  },
  {
    name: 'Lena Hoffmann',
    role: 'CTO, Hyper 0X',
    bio: 'I lead the team behind Hyper 0X: consensus, encryption and the L2 framework. My rule is simple. Every transaction is final in one pass, and every connection is post-quantum-resistant.',
    tint: '#4d7a70',
    mock: true,
  },
  {
    name: 'Daniel Okafor',
    role: 'Head of Security, Pavii',
    bio: 'I build the gates between AI agents and your systems. If an agent tries a forbidden action, Pavii stops it and records the receipt on the chain.',
    tint: '#52669e',
    mock: true,
  },
  {
    name: 'Priya Raman',
    role: 'Head of Product, Hyper Wallet',
    bio: 'I am responsible for Hyper Wallet and its SDKs, from the swap screen to the white-label kits that our partners ship. I keep it simple for users and strong for the teams that build on it.',
    tint: '#9e5a6b',
    mock: true,
  },
  {
    name: 'Mateo Silva',
    role: 'Lead Protocol Engineer',
    bio: 'I work on bridges, smart contracts and tokenization: the parts that connect Hyper 0X to other systems. I make sure that settlement never leaves a party exposed.',
    tint: '#6e5fae',
    mock: true,
  },
];
