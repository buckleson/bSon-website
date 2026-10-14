/**
 * "Without Hyper 0X / with Hyper 0X" diagrams for the blog posts (shown by
 * CompareFlow under each post's header). Each lane is a row of nodes that a
 * request travels through, left to right:
 * - `without`: the request passes every node; the node at `breakAt` is where
 *   things go wrong (it turns red) and the lane ends with a bad outcome.
 * - `with`: guard nodes (`guard: true`) are Hyper 0X or Pavii parts; the
 *   request stops at `stopAt` when it is malicious, or reaches the end when
 *   it is a normal request (leave `stopAt` out), and the lane ends well.
 * `steps` (3 or 4) explain the lane in order, under the diagram.
 * Icons: a MingCute UI icon name (see uiSymbol in utils/glyphs.ts)
 * (a Phosphor duotone icon also works, prefixed with "ph:").
 * Text is technical description, so it follows the plain-English rules in
 * WRITING.md, and it makes only claims that the post itself makes.
 */
export interface CompareNode {
  icon: string;
  label: string;
  sub?: string;
  guard?: boolean;
}
export interface CompareLane {
  packet: string;
  nodes: CompareNode[];
  breakAt?: number;
  stopAt?: number;
  outcome: string;
  steps: string[];
}
export interface Compare {
  title: string;
  without: CompareLane;
  with: CompareLane;
}


const example: Record<string, Compare> = {
  'what-is-prompt-injection': {
    title: 'How a hidden prompt takes over an agent, and how it stops',
    without: {
      packet: 'PDF with hidden orders',
      nodes: [
        { icon: 'document-2', label: 'Vendor PDF', sub: 'Hidden white text' },
        { icon: 'ai', label: 'AI agent', sub: 'Reads it all as orders' },
        { icon: 'mail', label: 'Email tool', sub: 'No check on the call' },
        { icon: 'user-question', label: 'Outside inbox', sub: 'The attacker' },
      ],
      breakAt: 1,
      outcome: 'Customer file leaked, no record of why',
      steps: [
        'The PDF hides an instruction in white text.',
        'The agent cannot tell the hidden text from your request, so it obeys it.',
        'The email tool sends the customer file without a check.',
        'The attacker gets the data, and no record shows which rule allowed it.',
      ],
    },
    with: {
      packet: 'PDF with hidden orders',
      nodes: [
        { icon: 'document-2', label: 'Vendor PDF', sub: 'Hidden white text' },
        { icon: 'safe-shield', label: 'Injection gate', sub: 'Text is data', guard: true },
        { icon: 'ai', label: 'AI agent', sub: 'Gets clean data' },
        { icon: 'file-locked', label: 'Egress contract', sub: 'On Hyper 0X', guard: true },
        { icon: 'bill', label: 'Receipt', sub: 'Chained on Hyper 0X', guard: true },
      ],
      stopAt: 1,
      outcome: 'Blocked, with a receipt on Hyper 0X',
      steps: [
        'Pavii treats text from files and web pages as data, never as orders.',
        'The injection gate finds the hidden instruction and blocks it.',
        'If a hijacked agent still tries to send data out, the egress contract denies the call.',
        'Every decision gets a receipt on Hyper 0X, so the security team can see what happened.',
      ],
    },
  },
};

// The rest live in compare-*.ts files (one per topic), merged here.
const parts = import.meta.glob<Record<string, Record<string, Compare>>>('./compare-*.ts', { eager: true });

export const compares: Record<string, Compare> = Object.assign({}, example, ...Object.values(parts).flatMap(mod => Object.values(mod)));
