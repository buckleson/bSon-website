import type { Compare } from './compare';

/** "Without Hyper 0X / with Hyper 0X" diagrams for the blockchain and cryptography posts. */
export const compareChain: Record<string, Compare> = {
  'layer-1-vs-layer-2-blockchain': {
    title: 'A busy public L1 raises rollup fees, Hyper 0X L2s run independently',
    without: {
      packet: 'Fund share order',
      nodes: [
        { icon: 'person', label: 'Client', sub: 'Buys fund shares' },
        { icon: 'ph:stack-simple', label: 'Public rollup', sub: 'Single sequencer' },
        { icon: 'globe', label: 'Public L1', sub: 'Shared with everyone' },
        { icon: 'ph:eye', label: 'Open record', sub: 'Anyone can read it' },
      ],
      breakAt: 2,
      outcome: 'Fees rise with traffic you cannot control',
      steps: [
        'A client buys fund shares through a rollup on a public chain.',
        'One sequencer, run by one company, puts the trade in order.',
        'The rollup posts the trade data to a public L1, where anyone can read it.',
        'When the L1 is busy, users bid for space, and fees rise outside your control.',
      ],
    },
    with: {
      packet: 'Fund share order',
      nodes: [
        { icon: 'person', label: 'Client', sub: 'Buys fund shares' },
        { icon: 'ph:stack', label: 'Fund L2', sub: 'Own sequencer and rules', guard: true },
        { icon: 'ph:fingerprint', label: 'State root', sub: 'Fingerprint of all balances', guard: true },
        { icon: 'ph:cube', label: 'Hyper 0X L1', sub: 'Final in one pass', guard: true },
        { icon: 'clipboard-task', label: 'Auditor', sub: 'Checks one L1' },
      ],
      outcome: 'Trade final, unaffected by other L2s',
      steps: [
        'The bank runs the fund on its own private L2, with its own sequencer and rules.',
        'A payroll peak on another L2 of the bank has no effect on the fund L2.',
        'The fund L2 posts its state root, a fingerprint of every balance, to the Hyper 0X L1.',
        'The L1 never rolls back, and auditors check one L1 instead of separate systems.',
      ],
    },
  },

  'private-l2-vs-public-blockchain': {
    title: 'Public chains show records to all nodes, private L2s only to parties',
    without: {
      packet: 'Trade with a partner bank',
      nodes: [
        { icon: 'building', label: 'Your bank', sub: 'Trades with a partner' },
        { icon: 'globe', label: 'Public chain', sub: 'Anyone can validate' },
        { icon: 'ph:eye', label: 'Every node', sub: 'Sees the transaction' },
        { icon: 'building-multiple', label: 'Partner bank', sub: 'Same view as everyone' },
      ],
      breakAt: 2,
      outcome: 'Client data visible to every node',
      steps: [
        'Your bank records a trade with a partner bank on a public chain.',
        'Anyone can run a validator on the chain.',
        'Every node can see the transaction, client data included.',
        'The network, not your bank, sets the fees and the roadmap.',
      ],
    },
    with: {
      packet: 'Trade with a partner bank',
      nodes: [
        { icon: 'building', label: 'Your bank', sub: 'Trades with a partner' },
        { icon: 'ph:stack', label: 'Private L2', sub: 'Own sequencer and policies', guard: true },
        { icon: 'lock-shield', label: 'Per-party keys', sub: 'Only the parties read', guard: true },
        { icon: 'ph:cube', label: 'Hyper 0X L1', sub: 'Holds the state roots', guard: true },
        { icon: 'building-multiple', label: 'Partner bank', sub: 'Checks the same record' },
      ],
      outcome: 'Shared record, data visible only to parties',
      steps: [
        'Your bank records the trade on its own private L2, with its own policies.',
        'Per-party encryption lets only the parties to the record see its data.',
        'The L2 settles its state root, a short fingerprint of its records, to the shared L1.',
        'The partner bank checks the same record, but it does not see private data of others.',
      ],
    },
  },

  'permissioned-vs-permissionless-blockchain': {
    title: 'Permissionless chains settle first and flag later, Hyper 0X checks first',
    without: {
      packet: 'Over-limit deposit transfer',
      nodes: [
        { icon: 'briefcase', label: 'Corporate client', sub: 'Sends over its limit' },
        { icon: 'ph:user-circle-dashed', label: 'Unknown validators', sub: 'Anyone can join' },
        { icon: 'globe', label: 'Public ledger', sub: 'Settles with no check' },
        { icon: 'ph:binoculars', label: 'Monitoring', sub: 'Flags it afterwards' },
      ],
      breakAt: 2,
      outcome: 'Settled first, flagged later, no one accountable',
      steps: [
        'A corporate client sends tokenized deposits above its per-client limit.',
        'Unknown validators confirm it, and the bank cannot sign a contract with them.',
        'The transfer settles before any rule runs.',
        'Monitoring tools flag it only after the fact.',
      ],
    },
    with: {
      packet: 'Over-limit deposit transfer',
      nodes: [
        { icon: 'briefcase', label: 'Corporate client', sub: 'Sends over its limit' },
        { icon: 'ph:stack', label: 'Private L2', sub: 'Tokenized deposits', guard: true },
        { icon: 'document-lock', label: 'Rules as code', sub: 'KYC, limits, maker-checker', guard: true },
        { icon: 'certificate', label: 'PKI validators', sub: 'Known legal entities', guard: true },
        { icon: 'ph:cube', label: 'Hyper 0X L1', sub: 'Final in one pass', guard: true },
      ],
      stopAt: 2,
      outcome: 'Blocked before it reaches the ledger',
      steps: [
        'The transfer reaches the private L2 that holds the tokenized deposits of the bank.',
        'Hyper 0X checks KYC, per-client limits and maker-checker approvals before it executes.',
        'The transfer is over the limit, so it never reaches the ledger.',
        'Valid transfers go to PKI-bound validators, so a known legal entity signs every vote.',
      ],
    },
  },

  'blockchain-finality-explained': {
    title: 'A reorg can erase a confirmed payment, Hyper 0X never rolls back',
    without: {
      packet: 'Incoming client payment',
      nodes: [
        { icon: 'person', label: 'Client', sub: 'Pays the fintech' },
        { icon: 'globe', label: 'Public chain', sub: 'Probabilistic finality' },
        { icon: 'building', label: 'Fintech', sub: 'Pays out the merchant' },
        { icon: 'ph:git-fork', label: 'Reorg', sub: 'Replaces recent blocks' },
      ],
      breakAt: 3,
      outcome: 'Payout sent, incoming payment disappeared',
      steps: [
        'A client pays the fintech on a chain with probabilistic finality.',
        'After its chosen number of confirmations, the fintech pays out the merchant.',
        'A reorg replaces recent blocks, and the client payment disappears.',
        'The team must try to get the money back, and the books no longer match.',
      ],
    },
    with: {
      packet: 'Incoming client payment',
      nodes: [
        { icon: 'person', label: 'Client', sub: 'Pays the fintech' },
        { icon: 'ph:users-three', label: 'aBFT consensus', sub: 'Known validators, no leader', guard: true },
        { icon: 'ph:seal-check', label: 'Finality', sub: 'One pass, no reorgs', guard: true },
        { icon: 'building', label: 'Fintech', sub: 'Pays on confirmation' },
        { icon: 'building-store', label: 'Merchant', sub: 'Keeps the payout' },
      ],
      outcome: 'The ledger matches the bank statement',
      steps: [
        'A client pays the fintech on Hyper 0X.',
        'Known validators vote with leaderless aBFT consensus, which stays safe while fewer than one third are faulty.',
        'When they agree, the payment is final in one pass, and nobody can reverse it.',
        'The fintech pays the merchant on confirmation, and the ledger matches the bank statement.',
      ],
    },
  },

  'dynamic-blocks': {
    title: 'Fixed blocks queue salary-day payments, dynamic blocks grow with the peak',
    without: {
      packet: 'Salary-day payroll',
      nodes: [
        { icon: 'building', label: 'Bank', sub: 'Salary-day peak' },
        { icon: 'ph:cube', label: 'Fixed blocks', sub: 'Same cap every block' },
        { icon: 'ph:queue', label: 'Backlog', sub: 'Payments wait in line' },
        { icon: 'people', label: 'Employees', sub: 'Some salaries late' },
      ],
      breakAt: 1,
      outcome: 'Salaries late, while spare compute sits idle',
      steps: [
        'On salary day, thousands of payroll payments arrive at once.',
        'Every block has the same fixed cap, on quiet days and busy days.',
        'A backlog forms at once, even though the network had spare compute.',
        'Some salaries arrive late.',
      ],
    },
    with: {
      packet: 'Salary-day payroll',
      nodes: [
        { icon: 'building', label: 'Bank', sub: 'Salary-day peak' },
        { icon: 'ph:stack', label: 'Payroll L2', sub: 'Own block settings', guard: true },
        { icon: 'ph:stack-plus', label: 'Dynamic blocks', sub: 'Grow toward the maximum', guard: true },
        { icon: 'ph:seal-check', label: 'Seal rule', sub: 'Size target or time limit', guard: true },
        { icon: 'people', label: 'Employees', sub: 'Paid with no backlog' },
      ],
      outcome: 'Peak absorbed, no backlog builds',
      steps: [
        'The payroll L2 sets a minimum block size, a maximum block size and a time limit.',
        'When the salary payments arrive, blocks grow toward the maximum.',
        'A block seals when it reaches its size target or when the time limit runs out.',
        'Dynamic blocks add no compute, but they remove the bottleneck of a fixed block size.',
      ],
    },
  },

  'atomic-settlement': {
    title: 'A buyer pays and gets nothing, unless both legs settle as one',
    without: {
      packet: 'Rohan sells to Priya',
      nodes: [
        { icon: 'person', label: 'Priya', sub: 'Buys coins from Rohan' },
        { icon: 'ph:money', label: 'Payment leg', sub: 'Settles first' },
        { icon: 'ph:coins', label: 'Asset leg', sub: 'Fails mid-trade' },
        { icon: 'ph:receipt-x', label: 'Two records', sub: 'Teams must reconcile' },
      ],
      breakAt: 2,
      outcome: 'Priya paid, but the coins never came',
      steps: [
        'Priya pays Rohan, and the payment leg settles first.',
        'The asset leg runs on a separate system and settles later.',
        'The asset leg fails, so only one leg of the trade settles.',
        'Priya has paid but holds no coins, and the teams must reconcile two records.',
      ],
    },
    with: {
      packet: 'Rohan sells to Priya',
      nodes: [
        { icon: 'person', label: 'Priya', sub: 'Buys coins from Rohan' },
        { icon: 'ph:wallet', label: 'Hyper Wallet', sub: 'Exchange and wallet in one' },
        { icon: 'ph:rows', label: 'Order book', sub: 'Runs inside consensus', guard: true },
        { icon: 'ph:swap', label: 'One ledger event', sub: 'Fill and both balances', guard: true },
        { icon: 'checkmark-circle', label: 'Confirmed', sub: 'Both legs settled' },
      ],
      outcome: 'Both legs settle in one step',
      steps: [
        'Priya orders in Hyper Wallet, where the exchange and the wallet write to one record.',
        'The order book runs inside Hyper 0X consensus, so nobody can front-run her order.',
        'The fill and both balance updates land in a single ledger event.',
        'Both legs complete or neither does, and Priya sees pending, confirmed or failed.',
      ],
    },
  },

  'blockchain-data-encryption-four-layers': {
    title: 'A leaked ledger copy exposes plain records, four layers leave ciphertext',
    without: {
      packet: 'Bond order details',
      nodes: [
        { icon: 'person', label: 'Investor', sub: 'Places a bond order' },
        { icon: 'book-database', label: 'Shared ledger', sub: 'Hashed, not encrypted' },
        { icon: 'ph:hard-drives', label: 'Validator copies', sub: 'Full copies for years' },
        { icon: 'ph:user-circle-dashed', label: 'Attacker', sub: 'Reads a leaked copy' },
      ],
      breakAt: 2,
      outcome: 'Investor details readable from one copy',
      steps: [
        'An investor places a bond order on a ledger that does not encrypt data.',
        'Hashes and signatures prove that the record is genuine, but they do not hide it.',
        'Every validator keeps a full copy of the ledger, often for years.',
        'An attacker gets one leaked copy and reads the investor details.',
      ],
    },
    with: {
      packet: 'Bond order details',
      nodes: [
        { icon: 'person', label: 'Investor', sub: 'Places a bond order' },
        { icon: 'globe-shield', label: 'In transit', sub: 'Post-quantum-resistant TLS', guard: true },
        { icon: 'ph:cpu', label: 'In use', sub: 'Per-party keys', guard: true },
        { icon: 'document-lock', label: 'On the ledger', sub: 'Commitment and payload', guard: true },
        { icon: 'ph:hard-drives', label: 'At rest', sub: 'Master keys in HSMs', guard: true },
      ],
      outcome: 'Attacker sees only ciphertext and fingerprints',
      steps: [
        'The bond order travels over TLS 1.3 with a hybrid post-quantum-resistant key exchange.',
        'Hyper 0X processes the trade under per-party keys, so other parties do not see the plaintext.',
        'The ledger stores a hash commitment and a payload that only the two parties can read.',
        'Disks store it all under AES-256-GCM, with master keys in HSMs.',
      ],
    },
  },

  'post-quantum-resistant-blockchain': {
    title: 'How harvest now, decrypt later works, and how hybrid keys resist it',
    without: {
      packet: 'Recorded settlement traffic',
      nodes: [
        { icon: 'document-text', label: 'Settlement record', sub: 'Private for decades' },
        { icon: 'ph:tray-arrow-down', label: 'Harvester', sub: 'Records traffic today' },
        { icon: 'ph:atom', label: 'Quantum computer', sub: 'Arrives in the future' },
        { icon: 'ph:key', label: 'Classic key', sub: 'One scheme to break' },
      ],
      breakAt: 3,
      outcome: 'Old settlement terms become readable',
      steps: [
        'A settlement record must stay confidential for decades.',
        'An attacker records the encrypted traffic today and stores it.',
        'The attacker waits until a large enough quantum computer exists.',
        'The connection used only a classic key exchange, so the attacker decrypts the record.',
      ],
    },
    with: {
      packet: 'Recorded settlement traffic',
      nodes: [
        { icon: 'document-text', label: 'Settlement record', sub: 'Private for decades' },
        { icon: 'ph:tray-arrow-down', label: 'Harvester', sub: 'Records traffic today' },
        { icon: 'ph:atom', label: 'Quantum computer', sub: 'Tries to decrypt' },
        { icon: 'lock-shield', label: 'Hybrid key', sub: 'ML-KEM-768 plus X25519', guard: true },
        { icon: 'ph:stack-simple', label: 'Four layers', sub: 'Transit, use, ledger, rest', guard: true },
      ],
      stopAt: 3,
      outcome: 'Recorded traffic stays private under known attacks',
      steps: [
        'An attacker records settlement traffic today and waits for a quantum computer.',
        'Every Hyper 0X connection uses ML-KEM-768 together with classic X25519 for key exchange.',
        'Hyper 0X combines both shared secrets, so to break only one scheme is not enough.',
        'Four layers of encryption also protect the data, and each layer assumes the one before it failed.',
      ],
    },
  },

  'how-to-choose-a-blockchain-development-company': {
    title: 'Rented chains pass on fees and outages, Buckleson builds on Hyper 0X',
    without: {
      packet: 'Your first use case',
      nodes: [
        { icon: 'people-team', label: 'Your team', sub: 'Has one use case' },
        { icon: 'code', label: 'Vendor', sub: 'Writes smart contracts only' },
        { icon: 'cloud', label: 'Rented chain', sub: 'Another firm runs it' },
        { icon: 'apps', label: 'Your product', sub: 'Inherits fees and outages' },
      ],
      breakAt: 2,
      outcome: 'Fees and outages outside your control',
      steps: [
        'You bring one use case to a vendor that only writes smart contracts.',
        'The vendor builds on a network that another company runs.',
        'Your product inherits the fees, roadmap and outages of that network.',
        'The core is not modular, so each new feature means a full rebuild.',
      ],
    },
    with: {
      packet: 'Your first use case',
      nodes: [
        { icon: 'people-team', label: 'Your team', sub: 'Has one use case' },
        { icon: 'clipboard-task', label: 'Scoped pilot', sub: 'Metrics agreed up front' },
        { icon: 'person', label: 'Engineer', sub: 'Works inside your team' },
        { icon: 'ph:stack', label: 'Private L2', sub: 'Rules as code', guard: true },
        { icon: 'ph:cube', label: 'Hyper 0X L1', sub: 'Built by Buckleson', guard: true },
      ],
      outcome: 'One partner owns the path to production',
      steps: [
        'Buckleson starts with a scoped pilot and success metrics agreed up front.',
        'A forward-deployed engineer works inside your team.',
        'Your app runs on a private L2, and rules run as code before a transaction executes.',
        'Buckleson built Hyper 0X and builds on it every day, so one partner owns the chain.',
      ],
    },
  },

  'asset-tokenization-guide': {
    title: 'A restricted investor buys tokens, unless the rules run before the trade',
    without: {
      packet: 'Restricted investor order',
      nodes: [
        { icon: 'person-warning', label: 'Investor', sub: 'In a restricted country' },
        { icon: 'phone', label: 'Broker app', sub: 'Takes any order' },
        { icon: 'ph:coins', label: 'Token transfer', sub: 'No rules run first' },
        { icon: 'ph:binoculars', label: 'Compliance team', sub: 'Checks after the trade' },
      ],
      breakAt: 2,
      outcome: 'The issuer must unwind the bad trade',
      steps: [
        'An investor in a restricted country orders fund tokens.',
        'The app passes the order on, and the token transfer executes.',
        'The compliance team checks the trade only afterwards.',
        'The trade breaks a country rule, so the issuer must unwind it.',
      ],
    },
    with: {
      packet: 'Restricted investor order',
      nodes: [
        { icon: 'person-warning', label: 'Investor', sub: 'In a restricted country' },
        { icon: 'phone', label: 'Investor app', sub: 'Hyper Wallet or yours' },
        { icon: 'ph:stack', label: 'Private L2', sub: 'The issuer sets rules', guard: true },
        { icon: 'document-lock', label: 'Rules as code', sub: 'KYC, country, limits', guard: true },
        { icon: 'ph:swap', label: 'Atomic settlement', sub: 'Both legs or neither', guard: true },
      ],
      stopAt: 3,
      outcome: 'Blocked before execution, nothing to unwind',
      steps: [
        'The investor orders fund tokens in Hyper Wallet or the issuer app.',
        'On the private L2 of the issuer, Hyper 0X checks KYC, country restrictions and investor limits first.',
        'The country rule fails, so the trade never happens and there is nothing to unwind.',
        'A compliant order goes on to settle atomically, with both legs or neither.',
      ],
    },
  },

  'tokenized-gold-explained': {
    title: 'Small bullion often costs a premium, gram tokens settle in one step',
    without: {
      packet: 'One gram of gold',
      nodes: [
        { icon: 'person', label: 'Investor', sub: 'Wants one gram' },
        { icon: 'building-store', label: 'Dealer', sub: 'Dealer hours only' },
        { icon: 'ph:coin-vertical', label: 'Smallest coin', sub: 'Often costs a premium' },
        { icon: 'vault', label: 'Home safe', sub: 'Storage and insurance' },
      ],
      breakAt: 2,
      outcome: 'Premium paid, plus storage and insurance',
      steps: [
        'An investor wants to buy one gram of gold.',
        'A dealer sells only in dealer hours.',
        'The smallest coin or bar often costs a premium over the gold price.',
        'The investor must then pay for storage and insurance.',
      ],
    },
    with: {
      packet: 'One gram of gold',
      nodes: [
        { icon: 'person', label: 'Investor', sub: 'Wants one gram' },
        { icon: 'ph:stack', label: 'Issuer L2', sub: 'Its own rules', guard: true },
        { icon: 'document-lock', label: 'Rules as code', sub: 'KYC, country, limits', guard: true },
        { icon: 'lock-shield', label: 'Per-party keys', sub: 'Record stays encrypted', guard: true },
        { icon: 'ph:swap', label: 'One-step trade', sub: 'Gold and cash together', guard: true },
        { icon: 'vault', label: 'Vault', sub: 'Allocated bars in trust' },
      ],
      outcome: 'One gram owned, settled in one step',
      steps: [
        'The investor buys one gram on the private L2 of the issuer, at one token per gram.',
        'Before the transfer executes, Hyper 0X checks KYC status, country restrictions and investor limits.',
        'Hyper 0X keeps the investor record encrypted per party.',
        'The gold and the cash settle in one step.',
      ],
    },
  },
};
