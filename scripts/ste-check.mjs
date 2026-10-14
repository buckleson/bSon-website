#!/usr/bin/env node
/**
 * Checks site text against our Simplified Technical English rules
 * (WRITING.md, based on ASD-STE100): sentence and paragraph length,
 * forbidden and ambiguous words, contractions, Latin abbreviations, dashes,
 * and (as warnings) passive voice and modal verbs.
 *
 * Usage: node scripts/ste-check.mjs [--strict] [--all] [files...]
 *   default files: blog posts, product pages, docs, FAQ data and site copy
 *   --strict  exit 1 when there are errors
 *   --all     list every finding (default: first 6 per file)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const args = process.argv.slice(2);
const strict = args.includes('--strict');
const all = args.includes('--all');
const given = args.filter(a => !a.startsWith('--'));

const MAX_WORDS = 25;
const MAX_SENTENCES = 6;

// word (regex source) -> suggestion
const FORBIDDEN = {
  'ensur(e|es|ed|ing)': 'make sure',
  'utili[sz](e|es|ed|ing)': 'use',
  'leverag(e|es|ed|ing)': 'use',
  'facilitat(e|es|ed|ing)': 'help / make easy',
  'commenc(e|es|ed|ing)': 'start',
  'initiat(e|es|ed)': 'start',
  'prior to': 'before',
  'in order to': 'to',
  'via': 'through / by',
  'numerous': 'many',
  'regarding': 'about',
  'additionally': 'also',
  'furthermore': 'also',
  'moreover': 'also',
  'therefore': 'so',
  'hence': 'so',
  'thus': 'so',
  'approximately': 'about',
  'whilst': 'while',
  'amongst': 'among',
  'may': 'can (ability) / possibly (chance)',
  'might': 'can / possibly',
  'robust': 'strong',
  'seamless(ly)?': '(remove)',
  'cutting-edge': '(remove)',
  'world-class': '(remove)',
  'revolutionary': '(remove)',
  'game-changing': '(remove)',
  'best-in-class': '(remove)',
  'empower(s|ed|ing)?': 'help / let',
  'unlock(s|ed|ing)?': 'give / make possible',
  'obtain(s|ed|ing)?': 'get',
  'e\\.g\\.': 'for example',
  'i\\.e\\.': 'that is',
  'etc\\.?': 'a full list / and others',
  'and/or': 'and / or',
};
const WARN_WORDS = {
  'should': 'must (a rule) / we recommend (advice)',
  'could': 'can / possibly',
  'would': 'will / (rewrite)',
  'provid(e|es|ed|ing)': 'give',
};
const CONTRACTION = /\b(\w+n['’]t|it['’]s|that['’]s|there['’]s|here['’]s|what['’]s|who['’]s|let['’]s|\w+['’](re|ll|ve|d|m))\b/i;
const PASSIVE = /\b(is|are|was|were|be|been|being)\s+(\w+ly\s+)?(\w+ed|built|done|made|paid|held|kept|sent|set|shown|seen|given|taken|written|known|run|read|signed|bound)\b/i;
const NOT_PASSIVE = /\b(is|are|was|were|be|been)\s+(based|designed|called|named|used to|interested|located|limited|related|required|needed|tokenized|encrypted|private|permissioned|permissionless|built in|connected|signed in|done)\b/i;

function walk(dir, exts) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walk(path, exts));
    else if (exts.some(e => name.endsWith(e))) out.push(path);
  }
  return out;
}

const defaults = [
  ...walk(join(ROOT, 'src/content/blog'), ['.md', '.mdx']),
  ...walk(join(ROOT, 'src/content/products'), ['.md']),
  ...walk(join(ROOT, 'src/content/docs'), ['.md', '.mdx']),
  join(ROOT, 'src/data_files/faqs.json'),
  join(ROOT, 'src/copy/en.ts'),
  join(ROOT, 'src/data_files/systems.ts'),
];
const files = given.length ? given.map(f => join(process.cwd(), f)) : defaults;

/** Blocks of prose: { text, line, kind: 'para' | 'item' | 'heading' | 'field' }. */
function blocksOf(path, source) {
  const blocks = [];
  if (path.endsWith('.json')) {
    const walkJson = (value, key) => {
      if (typeof value === 'string') {
        if (/question|answer|intro|subTitle|text|label/i.test(key) && value.includes(' ')) blocks.push({ text: value, line: lineOf(source, value), kind: key === 'question' ? 'heading' : 'field' });
      } else if (Array.isArray(value)) value.forEach(v => walkJson(v, key));
      else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => walkJson(v, k));
    };
    walkJson(JSON.parse(source), '');
    return blocks;
  }
  if (path.endsWith('.ts')) {
    const re = /(['"`])((?:\\.|(?!\1)[^\\\n])*)\1/g;
    for (let m = re.exec(source); m; m = re.exec(source)) {
      const text = m[2].replace(/\\'/g, "'");
      if (text.includes('${') || !/\s/.test(text) || text.length < 30 || /^[\w./@:-]+$/.test(text) || /^(https?:|\/|#)/.test(text)) continue;
      blocks.push({ text, line: source.slice(0, m.index).split('\n').length, kind: 'field' });
    }
    return blocks;
  }
  // Markdown / MDX
  const lines = source.split('\n');
  let i = 0;
  if (lines[0] === '---') {
    i = 1;
    while (i < lines.length && lines[i] !== '---') {
      const m = lines[i].match(/^\s*(?:-\s*)?(description|summary|tagline|subTitle|answer|question|text):\s*['"]?(.*?)['"]?\s*$/);
      if (m && m[2] && m[2] !== '|') blocks.push({ text: m[2].replace(/''/g, "'"), line: i + 1, kind: m[1] === 'question' ? 'heading' : 'field' });
      if (/^summary:\s*\|/.test(lines[i])) {
        let j = i + 1;
        const parts = [];
        while (j < lines.length && /^\s{2,}\S/.test(lines[j])) parts.push(lines[j].trim()), j++;
        blocks.push({ text: parts.join(' '), line: i + 2, kind: 'field' });
      }
      i++;
    }
    i++;
  }
  let para = [];
  let start = 0;
  let fence = false;
  const flush = () => {
    if (para.length) blocks.push({ text: para.join(' '), line: start + 1, kind: 'para' });
    para = [];
  };
  for (; i < lines.length; i++) {
    const raw = lines[i];
    if (/^\s*```/.test(raw)) { fence = !fence; flush(); continue; }
    if (fence) continue;
    const line = raw.trim();
    if (!line || /^(import |export |<|\{\/\*|\||:::)/.test(line)) { flush(); continue; }
    if (/^#{1,6}\s/.test(line)) { flush(); blocks.push({ text: line.replace(/^#+\s*/, ''), line: i + 1, kind: 'heading' }); continue; }
    if (/^([-*]|\d+\.)\s/.test(line)) { flush(); blocks.push({ text: line.replace(/^([-*]|\d+\.)\s+/, ''), line: i + 1, kind: 'item' }); continue; }
    if (!para.length) start = i;
    para.push(line);
  }
  flush();
  return blocks;
}

function lineOf(source, text) {
  const at = source.indexOf(JSON.stringify(text).slice(1, 20));
  return at < 0 ? 1 : source.slice(0, at).split('\n').length;
}

const clean = text =>
  text
    .replace(/`[^`]*`/g, 'CODE')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*|__|\*/g, '');

const sentencesOf = text =>
  clean(text)
    .replace(/\b(e\.g|i\.e|vs|etc|No|approx)\./g, '$1§')
    .replace(/(\d)\.(\d)/g, '$1§$2')
    .split(/(?<=[.!?])\s+(?=["'(\[]?[A-Z0-9$])/)
    .map(s => s.replace(/§/g, '.').trim())
    .filter(Boolean);

const wordsOf = sentence => (sentence.match(/[A-Za-z0-9$][\w'’.$%+/-]*/g) ?? []).length;

let errors = 0;
let warnings = 0;
const report = [];
for (const path of files) {
  const source = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  const found = [];
  const add = (level, line, rule, detail) => {
    found.push({ level, line, rule, detail });
    level === 'error' ? errors++ : warnings++;
  };
  for (const block of blocksOf(path, source)) {
    const sentences = sentencesOf(block.text);
    if (block.kind === 'para' && sentences.length > MAX_SENTENCES) add('error', block.line, 'long-paragraph', `${sentences.length} sentences (max ${MAX_SENTENCES})`);
    for (const sentence of sentences) {
      const words = wordsOf(sentence);
      if (block.kind !== 'heading' && words > MAX_WORDS) add('error', block.line, 'long-sentence', `${words} words: "${sentence.slice(0, 90)}…"`);
      if (CONTRACTION.test(sentence)) add('error', block.line, 'contraction', sentence.match(CONTRACTION)[0]);
      if (/—|–/.test(sentence)) add('error', block.line, 'dash', 'use a comma or two sentences');
      for (const [word, fix] of Object.entries(FORBIDDEN)) {
        const re = new RegExp(`(^|[^\\w-])(${word})(?![\\w-])`, 'i');
        const m = sentence.match(re);
        if (!m) continue;
        if (word === 'may' && /\bMay\s+\d{4}|\bin May\b/.test(sentence)) continue;
        add('error', block.line, 'word', `"${m[2]}" → ${fix}`);
      }
      if (block.kind !== 'heading') {
        for (const [word, fix] of Object.entries(WARN_WORDS)) {
          const m = sentence.match(new RegExp(`\\b(${word})\\b`, 'i'));
          if (m) add('warning', block.line, 'word', `"${m[1]}" → ${fix}`);
        }
        if (PASSIVE.test(sentence) && !NOT_PASSIVE.test(sentence)) add('warning', block.line, 'passive', sentence.match(PASSIVE)[0]);
        if (sentence.includes(';')) add('warning', block.line, 'semicolon', 'two sentences');
      }
    }
  }
  if (found.length) report.push({ path, found });
}

for (const { path, found } of report) {
  const e = found.filter(f => f.level === 'error').length;
  const w = found.length - e;
  console.log(`\n${relative(ROOT, path)}  ${e} errors, ${w} warnings`);
  const shown = all ? found : found.filter(f => f.level === 'error').slice(0, 6);
  for (const f of shown) console.log(`  ${f.level === 'error' ? 'E' : 'w'} L${f.line} ${f.rule}: ${f.detail}`);
}
console.log(`\n${files.length} files: ${errors} errors, ${warnings} warnings.`);
if (strict && errors) process.exit(1);
