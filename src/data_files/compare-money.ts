import type { Compare } from './compare';

/**
 * "Without Hyper 0X / with Hyper 0X" diagrams for the wallet, payment and
 * gaming posts. The schema and the rules are in compare.ts. H0X Pay and
 * HyperRun are coming soon, so their lanes use "will".
 */
export const compareMoney: Record<string, Compare> = {
  'how-to-launch-a-crypto-wallet': {
    title: 'How a scratch-built wallet takes years, and how SDKs fix it',
    without: {
      packet: 'Plan for a bank wallet',
      nodes: [
        { icon: 'ph:bank', label: 'Bank team', sub: 'Starts from zero' },
        { icon: 'ph:key', label: 'Key management', sub: 'Built in-house' },
        { icon: 'ph:plugs', label: 'Chain integrations', sub: 'Dozens to build' },
        { icon: 'ph:clipboard-text', label: 'Security reviews', sub: 'For every chain' },
        { icon: 'ph:hourglass', label: 'Launch', sub: 'Years away' },
      ],
      breakAt: 2,
      outcome: 'Years of work, and every incident yours',
      steps: [
        'The bank decides to build its crypto wallet from scratch.',
        'The team writes key management first, before any customer feature.',
        'Users expect many chains, and each chain needs its own integration.',
        'Swaps and security reviews come next, and the bank owns every incident for years.',
      ],
    },
    with: {
      packet: 'Plan for a bank wallet',
      nodes: [
        { icon: 'ph:bank', label: 'Bank team', sub: 'Your brand and rules' },
        { icon: 'code-block', label: 'Hyper Wallet SDKs', sub: 'In production today', guard: true },
        { icon: 'ph:key', label: 'Keys on device', sub: 'Non-custodial by default', guard: true },
        { icon: 'ph:swap', label: 'Swaps', sub: 'Best route on many chains', guard: true },
        { icon: 'link-multiple', label: 'Hyper 0X', sub: 'Atomic settlement', guard: true },
      ],
      outcome: 'Branded wallet live, users pay one fee',
      steps: [
        'The bank adds the Hyper Wallet SDKs under its own design and rules.',
        'The same wallet already runs in production, with 2M+ transactions across 33K+ portfolios.',
        'Keys stay on the device, and swaps across many chains ship today.',
        'Trades settle atomically on Hyper 0X: both sides settle, or neither does.',
      ],
    },
  },

  'what-is-a-wallet-sdk': {
    title: 'How wallet APIs keep keys on servers, and how SDKs fix it',
    without: {
      packet: 'Send $50 in stablecoin',
      nodes: [
        { icon: 'phone', label: 'Bank app', sub: 'Customer taps Send' },
        { icon: 'cloud', label: 'Bank server', sub: 'Calls the wallet API' },
        { icon: 'ph:hard-drives', label: 'Provider server', sub: 'Holds the private key' },
        { icon: 'ph:cube', label: 'Blockchain', sub: 'Gets the transfer' },
      ],
      breakAt: 2,
      outcome: 'Keys on servers, so the wallet is custodial',
      steps: [
        'A customer of a digital bank taps Send for $50 in stablecoin.',
        'The bank server passes the request to the wallet API of a provider.',
        'The provider server holds the private key and signs the transfer.',
        'With keys on servers, the setup is custodial, and the customer does not control the funds.',
      ],
    },
    with: {
      packet: 'Send $50 in stablecoin',
      nodes: [
        { icon: 'phone', label: 'Bank app', sub: 'Your own design' },
        { icon: 'code-block', label: 'Hyper Wallet SDK', sub: 'Runs inside the app', guard: true },
        { icon: 'clipboard-task', label: 'Compliance hooks', sub: 'Your limits run first', guard: true },
        { icon: 'ph:fingerprint', label: 'Device key', sub: 'Secure hardware signs', guard: true },
        { icon: 'ph:cube', label: 'Blockchain', sub: 'Pending, then confirmed' },
      ],
      outcome: 'Signed on the phone, checked before it runs',
      steps: [
        'The bank app asks the Hyper Wallet SDK to send $50 in stablecoin.',
        'Compliance hooks apply the limits and address checks of the bank before the transfer runs.',
        'The key stays on the phone, and its secure hardware signs the transfer.',
        'The SDK handles the chain details and shows pending, confirmed or failed.',
      ],
    },
  },

  'custodial-vs-non-custodial-wallet': {
    title: 'How a failed custodian freezes funds, and how self-custody avoids it',
    without: {
      packet: 'Withdraw 1 BTC',
      nodes: [
        { icon: 'person', label: 'User', sub: 'Asks to withdraw' },
        { icon: 'phone', label: 'Custodial app', sub: 'Shows a balance only' },
        { icon: 'vault', label: 'Pooled wallet', sub: 'Provider holds every key' },
        { icon: 'ph:currency-btc', label: 'Bitcoin network', sub: 'Never gets the transfer' },
      ],
      breakAt: 2,
      outcome: 'Provider fails, and withdrawals freeze',
      steps: [
        'The user asks a custodial app to withdraw 1 BTC.',
        'The app shows a balance, but the provider holds the keys in a pooled wallet.',
        'The provider suffers a hack and freezes all withdrawals.',
        'The user cannot reach the funds, because only the provider can move them.',
      ],
    },
    with: {
      packet: 'Withdraw 1 BTC',
      nodes: [
        { icon: 'person', label: 'User', sub: 'Asks to withdraw' },
        { icon: 'ph:wallet', label: 'Hyper Wallet', sub: 'Non-custodial by default', guard: true },
        { icon: 'ph:key', label: 'Key on phone', sub: 'Only the user signs', guard: true },
        { icon: 'ph:currency-btc', label: 'Bitcoin network', sub: 'Gets the transfer' },
      ],
      outcome: 'Funds move with no provider approval',
      steps: [
        'The user holds the BTC in Hyper Wallet, a non-custodial wallet.',
        'The private key stays on the phone, so no provider can move the funds.',
        'The phone signs the withdrawal, with no wait for a provider approval.',
        'Even if the wallet provider fails, the funds stay with the user.',
      ],
    },
  },

  'account-abstraction-no-seed-phrases': {
    title: 'How a lost seed phrase locks funds, and smart accounts fix it',
    without: {
      packet: 'Wallet on a new phone',
      nodes: [
        { icon: 'phone', label: 'New phone', sub: 'The old one is lost' },
        { icon: 'ph:wallet', label: 'Wallet app', sub: 'Asks for twelve words' },
        { icon: 'ph:note-pencil', label: 'Seed phrase', sub: 'The paper is gone' },
        { icon: 'lock-closed', label: 'Funds', sub: 'Locked for good' },
      ],
      breakAt: 2,
      outcome: 'Words lost, so the money is lost',
      steps: [
        'The user loses a phone and installs the wallet on a new one.',
        'One private key controls everything, and only the seed phrase can restore it.',
        'The paper with the twelve words is gone, and nobody can reset them.',
        'The user loses the money, because the words were the only way back.',
      ],
    },
    with: {
      packet: 'Wallet on a new phone',
      nodes: [
        { icon: 'phone', label: 'New phone', sub: 'The old one is lost' },
        { icon: 'ph:user-focus', label: 'Face scan', sub: 'Passkey sign-in', guard: true },
        { icon: 'person-key', label: 'Smart account', sub: 'Recovery built in', guard: true },
        { icon: 'link-multiple', label: 'Hyper 0X', sub: 'No seed phrases', guard: true },
        { icon: 'savings', label: 'Funds', sub: 'Back in reach' },
      ],
      outcome: 'A lost phone is not a lost wallet',
      steps: [
        'The user signs in on the new phone with a face scan or passkey.',
        'The account is a smart contract with recovery built in, not one private key.',
        'Account abstraction is the default on Hyper 0X, so users never handle seed phrases.',
        'The funds are back in reach, and the account still enforces its spending limits.',
      ],
    },
  },

  'multi-chain-crypto-wallet-guide': {
    title: 'How a wrong-network send strands funds, and how one wallet swaps instead',
    without: {
      packet: 'Stablecoin from Tron',
      nodes: [
        { icon: 'ph:wallet', label: 'Tron wallet', sub: 'Gets paid in stablecoin' },
        { icon: 'send', label: 'Send screen', sub: 'No network check' },
        { icon: 'building', label: 'Exchange account', sub: 'Network not supported' },
        { icon: 'ph:wallet', label: 'Ethereum wallet', sub: 'Funds never arrive' },
      ],
      breakAt: 2,
      outcome: 'Funds stuck, recovery slow or impossible',
      steps: [
        'A customer of a remittance app gets paid in a dollar stablecoin on Tron.',
        'To hold a stablecoin on Ethereum, the customer sends funds to an exchange account.',
        'The send uses a network that the exchange does not support.',
        'The funds are stuck, and recovery is slow or impossible.',
      ],
    },
    with: {
      packet: 'Stablecoin from Tron',
      nodes: [
        { icon: 'person', label: 'Customer', sub: 'Paid on Tron' },
        { icon: 'ph:wallet', label: 'Hyper Wallet', sub: 'Many chains, one app', guard: true },
        { icon: 'ph:swap', label: 'Swap', sub: 'Best route', guard: true },
        { icon: 'link-multiple', label: 'Hyper 0X', sub: 'Both legs or neither', guard: true },
        { icon: 'data-pie', label: 'One balance', sub: 'Now on Ethereum' },
      ],
      outcome: 'Swapped in one app, both legs settled',
      steps: [
        'The customer receives the stablecoin on Tron in Hyper Wallet.',
        'From the coin page, the customer swaps to a stablecoin on Ethereum at the best route.',
        'The swap blocks bots that reorder trades, and it settles atomically on Hyper 0X.',
        'Both legs complete or neither does, and the customer sees one balance.',
      ],
    },
  },

  'blockchain-payments-for-merchants': {
    title: 'How chargebacks reverse paid orders, and how final payments stop them',
    without: {
      packet: 'Laptop order by card',
      nodes: [
        { icon: 'person', label: 'Customer', sub: 'Buys a laptop' },
        { icon: 'ph:credit-card', label: 'Card network', sub: 'Approves in seconds' },
        { icon: 'ph:bank', label: 'Processor', sub: 'Pays days later' },
        { icon: 'building-store', label: 'Retailer', sub: 'Ships the laptop' },
        { icon: 'ph:arrow-u-up-left', label: 'Chargeback', sub: 'Months after delivery' },
      ],
      breakAt: 4,
      outcome: 'Payment pulled back after the laptop ships',
      steps: [
        'A customer buys a laptop online, and the card network approves it in seconds.',
        'The processor pays the retailer days later, after card fees.',
        'The retailer ships the laptop when the money arrives.',
        'Months later, a chargeback pulls the payment back from the retailer.',
      ],
    },
    with: {
      packet: 'Laptop order in stablecoin',
      nodes: [
        { icon: 'person', label: 'Customer', sub: 'Buys a laptop' },
        { icon: 'ph:qr-code', label: 'Branded checkout', sub: 'Hyper Wallet SDKs', guard: true },
        { icon: 'ph:wallet', label: 'Customer wallet', sub: 'Approves the amount' },
        { icon: 'link-multiple', label: 'Hyper 0X', sub: 'Final in one pass', guard: true },
        { icon: 'building-store', label: 'Retailer', sub: 'Ships at finality' },
      ],
      outcome: 'Paid and final, with no chargeback later',
      steps: [
        'The retailer shows a payment request from its own gateway, built with the Hyper Wallet SDKs.',
        'The customer checks the stablecoin amount in a wallet and approves it.',
        'Hyper 0X makes the payment final in one pass, with no rewrites of recent blocks.',
        'The retailer ships the laptop, and no chargeback can pull the payment back.',
      ],
    },
  },

  'what-is-micro-investing': {
    title: 'How fees eat round-ups, and how a payment slice will buy gold',
    without: {
      packet: '$0.40 of spare change',
      nodes: [
        { icon: 'ph:coffee', label: 'Coffee', sub: '$4.60 on a card' },
        { icon: 'ph:coins', label: 'Round-up', sub: 'Sets aside $0.40' },
        { icon: 'savings', label: 'Change pot', sub: 'Waits for a threshold' },
        { icon: 'ph:bank', label: 'Fund purchase', sub: 'Flat monthly fee' },
      ],
      breakAt: 3,
      outcome: 'A flat fee eats the small balance',
      steps: [
        'A $4.60 coffee rounds up to $5.00, so the app sets aside $0.40.',
        'The spare change waits in a pot until it reaches a threshold.',
        'The app then buys fractional fund units with the small sum.',
        'A flat monthly fee takes a large share of a small balance.',
      ],
    },
    with: {
      packet: '$50 grocery bill',
      nodes: [
        { icon: 'food', label: 'Grocery bill', sub: 'A $50 payment' },
        { icon: 'ph:sliders', label: 'H0X Pay plan', sub: 'Coming soon, set once', guard: true },
        { icon: 'ph:coins', label: 'Tokenized gold', sub: 'A $1 slice' },
        { icon: 'link-multiple', label: 'Hyper 0X', sub: 'Settles every slice', guard: true },
        { icon: 'data-pie', label: 'Portfolio', sub: 'Grows with each payment' },
      ],
      outcome: 'Each payment will add a slice of gold',
      steps: [
        'With H0X Pay, coming soon, the user will set an investment plan one time.',
        'With a 2 percent plan, a $50 grocery bill will send $1 to tokenized gold.',
        'Each slice will settle on Hyper 0X, so the app buys and records it in one step.',
        'The portfolio of the user will grow each time the user spends.',
      ],
    },
  },

  'play-to-earn-games-explained': {
    title: 'How minted rewards lose value, and how signed wins will pay instead',
    without: {
      packet: 'Daily grind reward',
      nodes: [
        { icon: 'ph:game-controller', label: 'Daily grind', sub: 'Hours, not skill' },
        { icon: 'database', label: 'Operator database', sub: 'Records the reward' },
        { icon: 'coin-multiple', label: 'Token mint', sub: 'Mints new tokens' },
        { icon: 'ph:trend-down', label: 'Token market', sub: 'Few reasons to hold' },
      ],
      breakAt: 2,
      outcome: 'The reward token loses almost all value',
      steps: [
        'Players repeat the same tasks for hours to earn a game token.',
        'The operator database records each reward, and players must trust it.',
        'The game mints new tokens to pay players, so supply grows faster than demand.',
        'Money comes mostly from new players, so the token falls when growth slows.',
      ],
    },
    with: {
      packet: 'Match win reward',
      nodes: [
        { icon: 'trophy', label: 'Match win', sub: 'Skill, not hours' },
        { icon: 'ph:signature', label: 'Signed result', sub: 'HyperRun, coming soon', guard: true },
        { icon: 'document-lock', label: 'Rewards contract', sub: 'On Hyper 0X', guard: true },
        { icon: 'ph:wallet', label: 'In-game wallet', sub: 'Hyper Wallet SDK', guard: true },
      ],
      outcome: 'Wins will pay out on signed results',
      steps: [
        'In HyperRun, coming soon, players will earn when they play and win.',
        'The game will sign every match result before any payout.',
        'A rewards contract on Hyper 0X will pay out on the signed result.',
        'The reward will land in an in-game wallet built with the Hyper Wallet SDK.',
      ],
    },
  },

  'esports-prediction-on-blockchain': {
    title: 'How an edited result pays the wrong fans, and how it stops',
    without: {
      packet: 'Edited match result',
      nodes: [
        { icon: 'sport', label: 'Cup final', sub: 'Team A wins' },
        { icon: 'person-edit', label: 'Insider', sub: 'Changes the score' },
        { icon: 'database', label: 'Operator database', sub: 'No signature check' },
        { icon: 'people', label: 'Fans', sub: 'Paid on a false result' },
      ],
      breakAt: 2,
      outcome: 'Wrong fans paid, no shared record',
      steps: [
        'Fans predict the cup final on a platform that holds all the money.',
        'After the match, someone with database access changes the score.',
        'The operator database accepts the change, because nothing checks a signature.',
        'The platform pays the wrong fans, and nobody has a shared record to check.',
      ],
    },
    with: {
      packet: 'Edited match result',
      nodes: [
        { icon: 'sport', label: 'Cup final', sub: 'Team A wins' },
        { icon: 'ph:signature', label: 'Signed result', sub: 'HyperRun, coming soon', guard: true },
        { icon: 'person-edit', label: 'Insider', sub: 'Changes the score' },
        { icon: 'document-lock', label: 'Rewards contract', sub: 'On Hyper 0X', guard: true },
        { icon: 'people', label: 'Fans', sub: 'Paid on the real result' },
      ],
      stopAt: 3,
      outcome: 'The contract will reject the edited result',
      steps: [
        'In HyperRun, coming soon, the game will sign every match result.',
        'If someone changes the score afterwards, the signature no longer matches.',
        'The rewards contract on Hyper 0X will check the signature and reject the edit.',
        'Fan predictions will resolve only on the real, signed result.',
      ],
    },
  },

  'web3-gaming-wallets': {
    title: 'How seed phrases lose new players, and how embedded wallets keep them',
    without: {
      packet: 'New player sign-up',
      nodes: [
        { icon: 'ph:game-controller', label: 'New player', sub: 'Wants to play' },
        { icon: 'ph:puzzle-piece', label: 'Browser extension', sub: 'A separate wallet' },
        { icon: 'ph:note-pencil', label: 'Seed phrase', sub: 'Write down 24 words' },
        { icon: 'ph:gas-pump', label: 'Gas token', sub: 'Bought on an exchange' },
        { icon: 'alert', label: 'Pop-ups', sub: 'One per action' },
      ],
      breakAt: 2,
      outcome: 'Player quits before the first match',
      steps: [
        'The new player installs a browser extension to get a wallet.',
        'The wallet asks the player to write down 24 words before the first match.',
        'Next, the player buys a gas token and approves a pop-up for each action.',
        'Each step loses players, and many quit before they play.',
      ],
    },
    with: {
      packet: 'New player sign-up',
      nodes: [
        { icon: 'ph:game-controller', label: 'New player', sub: 'Installs the game' },
        { icon: 'ph:user-focus', label: 'Passkey sign-in', sub: 'Face scan, no words', guard: true },
        { icon: 'ph:wallet', label: 'Embedded wallet', sub: 'Hyper Wallet SDK', guard: true },
        { icon: 'ph:gas-pump', label: 'Sponsored fees', sub: 'The game pays them', guard: true },
        { icon: 'trophy', label: 'First match', sub: 'Rewards land in wallet' },
      ],
      outcome: 'Player starts with no seed phrase or gas',
      steps: [
        'The player signs in with a face scan or passkey, through account abstraction on Hyper 0X.',
        'The Hyper Wallet SDK creates the wallet inside the game, with no seed phrase.',
        'The game pays the network fees, so the player never needs a gas token.',
        'Rewards land in the wallet, which is non-custodial by default.',
      ],
    },
  },
};
