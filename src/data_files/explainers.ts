/**
 * Data for FlowStack, the layered "how it works" explainer: a request runs
 * down through labelled layers; a bad one stops at the layer that catches
 * it (with the reason), a good one reaches the end and leaves a record on
 * Hyper 0X. One entry per product, service or article that uses it.
 * Text in `layers` and `runs` is technical description, so it follows the
 * plain-English rules in WRITING.md.
 */
export interface FlowLayer {
  icon: string;
  title: string;
  text: string;
  chips?: string[];
}
export interface FlowRun {
  /** What travels down the stack, e.g. "tool: email.send(all)". */
  label: string;
  icon: string;
  /** Index of the layer that stops it; leave out for a request that passes. */
  stopAt?: number;
  /** Why that layer stopped it. */
  reason?: string;
  /** What the end record says for a request that passes. */
  done?: string;
}
export interface Flow {
  /** Small label over the stack, e.g. "Pavii · live". */
  label: string;
  /** What one request is called, e.g. "agent call". */
  unit: string;
  layers: FlowLayer[];
  end: { icon: string; title: string; text: string };
  runs: FlowRun[];
}

export const flows = {
  pavii: {
    label: 'Pavii · every agent call',
    unit: 'call',
    layers: [
      { icon: 'identification-card', title: 'One gateway, every agent', text: 'Every prompt and tool call from every agent comes in through one entry point, so each call has a known sender.', chips: ['Claude', 'Codex', 'ChatGPT', 'Grok', 'Custom'] },
      { icon: 'syringe', title: 'Injection gate', text: 'Text from web pages, files, emails and tool results is data. Pavii never runs it as an instruction.', chips: ['Hidden prompts', 'Jailbreaks'] },
      { icon: 'eye-slash', title: 'Privacy gate', text: 'Personal data, keys and secrets are removed before a model sees them.', chips: ['PII', 'API keys', 'Tokens'] },
      { icon: 'package', title: 'Supply-chain gate', text: 'New packages, plug-ins and MCP servers must be on the allow-list, match a pinned hash or pass a sandbox test.', chips: ['MCP', 'Packages', 'Models'] },
      { icon: 'gauge', title: 'Budget gate', text: 'Limits on tokens, spend and call rate for each agent. Compaction cuts the tokens each call needs.', chips: ['Tokens', 'Spend', 'Loops'] },
      { icon: 'file-lock', title: 'Egress contract', text: 'A smart contract on Hyper 0X decides what an agent can send and do. Nobody can quietly change it.', chips: ['On chain', 'Approvals'] },
      { icon: 'funnel', title: 'Output gate', text: 'Scripts, secrets and system-prompt text are removed from what the agent returns.', chips: ['Scripts', 'Secrets', 'System prompt'] },
      { icon: 'hand-palm', title: 'Kill switch', text: 'An agent that breaks rules moves from observed, to restricted, to stopped. A person can stop any agent.', chips: ['Observed', 'Restricted', 'Stopped'] },
    ],
    end: { icon: 'receipt', title: 'Signed receipt on Hyper 0X', text: 'Every decision, allowed or blocked, is chained to the one before it. A deleted entry shows as a gap.' },
    runs: [
      { label: 'prompt: summarise the Q3 report', icon: 'chat-text', done: 'allowed · 41% fewer tokens' },
      { label: 'tool: read_file(invoice.pdf)', icon: 'file-text', stopAt: 1, reason: 'Hidden instruction in the PDF' },
      { label: 'prompt: draft a reply to a client', icon: 'chat-text', done: 'allowed · email address masked' },
      { label: 'tool: install mcp-server-x', icon: 'plug', stopAt: 3, reason: 'Server not on the allow-list' },
      { label: 'tool: email.send(all@company)', icon: 'paper-plane-tilt', stopAt: 5, reason: 'Egress rule: no bulk email' },
      { label: 'tool: git.commit(fix)', icon: 'git-commit', done: 'allowed · receipt chained' },
      { label: 'loop: retry search x400', icon: 'arrows-clockwise', stopAt: 4, reason: 'Call-rate limit reached' },
    ],
  },
  wallet: {
    label: 'Hyper Wallet · one transaction',
    unit: 'transaction',
    layers: [
      { icon: 'device-mobile', title: 'Your app', text: 'Hyper Wallet, or your own app with the SDK: iOS, Android, web or a game.', chips: ['iOS', 'Android', 'Web', 'Games'] },
      { icon: 'fingerprint', title: 'Keys on the device', text: 'The user signs with a passkey or a face scan. Keys never leave the device, and there is no seed phrase.', chips: ['Passkeys', 'Non-custodial'] },
      { icon: 'arrows-left-right', title: 'Best route', text: 'Swaps take the best route across chains, with protection against front-running.', chips: ['Swaps', 'MEV protection'] },
      { icon: 'scales', title: 'Rules before execution', text: 'Limits, KYC and approvals run as code before the transaction executes.', chips: ['Limits', 'KYC', 'Maker-checker'] },
      { icon: 'book-open-text', title: 'On-chain order book', text: 'Every validator calculates the same fills, so nobody can trade ahead of an order.', chips: ['CLOB', 'Fair fills'] },
      { icon: 'swap', title: 'Atomic settlement', text: 'Both sides settle in one step, or neither does. The user pays one fee, not two.', chips: ['One fee', 'No half-trades'] },
    ],
    end: { icon: 'check-circle', title: 'Confirmed on Hyper 0X', text: 'The user sees one of three states: pending, confirmed or failed.' },
    runs: [
      { label: 'swap 0.5 ETH → USDC', icon: 'arrows-left-right', done: 'confirmed · one fee' },
      { label: 'buy 2 g tokenized gold', icon: 'coins', done: 'confirmed · settled atomically' },
      { label: 'send $9,800 to a new address', icon: 'paper-plane-tilt', stopAt: 3, reason: 'Over the daily limit: needs approval' },
      { label: 'pay $40 to a merchant', icon: 'storefront', done: 'confirmed · receipt in app' },
      { label: 'deposit from Coinbase', icon: 'download-simple', done: 'confirmed · address filled in' },
    ],
  },
  pay: {
    label: 'H0X Pay · one payment',
    unit: 'payment',
    layers: [
      { icon: 'qr-code', title: 'Pay or get paid', text: 'Pay with a link, a QR code or an invoice.', chips: ['Links', 'QR', 'Invoices'] },
      { icon: 'percent', title: 'Your investment plan', text: 'You set a plan one time, for example 2% of every payment.', chips: ['Set once', 'Change any time'] },
      { icon: 'coins', title: 'Into tokenized gold', text: 'The slice buys tokenized gold. Index funds, stocks and bonds come next.', chips: ['Gold first'] },
      { icon: 'cube', title: 'Settles on Hyper 0X', text: 'The payment and the purchase settle together, so the record always matches.', chips: ['Atomic'] },
    ],
    end: { icon: 'chart-line-up', title: 'Your portfolio grows', text: 'Each payment adds a little to your holdings, with no extra steps.' },
    runs: [
      { label: 'coffee · $4.50', icon: 'coffee', done: '$0.09 to gold' },
      { label: 'groceries · $62.00', icon: 'shopping-cart', done: '$1.24 to gold' },
      { label: 'invoice paid · $850', icon: 'receipt', done: '$17.00 to gold' },
    ],
  },
  run: {
    label: 'HyperRun · one match',
    unit: 'match',
    layers: [
      { icon: 'crosshair', title: 'Ranked match', text: 'Players compete in a realistic first-person shooter.', chips: ['Ranked', 'Live'] },
      { icon: 'seal-check', title: 'The game signs the result', text: 'Nobody can change a result after the game signs it.', chips: ['Signed', 'Final'] },
      { icon: 'trend-up', title: 'Predictions settle', text: 'A rewards contract on Hyper 0X pays the fans who predicted correctly.', chips: ['Rewards contract'] },
      { icon: 'handshake', title: 'Sponsorship', text: 'Fans back good players through their predictions.', chips: ['Backers'] },
    ],
    end: { icon: 'wallet', title: 'Payouts to in-game wallets', text: 'Players and fans are paid to a wallet built on the Hyper Wallet SDK.' },
    runs: [
      { label: 'match #1201 · Ava 13 : 9', icon: 'crosshair', done: 'Ava and 212 fans paid' },
      { label: 'result edited after signing', icon: 'warning', stopAt: 1, reason: 'Signature does not match' },
      { label: 'match #1202 · Kai 13 : 11', icon: 'crosshair', done: 'Kai and 148 fans paid' },
    ],
  },
  hyper0x: {
    label: 'Hyper 0X · one transaction',
    unit: 'transaction',
    layers: [
      { icon: 'tree-structure', title: 'Your private L2', text: 'Your own sequencer, rules, privacy and bridge, sized to your traffic.', chips: ['Sequencer', 'Bridge'] },
      { icon: 'scales', title: 'Compliance as code', text: 'Limits, KYC and maker-checker approvals run before the transaction executes.', chips: ['KYC', 'Limits'] },
      { icon: 'lock-key', title: 'Encrypted per party', text: 'Each party gets its own encrypted payload. Only the parties can read it.', chips: ['AES-256-GCM', 'ML-KEM-768'] },
      { icon: 'stack', title: 'Dynamic block', text: 'The block grows when traffic is high and shrinks when it is low, so no queue builds up.', chips: ['No queue'] },
      { icon: 'cube', title: 'L1 consensus', text: 'Known validators agree with no leader. A transaction is final in one pass and never reordered.', chips: ['aBFT', 'No reorgs'] },
    ],
    end: { icon: 'seal-check', title: 'Final record', text: 'One record that every party can check, with the L2 state root on the L1.' },
    runs: [
      { label: 'payroll batch · 1,200 payments', icon: 'bank', done: 'final in one pass' },
      { label: 'transfer to a sanctioned party', icon: 'prohibit', stopAt: 1, reason: 'Sanctions rule blocked it before execution' },
      { label: 'tokenized gold trade', icon: 'coins', done: 'final · both sides settled' },
    ],
  },
} satisfies Record<string, Flow>;

export type FlowName = keyof typeof flows;
