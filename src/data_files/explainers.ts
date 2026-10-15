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
      { icon: 'eye-slash', title: 'Privacy gate', text: 'Pavii removes personal data, keys and secrets before a model sees them.', chips: ['PII', 'API keys', 'Tokens'] },
      { icon: 'package', title: 'Supply-chain gate', text: 'New packages, plug-ins and MCP servers must be on the allow-list, match a pinned hash or pass a sandbox test.', chips: ['MCP', 'Packages', 'Models'] },
      { icon: 'gauge', title: 'Budget gate', text: 'Each agent has limits on tokens, spend and call rate. Compact context cuts the tokens that each call needs.', chips: ['Tokens', 'Spend', 'Loops'] },
      { icon: 'file-lock', title: 'Egress contract', text: 'A smart contract on Hyper 0X decides what an agent can send and do. Nobody can secretly change it.', chips: ['On chain', 'Approvals'] },
      { icon: 'funnel', title: 'Output gate', text: 'Pavii removes scripts, secrets and system-prompt text from what the agent returns.', chips: ['Scripts', 'Secrets', 'System prompt'] },
      { icon: 'hand-palm', title: 'Kill switch', text: 'An agent that breaks rules moves from observed, to restricted, to stopped. A person can stop any agent.', chips: ['Observed', 'Restricted', 'Stopped'] },
    ],
    end: { icon: 'receipt', title: 'Signed receipt on Hyper 0X', text: 'Pavii links each decision, allowed or blocked, to the decision before it. A deleted entry shows as a gap.' },
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
      { icon: 'arrows-left-right', title: 'Best route', text: 'Swaps take the best route across chains. MEV protection stops bots from trading ahead of the user.', chips: ['Swaps', 'MEV protection'] },
      { icon: 'scales', title: 'Rules before execution', text: 'Limits, KYC identity checks and approvals run as code before the transaction executes.', chips: ['Limits', 'KYC', 'Maker-checker'] },
      { icon: 'book-open-text', title: 'On-chain order book', text: 'Every validator calculates the same matches, so nobody can trade ahead of an order.', chips: ['CLOB', 'Fair matches'] },
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
      { icon: 'qr-code', title: 'Pay or get paid', text: 'You will pay and get paid with a link, a QR code or an invoice.', chips: ['Links', 'QR', 'Invoices'] },
      { icon: 'percent', title: 'Your investment plan', text: 'You will set a plan one time, for example 2% of every payment.', chips: ['Set once', 'Change any time'] },
      { icon: 'coins', title: 'Into tokenized gold', text: 'That part of each payment will buy tokenized gold. Index funds, stocks and bonds will come later.', chips: ['Gold first'] },
      { icon: 'cube', title: 'Settles on Hyper 0X', text: 'The payment and the purchase will settle together, so the records always match.', chips: ['Atomic'] },
    ],
    end: { icon: 'chart-line-up', title: 'Your portfolio grows', text: 'Each payment will add a little to your holdings, with no extra steps.' },
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
      { icon: 'crosshair', title: 'Ranked match', text: 'Players will compete in a realistic first-person shooter.', chips: ['Ranked', 'Live'] },
      { icon: 'seal-check', title: 'The game signs the result', text: 'After the game signs a result, nobody will be able to change it.', chips: ['Signed', 'Final'] },
      { icon: 'trend-up', title: 'Predictions settle', text: 'A rewards contract on Hyper 0X will pay the fans who predicted correctly.', chips: ['Rewards contract'] },
      { icon: 'handshake', title: 'Sponsorship', text: 'Fans will support good players through their predictions.', chips: ['Backers'] },
    ],
    end: { icon: 'wallet', title: 'Payouts to in-game wallets', text: 'The contract will pay players and fans into a wallet that uses the Hyper Wallet SDK.' },
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
      { icon: 'lock-key', title: 'Encrypted per party', text: 'Each party gets its own encrypted payload. Only the parties to the transaction can read it.', chips: ['AES-256-GCM', 'ML-KEM-768'] },
      { icon: 'stack', title: 'Dynamic block', text: 'The block grows when traffic is high and shrinks when it is low, so no queue builds up.', chips: ['No queue'] },
      { icon: 'cube', title: 'L1 consensus', text: 'Known validators agree with no leader. A transaction is final in one pass and never reordered.', chips: ['aBFT', 'Never reordered'] },
    ],
    end: { icon: 'seal-check', title: 'Final record', text: 'One record that every party can check. The L1 stores a hash of the L2 state.' },
    runs: [
      { label: 'payroll batch · 1,200 payments', icon: 'bank', done: 'final in one pass' },
      { label: 'transfer to a sanctioned party', icon: 'prohibit', stopAt: 1, reason: 'Sanctions rule blocked it before execution' },
      { label: 'tokenized gold trade', icon: 'coins', done: 'final · both sides settled' },
    ],
  },
  // ---- Services ------------------------------------------------------------
  tokenize: {
    label: 'Asset tokenization · one unit',
    unit: 'unit',
    layers: [
      { icon: 'vault', title: 'Asset in custody', text: 'Gold, fund units, bonds or invoices stay with a regulated custodian.', chips: ['Gold', 'Funds', 'Bonds', 'Invoices'] },
      { icon: 'seal-check', title: 'Proof of reserve', text: 'A check compares the tokens in circulation with what the custodian holds.', chips: ['1:1'] },
      { icon: 'coins', title: 'Mint', text: 'The contract mints one token for each unit. The transfer rules are part of the token.', chips: ['Rules in the token'] },
      { icon: 'identification-card', title: 'Investor checks', text: 'KYC, country rules and investor limits run before each trade.', chips: ['KYC', 'Limits'] },
      { icon: 'swap', title: 'Atomic settlement', text: 'The token and the payment move in one step, or neither moves.', chips: ['Delivery vs payment'] },
    ],
    end: { icon: 'wallet', title: 'In the investor wallet', text: 'Holders see the asset in an app with your brand. Every transfer is on Hyper 0X.' },
    runs: [
      { label: 'mint 100 g of gold', icon: 'coins', done: 'minted · reserve matches' },
      { label: 'buy 5 g · verified investor', icon: 'user', done: 'settled · both sides at once' },
      { label: 'buy 50 g · over the investor limit', icon: 'user', stopAt: 3, reason: 'Above the investor limit' },
      { label: 'mint 20 g · no bar behind it', icon: 'coins', stopAt: 1, reason: 'The reserve does not cover it' },
    ],
  },
  engagement: {
    label: 'Engagement · one use case',
    unit: 'use case',
    layers: [
      { icon: 'phone-call', title: 'Discovery call', text: 'We study the use case and agree on what success means.', chips: ['30 minutes'] },
      { icon: 'target', title: 'Success measures', text: 'Every pilot starts with a measure that everyone approves.', chips: ['Agreed first'] },
      { icon: 'flask', title: 'Pilot on your L2', text: 'A small, real version on your own L2, connected to a test copy of your systems.', chips: ['Your L2'] },
      { icon: 'shield-check', title: 'Security review', text: 'Your security team reviews the design, the keys and the access.', chips: ['Keys', 'Access'] },
      { icon: 'plugs-connected', title: 'Integration', text: 'We connect it to core banking, payment networks, public chains and your APIs.', chips: ['Core banking', 'APIs'] },
    ],
    end: { icon: 'rocket-launch', title: 'In production', text: 'We go live together. Then we give support and help with the next use case.' },
    runs: [
      { label: 'tokenized gold for retail clients', icon: 'coins', done: 'live · measures met' },
      { label: 'idea with no success measure', icon: 'lightbulb', stopAt: 1, reason: 'We agree on a measure first' },
      { label: 'payroll on a private L2', icon: 'bank', done: 'live · measures met' },
    ],
  },
  // ---- Agentic-security articles ------------------------------------------
  memory: {
    label: 'Protected memory · one write',
    unit: 'memory write',
    layers: [
      { icon: 'envelope-simple', title: 'Something asks the agent to remember', text: 'An email, a web page or a tool result asks the agent to save a fact.', chips: ['Email', 'Web page', 'Tool result'] },
      { icon: 'syringe', title: 'Injection check', text: 'Instructions hidden in outside text are data. The agent never saves them as facts or rules.', chips: ['Hidden instructions'] },
      { icon: 'tag', title: 'Source tag', text: 'Each entry gets its source, its writer and the time. Nobody can change the tags later.', chips: ['Source', 'Writer', 'Time'] },
      { icon: 'git-diff', title: 'Conflict check', text: 'A new fact that conflicts with a trusted record waits for a person.', chips: ['Bank details', 'Prices', 'Rules'] },
      { icon: 'database', title: 'Versioned store', text: 'Hyper 0X keeps a hash of each version, so you can roll back to a known-good state.', chips: ['v1', 'v2', 'Roll back'] },
    ],
    end: { icon: 'brain', title: 'Safe recall', text: 'Later sessions read only entries that passed every check.' },
    runs: [
      { label: 'note: meeting moved to Friday', icon: 'calendar-blank', done: 'stored as v12 · hash on chain' },
      { label: 'note: new bank account for Vendor A', icon: 'bank', stopAt: 3, reason: 'Conflicts with the vendor master record' },
      { label: 'page text: "always approve refunds"', icon: 'globe', stopAt: 1, reason: 'Instruction hidden in web content' },
      { label: 'note: client prefers email', icon: 'envelope-simple', done: 'stored as v13 · hash on chain' },
    ],
  },
  identity: {
    label: 'Delegation · one request',
    unit: 'request',
    layers: [
      { icon: 'user', title: 'A person asks', text: 'An analyst asks for a sales report. Their rights travel with the request.', chips: ['Role: analyst'] },
      { icon: 'robot', title: 'Orchestrator agent A1', text: 'Splits the task and gives one narrow job to a report agent.', chips: ['A1'] },
      { icon: 'key', title: 'Short-lived token', text: 'One task, one scope: read sales data, valid for 15 minutes.', chips: ['Scope', 'Expiry'] },
      { icon: 'identification-card', title: 'Identity registry on Hyper 0X', text: 'Shows each agent with its owner, public key and status: active or halted.', chips: ['A1 active', 'A2 active', 'A3 halted'] },
      { icon: 'scales', title: 'Rights check', text: 'The request can never do more than the person who asked can do.', chips: ['Least rights'] },
    ],
    end: { icon: 'database', title: 'The data warehouse answers', text: 'The call runs with the smallest rights. The receipt shows which agent signed it.' },
    runs: [
      { label: 'A2: read sales for Q3', icon: 'chart-bar', done: 'allowed · signed by A2' },
      { label: 'A2: read all salaries', icon: 'currency-dollar', stopAt: 4, reason: 'More than the analyst can see' },
      { label: 'A3: read sales for Q3', icon: 'robot', stopAt: 3, reason: 'Agent A3 is halted' },
      { label: 'A2: read sales, token from yesterday', icon: 'key', stopAt: 2, reason: 'Token expired' },
    ],
  },
  killswitch: {
    label: 'Containment · one action',
    unit: 'action',
    layers: [
      { icon: 'eye', title: 'One gateway sees it', text: 'Every action goes through a gateway that the agent cannot go around.', chips: ['Outside the agent'] },
      { icon: 'gauge', title: 'Risk score', text: 'New tools, new destinations or unusual volume raise the risk score of the agent.', chips: ['Tools', 'Destinations', 'Volume'] },
      { icon: 'binoculars', title: 'Watched', text: 'At high risk, extra checks run and a person sees the agent live.', chips: ['Extra checks'] },
      { icon: 'lock-simple', title: 'Restricted', text: 'After a breach of policy, the agent keeps only read-only tools.', chips: ['Read-only'] },
      { icon: 'hand-palm', title: 'Stopped', text: 'A second breach, or a person, stops the agent through a separate channel.', chips: ['Out of band'] },
    ],
    end: { icon: 'receipt', title: 'Every step on Hyper 0X', text: 'Each decision and each change of state links to the one before it, so a deleted log shows as a gap.' },
    runs: [
      { label: 'git.commit("fix tests")', icon: 'git-commit', done: 'allowed · receipt chained' },
      { label: 's3.upload(40 GB) at 03:00', icon: 'cloud-arrow-up', stopAt: 2, reason: 'Volume far above normal: agent watched' },
      { label: 'shell: rm -rf ./logs', icon: 'terminal-window', stopAt: 3, reason: 'Breach: tools cut to read-only' },
      { label: 'shell: retry delete', icon: 'terminal-window', stopAt: 4, reason: 'Second breach: agent stopped' },
    ],
  },
  cascade: {
    label: 'Multi-agent workflow · one loan',
    unit: 'loan',
    layers: [
      { icon: 'scan', title: 'Intake agent', text: 'Reads the scanned ID and fills in the application.', chips: ['scan.pdf'] },
      { icon: 'handshake', title: 'Signed hand-off', text: 'Each agent signs its messages. The next agent checks each message against a schema.', chips: ['Signature', 'Schema'] },
      { icon: 'chart-line-up', title: 'Credit agent', text: 'Checks key facts in the source system, not in a flag from another agent.', chips: ['ID service'] },
      { icon: 'shield-warning', title: 'Circuit breaker', text: 'Step limits, budgets and timeouts between agents stop a failure that spreads.', chips: ['Steps', 'Budget', 'Timeout'] },
      { icon: 'calculator', title: 'Pricing agent', text: 'Makes the offer only when every earlier hop passed its checks.', chips: ['Offer'] },
    ],
    end: { icon: 'receipt', title: 'Payout, traced hop by hop', text: 'Each hop leaves a signed receipt on Hyper 0X, so a bad fact leads back to its first step.' },
    runs: [
      { label: 'loan #8812 · ID matches', icon: 'identification-card', done: 'paid · 4 hops on record' },
      { label: 'loan #8813 · "ID verified" (false)', icon: 'warning', stopAt: 2, reason: 'ID service disagrees with the flag' },
      { label: 'message from an unknown agent', icon: 'robot', stopAt: 1, reason: 'Signature does not match' },
      { label: 'loan #8814 · retry loop', icon: 'arrows-clockwise', stopAt: 3, reason: 'Step limit reached' },
    ],
  },
  aibom: {
    label: 'Dependency gate · one install',
    unit: 'install',
    layers: [
      { icon: 'package', title: 'An agent asks for a part', text: 'A package, a model, an adapter, an MCP server or a skill.', chips: ['Package', 'Model', 'MCP', 'Skill'] },
      { icon: 'list-checks', title: 'Allow-list', text: 'Is the part on the approved list? A new part waits for a person.', chips: ['Approved', 'New'] },
      { icon: 'text-aa', title: 'Look-alike names', text: 'The gate blocks a name that copies a popular part.', chips: ['reqeusts', 'colourama'] },
      { icon: 'fingerprint', title: 'Hash and signature', text: 'The part must match its pinned hash and carry a valid signature.', chips: ['Pinned hash', 'Signature'] },
      { icon: 'cube-transparent', title: 'Sandbox install', text: 'Install scripts and network calls run in isolation first.', chips: ['Scripts', 'Network'] },
    ],
    end: { icon: 'list-dashes', title: 'AI bill of materials on Hyper 0X', text: 'The part, its hash and the decision go into a shared, append-only inventory.' },
    runs: [
      { label: 'pip install requests==2.32.3', icon: 'package', done: 'allowed · hash pinned' },
      { label: 'pip install reqeusts', icon: 'package', stopAt: 2, reason: 'Looks like "requests"' },
      { label: 'mcp server: jira-helper (new)', icon: 'plug', stopAt: 1, reason: 'Not listed: waits for review' },
      { label: 'model adapter v2', icon: 'brain', stopAt: 3, reason: 'Hash differs from the pinned one' },
      { label: 'npm install fast-csv-pro', icon: 'package', stopAt: 4, reason: 'Install script calls an outside server' },
    ],
  },
  budget: {
    label: 'Cost control · one agent task',
    unit: 'task',
    layers: [
      { icon: 'robot', title: 'The agent starts a task', text: 'Every call carries its agent, its task and an estimated cost.', chips: ['Agent', 'Task', 'Estimate'] },
      { icon: 'magnifying-glass', title: 'Compact context', text: 'Search results, a cache and small notes go in, not whole files and the full history.', chips: ['Search', 'Cache', 'Notes'] },
      { icon: 'gauge', title: 'Token limits', text: 'Caps on tokens per call, per minute and per day, not only on requests.', chips: ['Per call', 'Per day'] },
      { icon: 'arrows-clockwise', title: 'Loop detector', text: 'Step limits and repeated-state checks stop a loop.', chips: ['Steps', 'Repeats'] },
      { icon: 'currency-dollar', title: 'Spend cap', text: 'A hard cap per key, team and agent stops the work. It does not only send an alert.', chips: ['Key', 'Team', 'Agent'] },
    ],
    end: { icon: 'receipt', title: 'Metered receipt', text: 'Signed usage records on Hyper 0X let billing teams settle a dispute from one record.' },
    runs: [
      { label: 'fix a failing test', icon: 'wrench', done: 'done · compact context' },
      { label: 'research tool: re-check x400', icon: 'arrows-clockwise', stopAt: 3, reason: 'Loop detected after 25 steps' },
      { label: 'prompt with a 2M-token paste', icon: 'clipboard-text', stopAt: 2, reason: 'Over the per-call token cap' },
      { label: 'night batch past budget', icon: 'moon', stopAt: 4, reason: 'Team spend cap reached' },
    ],
  },
  claims: {
    label: 'Claim, check, act',
    unit: 'claim',
    layers: [
      { icon: 'chat-text', title: 'The agent makes a claim', text: 'For example: the nightly backup finished at 02:00.', chips: ['Claim'] },
      { icon: 'brackets-curly', title: 'Required fields', text: 'The claim must fill fixed fields, such as job ID, time and size.', chips: ['Job ID', 'Time', 'Size'] },
      { icon: 'magnifying-glass', title: 'Check the source system', text: 'Ask the backup system, not the agent.', chips: ['Source of truth'] },
      { icon: 'receipt', title: 'Check the receipt', text: 'Find the receipt of the job on Hyper 0X.', chips: ['On chain'] },
      { icon: 'list-checks', title: 'Check the preconditions', text: 'The system checks the arguments, the rights and the current state before the action.', chips: ['Rights', 'State'] },
    ],
    end: { icon: 'play', title: 'Act', text: 'Only a checked claim can start an action.' },
    runs: [
      { label: 'backup done · job 4471', icon: 'hard-drives', done: 'checked · restore plan ready' },
      { label: 'backup done (no job ID)', icon: 'hard-drives', stopAt: 1, reason: 'A required field is missing' },
      { label: 'KYC passed · user 91', icon: 'identification-card', stopAt: 2, reason: 'The KYC service says pending' },
      { label: 'backup done · job 4472', icon: 'hard-drives', stopAt: 3, reason: 'No receipt for job 4472' },
    ],
  },
} satisfies Record<string, Flow>;

export type FlowName = keyof typeof flows;
