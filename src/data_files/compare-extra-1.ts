import type { Compare } from './compare';

/**
 * "Without Hyper 0X / with Hyper 0X" diagrams for the proof of reserve,
 * tokenized deposits and compliance as code posts. The schema and the rules
 * are in compare.ts.
 */
export const compareExtra1: Record<string, Compare> = {
  'proof-of-reserve-explained': {
    title: 'How unbacked mints hide between reports, and a mint rule stops them',
    without: {
      packet: 'Mint 10,000 gold tokens',
      nodes: [
        { icon: 'building-2', label: 'Issuer', sub: 'Asks to mint 10,000' },
        { icon: 'file-code', label: 'Token contract', sub: 'No reserve check' },
        { icon: 'group', label: 'Investors', sub: 'Buy unbacked tokens' },
        { icon: 'report', label: 'Attestation', sub: 'Finds the gap later' },
      ],
      breakAt: 1,
      outcome: 'Supply exceeds the reserve until the next report',
      steps: [
        'The issuer asks to mint 10,000 gold tokens, but no new gold reached the vault.',
        'The token contract mints them, because it does not read the reserve.',
        'Investors buy the new tokens, so the supply is now larger than the reserve.',
        'The gap shows only in the next attestation, after investors hold the tokens.',
      ],
    },
    with: {
      packet: 'Mint 10,000 gold tokens',
      nodes: [
        { icon: 'building-2', label: 'Issuer', sub: 'Asks to mint 10,000' },
        { icon: 'certificate', label: 'Reserve record', sub: 'Signed by the custodian' },
        { icon: 'scale', label: 'Mint rule', sub: 'Runs before execution', guard: true },
        { icon: 'cube', label: 'Hyper 0X L2', sub: 'Final in one pass', guard: true },
        { icon: 'group', label: 'Investors', sub: 'Hold backed tokens only' },
      ],
      stopAt: 2,
      outcome: 'Mint rejected before it executes',
      steps: [
        'The custodian signs each reserve update and sends it to the L2 of the issuer.',
        'The issuer asks to mint 10,000 tokens, but no new gold reached the vault.',
        'The mint rule compares the new supply with the signed reserve before the mint executes.',
        'Hyper 0X rejects the mint, so the supply never exceeds the reserve.',
      ],
    },
  },

  'tokenized-deposits-vs-stablecoins': {
    title: 'How wires leave bond trades half-settled, and tokenized deposits fix it',
    without: {
      packet: '$1M bond token trade',
      nodes: [
        { icon: 'building-2', label: 'Buyer', sub: 'A corporate treasury' },
        { icon: 'cube', label: 'Token ledger', sub: 'Moves the bond token' },
        { icon: 'bank', label: 'Bank wire', sub: 'Banking hours only' },
        { icon: 'building-4', label: 'Seller', sub: 'Waits for the cash' },
      ],
      breakAt: 2,
      outcome: 'Bonds delivered, cash still on the way',
      steps: [
        'A corporate treasury buys $1M of bond tokens from a seller.',
        'The token ledger moves the bond tokens to the buyer at once.',
        'The cash goes by bank wire, which settles later and only in banking hours.',
        'Until the wire arrives, the seller has delivered the bonds without payment.',
      ],
    },
    with: {
      packet: '$1M bond token trade',
      nodes: [
        { icon: 'building-2', label: 'Buyer', sub: 'A corporate treasury' },
        { icon: 'layers', label: 'Bank L2', sub: 'Tokenized deposits on chain', guard: true },
        { icon: 'scale', label: 'Compliance rules', sub: 'Run before execution', guard: true },
        { icon: 'transfer-3', label: 'Atomic settlement', sub: 'Both legs or neither', guard: true },
        { icon: 'building-4', label: 'Seller', sub: 'Paid as it delivers' },
      ],
      outcome: 'Bond and cash settle in one step',
      steps: [
        'The buyer pays with tokenized deposits on the private L2 of its bank, on Hyper 0X.',
        'Compliance rules check KYC status and client limits before the trade executes.',
        'The bond token and the cash change hands in one step, or neither moves.',
        'The trade is final in one pass, so the seller never delivers without payment.',
      ],
    },
  },

  'compliance-as-code-blockchain': {
    title: 'How app-only checks let breaches through, and chain rules stop them',
    without: {
      packet: 'Sale to an unverified buyer',
      nodes: [
        { icon: 'user-3', label: 'Investor', sub: 'Sells fund units' },
        { icon: 'terminal', label: 'Direct call', sub: 'Skips the app checks' },
        { icon: 'cube', label: 'Blockchain', sub: 'Runs no rules' },
        { icon: 'user-question', label: 'Unverified buyer', sub: 'Now holds the units' },
        { icon: 'search', label: 'Monitoring', sub: 'Flags it afterwards' },
      ],
      breakAt: 2,
      outcome: 'Breach found later, final trade to unwind',
      steps: [
        'An investor sells fund units to a buyer who never passed KYC.',
        'The seller sends the transfer directly to the chain, so the app checks never run.',
        'The chain accepts the transfer, because it runs no compliance rules of its own.',
        'Monitoring flags the breach afterwards, and staff must unwind a final trade.',
      ],
    },
    with: {
      packet: 'Sale to an unverified buyer',
      nodes: [
        { icon: 'user-3', label: 'Investor', sub: 'Sells fund units' },
        { icon: 'terminal', label: 'Direct call', sub: 'Skips the app' },
        { icon: 'scale', label: 'Compliance as code', sub: 'Runs before execution', guard: true },
        { icon: 'cube', label: 'Hyper 0X L2', sub: 'Final in one pass', guard: true },
        { icon: 'user-question', label: 'Unverified buyer', sub: 'Gets no units' },
      ],
      stopAt: 2,
      outcome: 'Rejected before it executes, nothing to unwind',
      steps: [
        'The seller sends the transfer directly to the chain, around the app.',
        'Compliance as code on the L2 checks the KYC status of the buyer first.',
        'The buyer never passed KYC, so Hyper 0X rejects the transfer before it executes.',
        'No balance changes, so the firm has nothing to unwind.',
      ],
    },
  },
};
