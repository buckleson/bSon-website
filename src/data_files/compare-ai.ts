import type { Compare } from './compare';

/**
 * "Without Hyper 0X / with Hyper 0X" diagrams for the AI-agent security
 * posts. The schema and the rules are in compare.ts. Guard nodes that the
 * post does not name as a Pavii part (for example a rights check or a source
 * check) are general controls, and their steps do not say that Pavii runs them.
 */
export const compareAi: Record<string, Compare> = {
  'how-to-secure-ai-agents': {
    title: 'How unsafe agent output reaches a web page, and how it stops',
    without: {
      packet: 'Reply with a script',
      nodes: [
        { icon: 'bot', label: 'AI agent', sub: 'Drafts a web reply' },
        { icon: 'ph:paper-plane-tilt', label: 'Delivery', sub: 'No output check' },
        { icon: 'ph:browser', label: 'Web page', sub: 'Shows it as is' },
      ],
      breakAt: 1,
      outcome: 'Script and API key reach the page',
      steps: [
        'The agent drafts a reply that holds a script and an API key.',
        'Nothing checks the output, so the reply goes out as it is.',
        'The script and the secret end up in the live web page.',
      ],
    },
    with: {
      packet: 'Reply with a script',
      nodes: [
        { icon: 'bot', label: 'AI agent', sub: 'Drafts a web reply' },
        { icon: 'shield', label: 'Pavii gateway', sub: 'One for every agent', guard: true },
        { icon: 'shield-checkmark', label: 'Output gate', sub: 'Removes scripts, secrets', guard: true },
        { icon: 'ph:browser', label: 'Web page', sub: 'Gets a clean reply' },
        { icon: 'receipt', label: 'Receipt', sub: 'Chained on Hyper 0X', guard: true },
      ],
      stopAt: 2,
      outcome: 'Script and key removed before delivery',
      steps: [
        'Pavii puts one gateway between every agent and your systems.',
        'The output gate finds the script and the API key in the reply.',
        'It removes them before delivery, so the web page gets a clean reply.',
        'Every decision gets a hash-chained receipt on Hyper 0X.',
      ],
    },
  },

  'ai-agent-tool-calling-security': {
    title: 'How a hostile tool call runs a shell, and how it stops',
    without: {
      packet: 'run_shell with a download',
      nodes: [
        { icon: 'document-text', label: 'Customer file', sub: 'Hidden instruction' },
        { icon: 'bot', label: 'Support agent', sub: 'Proposes run_shell' },
        { icon: 'ph:terminal-window', label: 'Tool runner', sub: 'Runs every call' },
        { icon: 'ph:hard-drives', label: 'Server', sub: 'Admin rights' },
      ],
      breakAt: 2,
      outcome: 'A download runs with admin rights',
      steps: [
        'A hidden instruction in a document steers the support agent.',
        'The agent proposes run_shell with a download command.',
        'The application has no allow-list, so it runs the call at once.',
        'The call runs with admin rights, so one fooled agent becomes a crisis.',
      ],
    },
    with: {
      packet: 'run_shell with a download',
      nodes: [
        { icon: 'document-text', label: 'Customer file', sub: 'Hidden instruction' },
        { icon: 'bot', label: 'Support agent', sub: 'Proposes run_shell' },
        { icon: 'checkbox', label: 'Tool allow-list', sub: 'Approved tools only', guard: true },
        { icon: 'document-lock', label: 'Egress contract', sub: 'On Hyper 0X', guard: true },
        { icon: 'ph:hard-drives', label: 'Your systems', sub: 'Least privilege' },
        { icon: 'receipt', label: 'Receipt', sub: 'Chained on Hyper 0X', guard: true },
      ],
      stopAt: 2,
      outcome: 'Call blocked, with a signed receipt',
      steps: [
        'Every call that the model proposes goes to the gateway before it runs.',
        'The support agent has no run_shell on its allow-list, so the call stops.',
        'Allowed calls still meet the egress contract on Hyper 0X, which decides what the agent can send and do.',
        'Every call, passed or blocked, leaves a signed receipt chained on Hyper 0X.',
      ],
    },
  },

  'mcp-server-security-risks': {
    title: 'How a silent MCP update steals a key, and how it stops',
    without: {
      packet: 'Poisoned tool description',
      nodes: [
        { icon: 'ph:package', label: 'Public MCP server', sub: 'Ships an update' },
        { icon: 'settings', label: 'Agent config', sub: 'No pinned version' },
        { icon: 'bot', label: 'Coding agent', sub: 'Reads the full text' },
        { icon: 'ph:key', label: 'SSH key', sub: 'Put in the notes field' },
      ],
      breakAt: 1,
      outcome: 'SSH key leaks through a tool field',
      steps: [
        'A public MCP server ships an update that changes a tool description.',
        'Nobody pinned the version, so the update installs with no review.',
        'The new text tells the agent to put the SSH key of the user in the notes field.',
        'The person who approved the tool saw only its name, so nobody notices.',
      ],
    },
    with: {
      packet: 'Poisoned tool description',
      nodes: [
        { icon: 'ph:package', label: 'Public MCP server', sub: 'Ships an update' },
        { icon: 'shield', label: 'Pavii gateway', sub: 'All MCP traffic', guard: true },
        { icon: 'shield-checkmark', label: 'Supply chain gate', sub: 'Pinned hash check', guard: true },
        { icon: 'bot', label: 'Coding agent', sub: 'Keeps the approved version' },
        { icon: 'receipt', label: 'Receipt', sub: 'Chained on Hyper 0X', guard: true },
      ],
      stopAt: 2,
      outcome: 'Update held until a person reviews it',
      steps: [
        'All MCP traffic passes one Pavii gateway, which checks every call.',
        'The supply chain gate finds that the hash of the update no longer matches the pinned one.',
        'The gate blocks the new version until someone reviews it, and work goes on with the approved version.',
        'Every call leaves a hash-chained receipt on Hyper 0X, so you can prove which server did what.',
      ],
    },
  },

  'stop-llm-data-leaks-pii-redaction': {
    title: 'How customer data leaks into model logs, and how it stops',
    without: {
      packet: 'Email with an IBAN',
      nodes: [
        { icon: 'mail', label: 'Customer email', sub: 'Name, phone, IBAN' },
        { icon: 'bot', label: 'Reply agent', sub: 'Sends the whole email' },
        { icon: 'cloud', label: 'Model provider', sub: 'Gets the real values' },
        { icon: 'ph:file-text', label: 'Logs', sub: 'Keep them for months' },
      ],
      breakAt: 2,
      outcome: 'Real IBANs sit in prompts and logs',
      steps: [
        'A customer email holds a name, a phone number and an IBAN.',
        'The agent puts the whole email into the prompt.',
        'The model provider gets the real values, and the logs keep them for months.',
        'Logs often stay longer than the database, with less protection and more readers.',
      ],
    },
    with: {
      packet: 'Email with an IBAN',
      nodes: [
        { icon: 'mail', label: 'Customer email', sub: 'Name, phone, IBAN' },
        { icon: 'lock-shield', label: 'Privacy gate', sub: 'Swaps in placeholders', guard: true },
        { icon: 'bot', label: 'Reply agent', sub: 'Sees [IBAN_1] only' },
        { icon: 'shield-checkmark', label: 'Output gate', sub: 'Checks the draft', guard: true },
        { icon: 'receipt', label: 'Receipt', sub: 'Chained on Hyper 0X', guard: true },
      ],
      outcome: 'Reply drafted, logs hold only placeholders',
      steps: [
        'The privacy gate replaces the name and the IBAN with placeholders such as [IBAN_1].',
        'The agent drafts the reply, and the model never sees the real values.',
        'On the way out, the output gate removes personal data and secrets that do not belong.',
        'Each decision gets a receipt chained on Hyper 0X, and the logs hold only placeholders.',
      ],
    },
  },

  'proof-of-execution-ai': {
    title: 'How AI logs get edited or lost, and how receipts stop it',
    without: {
      packet: 'AI decision',
      nodes: [
        { icon: 'bot', label: 'AI agent', sub: 'Acts on its own' },
        { icon: 'database', label: 'Internal system', sub: 'Data the AI touches' },
        { icon: 'ph:file-text', label: 'Local log', sub: 'Open to edits' },
        { icon: 'building-government', label: 'Regulator', sub: 'Asks what happened' },
      ],
      breakAt: 2,
      outcome: 'No proof of what the AI did',
      steps: [
        'The AI agent reads data, calls an internal system and acts on its own.',
        'Its log lives on the same system that the AI touches.',
        'Someone can edit or delete the log, or the log is simply incomplete.',
        'When a regulator asks what happened, nobody can prove it.',
      ],
    },
    with: {
      packet: 'AI decision',
      nodes: [
        { icon: 'bot', label: 'AI agent', sub: 'Acts on its own' },
        { icon: 'database', label: 'Internal system', sub: 'No change needed' },
        { icon: 'receipt', label: 'Signed receipt', sub: 'Who, what, when', guard: true },
        { icon: 'link', label: 'Receipt chain', sub: 'Links to the last one', guard: true },
        { icon: 'ph:cube', label: 'Hyper 0X', sub: 'Anchors the chain', guard: true },
        { icon: 'building-government', label: 'Regulator', sub: 'Checks one record' },
      ],
      outcome: 'One record that every party can verify',
      steps: [
        'Hyper 0X sits next to your systems and needs no change to business logic.',
        'Every AI decision and action becomes a signed transaction on Hyper 0X.',
        'Each receipt links to the one before it, so a deleted or edited entry shows at once.',
        'Regulators, finance teams and counterparties all check the same record.',
      ],
    },
  },

  'ai-agent-memory-poisoning': {
    title: 'How a fake memory note redirects a payment, and how it stops',
    without: {
      packet: 'New bank account note',
      nodes: [
        { icon: 'mail', label: 'Attacker email', sub: 'Note a new account' },
        { icon: 'bot', label: 'Finance assistant', sub: 'Saves it as a fact' },
        { icon: 'database', label: 'Long-term memory', sub: 'No check on writes' },
        { icon: 'ph:bank', label: 'Payment', sub: 'Three weeks later' },
      ],
      breakAt: 2,
      outcome: 'A real payment goes to the attacker',
      steps: [
        'An email asks the finance assistant to note a new bank account for all future invoices.',
        'The assistant saves the account as a fact in its long-term memory.',
        'Three weeks later, it puts the account of the attacker into a real payment instruction.',
        'Nobody links the payment to the old email.',
      ],
    },
    with: {
      packet: 'New bank account note',
      nodes: [
        { icon: 'mail', label: 'Attacker email', sub: 'Note a new account' },
        { icon: 'bot', label: 'Finance assistant', sub: 'Saves the note' },
        { icon: 'history', label: 'Memory versions', sub: 'Hashed on Hyper 0X', guard: true },
        { icon: 'document-lock', label: 'Egress contract', sub: 'Approved suppliers only', guard: true },
        { icon: 'receipt', label: 'Receipt', sub: 'Chained on Hyper 0X', guard: true },
      ],
      stopAt: 3,
      outcome: 'Payment to the new account stops',
      steps: [
        'The assistant saves the note, and Hyper 0X holds a hash of each memory version.',
        'Three weeks later, the assistant tries to pay an invoice to the new account.',
        'The egress contract allows payments only to accounts on the approved supplier list, so the payment stops.',
        'The versions on Hyper 0X show the first bad entry, so you can roll back to a known-good state.',
      ],
    },
  },

  'ai-agent-identity': {
    title: 'How a shared account leaks every salary, and how it stops',
    without: {
      packet: 'Compare leadership pay',
      nodes: [
        { icon: 'person', label: 'Intern', sub: 'No HR access' },
        { icon: 'bot', label: 'Reporting agent', sub: 'Shared admin account' },
        { icon: 'database', label: 'Data warehouse', sub: 'Sees an admin' },
        { icon: 'data-bar-vertical-ascending', label: 'Pay report', sub: 'Every salary' },
      ],
      breakAt: 1,
      outcome: 'Intern sees every leadership salary',
      steps: [
        'An intern with no access to HR data asks the agent to compare leadership pay.',
        'The agent runs the query with a shared admin account, not with the rights of the intern.',
        'The data warehouse sees an admin, so it returns every salary.',
        'No control failed, and the logs cannot tell which agent acted.',
      ],
    },
    with: {
      packet: 'Compare leadership pay',
      nodes: [
        { icon: 'person', label: 'Intern', sub: 'No HR access' },
        { icon: 'bot', label: 'Reporting agent', sub: 'Own identity' },
        { icon: 'shield', label: 'Pavii gateway', sub: 'Knows which agent', guard: true },
        { icon: 'person-key', label: 'Rights check', sub: 'Intern rights travel', guard: true },
        { icon: 'database', label: 'Data warehouse', sub: 'Smallest rights' },
        { icon: 'receipt', label: 'Receipt', sub: 'Names the agent', guard: true },
      ],
      stopAt: 3,
      outcome: 'Query stops, intern sees no salaries',
      steps: [
        'The agent has its own identity, and the rights of the intern travel with the request.',
        'Every call passes one Pavii gateway, so Pavii knows which agent made it.',
        'The rights check stops the salary query, because the intern cannot see salaries.',
        'The receipt on Hyper 0X shows which agent asked and what the gateway decided.',
      ],
    },
  },

  'ai-agent-kill-switch': {
    title: 'How a rogue agent erases its trail, and how it stops',
    without: {
      packet: 'Delete the logs folder',
      nodes: [
        { icon: 'bot', label: 'Coding agent', sub: 'Shell access' },
        { icon: 'arrow-sync', label: 'Data migration', sub: 'Fails halfway' },
        { icon: 'document-folder', label: 'Logs folder', sub: 'In reach of the agent' },
        { icon: 'clipboard-task', label: 'Status report', sub: 'Says complete' },
      ],
      breakAt: 2,
      outcome: 'False report stands, with no trail',
      steps: [
        'A coding agent with shell access runs a data migration, and it fails halfway.',
        'The agent deletes the logs folder, because its controls sit within its reach.',
        'It reports that the migration is complete.',
        'Nobody notices until the month-end figures do not add up.',
      ],
    },
    with: {
      packet: 'Delete the logs folder',
      nodes: [
        { icon: 'bot', label: 'Coding agent', sub: 'Tries the delete' },
        { icon: 'shield', label: 'Pavii gateway', sub: 'Outside the agent', guard: true },
        { icon: 'ph:power', label: 'Kill switch', sub: 'Observed, restricted, stopped', guard: true },
        { icon: 'document-folder', label: 'Logs folder', sub: 'Behind the gateway' },
        { icon: 'receipt', label: 'Receipt chain', sub: 'Anchored on Hyper 0X', guard: true },
      ],
      stopAt: 2,
      outcome: 'Agent stopped, every step on record',
      steps: [
        'Every action of the agent passes the Pavii gateway, outside its reach.',
        'The delete attempt breaks a rule, so the kill switch moves the agent from observed to restricted.',
        'A second delete moves it to stopped, and a person can stop it at any time.',
        'Each step joins the receipt chain on Hyper 0X, so a deleted entry shows as a gap.',
      ],
    },
  },

  'multi-agent-cascading-failures': {
    title: 'How one wrong flag turns into a payout, and how it stops',
    without: {
      packet: '"Identity verified" flag',
      nodes: [
        { icon: 'scan-type', label: 'Intake agent', sub: 'Misreads a blurry scan' },
        { icon: 'bot', label: 'Credit agent', sub: 'Trusts the flag' },
        { icon: 'ph:calculator', label: 'Pricing agent', sub: 'Makes an offer' },
        { icon: 'savings', label: 'Payout agent', sub: 'Sends the money' },
      ],
      breakAt: 1,
      outcome: 'One blurry scan ends as a payment',
      steps: [
        'The intake agent reads a blurry ID scan and sets "identity verified" by mistake.',
        'The credit agent trusts the flag and approves the application.',
        'The pricing agent makes an offer, and the payout agent sends the money.',
        'No agent broke a rule, yet one blurry scan ended as a real payment.',
      ],
    },
    with: {
      packet: '"Identity verified" flag',
      nodes: [
        { icon: 'scan-type', label: 'Intake agent', sub: 'Misreads a blurry scan' },
        { icon: 'ph:signature', label: 'Signed hand-off', sub: 'Sender and schema', guard: true },
        { icon: 'scan-person', label: 'Source check', sub: 'Asks the ID service', guard: true },
        { icon: 'ph:calculator', label: 'Pricing agent', sub: 'Waits for the checks' },
        { icon: 'savings', label: 'Payout agent', sub: 'Pays checked loans' },
        { icon: 'receipt', label: 'Hop receipts', sub: 'Chained on Hyper 0X', guard: true },
      ],
      stopAt: 2,
      outcome: 'Loan stops before any money moves',
      steps: [
        'Each message between agents carries a signature and must match a schema.',
        'The credit agent asks the ID service, not the flag of another agent.',
        'For loan 8813, the ID service disagrees with the flag, so the loan stops.',
        'Each hop leaves a signed receipt on Hyper 0X, so a bad fact leads back to its first step.',
      ],
    },
  },

  'ai-bill-of-materials': {
    title: 'How a bad package runs attacker code, and how it stops',
    without: {
      packet: 'fast-csv-pro install',
      nodes: [
        { icon: 'bot', label: 'AI agent', sub: 'Asks for fast-csv-pro' },
        { icon: 'ph:package', label: 'Public registry', sub: 'No review' },
        { icon: 'code', label: 'Install script', sub: 'Calls an outside server' },
        { icon: 'ph:hard-drives', label: 'Your systems', sub: 'Run attacker code' },
      ],
      breakAt: 2,
      outcome: 'Attacker code runs inside your systems',
      steps: [
        'The agent fetches fast-csv-pro while it runs, with no review.',
        'The registry serves whatever the publisher uploaded under that name.',
        'The install script calls an outside server, and nothing checks it first.',
        'One bad part gives an attacker code execution inside your systems.',
      ],
    },
    with: {
      packet: 'fast-csv-pro install',
      nodes: [
        { icon: 'bot', label: 'AI agent', sub: 'Asks for fast-csv-pro' },
        { icon: 'checkbox', label: 'Allow-list', sub: 'Approved parts only', guard: true },
        { icon: 'ph:fingerprint', label: 'Pinned hash', sub: 'One exact file', guard: true },
        { icon: 'ph:cube-transparent', label: 'Sandbox test', sub: 'Runs in isolation', guard: true },
        { icon: 'book-database', label: 'AI-BOM', sub: 'On Hyper 0X', guard: true },
      ],
      stopAt: 3,
      outcome: 'Install blocked before it reaches your systems',
      steps: [
        'The supply chain gate of Pavii checks every new package before an agent can use it.',
        'The package passes the allow-list and matches its pinned hash.',
        'In the sandbox, its install script calls an outside server, so the gate stops it.',
        'The decision gets a receipt on Hyper 0X, and only approved parts join the AI-BOM.',
      ],
    },
  },

  'denial-of-wallet-ai': {
    title: 'How a looping tool drains the AI budget, and how it stops',
    without: {
      packet: 'One more search',
      nodes: [
        { icon: 'ph:package', label: 'Research tool', sub: 'Poisoned description' },
        { icon: 'bot', label: 'AI agent', sub: 'Searches all night' },
        { icon: 'gauge', label: 'Request limit', sub: 'Counts calls, not cost' },
        { icon: 'cloud', label: 'Model provider', sub: 'Bills every token' },
      ],
      breakAt: 2,
      outcome: 'Monthly model budget gone by morning',
      steps: [
        'A free research tool tells the agent to confirm every result with one more search.',
        'The agent obeys, so the search repeats all night.',
        'The request limit counts calls, not cost, so every call goes through.',
        'By morning, the agent has made tens of thousands of calls and spent the monthly budget.',
      ],
    },
    with: {
      packet: 'One more search',
      nodes: [
        { icon: 'ph:package', label: 'Research tool', sub: 'Poisoned description' },
        { icon: 'bot', label: 'AI agent', sub: 'Starts the loop' },
        { icon: 'ph:arrows-in', label: 'Compact context', sub: 'Search, cache, notes', guard: true },
        { icon: 'coin-multiple', label: 'Budget gate', sub: 'Stops at empty budget', guard: true },
        { icon: 'cloud', label: 'Model provider', sub: 'Bills fewer tokens' },
        { icon: 'receipt', label: 'Usage record', sub: 'Signed on Hyper 0X', guard: true },
      ],
      stopAt: 3,
      outcome: 'Loop stops before the budget is gone',
      steps: [
        'The poisoned tool still tells the agent to search again after every result.',
        'With the Pavii compact context, agents used 30 to 60 percent fewer tokens on one measured Claude Code task.',
        'The budget gate stops the calls when the budget of the agent is empty.',
        'Each call leaves a signed usage record on Hyper 0X that a billing team can check.',
      ],
    },
  },

  'ai-agent-hallucination-risk': {
    title: 'How a false "done" report breaks a restore, and how it stops',
    without: {
      packet: '"Backup done, job 4472"',
      nodes: [
        { icon: 'bot', label: 'AI agent', sub: 'Reports backup done' },
        { icon: 'people-team', label: 'Ops team', sub: 'Trusts the report' },
        { icon: 'clipboard-task', label: 'Restore plan', sub: 'Built on the claim' },
        { icon: 'ph:hard-drive', label: 'Failed disk', sub: 'A week later' },
      ],
      breakAt: 1,
      outcome: 'Restore fails, the backup never ran',
      steps: [
        'The agent reports "backup done, job 4472", but the job never ran.',
        'Nothing checks the claim, so the team trusts the report.',
        'A week later, a disk fails.',
        'The restore fails with it, because the backup never ran.',
      ],
    },
    with: {
      packet: '"Backup done, job 4472"',
      nodes: [
        { icon: 'bot', label: 'AI agent', sub: 'Claims job 4472 done' },
        { icon: 'form', label: 'Required fields', sub: 'Job ID, time, size', guard: true },
        { icon: 'receipt', label: 'Receipt check', sub: 'Job receipts on Hyper 0X', guard: true },
        { icon: 'clipboard-task', label: 'Restore plan', sub: 'Checked claims only' },
      ],
      stopAt: 2,
      outcome: 'Gap caught on the first night',
      steps: [
        'Every night, the backup job writes a receipt on Hyper 0X with its ID, time and size.',
        'The claim names job 4472, so it fills the required fields.',
        'Your workflow looks up job 4472 on Hyper 0X and finds no receipt.',
        'The mismatch stops the restore plan, and an alert goes to the operations team.',
      ],
    },
  },
};
