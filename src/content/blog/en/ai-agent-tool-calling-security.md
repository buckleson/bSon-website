---
title: 'AI Agent Tool Calling: How to Secure Every Function Call'
description: 'Tool calling lets AI agents act, and lets attackers act through them. Secure every call with allow-lists, argument checks, least privilege and egress rules.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['AI-agent security', 'AI audit trails']
figure: 'pavii-gates'
faqs:
  - question: 'What is tool calling in AI?'
    answer: 'Tool calling, also called function calling, lets a language model ask your application to run a named function with structured arguments, such as look_up_order or send_email. The model only proposes the call. Your code decides whether it runs.'
  - question: 'Should an AI agent hold its own API keys?'
    answer: 'Ideally not. Keep credentials in a gateway or secrets manager that makes the call for the agent, using short-lived, narrowly scoped tokens. Then a hijacked prompt cannot reveal a key the model never saw.'
  - question: 'Do tool-calling controls slow agents down?'
    answer: 'Very little. Allow-list and argument checks are quick lookups, and most calls pass straight through. Only the rare high-risk call waits for a human, which is the point.'
---

To secure AI agent tool calls, treat every call the model proposes as an untrusted request and check it before it runs. Allow only the tools the task needs, validate every argument, run calls with the least privilege possible, restrict where data can go, require a human for risky actions and cap spend. Good calls then pass straight through, while malicious or mistaken ones are stopped and recorded.

## What is tool calling, and why is it risky?

Tool calling, or function calling, is how an AI agent acts. The model reads the conversation and outputs a structured request: a function name plus arguments, usually as JSON. Your application runs it and passes the result back. The model never executes anything itself.

That is good news. The moment between "the model asked" and "the code ran" is where you can enforce rules.

The risk is that the request can be wrong or hostile. A [prompt injection](../what-is-prompt-injection/) hidden in a document can steer it. A vague instruction can lead it to delete the wrong thing. OWASP lists this as Excessive Agency (LLM06) in its Top 10 for LLM Applications 2025, and names three root causes: too much functionality, too many permissions and too much autonomy.

## Which tools should an agent be allowed to call?

Start with deny by default. Each agent gets an allow-list of tools for its task, and nothing else. A support agent might need `look_up_order`, `issue_refund` and `send_reply`. It does not need `run_shell`, `export_customers` or `update_permissions`, even if those tools sit in the same codebase or MCP server.

Keep allow-lists per agent and, where possible, per task. A tool that is safe in one workflow can be dangerous in another. Removing a tool is the strongest control there is: an agent cannot misuse a function it cannot call.

## How do you validate tool-call arguments?

An allowed tool name is not enough, because the arguments carry the attack. Check each one before the call runs.

1. **Use a strict schema.** Define types, required fields, allowed values and lengths. Reject unknown fields instead of ignoring them.
2. **Check business rules.** Does the account belong to the user in this session? Is the refund below the limit? Is the date in range?
3. **Never build commands from strings.** Use parameterised queries for databases and fixed argument lists for programs. An argument like `; rm -rf /` or `../../etc/passwd` should fail validation, not reach a shell.
4. **Check identifiers against what the user can see.** An agent acting for one customer should not be able to pass another customer's ID.

## What does least privilege mean for AI agents?

Least privilege means each call runs with the smallest set of rights that gets the job done. In practice:

- **The agent acts as the user, not as a super-user.** If the person behind the session cannot see a record, neither can their agent.
- **Credentials stay out of the model.** A gateway holds the keys and makes the call. Tokens are short-lived and scoped to one system and one kind of action.
- **Read-only by default.** Write, delete and admin rights are granted separately, only where needed.

This also limits the damage of a successful attack. A fooled agent with read access to one folder is an incident report. A fooled agent with admin rights to everything is a crisis.

## How do egress policies stop data exfiltration?

An egress policy decides where an agent may send data and what it may do outside your walls. It is an allow-list of destinations: approved domains, known email recipients, registered bank accounts and internal APIs. A call that tries to post to an unknown URL, email an outside address or load an image link with data packed into it is blocked, however convincing the model's reasoning was.

In [Pavii](../../products/pavii/), the egress policy is a smart contract on [Hyper 0X](../../products/hyper-0x/). An agent, a compromised server or an insider cannot quietly edit the rules, and every change to them leaves a record.

## When should a human approve an agent's action?

Ask for approval when an action is hard to undo, moves money or data outside the organisation, or changes who can do what. Common examples:

- payments and refunds above a set limit
- emails to new external recipients
- deleting records
- changing permissions or production systems

Show the reviewer the exact call and its arguments, not the model's summary of it. Banks already work this way with maker-checker approvals, where one person prepares and another releases. Agents should follow the same rule.

## Why do agents need budgets?

An agent stuck in a loop can call a tool thousands of times or fill its context with huge results, burning money and straining your systems. OWASP calls this Unbounded Consumption (LLM10). Set caps per agent, such as calls per minute, tokens per task and spend per day.

Pavii's budget gate uses budgets and MCP compaction to keep token spend under control. On a measured Claude Code task it used 30 to 60 percent fewer tokens.

## What does a gated tool call look like?

Here is how a gateway might handle a fintech support agent's calls. Good calls pass. Malicious or mistaken ones stop.

| Proposed call | Check | Result |
|---|---|---|
| `look_up_order` for the customer in the session | Tool allowed, ID belongs to the user | Passes |
| `issue_refund` within the agent's limit | Schema and business rules pass | Passes |
| `issue_refund` above the limit | Needs human approval | Held for a reviewer |
| `send_reply` to an unknown outside address | Egress policy | Blocked |
| `run_shell` with a download command | Not on the allow-list | Blocked |
| The same search repeated in a loop | Budget cap | Throttled |

Every row, passed or blocked, leaves a signed receipt. Pavii hash-chains those logs and anchors them on Hyper 0X, so an audit can show exactly what the agent tried and what the gateway decided. The figure above shows the same idea across all six gates, and [proof of execution for AI](../proof-of-execution-ai/) explains why the receipts matter.

## Where should you start?

1. List every tool each agent can call today, including tools exposed through MCP servers. Our post on [MCP server security risks](../mcp-server-security-risks/) shows what to look for.
2. Cut each agent down to an allow-list for its task.
3. Add strict schemas and business-rule checks to every tool that writes, sends or pays.
4. Move credentials into a gateway, then set egress rules and budgets.
5. Require human approval for irreversible actions and keep tamper-evident receipts.

For the full threat picture, see [how to secure AI agents](../how-to-secure-ai-agents/). Pavii applies all six gates to every tool call, and our [AI-agent security](../../services/#ai-agent-security) team can help you roll it out. Book a call to see it on your own agents.
