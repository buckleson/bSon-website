// Fig 3: Pavii's six gates (Anatomy kit, MIT; see ./kit/LICENSE).
//
// Agent calls ride a conveyor under six gates: injection, privacy, supply
// chain, budget, egress, output. Round pucks are prompts, square pucks are
// tool calls. A safe call passes every gate (each lamp flashes green) and
// drops into the systems tray at the end; the privacy gate stamps a mark on
// calls whose personal data it redacted. A malicious call is caught by the
// gate it breaks: the lamp turns red, the call turns red, a pusher shoves it
// off the belt into the reject trough, where it breaks in two. Every
// decision, pass or block, adds a line to the receipt that prints on the
// right: the receipt Pavii records on Hyper 0X.
//
// Run: node scripts/figures/pavii-gates.mjs
import { k, tools, basePlate, pinsHtml, stepsHtml, playFigure, writeFigure } from './lib.mjs';

const WIDTH = 760;
const HEIGHT = 420;

const PLATE = { x: -178, y: -64, w: 352, d: 128, r: 8 };
const FRAME = { x: -164, y: -15, w: 300, d: 30, r: 3 };
const BELT = { x: -160, y: -11, w: 292, d: 22, r: 11 };
const BELT_Z = [6, 9];
const GATES = [-112, -76, -40, -4, 32, 68];
const GATE_NAMES = ['injection', 'privacy', 'supply chain', 'budget', 'egress', 'output'];
const GATE_LABELS = [
  { icon: 'syringe', title: 'Injection gate', sub: 'Text in files and pages is data, not orders' },
  { icon: 'eye-slash', title: 'Privacy gate', sub: 'Strips personal data and secrets' },
  { icon: 'package', title: 'Supply-chain gate', sub: 'Only approved tools and MCP servers' },
  { icon: 'gauge', title: 'Budget gate', sub: 'Caps tokens and spend per agent' },
  { icon: 'file-lock', title: 'Egress contract', sub: 'On-chain rules for what may leave' },
  { icon: 'funnel', title: 'Output gate', sub: 'Removes scripts, secrets, system prompts' },
];
const POST_Y = 19;
const POST_TOP = 46;
const BIN = { x: -132, y: -52, w: 226, d: 26, h: 8 };
const FEEDER = { x: -170, y: -14, w: 22, d: 28, z: [20, 40] };
const TRAY = { x: 138, y: -20, w: 30, d: 40, h: 6 };
const PRINTER = { x: 96, y: 28, w: 36, d: 22, h: 16 };
const START_X = -152;
const END_X = 136;
const PUCK_R = 5;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -17, 0), [GATES[0], -POST_Y, POST_TOP + 6], [GATES[5], POST_Y, POST_TOP + 6], [FEEDER.x, 0, FEEDER.z[1]]],
  WIDTH,
  HEIGHT,
  { pad: 16, azimuth: 56 },
);

const { at, S, L, D, byDepth, col, box, path } = tools(P);

// ---- live builders (pure; embedded with toString()) ----------------------

