---
title: 'How to Stop LLM Data Leaks: PII Redaction for AI Agents'
description: 'Customer data and secrets leak into LLM prompts, logs and outputs. How PII redaction, output filtering and data residency stop leaks, with a GDPR view.'
author: 'Buckleson Engineering'
authorImage: '@/images/brand/buckleson.png'
authorImageAlt: 'Buckleson logo'
pubDate: 2026-10-14
readTime: 5
tags: ['AI-agent security', 'Data privacy']
diagram: 'pavii'
faqs:
  - question: 'Is redacted data still personal data under GDPR?'
    answer: 'It depends how it is done. If placeholders can be mapped back to a person, the data is pseudonymised, and GDPR still treats it as personal data. Redaction still lowers risk a lot, because the model and its logs never hold the real values.'
  - question: 'Can I send customer data to an AI model provider?'
    answer: 'Sometimes, with a lawful basis, a data processing agreement, clear retention terms and safeguards for any transfer abroad. The safer default is to send only the fields the task needs and redact the rest. Check your case with your data protection officer.'
  - question: 'How do you detect secrets like API keys in prompts?'
    answer: 'Use the same techniques as code secret scanners: patterns for known key formats, checks for long random-looking strings, and rules for your own credential prefixes. Block or replace them before the prompt leaves your network.'
---

LLM data leaks happen when customer data or secrets end up where they should not: in a prompt sent to a model provider, in logs kept for months, or in an answer shown to the wrong person. The fix is to control data at the boundary. Redact personal data and secrets before the model sees them, filter what comes back out, keep logs clean and short-lived, and know where every copy is stored.

## How does customer data end up in prompts?

Most leaks are not hacks. They are convenience. A support agent pastes a full customer record to get a better draft. A developer pastes a config file, keys included, to debug an error. A retrieval system pulls a whole contract into the context when one clause was enough. An agent with database access reads every column, not just the two it needs.

Each case sends more data than the task requires to a system you may not fully control. OWASP ranks Sensitive Information Disclosure second (LLM02) in its Top 10 for LLM Applications 2025.

## Where else does sensitive data leak?

The prompt is only the first copy. The same data spreads further.

| Where | How it leaks | Control |
|---|---|---|
| Logs and traces | Full prompts and responses kept by monitoring tools, debug logs and vendors | Redact before logging, short retention, strict access |
| Model output | Data repeated to the wrong user, or a secret echoed into a reply | Output filtering and recipient checks |
| Third parties | Model providers, plugins and MCP servers receive the context | Minimisation, contracts, region choice |
| Exfiltration | An injected instruction sends data to an outside URL | Egress rules and output checks |

Logs deserve special attention. They are often kept longer, protected less and read by more people than the production database. If a prompt held a card number, the log holds it too.

The last row is where security and privacy meet. An attacker who plants an instruction in a document can ask the agent to send whatever is in its context to them. Our guide to [prompt injection](../what-is-prompt-injection/) explains how. Redaction makes that attack far less rewarding.

## How does PII redaction before the model work?

Redaction means finding sensitive values and replacing them before the prompt leaves your control. A privacy gate looks for two kinds of data:

- **Personal data:** names, email addresses, phone numbers, postal addresses, account numbers, IBANs, card numbers and national ID numbers.
- **Secrets:** API keys, access tokens, passwords, private keys and database connection strings.

Detection combines three methods. Patterns catch values with a known shape, such as a card number that passes its checksum. Language models recognise names and addresses in free text. Secret-scanning rules catch known key formats. Each hit is replaced with a placeholder such as `[CUSTOMER_NAME_1]` or `[IBAN_1]`.

The model still understands the task. It can write "Dear [CUSTOMER_NAME_1], your refund to [IBAN_1] is on its way" without seeing the real values. If the final message needs them, the gateway puts them back for authorised recipients only. Secrets should never be put back: a model never needs a real API key to reason about code.

Redaction works best with minimisation. Before you redact a field, ask whether it is needed at all. Sending three fields instead of thirty removes risk that no detector has to catch.

## Why filter the model's output as well?

Input redaction is not enough on its own. Some data reaches the model through tools or retrieval, after the input check. A model can also combine harmless pieces into something sensitive. Check every response before delivery:

1. Scan for personal data and secrets that should not be in the reply.
2. Check the recipient is allowed to see what is being sent.
3. Remove scripts, hidden links and image URLs that could carry data to an outside server. OWASP calls the wider risk Improper Output Handling (LLM05).
4. Block replies that reveal the system prompt or internal configuration (System Prompt Leakage, LLM07).

## What does data residency mean for AI agents?

Data residency is about where your data is processed and stored. With AI agents, that covers the model provider's region, every log and trace store, vector databases, and any plugin or MCP server in the path. Map each one, choose regions on purpose and write them into contracts.

Banks and public bodies often face extra sector or national rules on where data may go. Those rules differ by country, so treat residency as a decision for your compliance team. The technology's job is to enforce whatever they decide, on every call.

## What does GDPR mean for LLM data leaks?

This is general information, not legal advice. Several GDPR principles apply directly to AI agents:

- **Data minimisation:** process only the personal data you need for the purpose.
- **Storage limitation:** do not keep prompts and logs with personal data longer than necessary.
- **Integrity and confidentiality:** protect personal data with appropriate security.
- **Data protection by design and by default (Article 25):** build these controls in from the start.

Pseudonymised data, where placeholders can be linked back to a person, is still personal data under GDPR. Truly anonymised data is not. GDPR does not require data to stay in the EU, but it restricts transfers outside the European Economic Area unless there is an adequacy decision or appropriate safeguards, such as standard contractual clauses. A personal data breach must generally be reported to the supervisory authority within 72 hours of becoming aware of it, unless it is unlikely to put people at risk.

Redaction and clean logs make every one of these easier, because there is simply less personal data in the AI pipeline to account for.

## How does this work for a bank's service team?

A bank lets an agent draft replies to customer emails. Those emails contain names, phone numbers and IBANs. With a privacy gate in front of the model, the agent only sees placeholders. It drafts the reply, the output gate checks it, and the real values are filled in only in the final message to that customer.

The logs hold placeholders, not account numbers. And if someone hides an instruction in an email asking for other customers' details, there are no real details in the context to give away.

## Where should you start?

1. Map every place prompts, outputs and logs are stored, and the region of each.
2. Cut the fields sent to models down to what each task needs.
3. Put a privacy gate in front of every model call, for personal data and secrets.
4. Add output filtering and recipient checks before anything is delivered.
5. Redact logs, set retention limits and make the audit trail tamper-evident.

[Pavii](../../products/pavii/) has a privacy gate that redacts personal data and secrets before any model sees them, and an output gate that strips them on the way out. The diagram above shows where they sit among its six gates. Its hash-chained receipts on Hyper 0X give you an audit trail, as explained in [proof of execution for AI](../proof-of-execution-ai/), and [how to secure AI agents](../how-to-secure-ai-agents/) covers the other attacks. Book a call to see Pavii on your own data flows.
