import type { Compare } from './compare';

/**
 * "Without Hyper 0X / with Hyper 0X" diagrams for the blockchain use cases
 * and blockchain vs database posts. The schema and the rules are in
 * compare.ts.
 */
export const compareExtra5: Record<string, Compare> = {
  'blockchain-use-cases-beyond-payments': {
    title: 'How one invoice gets financed twice, and how a shared ledger stops it',
    without: {
      packet: 'Same invoice, second loan',
      nodes: [
        { icon: 'building-4', label: 'Supplier', sub: 'Shows one invoice twice' },
        { icon: 'bank', label: 'Bank A', sub: 'Finances the invoice' },
        { icon: 'bank', label: 'Bank B', sub: 'Cannot see Bank A' },
        { icon: 'chart-decrease', label: 'Second loan', sub: 'Nothing behind it' },
      ],
      breakAt: 2,
      outcome: 'One invoice backs two loans',
      steps: [
        'A supplier gets a loan from Bank A against a $500,000 invoice.',
        'Bank A records the loan in its own database, which no other bank can see.',
        'The supplier shows the same invoice to Bank B, which finances it again.',
        'Two loans now rest on one invoice, so one loan has nothing behind it.',
      ],
    },
    with: {
      packet: 'Same invoice, second loan',
      nodes: [
        { icon: 'building-4', label: 'Supplier', sub: 'Shows one invoice twice' },
        { icon: 'bank', label: 'Bank B', sub: 'Asks to finance it' },
        { icon: 'scale', label: 'Financing rule', sub: 'Runs before execution', guard: true },
        { icon: 'fingerprint', label: 'Hyper 0X ledger', sub: 'Holds invoice fingerprints', guard: true },
        { icon: 'cash', label: 'Loan payout', sub: 'Never sent' },
      ],
      stopAt: 2,
      outcome: 'Second loan rejected before it executes',
      steps: [
        'Bank A finances the invoice and records its fingerprint on Hyper 0X.',
        'The supplier shows the same invoice to Bank B, which asks to finance it.',
        'The financing rule finds the same fingerprint before the loan executes.',
        'Hyper 0X rejects the second loan. Bank B sees a match, not the loan of Bank A.',
      ],
    },
  },

  'blockchain-vs-database': {
    title: 'How one admin rewrites a shared record, and how a ledger stops it',
    without: {
      packet: 'Edit a past repayment',
      nodes: [
        { icon: 'user-edit', label: 'Fintech admin', sub: 'Edits a past repayment' },
        { icon: 'server', label: 'Central database', sub: 'Owner can change rows' },
        { icon: 'history', label: 'Audit log', sub: 'Same owner controls it' },
        { icon: 'group', label: 'Partner banks', sub: 'Find the gap late' },
      ],
      breakAt: 1,
      outcome: 'History changed, and the banks find out late',
      steps: [
        'Four banks fund a $10M loan pool, and one fintech keeps the only record.',
        'An admin changes a past repayment, and the database accepts the edit.',
        'The audit log runs on the same system, so the admin can edit it too.',
        'The banks find the gap only when their own records disagree.',
      ],
    },
    with: {
      packet: 'Edit a past repayment',
      nodes: [
        { icon: 'user-edit', label: 'Fintech admin', sub: 'Edits a past repayment' },
        { icon: 'layers', label: 'Private L2', sub: 'Shared by five firms', guard: true },
        { icon: 'scale', label: 'Maker-checker rule', sub: 'Runs before execution', guard: true },
        { icon: 'check-circle', label: 'Final record', sub: 'No reorgs', guard: true },
        { icon: 'group', label: 'Partner banks', sub: 'Read one history' },
      ],
      stopAt: 2,
      outcome: 'Correction rejected, and the original stays final',
      steps: [
        'The fintech and four banks keep the loan register on a private L2 on Hyper 0X.',
        'Nobody can edit a past entry, so the admin sends a correction entry instead.',
        'The maker-checker rule needs a second approver, so Hyper 0X rejects the correction before it executes.',
        'The original entry stays final, with no reorgs, so all five firms read the same history.',
      ],
    },
  },
};
