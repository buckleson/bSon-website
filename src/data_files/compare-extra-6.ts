import type { Compare } from './compare';

/**
 * "Without Hyper 0X / with Hyper 0X" diagram for the post about how to verify
 * a customer without seeing their data. The schema and the rules are in
 * compare.ts. Signed results are a pattern that a company builds on its own
 * private L2, so only the Hyper 0X parts are guards.
 */
export const compareExtra6: Record<string, Compare> = {
  'verify-customers-without-sharing-data': {
    title: 'How passport copies leak from partners, and how signed results stop it',
    without: {
      packet: 'Check ID, age and country',
      nodes: [
        { icon: 'user-3', label: 'Customer', sub: 'Uploads a passport' },
        { icon: 'cellphone', label: 'Fintech app', sub: 'Stores a full copy' },
        { icon: 'copy', label: 'Four partners', sub: 'Each keeps a copy' },
        { icon: 'user-warning', label: 'Attacker', sub: 'Breaches the weakest copy' },
      ],
      breakAt: 1,
      outcome: 'Passport data leaks from the weakest copy',
      steps: [
        'The fintech needs three facts, but the customer uploads a full passport.',
        'The fintech app stores a full copy, although it needs only three answers.',
        'The app sends copies to four partners, so one passport sits in five databases.',
        'An attacker breaches the weakest copy and gets the full passport data.',
      ],
    },
    with: {
      packet: 'Check ID, age and country',
      nodes: [
        { icon: 'user-3', label: 'Customer', sub: 'Shows a passport once' },
        { icon: 'idcard', label: 'Trusted checker', sub: 'Signs the result' },
        { icon: 'seal', label: 'Signed result', sub: 'Three facts, no passport' },
        { icon: 'scale', label: 'Compliance as code', sub: 'Runs before execution', guard: true },
        { icon: 'cube', label: 'Hyper 0X L2', sub: 'Hash commitment, no documents', guard: true },
      ],
      outcome: 'Account opens, and the passport stays with the checker',
      steps: [
        'The customer shows the passport once, to one trusted checker.',
        'The checker signs the result, and the customer shares only what the fintech needs.',
        'Compliance as code on the private L2 checks the result before the first deposit executes.',
        'The L2 records a hash commitment of the check, so the audit trail holds no documents.',
      ],
    },
  },
};
