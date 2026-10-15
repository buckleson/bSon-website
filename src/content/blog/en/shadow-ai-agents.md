---
title: 'What Are Shadow AI Agents and How Do You Find Them?'
description: 'Shadow AI agents are AI tools and scripts that staff connect to company data without approval. See how to find them, list them and put them behind one gateway.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-15
readTime: 6
tags: ['AI-agent security', 'AI audit trails']
faqs:
  - question: 'Is shadow AI the same as shadow IT?'
    answer: 'Shadow AI is one kind of shadow IT. Shadow IT is any app or service that staff use without approval. A shadow agent adds a new risk, because it does more than store data. It reads, decides and acts with the access that someone gave it.'
  - question: 'Does a ban on public AI tools stop shadow AI?'
    answer: 'Rarely. A ban moves the use to personal devices and personal accounts, where you see even less. An approved path that is faster than the shadow path works better. Pair it with clear rules about which data can go into an AI tool.'
  - question: 'How often do you need to look for shadow agents?'
    answer: 'All the time, because new tools appear every week. Watch network traffic and new app permissions every day. Review the full agent inventory each quarter, and retire agents that nobody owns.'
---

Shadow AI agents are AI agents, scripts and AI tools that staff connect to company data and systems without the knowledge of the security team. Each one holds real access, often through a personal API key or an app permission. But nobody reviews it, records what it does or knows how to stop it. You find them through the traces that they leave. Then you list each one, give it an owner and send its calls through one gateway.

## What is a shadow AI agent?

An AI agent is an AI model that uses tools to act, for example to read files, send email or run code. An agent is "shadow" when it has access to company systems but no approval from the security team. Its owner usually means well. But the company cannot see, limit or stop it.

Common forms include:

- **A coding agent on a laptop** with a personal API key and write access to the code repository.
- **A browser extension** that sends the text of every page to an outside model.
- **A no-code automation** that forwards support emails to a public AI tool.
- **A nightly script** that a data analyst runs on a copy of the customer table.
- **An MCP server** (a small program that gives an agent a new tool) that a developer installed from a public list.

## Why do staff set up shadow agents?

Most shadow agents start as a shortcut, not as an attack. An official request for a new tool can take weeks. A personal card and an API key take five minutes. Agents then grow without a plan. A test script becomes a daily job, and soon a business process depends on it. The risk sits in the access of the agent, not in the intent of its owner.

## What risks do shadow agents bring?

A shadow agent has the risks of any agent, with no controls around it. Five risks stand out, and our guide on [how to secure AI agents](../how-to-secure-ai-agents/) covers the rest:

1. **Data leaves the company.** Customer records and source code go into prompts for outside services, with no personal data removed.
2. **Too much access.** A personal key often carries every right of the employee, not only the rights that the task needs.
3. **No record.** Nobody can show what the agent read, decided or sent.
4. **No stop.** In an incident, the security team does not know that the agent exists, so it cannot switch it off.
5. **Unchecked parts.** Packages, plugins and MCP servers come from public sources with no review. Our guide to [MCP server security risks](../mcp-server-security-risks/) explains how attackers use them.

Costs hide too. Token bills land on personal cards and expense claims, so nobody sees the total.

## How do you find shadow AI agents?

Shadow agents leave traces in systems that you already run. Look in six places:

1. **Network traffic.** Search outbound traffic logs for calls to AI model services, and note which machines make them.
2. **Keys in code.** Scan code repositories, config files and build pipelines for API keys of AI services.
3. **App permissions.** Review the outside apps that staff connected to email, file storage and chat.
4. **Expense records.** Search card statements and expense claims for AI subscriptions and token bills.
5. **Developer machines.** Check the local settings of coding agents, and list the MCP servers in them.
6. **People.** Ask each team which AI tools it uses. Offer an amnesty for honest answers.

No single source finds every agent. Network logs miss home networks, and expense records miss free tools. So combine all six, and repeat the search often.

## What goes into an inventory of AI agents?

