---
title: 'How to Stop LLM Data Leaks: PII Redaction for AI Agents'
description: 'Customer data and secrets leak into LLM prompts, logs and outputs. See how PII redaction, output filters and data residency stop leaks, with a GDPR view.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['AI-agent security', 'Data privacy']
diagram: 'pavii'
faqs:
  - question: 'Is redacted data still personal data under GDPR?'
    answer: 'It depends on the method. If you can map the placeholders back to a person, you have pseudonymised data. GDPR still treats it as personal data. Redaction still lowers risk a lot, because the model and its logs never hold the real values.'
  - question: 'Can I send customer data to an AI model provider?'
    answer: 'Sometimes. You need a lawful basis, a data processing agreement, clear retention terms and safeguards for any transfer abroad. The safer default is to send only the fields that the task needs. Redact the rest. Check your case with your data protection officer.'
  - question: 'How do you detect secrets like API keys in prompts?'
    answer: 'Use the same methods as code secret scanners. These are patterns for known key formats, checks for long random-looking strings, and rules for your own credential prefixes. Block or replace the secrets before the prompt leaves your network.'
---

LLM data leaks happen when customer data or secrets reach places where they do not belong. One place is a prompt sent to the provider of an LLM (a large language model). Others are logs kept for months, or an answer shown to the wrong person. The fix is to control data at the boundary. Redact personal data and secrets (replace them with placeholders) before the model sees them, and filter what comes back out. Keep logs clean and short-lived, and know where you store every copy.

## How does customer data end up in prompts?

Most leaks come from convenience, not from hacks. A support employee pastes a full customer record to get a better draft. A developer pastes a config file, keys included, to debug an error. A retrieval system (a tool that finds documents for the model) pulls a whole contract into the context, the text that the model reads. One clause was enough. An agent with database access reads every column, not just the two it needs.

In each case, more data than the task needs goes to a system that you possibly do not fully control. OWASP ranks Sensitive Information Disclosure second (LLM02) in its Top 10 for LLM Applications 2025. That list names the main security risks for apps built on LLMs.

## Where else does sensitive data leak?

The prompt is only the first copy. The same data spreads further.

| Where | How it leaks | Control |
|---|---|---|
| Logs and traces | Monitoring tools, debug logs and vendors keep full prompts and responses | Redact before logging, short retention, strict access |
| Model output | Data repeated to the wrong user, or a secret echoed into a reply | Output filters and recipient checks |
| Third parties | Model providers, plugins and MCP servers receive the context | Minimisation, contracts, region choice |
| Exfiltration | An injected instruction sends data to an outside URL | Egress rules and output checks |

Logs need special attention. Compared with the production database, logs often stay longer, get less protection and have more readers. If a prompt held a card number, the log holds it too.

The last row is where security and privacy meet. An attacker can plant an instruction in a document. The instruction asks the agent to send everything in its context to the attacker. Our guide to [prompt injection](../what-is-prompt-injection/) explains how. Redaction makes that attack far less rewarding.

## How does PII redaction before the model work?

PII redaction finds personally identifiable information (PII) and other sensitive values. It replaces them before the prompt leaves your control. A privacy gate (a check in front of the model) looks for two kinds of data:

- **Personal data:** names, email addresses, phone numbers, postal addresses, account numbers, IBANs (international bank account numbers), card numbers and national ID numbers.
- **Secrets:** API keys, access tokens, passwords, private keys and database connection strings.

The gate uses three methods to detect these values. Patterns catch values with a known shape, such as a card number that passes its checksum. Language models recognise names and addresses in free text. Secret-scanning rules catch known key formats. The gate replaces each hit with a placeholder, such as `[CUSTOMER_NAME_1]` or `[IBAN_1]`.

The model still understands the task. It can write "Dear [CUSTOMER_NAME_1], your refund to [IBAN_1] is on its way" without the real values. If the final message needs them, the gateway (the checkpoint between your systems and the model) puts them back. It does this for authorised recipients only. Never put secrets back. A model never needs a real API key to reason about code.

Redaction works best with minimisation (you send only the data that the task needs). Before you redact a field, ask if the task needs it at all. When you send three fields instead of thirty, you remove risk that no detector has to catch.

## Why filter the model's output as well?

Input redaction is not enough on its own. Some data reaches the model through tools or retrieval, after the input check. A model can also combine harmless pieces into something sensitive. Check every response before delivery:

1. Scan for personal data and secrets that do not belong in the reply.
2. Check that the recipient has the right to see the content.
3. Remove scripts, hidden links and image URLs that can carry data to an outside server. OWASP calls the wider risk Improper Output Handling (LLM05).
4. Block replies that reveal the system prompt (the hidden instructions of the app) or internal configuration. OWASP calls this System Prompt Leakage (LLM07).

## What does data residency mean for AI agents?

Data residency is about where systems process and store your data. With AI agents, that covers the region of the model provider and every log and trace store. It also covers vector databases (the stores that retrieval systems search) and any plugin or MCP server in the path. Map each one. Choose regions on purpose, and write them into contracts.

Banks and public bodies often have extra sector or national rules about where data can go. Those rules differ by country, so make residency a decision for your compliance team. The job of the technology is to enforce their decision on every call.

## What does GDPR mean for LLM data leaks?

This is general information, not legal advice. Several principles of the GDPR (the EU General Data Protection Regulation) apply directly to AI agents:

- **Data minimisation:** process only the personal data you need for the purpose.
- **Storage limitation:** do not keep prompts and logs with personal data longer than necessary.
- **Integrity and confidentiality:** protect personal data with appropriate security.
- **Data protection by design and by default (Article 25):** build these controls in from the start.

Pseudonymised data is still personal data under GDPR. In pseudonymised data, you can link the placeholders back to a person. Truly anonymised data is not personal data.

GDPR does not require data to stay in the EU. But it restricts transfers outside the European Economic Area, unless there is an adequacy decision or appropriate safeguards. Standard contractual clauses are one example of such safeguards. In general, you must report a personal data breach to the supervisory authority within 72 hours after you become aware of it. The exception is a breach that is unlikely to put people at risk.

Redaction and clean logs make every one of these easier. There is simply less personal data in the AI pipeline to account for.

## How does this work for a bank's service team?

A bank lets an agent draft replies to customer emails. Those emails contain names, phone numbers and IBANs. With a privacy gate in front of the model, the agent only sees placeholders. The agent drafts the reply, and the output gate checks it. The gateway fills in the real values only in the final message to that customer.

The logs hold placeholders, not account numbers. Someone can hide an instruction in an email that asks for the details of other customers. But the context has no real details to give away.

## Where should you start?

1. Map every place where you store prompts, outputs and logs. Note the region of each.
2. Cut the fields that you send to models down to what each task needs.
3. Put a privacy gate in front of every model call, for personal data and secrets.
4. Add output filters and recipient checks before you deliver anything.
5. Redact logs and set retention limits. Make the audit trail tamper-evident (so that any change shows).

[Pavii](../../products/pavii/), our security gateway for AI agents, has a privacy gate that redacts personal data and secrets before any model sees them. Its output gate removes them on the way out. The diagram above shows where these two gates sit among its six gates. Its hash-chained receipts (records that each hold a fingerprint of the one before it) on the Hyper 0X blockchain give you an audit trail. [Proof of execution for AI](../proof-of-execution-ai/) explains this, and our guide [How to Secure AI Agents](../how-to-secure-ai-agents/) covers the other attacks. Book a call to see Pavii on your own data flows.