function puckSvg(K, P, kind) {
  if (kind === 'prompt') return K.solidSvg(K.cylinder(0, 0, 5, 0, 5, P, 28, 0.4), { tone: 'hi', crease: 'lo' }) + K.lineSvg(K.ring(0, 0, 2.6, 5, P, 18), { tone: 'mid' });
  return K.solidSvg(K.slabOf({ x: -4.6, y: -4.6, w: 9.2, d: 9.2, r: 1.2 }, 0, 5, P, 2, 0.4), { tone: 'hi', crease: 'lo' }) + K.lineSvg(K.planOutline({ x: -2.4, y: -2.4, w: 4.8, d: 4.8, r: 0.6 }, 5, P, 2), { tone: 'mid' });
}
function halvesSvg(K, P, kind, gap) {
  // A broken call: two halves lying apart in the trough.
  const pieces = [];
  if (kind === 'prompt') {
    for (const side of [-1, 1]) {
      const pts = [];
      for (let i = 0; i <= 12; i++) {
        const a = -Math.PI / 2 + (i / 12) * Math.PI;
        pts.push([side * (gap + 5 * Math.cos(a)), 5 * Math.sin(a)]);
      }
      pieces.push(K.solidSvg(K.extrude(pts, 0, 4, P, { convex: true }), { tone: 'hi', crease: 'none' }));
    }
  } else {
    for (const side of [-1, 1]) {
      const x0 = side < 0 ? -4.6 - gap : gap;
      pieces.push(K.solidSvg(K.slabOf({ x: x0, y: -4.6, w: 4.6, d: 9.2, r: 0.8 }, 0, 4, P, 2, 0.3), { tone: 'hi', crease: 'none' }));
    }
  }
  return pieces.join('');
}
function paperSvg(K, P, C, lines) {
  // The receipt: a strip coming out of the printer, one rule per decision.
  const len = 4 + lines * 3.2;
  const plan = { x: C.PRINTER.x + 7, y: C.PRINTER.y + C.PRINTER.d - 2, w: C.PRINTER.w - 14, d: len, r: 0.6 };
  const rules = [];
  for (let i = 0; i < lines; i++) {
    const y = plan.y + 3 + i * 3.2;
    rules.push(K.pathOf([K.iso([plan.x + 3, y, C.PRINTER.h + 0.4], P), K.iso([plan.x + (i % 3 === 2 ? 12 : 18), y, C.PRINTER.h + 0.4], P)]));
  }
  return K.solidSvg(K.slabOf(plan, C.PRINTER.h, 0.4, P, 2), { tone: 'mid', crease: 'none', flat: true }) + K.lineSvg(rules.join(''), { tone: 'lo', free: true });
}

const C = { PRINTER };

// ---- static parts ---------------------------------------------------------

function binBack() {
  const { x, y, w, d, h } = BIN;
  return [
    box({ x, y, w, d: 3, r: 0.8 }, 0, h, { tone: 'mid' }, 2, 0.3),
    S(k.slabOf({ x: x + 1, y: y + 1, w: w - 2, d: d - 2, r: 1 }, 0, 0.8, P, 2), { tone: 'lo', crease: 'none', flat: true }),
    box({ x, y, w: 3, d, r: 0.8 }, 0, h, { tone: 'mid' }, 2, 0.3),
  ].join('');
}

function binFront() {
  const { x, y, w, d, h } = BIN;
  return [
    box({ x, y: y + d - 3, w, d: 3, r: 0.8 }, 0, h, { tone: 'mid' }, 2, 0.3),
    box({ x: x + w - 3, y, w: 3, d, r: 0.8 }, 0, h, { tone: 'mid' }, 2, 0.3),
    D([x + 20, x + 80, x + 140, x + 200].map(px => at([px, y + d, h - 2])), { size: 0.4 }),
  ].join('');
}

function post(x, y) {
  return col(x, y, 4.6, 0, 1.8, { tone: 'mid' }) + col(x, y, 2.3, 1.8, POST_TOP, { tone: 'mid', crease: 'none' }, 16);
}

function belt() {
  const out = [`<path class="iso-halo" d="${k.haloOf(FRAME, 0, BELT_Z[0], P)}" style="filter:blur(4px)"/>`];
  out.push(box(FRAME, 0, BELT_Z[0], { tone: 'mid' }, 3, 0.5));
  out.push(L(k.sideSeam(FRAME, 2.4, P, 3), { tone: 'lo' }));
  out.push(D([-150, -60, 30, 120].map(x => at([x, FRAME.y + FRAME.d, 3.6])), { size: 0.4 }));
  out.push(S(k.slabOf(BELT, BELT_Z[0], BELT_Z[1] - BELT_Z[0], P, 10, 0.4), { tone: 'mid', crease: 'none' }));
  for (const y of [-6, 6]) out.push(L(k.lineOnTop([BELT.x + 12, y], [BELT.x + BELT.w - 12, y], BELT_Z[1], P), { tone: 'lo', flow: true }));
  return out.join('');
}

