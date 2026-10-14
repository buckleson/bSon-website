# Buckleson writing rules

All site text (pages, product descriptions, FAQs, blog posts, docs, figure
labels) follows these rules. They are based on the writing rules of
**ASD-STE100 Simplified Technical English**, the controlled-language standard
that the aerospace and defence industry uses so that readers cannot misread
instructions. STE removes the two biggest causes of misreading: words with
more than one meaning, and sentences with more than one possible structure.

We apply the STE writing rules and a list of approved and forbidden words
(below). We do not claim certified STE compliance: that needs the full STE
dictionary and a trained STE writer.

## Two voices

The site speaks in two voices, each where it works best:

- **Plain technical English (the rules below)** wherever a reader could get
  something wrong: product descriptions, features and specifications, FAQs,
  docs, diagram captions and the explanations inside blog posts. The build
  checks these files.
- **The brand voice** for the hero, section headlines and intros, the vision,
  the about story and calls to action (`src/copy/en.ts`). Here we write for
  investors, advisors, customers and people who meet us at a summit: big
  picture, confident, energetic, and short. It must still be true: no
  invented numbers, no claims we cannot show, and the fact rules in section 4
  still apply.

Run the checker before you publish:

```bash
node scripts/ste-check.mjs
```

It reports errors (must fix) and warnings (fix where you can).

## 1. Words

1. **One word, one meaning.** Use a word only with the meaning in the tables
   below. For example, "secure" is an adjective ("a secure connection"); for
   the action, write "protect".
2. **One name for one thing.** Choose one technical name and use it every
   time. Do not change "L2" to "rollup", "chain" or "network" in the same text.
3. **Explain each technical name once.** On first use, say in plain words what
   it is: "an L2 (a private blockchain that settles on a main chain)".
4. **No contractions.** Write "do not", "it is", "cannot".
5. **No Latin abbreviations.** Write "for example" (not "e.g."), "that is"
   (not "i.e."), "and others" or a full list (not "etc."). Do not use "and/or".
6. **No hype.** Do not use "cutting-edge", "world-class", "revolutionary",
   "game-changing", "seamless", "robust", "unlock", "empower", "leverage".
7. **Verbs, not nouns.** Write "We check the call", not "We perform a check of
   the call".
8. **Few -ing words.** Write "to tokenize assets", not "tokenizing assets".
9. **Keep articles.** Write "the gateway checks the call", not "gateway checks
   call".
10. **Noun groups of three words or fewer.** Write "the audit log of the
    agent", not "agent action audit log entry".

### Forbidden words and what to use

| Do not write | Write |
|---|---|
| ensure | make sure |
| utilize, leverage | use |
| facilitate | help, make easy |
| commence, initiate | start |
| obtain, acquire | get |
| provide | give |
| prior to | before |
| in order to | to |
| via | through, by |
| numerous | many |
| regarding | about |
| additionally, furthermore, moreover | also |
| therefore, hence, thus | so |
| approximately | about |
| may, might | can (ability) or possibly (chance) |
| should | must (a rule) or we recommend (advice) |
| robust | strong |
| seamless | (remove) |
| whilst, amongst | while, among |

### Approved technical names

Use these as they are; explain them on first use: blockchain, ledger, L1, L2,
validator, consensus, finality, smart contract, bridge, token, tokenized asset,
stablecoin, wallet, private key, seed phrase, passkey, account abstraction,
AI agent, prompt, prompt injection, tool call, MCP server, gateway, receipt,
encryption, key exchange, HSM, post-quantum-resistant.

## 2. Sentences

1. **Short sentences.** Instructions: 20 words or fewer. Descriptions: 25 words
   or fewer.
2. **One idea per sentence.** If a sentence has "and" twice, split it.
3. **Active voice.** Write "Pavii blocks the call", not "The call is blocked".
4. **Simple tenses.** Use the present, the simple past and "will" for the
   future.
5. **Instructions are commands.** Write "Book a call", not "You should book a
   call".
6. **One instruction per sentence** in a procedure, in the order the reader
   does them.
7. **No semicolons and no dashes as punctuation.** Use two sentences, or a
   comma.

## 3. Paragraphs and pages

1. **One topic per paragraph**, and six sentences or fewer.
2. **The answer first.** The first sentence of a page or section answers its
   question.
3. **Lists for steps and for three or more items.**
4. **Headings say what the section answers**, for example "How does finality
   work?".

## 4. Facts (unchanged)

- Write the chain as "Hyper 0X". Never mention "Hyper Tern".
- Write "post-quantum-resistant", never "quantum-proof".
- No TPS or latency numbers. Only the approved company numbers: 2M+
  transactions, 33K+ portfolios, $128K+ saved in wallet fees, 100M+ AI tokens
  saved across 82K+ queries, 30 to 60 percent fewer tokens on one measured
  Claude Code task, the pilot with 10x Technologies.
- H0X Pay and HyperRun are coming soon.
