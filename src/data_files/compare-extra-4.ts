import type { Compare } from './compare';

/**
 * "Without Hyper 0X / with Hyper 0X" diagrams for the tokenized bonds and
 * MPC vs multisig wallet posts. The schema and the rules are in compare.ts.
 */
export const compareExtra4: Record<string, Compare> = {
  'tokenized-bonds-explained': {
    title: 'How coupons reach the wrong holders, and how a coupon rule stops it',
    without: {
      packet: '$25,000 coupon payment',
      nodes: [
        { icon: 'building-2', label: 'Issuer', sub: 'Sends the coupon cash' },
        { icon: 'report', label: 'Holder list', sub: 'An old copy' },
        { icon: 'bank', label: 'Paying agent', sub: 'Pays each name' },
        { icon: 'user-question', label: 'Old holder', sub: 'Paid after selling' },
      ],
      breakAt: 1,
      outcome: 'Wrong holder paid, fixed by hand',
      steps: [
        'The issuer sends $25,000 for the coupon to its paying agent.',
        'The holder list is an old copy, so it misses a recent trade.',
        'The paying agent pays each name on the old list.',
        'The old holder gets the coupon, and staff must fix the error by hand.',
      ],
    },
    with: {
      packet: '$25,000 coupon payment',
      nodes: [
        { icon: 'building-2', label: 'Issuer', sub: 'Funds the coupon' },
        { icon: 'file-code', label: 'Coupon rule', sub: 'Reads the holder record', guard: true },
        { icon: 'cube', label: 'Hyper 0X L2', sub: 'Final in one pass', guard: true },
        { icon: 'coin', label: 'Tokenized cash', sub: '$25 per token' },
        { icon: 'group', label: 'Holders', sub: 'Paid on the record date' },
      ],
      outcome: 'Every holder on the record date gets paid',
      steps: [
        'The issuer funds the $25,000 coupon in tokenized cash on the same ledger.',
        'On the record date, the coupon rule reads who holds each token on the chain.',
        'Trades on Hyper 0X are final in one pass, so the holder record does not change later.',
        'The rule pays $25 per token to each holder on the record date.',
      ],
    },
  },

  'mpc-vs-multisig-wallets': {
    title: 'How one tricked signer drains a treasury, and how approvals stop it',
    without: {
      packet: '$2M to a fake supplier',
      nodes: [
        { icon: 'mail', label: 'Fake invoice', sub: 'From a fake supplier' },
        { icon: 'user-3', label: 'Treasury officer', sub: 'Trusts the invoice' },
        { icon: 'key-2', label: 'Single key', sub: 'Signs alone' },
        { icon: 'user-warning', label: 'Attacker wallet', sub: 'Gets the $2M' },
      ],
      breakAt: 2,
      outcome: '$2M gone after one signature',
      steps: [
        'A fake invoice asks the treasury to pay $2M to a new address.',
        'The treasury officer trusts the invoice and starts the transfer.',
        'The wallet has one key, and that key can sign alone.',
        'The $2M reaches the attacker before a second person sees the transfer.',
      ],
    },
    with: {
      packet: '$2M to a fake supplier',
      nodes: [
        { icon: 'mail', label: 'Fake invoice', sub: 'From a fake supplier' },
        { icon: 'user-3', label: 'Treasury officer', sub: 'Proposes the transfer' },
        { icon: 'group', label: 'Maker-checker rule', sub: 'A second person approves', guard: true },
        { icon: 'cube', label: 'Hyper 0X L2', sub: 'Checks rules first', guard: true },
        { icon: 'safe-lock', label: 'Treasury wallet', sub: 'Funds stay put' },
      ],
      stopAt: 2,
      outcome: 'Transfer held, checked and rejected',
      steps: [
        'A fake invoice tricks the treasury officer into proposing a $2M transfer.',
        'The maker-checker rule holds the large transfer until a second person approves it.',
        'The checker sees the unknown address and rejects the transfer.',
        'Hyper 0X checks the rule before the transfer executes, so no funds move.',
      ],
    },
  },
};