function tray() {
  const { x, y, w, d, h } = TRAY;
  return [
    box({ x, y, w, d: 2.4, r: 0.6 }, 0, h, { tone: 'mid' }, 2, 0.2),
    S(k.slabOf({ x: x + 1, y: y + 1, w: w - 2, d: d - 2, r: 1 }, 0, 0.8, P, 2), { tone: 'lo', crease: 'none', flat: true }),
  ].join('');
}

function trayFront() {
  const { x, y, w, d, h } = TRAY;
  return [
    box({ x, y: y + d - 2.4, w, d: 2.4, r: 0.6 }, 0, h, { tone: 'mid' }, 2, 0.2),
    box({ x: x + w - 2.4, y, w: 2.4, d, r: 0.6 }, 0, h, { tone: 'mid' }, 2, 0.2),
  ].join('');
}

function pusher(i) {
  const x = GATES[i] + 10;
  return `<g data-pusher="${i}">${box({ x: x - 4, y: 13, w: 8, d: 4, r: 1 }, BELT_Z[1], BELT_Z[1] + 5, { tone: 'mid', crease: 'none' }, 2, 0.3)}</g>`;
}

function pusherBodies() {
  // Cylinder bodies bolted to the frame's near edge, behind each pusher head.
  return GATES.map(g => box({ x: g + 7, y: 16.5, w: 6, d: 6, r: 1.6 }, 2, BELT_Z[1] + 4, { tone: 'mid', crease: 'none' }, 3, 0.3) + D([at([g + 10, 22.5, BELT_Z[1] + 2])], { size: 0.4 })).join('');
}

function gateTop(i) {
  const g = GATES[i];
  const bar = { x: g - 3, y: -POST_Y - 3, w: 6, d: POST_Y * 2 + 6, r: 1.5 };
  const head = { x: g - 4, y: -5, w: 8, d: 10, r: 1.2 };
  const [lx, ly] = at([g, 0, POST_TOP + 5.6]);
  return [
    box(head, POST_TOP - 7, POST_TOP, { tone: 'mid' }, 2, 0.3),
    D([at([g + 4, 0, POST_TOP - 3.5])], { size: 0.5, tone: 'hi' }),
    box(bar, POST_TOP, POST_TOP + 5, { tone: 'mid' }, 3, 0.4),
    D([at([g, -POST_Y, POST_TOP + 5]), at([g, POST_Y, POST_TOP + 5])], { size: 0.45 }),
    L(k.ring(g, 0, 2.4, POST_TOP + 5, P, 16), { tone: 'lo' }),
    `<circle class="fig-led" data-gate="${i}" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="2" opacity="0.25"/>`,
  ].join('');
}

function feeder() {
  const { x, y, w, d, z } = FEEDER;
  const plan = { x, y, w, d, r: 2 };
  return [
    col(x + 4, y + 3, 1.6, 0, z[0], { tone: 'mid', crease: 'none' }, 12),
    col(x + 4, y + d - 3, 1.6, 0, z[0], { tone: 'mid', crease: 'none' }, 12),
    box(plan, z[0], z[1], { tone: 'mid' }, 3, 0.5),
    L(k.sideSeam(plan, z[0] + 5, P, 3), { tone: 'lo' }),
    L(k.planOutline(k.insetPlan(plan, 3), z[1], P, 3), { tone: 'faint' }),
    D(k.corners(k.insetPlan(plan, 2)).map(([px, py]) => at([px, py, z[1]])), { size: 0.4 }),
  ].join('');
}

function printer() {
  const plan = { x: PRINTER.x, y: PRINTER.y, w: PRINTER.w, d: PRINTER.d, r: 2 };
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, 0, PRINTER.h, P)}"/>`];
  out.push(box(plan, 0, PRINTER.h, { tone: 'mid' }, 3, 0.5));
  out.push(L(k.sideSeam(plan, 4, P, 3), { tone: 'lo' }));
  out.push(S(k.slabOf({ x: PRINTER.x + 6, y: PRINTER.y + PRINTER.d - 4, w: PRINTER.w - 12, d: 2, r: 0.6 }, PRINTER.h, 0.3, P, 2), { tone: 'lo', crease: 'none', flat: true }));
  const face = PRINTER.x + PRINTER.w;
  out.push(D([PRINTER.y + 5, PRINTER.y + 9].map(y => at([face, y, 11])), { size: 0.6, tone: 'hi' }));
  out.push(L(path([[face, PRINTER.y + 13, 11], [face, PRINTER.y + PRINTER.d - 3, 11]]), { tone: 'lo', free: true }));
  out.push(k.wireSvg(at([PRINTER.x + 4, PRINTER.y, 6]), at([GATES[5] + 10, 22.5, 4]), { via: [at([GATES[5] + 16, PRINTER.y - 2, 3])], tone: 'lo' }));
  return out.join('');
}

