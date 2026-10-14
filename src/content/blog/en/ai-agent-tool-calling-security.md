---
title: 'AI Agent Tool Calling: How to Secure Every Function Call'
description: 'Tool calling lets AI agents act, and lets attackers act through them. Protect every call with allow-lists, argument checks, least privilege and egress rules.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['AI-agent security', 'AI audit trails']
figure: 'pavii-gates'
faqs:
  - question: 'What is tool calling in AI?'
    answer: 'Tool calling, also called function calling, lets a language model ask your application to run a named function with structured arguments. Examples are look_up_order and send_email. The model only proposes the call. Your code decides whether it runs.'
  - question: 'Should an AI agent hold its own API keys?'
    answer: 'Ideally not. Keep credentials in a gateway or a secrets manager that makes the call for the agent. Use short-lived tokens with a narrow scope. Then a hijacked prompt cannot reveal a key that the model never saw.'
  - question: 'Do tool-calling controls slow agents down?'
    answer: 'Very little. Allow-list and argument checks are quick lookups, and most calls pass straight through. Only the rare high-risk call waits for a human. That wait is the point of the control.'
---

To protect AI agent tool calls, treat every call that the model proposes as an untrusted request, and check it before it runs. Allow only the tools that the task needs, and validate every argument. Run each call with least privilege (the fewest rights that it needs), and restrict where data can go. Require a human for risky actions, and cap spend. Good calls then pass straight through. Malicious or mistaken calls stop, and the controls record them.

## What is tool calling, and why is it risky?

Tool calling, or function calling, is how an AI agent acts. The model reads the conversation and outputs a structured request: a function name plus arguments, usually as JSON. Your application runs the function and passes the result back. The model never runs anything itself.

That is good news. The moment between "the model asked" and "the code ran" is where you can enforce rules.

The risk is that the request can be wrong or hostile. Hidden instructions in a document, called a [prompt injection](../what-is-prompt-injection/), can steer it. A vague instruction can lead it to delete the wrong thing. Security teams call this risk excessive agency. It has three root causes: too much functionality, too many permissions and too much autonomy.

## Which tools do you allow an agent to call?

Start with deny by default: block every tool that you have not approved. Each agent gets an allow-list (a list of approved tools) for its task, and nothing else. For example, a support agent needs `look_up_order`, `issue_refund` and `send_reply`. It does not need `run_shell`, `export_customers` or `update_permissions`. This is true even if those tools sit in the same codebase or MCP server (a service that gives an agent its tools).

Keep an allow-list for each agent and, where possible, for each task. A tool that is safe in one workflow can be dangerous in another. The strongest control is to remove the tool. An agent cannot misuse a function that it cannot call.

## How do you validate tool-call arguments?

An allowed tool name is not enough, because the arguments carry the attack. Check each argument before the call runs.

1. **Use a strict schema** (a formal description of each argument). Define types, required fields, allowed values and lengths. Reject unknown fields. Do not ignore them.
2. **Check business rules.** Does the account belong to the user in this session? Is the refund below the limit? Is the date in range?
3. **Never build commands from strings.** Use parameterised queries for databases and fixed argument lists for programs. An argument like `; rm -rf /` or `../../etc/passwd` must fail validation. It must never reach a shell.
4. **Check identifiers against what the user can see.** An agent that acts for one customer must not be able to pass the ID of another customer.

## What does least privilege mean for AI agents?

Least privilege means that each call runs with the smallest set of rights that gets the job done. In practice:

- **The agent acts as the user, not as a super-user (an account with all rights).** If the person behind the session cannot see a record, their agent cannot see it either.
- **Credentials stay out of the model.** A gateway (a checkpoint between the agent and your systems) holds the keys and makes the call. Each token is short-lived. It works for only one system and one kind of action.
- **Read-only by default.** Grant write, delete and admin rights separately, and only where the task needs them.

This also limits the damage of a successful attack. A fooled agent with read access to one folder is an incident report. A fooled agent with admin rights to everything is a crisis.

## How do egress policies stop data exfiltration?

An egress policy (rules for outgoing traffic) decides where an agent can send data and what it can do outside your walls. It is an allow-list of destinations: approved domains, known email recipients, registered bank accounts and internal APIs. Some calls try to post to an unknown URL or email an outside address. Others try to load an image link with data packed into it. The policy blocks all of them, however convincing the model's reasoning was. This is how it stops data exfiltration (the theft of data through outgoing calls).

In [Pavii](../../products/pavii/), our security gateway for AI agents, the egress policy is a smart contract (a program on a blockchain) on [Hyper 0X](../../products/hyper-0x/). An agent, a compromised server or an insider cannot quietly edit the rules. Every change to the rules leaves a record.

## When must a human approve an agent's action?

Ask for approval when an action is hard to undo, moves money or data outside the organisation, or changes who can do what. Common examples:

- payments and refunds above a set limit
- emails to new external recipients
- deletions of records
- changes to permissions or production systems

Show the reviewer the exact call and its arguments, not the model's summary of it. Banks already work this way with maker-checker approvals: one person prepares and another releases. Agents must follow the same rule.

## Why do agents need budgets?

An agent stuck in a loop can call a tool thousands of times. Or it can fill its context (the text that the model holds for a task) with huge results. Both burn money and put strain on your systems. Security teams call this unbounded consumption. Set caps for each agent, such as calls per minute, tokens per task and spend per day.

Pavii's budget gate uses budgets and MCP compaction (it makes the tool data from MCP servers smaller) to keep token spend under control. On a measured Claude Code task, it used 30 to 60 percent fewer tokens.

## What does a gated tool call look like?

Here is how a gateway can handle the calls of a fintech support agent. Good calls pass. Malicious or mistaken calls stop.

| Proposed call | Check | Result |
|---|---|---|
| `look_up_order` for the customer in the session | Tool allowed, ID belongs to the user | Passes |
| `issue_refund` within the agent's limit | Schema and business rules pass | Passes |
| `issue_refund` above the limit | Needs human approval | Held for a reviewer |
| `send_reply` to an unknown outside address | Egress policy | Blocked |
| `run_shell` with a download command | Not on the allow-list | Blocked |
| The same search repeated in a loop | Budget cap | Throttled |

Every row, passed or blocked, leaves a signed receipt (a record of the call and the decision). Pavii hash-chains those receipts: each receipt holds a fingerprint of the receipt before it. Pavii anchors the chain on Hyper 0X, so an audit can show exactly what the agent tried and what the gateway decided. The figure above shows the same idea across all six gates. [Proof of execution for AI](../proof-of-execution-ai/) explains why the receipts matter.

## Where should you start?

1. List every tool that each agent can call today. Include the tools that MCP servers expose. Our post on [MCP server security risks](../mcp-server-security-risks/) shows what to look for.
2. Cut each agent down to an allow-list for its task.
3. Add strict schemas and business-rule checks to every tool that writes, sends or pays.
4. Move credentials into a gateway. Then set egress rules and budgets.
5. Require human approval for irreversible actions. Keep tamper-evident receipts (records that show any change).

For the full threat picture, see our guide [How to Secure AI Agents](../how-to-secure-ai-agents/). Pavii applies all six gates to every tool call. Our [AI-agent security](../../services/#ai-agent-security) team can help you roll it out. Book a call to see it on your own agents.
