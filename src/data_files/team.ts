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
    bio: 'I started Buckleson to give banks and fintechs a chain they can actually own. I spend my days with clients, turning their use case into a pilot on their own L2.',
    tint: '#e8542a',
    mock: true,
  },
  {
    name: 'Lena Hoffmann',
    role: 'CTO, Hyper 0X',
    bio: 'I lead the team behind Hyper 0X: consensus, encryption and the L2 framework. My rule is simple: every transaction final in one pass, every connection post-quantum-resistant.',
    tint: '#1f8a7a',
    mock: true,
  },
  {
    name: 'Daniel Okafor',
    role: 'Head of Security, Pavii',
    bio: 'I build the gates that stand between AI agents and your systems. If an agent tries something it should not, Pavii stops it and the receipt lands on-chain.',
    tint: '#3b5bdb',
    mock: true,
  },
  {
    name: 'Priya Raman',
    role: 'Head of Product, Hyper Wallet',
    bio: 'I look after Hyper Wallet and its SDKs, from the swap screen to the white-label kits our partners ship. Simple for users, solid for the teams who build on it.',
    tint: '#d9486b',
    mock: true,
  },
  {
    name: 'Mateo Silva',
    role: 'Lead Protocol Engineer',
    bio: 'I work on bridges, smart contracts and tokenization: the parts that connect Hyper 0X to the rest of the world. I care about settlement that never leaves anyone exposed.',
    tint: '#7a5af5',
    mock: true,
  },
];