// ---- paint back to front --------------------------------------------------

const body = [
  basePlate(P, PLATE, { label: { x: -170, y: -58, w: 30, d: 16, r: 1.5 }, ruler: { x: -150, y: 50, w: 200, d: 6, r: 1 } }),
  binBack(),
  `<g data-part="rejects"></g>`,
  binFront(),
  GATES.map(g => post(g, -POST_Y)).join(''),
  tray(),
  belt(),
  `<g data-part="pucks"></g>`,
  pusherBodies(),
  GATES.map((_, i) => pusher(i)).join(''),
  GATES.map(g => post(g, POST_Y)).join(''),
  feeder(),
  GATES.map((_, i) => gateTop(i)).join(''),
  trayFront(),
  printer(),
  `<g data-part="paper">${paperSvg(k, P, C, 3)}</g>`,
];

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    'A conveyor moves agent calls under six gates: injection, privacy, supply chain, budget, egress and output. Round pucks are prompts, and square pucks are tool calls. Safe calls pass every gate and drop into the systems tray. The gate that a malicious call breaks catches it. The lamp and the call turn red, and a pusher moves the call into the reject trough, where it breaks in two. Every decision adds a line to the receipt on the right.',
  body,
});

const pins = pinsHtml(P, WIDTH, HEIGHT, [
  { id: 'calls', at: [FEEDER.x, 0, (FEEDER.z[0] + FEEDER.z[1]) / 2], icon: 'robot', title: 'Agent calls', side: 'left', lift: 14, seek: 'calls' },
  ...GATE_LABELS.map((g, i) => ({
    id: 'g' + i,
    n: i + 1,
    at: i % 2 ? [GATES[i], POST_Y, 0] : [GATES[i], 0, POST_TOP + 5],
    side: i % 2 ? 'down' : 'up',
    lift: i % 2 ? 14 : 0,
    icon: g.icon,
    title: g.title,
    sub: g.sub,
    expand: true,
    seek: 'g' + i,
  })),
  { id: 'blocked', at: [BIN.x + BIN.w - 30, BIN.y + 4, BIN.h], icon: 'prohibit', title: 'Blocked calls break', seek: 'blocked' },
  { id: 'receipt', at: [PRINTER.x + PRINTER.w, PRINTER.y + PRINTER.d / 2, PRINTER.h / 2], icon: 'receipt', title: 'Receipt on Hyper 0X', side: 'right', lift: 16, seek: 'receipt' },
  { id: 'delivered', at: [TRAY.x + TRAY.w / 2, TRAY.y + 4, TRAY.h], icon: 'check-circle', title: 'Safe calls delivered', seek: 'delivered' },
]);

const steps = stepsHtml([
  { id: 'calls', icon: 'robot', title: 'Every call is checked', sub: 'Prompts and tool calls from any agent pass six gates' },
  { id: 'delivered', icon: 'check-circle', title: 'Safe calls go through', sub: 'Pavii removes personal data on the way' },
  { id: 'blocked', icon: 'prohibit', title: 'Malicious calls stop', sub: 'Pavii blocks injection, data theft and runaway spend' },
  { id: 'receipt', icon: 'receipt', title: 'A receipt for each decision', sub: 'Hyper 0X records it, so nobody can edit it later' },
]);

// The loop's calls: kind, and the gate that blocks it (-1 = safe).
const CALLS = [
  { kind: 'prompt', gate: -1 },
  { kind: 'tool', gate: 0 },
  { kind: 'prompt', gate: -1, redact: true },
  { kind: 'tool', gate: -1 },
  { kind: 'tool', gate: 4 },
  { kind: 'prompt', gate: -1 },
  { kind: 'tool', gate: 3 },
  { kind: 'tool', gate: -1, redact: true },
];

