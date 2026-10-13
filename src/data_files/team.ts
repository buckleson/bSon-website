import type { ImageMetadata } from 'astro';

/**
 * Team members for the About page. The team section stays hidden while this
 * list is empty. Each card shows the photo, name and role; hovering (or
 * focusing) a card reveals the bio, like the reference "team" section.
 *
 * To add someone: put a square photo in src/images/team/, import it here and
 * add an entry, e.g.
 *   import vijay from '@images/team/vijay.jpg';
 *   { name: 'Vijay …', role: 'Founder & CEO', bio: '…', photo: vijay, linkedin: 'https://…' }
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: ImageMetadata;
  linkedin?: string;
}

export const team: TeamMember[] = [];
