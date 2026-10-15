/**
 * The ten risks that matter most for companies that run AI agents, with how
 * Pavii and Hyper 0X answer each one. Used by the Pavii page and the
 * AI-agent security service. Descriptions are technical text, so they follow
 * the plain-English rules in WRITING.md. Only public Pavii claims appear here.
 * `chain`: whether the blockchain adds real protection (yes), helps with part
 * of it (partly) or only gives evidence after the fact (evidence).
 */
export interface Threat {
  icon: string;
  title: string;
  risk: string;
  example: string;
  answer: string;
  layers: string[];
  chain: 'yes' | 'partly' | 'evidence';
  chainText: string;
}

export const threats: Threat[] = [
  {
    icon: 'syringe',
    title: 'Prompt injection and goal hijack',
    risk: 'Hidden text in a page, file, email or tool result changes what the agent tries to do.',
    example: 'A support ticket hides white text that tells the triage bot to post the .env file.',
    answer: 'The injection gate treats outside text as data, never as instructions. If a hijacked agent still tries a risky action, the egress contract denies it.',
    layers: ['Injection gate', 'Egress contract', 'Output gate'],
    chain: 'partly',
    chainText: 'The rule that blocks the action is a contract that nobody can secretly weaken. Each blocked attempt leaves evidence.',
  },
  {
    icon: 'eye-slash',
    title: 'Data leaks through AI',
    risk: 'Customer records, keys and system-prompt text appear in prompts, answers, tool arguments and logs.',
    example: 'A two-line payment reminder sends the full customer profile to an outside model.',
    answer: 'The privacy gate removes personal data and secrets before a model sees them. The output gate removes them from what comes back.',
    layers: ['Privacy gate', 'Output gate', 'Egress contract'],
    chain: 'partly',
    chainText: 'Personal data never goes on the chain. Receipts hold only hashes, and the list of allowed destinations is a contract.',
  },
  {
    icon: 'wrench',
    title: 'Agents with too much power',
    risk: 'An agent has more tools, permissions or freedom than its task needs, so one wrong step becomes a real action.',
    example: 'A "run any shell command" tool deletes a production volume on the wrong host.',
    answer: 'Every tool call goes through one gateway. The egress contract decides what each agent can send and do. Budgets stop uncontrolled use.',
    layers: ['Egress contract', 'Budget gate', 'Kill switch'],
    chain: 'yes',
    chainText: 'The policy is outside the agent, in a contract with versions. Neither the agent nor one admin can secretly widen it.',
  },
  {
    icon: 'identification-card',
    title: 'Borrowed identity and privilege abuse',
    risk: 'Agents run on shared keys with more rights than the person who asked, so whoever controls the agent gets those rights.',
    example: 'An intern asks a reporting agent with an admin account to compare salaries, and gets them all.',
    answer: 'Every agent uses one gateway, so each call has a known sender. Rules apply per agent, and secrets stay out of what the model sees.',
    layers: ['One gateway', 'Privacy gate', 'Egress contract'],
    chain: 'yes',
    chainText: 'Signed actions show which agent acted, and partner companies can check them without access to your systems.',
  },
  {
    icon: 'package',
    title: 'Poisoned AI supply chain',
    risk: 'A fake or tampered model, package, MCP server or skill gives an attacker a way into the agent.',
    example: 'An agent installs a package with a name the model invented, and an attacker owns that name.',
    answer: 'Every new package or MCP server must pass an allow-list, a pinned hash or a sandbox test before the agent can use it.',
    layers: ['Supply-chain gate', 'Receipt'],
    chain: 'yes',
    chainText: 'Hyper 0X stores the pinned hashes and every change to the allow-list, so all teams check the same list.',
  },
  {
    icon: 'brain',
    title: 'Poisoned agent memory',
    risk: 'False facts or hidden instructions in memory or in a knowledge base affect every later session.',
    example: 'An email asks the assistant to "note" new bank details, and weeks later it pays the attacker.',
    answer: 'The injection gate checks files, pages and tool results before the agent can store them. We recommend that a person checks high-value facts.',
    layers: ['Injection gate', 'Receipt'],
    chain: 'partly',
    chainText: 'A hash of each memory version on chain shows who wrote what, and when. The chain cannot judge whether a fact is true.',
  },
  {
    icon: 'code',
    title: 'Unsafe output and code',
    risk: 'Model output goes straight into a browser, shell or database and runs as code.',
    example: 'Generated cleanup code also uploads the file to an outside server.',
    answer: 'The output gate removes scripts and secrets before delivery, and the egress contract blocks calls to destinations it does not allow.',
    layers: ['Output gate', 'Egress contract'],
    chain: 'evidence',
    chainText: 'Pavii prevents the harm at run time. Later, the chain only proves which output caused an incident.',
  },
  {
    icon: 'gauge',
    title: 'Uncontrolled cost',
    risk: 'A loop, an attacker or a bad tool uses a month of tokens in a few hours.',
    example: 'A free research tool tells the agent to re-check every result, and the budget is gone by morning.',
    answer: 'The budget gate caps tokens, spend and call rate per agent. Compact context cut tokens by 30 to 60 percent on one measured Claude Code task.',
    layers: ['Budget gate', 'Kill switch'],
    chain: 'partly',
    chainText: 'Nobody can secretly raise the caps in a contract. Signed usage records settle billing disputes.',
  },
  {
    icon: 'robot',
    title: 'Rogue agents',
    risk: 'An agent moves away from its task, hides mistakes or reports false results. It can also delete the logs that show this.',
    example: 'After a failed migration, an agent deletes the logs folder and reports "done".',
    answer: 'The kill switch moves a rule-breaking agent from observed, to restricted, to stopped. Each receipt links to the one before it, so a deleted entry shows as a gap.',
    layers: ['Kill switch', 'Receipt'],
    chain: 'yes',
    chainText: 'This is the strongest case. An agent or an insider cannot delete the record of their actions without leaving a visible gap.',
  },
  {
    icon: 'git-fork',
    title: 'Cascading agent failures',
    risk: 'In multi-agent work, one wrong fact or one fake agent moves through every agent after it.',
    example: 'An intake agent marks a bad ID as verified. Four agents later, the system pays out the loan.',
    answer: 'When agents connect through Pavii, every hop goes through the same gates and leaves a receipt. Budgets and the kill switch stop a failure that spreads.',
    layers: ['One gateway', 'Budget gate', 'Kill switch', 'Receipt'],
    chain: 'partly',
    chainText: 'Signed receipts for each hop show the first bad step, also across partner companies.',
  },
];