const live = `
${puckSvg.toString()}
${halvesSvg.toString()}
${paperSvg.toString()}
${playFigure.toString()}
const P = ${JSON.stringify(P)};
const C = ${JSON.stringify({ ...C, GATES, GATE_NAMES, CALLS, START_X, END_X, BELT_Z, BIN, TRAY })};
const K = { solidSvg, cylinder, slabOf, extrude, lineSvg, ring, planOutline, pathOf, iso };
for (const stage of document.querySelectorAll('[data-figure="pavii-gates"]')) {
  const svg = stage.querySelector('svg');
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const pucksEl = q('pucks'), rejectsEl = q('rejects'), paper = q('paper');
  const lamps = C.GATES.map((_, i) => svg.querySelector('[data-gate="' + i + '"]'));
  const pushers = C.GATES.map((_, i) => svg.querySelector('[data-pusher="' + i + '"]'));
  const figure = stage.closest('.iso-figure');
  const readout = figure.querySelector('[data-readout]');
  const pins = Object.fromEntries([...stage.querySelectorAll('[data-pin]')].map((el) => [el.dataset.pin, el]));
  const steps = [...figure.querySelectorAll('[data-step]')];
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const SPAWN = 1.5, SPEED = 42, HOLD = 0.55, PUSH = 0.4, FALL = 0.35;
  const svgNS = 'http://www.w3.org/2000/svg';
  let clock = 0, nextSpawn = 0, serial = 1200, lines = 3;
  let pucks = [], broken = [], lampUntil = C.GATES.map(() => 0), lampState = C.GATES.map(() => ''), focusUntil = 0, shown = '';

  function spawn() {
    const call = C.CALLS[serial % C.CALLS.length];
    const el = document.createElementNS(svgNS, 'g');
    el.innerHTML = puckSvg(K, P, call.kind);
    pucksEl.appendChild(el);
    pucks.push({ el, call, id: ++serial, t0: clock, x: C.START_X, y: 0, z: C.BELT_Z[1], state: 'ride', stopAt: call.gate >= 0 ? C.GATES[call.gate] + 10 : null, passed: -1 });
  }
  function light(i, state) {
    lampUntil[i] = clock + 0.45;
    if (lampState[i] !== state) { lampState[i] = state; lamps[i].dataset.state = state; }
    lamps[i].setAttribute('opacity', '1');
  }
  function decide(p, blocked) {
    lines = lines >= 9 ? 3 : lines + 1;
    paper.innerHTML = paperSvg(K, P, C, lines);
    const msg = 'call #' + p.id + ' · ' + (blocked ? C.GATE_NAMES[p.call.gate] + ' gate · blocked' : 'passed 6 gates · delivered');
    if (readout) readout.textContent = msg;
    setFocus(blocked ? ['blocked', 'g' + p.call.gate] : ['delivered', 'receipt']);
  }
  // Labels: a decision lights the gate that made it; between decisions the
  // gates take turns, so each one's note can be read.
  function show(ids) {
    const key = ids.join();
    if (key === shown) return;
    shown = key;
    for (const [id, el] of Object.entries(pins)) { el.toggleAttribute('data-on', ids.includes(id)); el.toggleAttribute('data-dim', !ids.includes(id)); }
    for (const s of steps) s.toggleAttribute('data-on', ids.includes(s.dataset.step));
  }
  function setFocus(ids, hold = 1.4) {
    focusUntil = clock + hold;
    show(ids);
  }
  function step(dt) {
    clock += dt;
    if (clock >= nextSpawn) { spawn(); nextSpawn = clock + SPAWN; }
    pucks = pucks.filter((p) => {
      if (p.state === 'ride') {
        p.x += SPEED * dt;
        // Gates it passes flash green; the privacy gate marks redacted calls.
        C.GATES.forEach((g, i) => {
          if (p.passed < i && p.x >= g && (p.stopAt === null || g < p.stopAt - 5)) {
            p.passed = i;
            light(i, 'ok');
            if (i === 1 && p.call.redact) p.el.insertAdjacentHTML('beforeend', lineSvg(planOutline({ x: -3.6, y: -0.8, w: 7.2, d: 1.6, r: 0.6 }, 5.1, P, 2), { tone: 'hi' }));
          }
        });
        if (p.stopAt !== null && p.x >= p.stopAt) { p.x = p.stopAt; p.state = 'caught'; p.tc = clock; light(p.call.gate, 'bad'); p.el.classList.add('fig-bad'); }
        if (p.x >= C.END_X) { p.state = 'drop'; p.tc = clock; decide(p, false); }
      } else if (p.state === 'caught') {
        lampUntil[p.call.gate] = clock + 0.3;
        if (clock - p.tc > HOLD) { p.state = 'push'; p.tc = clock; decide(p, true); }
      } else if (p.state === 'push') {
        const s = clamp((clock - p.tc) / PUSH, 0, 1);
        p.y = -38 * ease(s);
        pushers[p.call.gate].setAttribute('transform', translateAlong(P, [0, -16 * Math.sin(s * Math.PI), 0]));
        if (p.y < -26 && p.el.parentNode !== rejectsEl) rejectsEl.appendChild(p.el);
        if (s >= 1) { p.state = 'fall'; p.tc = clock; pushers[p.call.gate].setAttribute('transform', ''); }
      } else if (p.state === 'fall') {
        const s = clamp((clock - p.tc) / FALL, 0, 1);
        p.z = C.BELT_Z[1] - (C.BELT_Z[1] - 0.8) * s * s;
        if (s >= 1) {
          // It breaks in two in the trough; old pieces fade away.
          p.el.innerHTML = halvesSvg(K, P, p.call.kind, 1.4);
          p.el.classList.add('fig-bad');
          broken.push({ el: p.el, t: clock });
          p.el.setAttribute('transform', translateAlong(P, [p.x, p.y, 0.8]));
          return false;
        }
      } else if (p.state === 'drop') {
        const s = clamp((clock - p.tc) / 0.45, 0, 1);
        p.x = C.END_X + 10 * s;
        p.z = C.BELT_Z[1] - (C.BELT_Z[1] - 1) * s * s;
        p.el.setAttribute('opacity', String(1 - s));
        if (s >= 1) { p.el.remove(); return false; }
      }
      p.el.setAttribute('transform', translateAlong(P, [p.x, p.y, p.z]));
      return true;
    });
    broken = broken.filter((b) => {
      const age = clock - b.t;
      if (age > 4) { b.el.remove(); return false; }
      if (age > 3) b.el.setAttribute('opacity', String(4 - age));
      return true;
    });
    lamps.forEach((lamp, i) => { if (clock > lampUntil[i] && lamp.getAttribute('opacity') !== '0.25') { lamp.setAttribute('opacity', '0.25'); lamp.dataset.state = ''; lampState[i] = ''; } });
    if (clock > focusUntil) show(['calls', 'g' + (Math.floor(clock / 1.8) % C.GATES.length)]);
  }
  if (still.matches) {
    // A still moment: calls on the belt, one caught red at the egress gate.
    for (let i = 0; i < 160; i++) step(0.05);
    for (const pin of Object.values(pins)) { pin.removeAttribute('data-dim'); }
    continue;
  }
  const FOCUS = { calls: ['calls', 'g0'], delivered: ['delivered', 'receipt'], blocked: ['blocked', 'g0'], receipt: ['receipt'] };
  show(['calls', 'g0']);
  playFigure(stage, (t, dt) => step(dt), {
    onSeek: (id) => setFocus(FOCUS[id] || [id], 3),
  });
}
`;

const plate = k.plateHtml({
  fig: 'Fig 3',
  title: 'How Pavii protects AI agents',
  hint: 'Good calls pass, bad calls break',
  readout: 'calls arriving from your agents',
  body: `<div class="iso-stage" data-figure="pavii-gates">${svg}${pins}</div>`,
}).replace('</figure>', `${steps}</figure>`);

writeFigure('pavii-gates', { plate, live, title: 'Pavii gates' });