An inventory is a list of every agent, with enough detail to judge its risk. For each agent, record:

- A name and a short purpose.
- An owner: the person who answers for it.
- The model, the tools and the MCP servers that it uses.
- The data that it can read and the systems that it can change.
- The credentials that it uses, and who issued them.
- Where it runs: a laptop, a server or a cloud automation.

Sort the list by risk. An agent that reads customer data and can send email or move money goes to the top. Our post on the [AI bill of materials](../ai-bill-of-materials/) shows how to record the parts of each agent.

## How do you bring shadow agents under control?

Do not shut everything down on day one, because the business depends on some agents. Work from the top of the list:

1. **Decide to keep, replace or retire.** Keep agents with a clear purpose. Replace risky ones with an approved tool. Retire the rest.
2. **Give each kept agent its own identity.** Replace personal keys with credentials that carry only the rights that its task needs. Read more in [AI agent identity](../ai-agent-identity/).
3. **Route every call through one gateway.** One checkpoint sees every prompt and tool call, so the same rules apply to every agent.
4. **Close the paths around the gateway.** Block direct traffic from company networks to AI services. A gateway checks only the traffic that passes through it.
5. **Make the approved path the easy path.** If the approved route is slower, new shadow agents will appear.

What changes for one agent:

| | Shadow agent | Agent behind one gateway |
|---|---|---|
| Who knows that it exists | Only its owner | The security team, from the inventory |
| Credentials | A personal key with full rights | Its own credentials, scoped to the task |
| Personal data in prompts | Goes out as it is | Removed before the model sees it |
| What it can send | Anything, to any destination | Only what the rules allow |
| Record of actions | None, or local logs | A receipt for every decision |
| How to stop it | Find the laptop first | A person stops it at the gateway |

## What does this look like at a fintech?

Picture a fintech with 400 staff and no AI policy. This example uses made-up figures. In one week, the security team searched logs, code and expense claims. It found 37 AI tools and agents that nobody had approved.

Three carried real risk. A support automation sent customer names to a public AI tool. A coding agent used a personal key with write access to the payments code. A finance script sent transaction exports to an outside model.

The team gave the coding agent its own scoped credentials. It moved support to an approved assistant behind a gateway that removes personal data first. It retired the finance script and blocked direct traffic to AI services. A month later, a second search found four new tools for the inventory.

## How does Pavii bring shadow agents under one gateway?

Discovery tells you which agents exist. [Pavii](../../products/pavii/), the Buckleson security gateway for AI agents, gives them one place to connect. Every call through the gateway passes six gates: injection, privacy, supply chain, budget, egress and output.

- **Privacy gate.** It removes personal data and secrets before a model can see them.
- **Supply chain gate.** Every new package or MCP server must pass an allow-list, a pinned hash or a sandbox test.
- **Egress contract.** A smart contract on Hyper 0X, the Buckleson blockchain, decides what each agent can send and do.
- **Budget gate.** Budgets keep token use under control.
- **Kill switch.** An agent that breaks rules moves from observed, to restricted, to stopped. A person can stop any agent at any time. Our [AI agent kill switch](../ai-agent-kill-switch/) post explains each step.
- **Receipts.** Pavii chains each receipt to the one before it and anchors the chain on Hyper 0X. If someone deletes an entry, the gap shows.

[Proof of execution](../proof-of-execution-ai/) explains how a receipt chain works. Our [AI-agent security](../../services/ai-agent-security/) team starts with a risk review of your agents, their tools and their access.

## Where should you start?

1. Search network logs, code, app permissions and expense records for AI tools.
2. List every agent that you find, with its owner, its data and its credentials.
3. Sort the list by risk, and decide to keep, replace or retire each agent.
4. Replace personal keys with scoped credentials for each agent that you keep.
5. Route every agent through one gateway, and block the paths around it.
6. Repeat the search every month, and add new agents to the inventory.

Book a call with a Buckleson engineer to plan your first search for shadow agents.
