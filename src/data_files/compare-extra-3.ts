import type { Compare } from './compare';

/**
 * "Without Hyper 0X / with Hyper 0X" diagrams for the shadow AI agents,
 * blockchain bridge and web3 game economy posts. The schema and the rules
 * are in compare.ts. HyperRun is coming soon, so its lane uses "will".
 */
export const compareExtra3: Record<string, Compare> = {
  'shadow-ai-agents': {
    title: 'How a shadow agent leaks customer data, and how one gateway stops it',
    without: {
      packet: 'Ticket with customer names',
      nodes: [
        { icon: 'mail', label: 'Support inbox', sub: 'Customer tickets arrive' },
        { icon: 'incognito-mode', label: 'Shadow automation', sub: 'Nobody approved it' },
        { icon: 'key-2', label: 'Personal key', sub: 'Full employee rights' },
        { icon: 'cloud', label: 'Public AI tool', sub: 'Outside the company' },
      ],
      breakAt: 1,
      outcome: 'Customer names leave, and nobody knows',
      steps: [
        'A support ticket with customer names arrives in the shared inbox.',
        'A shadow automation that nobody approved forwards the ticket to a public AI tool.',
        'It uses a personal key, so no company system checks the call.',
        'Customer names reach an outside service, and no record shows it.',
      ],
    },
    with: {
      packet: 'Ticket with customer names',
      nodes: [
        { icon: 'mail', label: 'Support inbox', sub: 'Customer tickets arrive' },
        { icon: 'ai', label: 'Listed agent', sub: 'Owner and scoped credentials' },
        { icon: 'safe-shield', label: 'Privacy gate', sub: 'Removes personal data', guard: true },
        { icon: 'file-locked', label: 'Egress contract', sub: 'On Hyper 0X', guard: true },
        { icon: 'bill', label: 'Receipt', sub: 'Chained on Hyper 0X', guard: true },
      ],
      stopAt: 2,
      outcome: 'Names stay inside, and every call has a receipt',
      steps: [
        'The team lists the agent, gives it an owner and replaces the personal key.',
        'Every call from the agent now goes through the Pavii gateway.',
        'The privacy gate removes customer names before a model can see them.',
        'The egress contract on Hyper 0X decides what the agent can send, and each decision gets a receipt.',
      ],
    },
  },

  'what-is-a-blockchain-bridge': {
    title: 'How stolen keys drain a bridge vault, and how chain rules stop it',
    without: {
      packet: 'Release the full vault',
      nodes: [
        { icon: 'user-warning', label: 'Attacker', sub: 'Holds stolen signer keys' },
        { icon: 'quill-pen', label: 'Bridge signers', sub: 'Approve a fake release' },
        { icon: 'safe-box', label: 'Vault contract', sub: 'No cap per day' },
        { icon: 'coin', label: 'Wrapped tokens', sub: 'Lose their backing' },
      ],
      breakAt: 2,
      outcome: 'The vault empties in one transaction',
      steps: [
        'An attacker steals enough signer keys to approve a transfer.',
        'The signers approve a release that matches no real burn.',
        'The vault has no cap, so it releases every locked token at once.',
        'Every wrapped token on the other chain now has no backing.',
      ],
    },
    with: {
      packet: 'Release the full vault',
      nodes: [
        { icon: 'user-warning', label: 'Attacker', sub: 'Holds stolen signer keys' },
        { icon: 'quill-pen', label: 'Bridge signers', sub: 'Approve a fake release' },
        { icon: 'scale', label: 'Compliance as code', sub: 'Caps before execution', guard: true },
        { icon: 'cube', label: 'Hyper 0X L2', sub: 'Final in one pass', guard: true },
        { icon: 'safe-box', label: 'Vault', sub: 'Keeps its tokens' },
      ],
      stopAt: 2,
      outcome: 'Release rejected before it executes',
      steps: [
        'An attacker uses stolen signer keys to ask for a release from the private L2.',
        'Compliance as code checks the bridge cap and the second approval before execution.',
        'The release is far above the cap and has no second approval, so it fails.',
        'The vault keeps its tokens, and every wrapped token keeps its backing.',
      ],
    },
  },

  'web3-game-economy-design': {
    title: 'How unfunded rewards inflate a game, and how a funded pool stops it',
    without: {
      packet: 'Daily quest rewards',
      nodes: [
        { icon: 'game-2', label: 'Daily quests', sub: 'Pay every login' },
        { icon: 'coin', label: 'New coins', sub: 'Minted for each claim' },
        { icon: 'trending-up', label: 'Coin supply', sub: 'Grows every week' },
        { icon: 'chart-decrease', label: 'Coin value', sub: 'Falls, and players leave' },
      ],
      breakAt: 1,
      outcome: 'Supply outgrows demand, and players leave',
      steps: [
        'Daily quests pay coins to every player who logs in, bots included.',
        'The game mints new coins for each claim, with no revenue behind them.',
        'Few sinks remove coins, so the supply grows every week.',
        'Each coin buys less, and players who came to earn leave.',
      ],
    },
    with: {
      packet: 'Weekly prize payout',
      nodes: [
        { icon: 'ticket', label: 'Entry fees', sub: 'Fill the prize pool' },
        { icon: 'trophy', label: 'Ranked match', sub: 'Wins earn rewards' },
        { icon: 'quill-pen', label: 'Signed result', sub: 'HyperRun, coming soon', guard: true },
        { icon: 'file-locked', label: 'Rewards contract', sub: 'On Hyper 0X', guard: true },
        { icon: 'wallet-4', label: 'Winner wallet', sub: 'Paid from the pool' },
      ],
      outcome: 'Winners will get paid from a funded pool',
      steps: [
        'Entry fees and cosmetic sales fill a fixed weekly prize pool.',
        'Players earn for wins and rankings, not for hours or logins.',
        'In HyperRun, coming soon, the game will sign every result before any payout.',
        'A rewards contract on Hyper 0X will pay the winners from the published rules.',
      ],
    },
  },
};
