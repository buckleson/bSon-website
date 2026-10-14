// Fig 6 (services: wallets and exchanges): a fair order book (Anatomy kit, MIT).
//
// Buy orders wait in the magazine on the left, sell orders in the one on the
// right, each in price-then-time order. The front order of each side ejects
// and rides its rail to the matcher in the middle. The jaws clamp both orders
// together, the four validator lights come on together (every validator
// computes the same fill), the lock light turns green (both sides settle, or
// neither does) and the trade, now one lit block, lifts and joins the chain
// on the ledger shelf at the back. Every third loop an order tries to cut in
// from the front lane; the barrier stops it and its light turns red.
//
// Run: node scripts/figures/order-book.mjs
import { k, tools, basePlate, pinsHtml, stepsHtml, playFigure, writeFigure } from './lib.mjs';

const WIDTH = 760;
const HEIGHT = 420;

const PLATE = { x: -158, y: -64, w: 316, d: 112, r: 8 };
const CHIP = { w: 15, d: 13, h: 4.5 };
const RAIL_Z = 6;
const MAG = { xs: [-118, 118], y: 0, w: 24, d: 22, h: 46, count: 5 };
const RAIL = { y: -7, d: 14, from: 94, to: 18 };
const MATCH = { w: 44, d: 32, h: 8 };
const JAW = { open: 34, shut: 17, w: 7, d: 20, h: 12 };
const BEAM = { top: 50 };
const SHELF = { x: -70, y: -58, w: 154, d: 20, h: 10 };
const LANE = { x: 0, from: 42, to: 22, w: 15 };
const BARRIER = { y: 28 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -17, 0), [MAG.xs[0], 0, MAG.h + 6], [MAG.xs[1], 0, MAG.h + 6], [0, -28, BEAM.top + 14]],
  WIDTH,
  HEIGHT,
  { pad: 14, azimuth: 48 },
);

const { at, S, L, D, col, box, byDepth } = tools(P);

// ---- live builders (pure; embedded with toString()) ----------------------

function chipSvg(K, P, C, lit) {
  // One order chip at the origin, on the rail height.
  const plan = { x: -C.CHIP.w / 2, y: -C.CHIP.d / 2, w: C.CHIP.w, d: C.CHIP.d, r: 1.2 };
  const z = C.RAIL_Z;
  return (
    K.solidSvg(K.slabOf(plan, z, C.CHIP.h, P, 2, 0.4), { tone: lit ? 'hi' : 'mid', lit }) +
    K.lineSvg(K.lineOnTop([plan.x + 3, 0], [plan.x + C.CHIP.w - 3, 0], z + C.CHIP.h, P), { tone: 'mid', free: true }) +
    K.lineSvg(K.lineOnTop([plan.x + 3, -2.6], [plan.x + 8, -2.6], z + C.CHIP.h, P), { tone: 'faint', free: true })
  );
}

const C = { CHIP, RAIL_Z };

// ---- static parts ---------------------------------------------------------

function magazine(x, side) {
  // A frame of four posts holding a stack of order chips; the ejector
  // pushes the bottom chip toward the middle.
  const out = [];
  const plan = { x: x - MAG.w / 2, y: MAG.y - MAG.d / 2, w: MAG.w, d: MAG.d, r: 2 };
  out.push(`<path class="iso-halo" d="${k.haloOf(plan, 0, 4, P)}"/>`);
  out.push(box(plan, 0, 3, { tone: 'mid' }, 3, 0.4));
  const posts = k.corners(k.insetPlan(plan, 1.5));
  const back = byDepth(posts).slice(0, 2);
  const front = byDepth(posts).slice(2);
  const postSvg = ([px, py]) => col(px, py, 1.4, 3, MAG.h, { tone: 'mid', crease: 'none' }, 14);
  out.push(back.map(postSvg).join(''));
  // The stack (the bottom chip is the live one).
  const stack = [];
  for (let i = 1; i < MAG.count; i++) {
    stack.push(S(k.slabOf({ x: x - CHIP.w / 2, y: -CHIP.d / 2, w: CHIP.w, d: CHIP.d, r: 1.2 }, RAIL_Z + i * (CHIP.h + 0.6), CHIP.h, P, 2, 0.4), { tone: 'mid' }));
  }
  out.push(`<g data-stack="${side}">${stack.join('')}</g>`);
  out.push(front.map(postSvg).join(''));
  out.push(box({ x: plan.x - 1, y: plan.y - 1, w: plan.w + 2, d: plan.d + 2, r: 2.4 }, MAG.h, MAG.h + 3, { tone: 'mid' }, 3, 0.4));
  out.push(L(k.planOutline(k.insetPlan(plan, 4), MAG.h + 3, P, 3), { tone: 'faint' }));
  // Ejector housing on the outer side.
  const ex = side === 'bid' ? plan.x - 8 : plan.x + plan.w;
  out.push(box({ x: ex, y: -5, w: 8, d: 10, r: 1.5 }, 0, 12, { tone: 'mid' }, 2, 0.4));
  out.push(D([at([ex + 4, -2, 12]), at([ex + 4, 2, 12])], { size: 0.45 }));
  return out.join('');
}

function rail(side) {
  const sign = side === 'bid' ? -1 : 1;
  const x0 = sign * RAIL.from;
  const x1 = sign * RAIL.to;
  const plan = { x: Math.min(x0, x1), y: RAIL.y, w: Math.abs(x1 - x0), d: RAIL.d, r: 1.2 };
  const out = [box(plan, 0, RAIL_Z - 1, { tone: 'mid' }, 3, 0.4)];
  out.push(L(k.lineOnTop([plan.x + 2, RAIL.y + 2], [plan.x + plan.w - 2, RAIL.y + 2], RAIL_Z - 1, P) + k.lineOnTop([plan.x + 2, RAIL.y + RAIL.d - 2], [plan.x + plan.w - 2, RAIL.y + RAIL.d - 2], RAIL_Z - 1, P), { tone: 'faint' }));
  // Price ticks along the rail's near edge.
  const ticks = k.topTicks(plan.x + 4, plan.x + plan.w - 4, 4, 5, RAIL.y + RAIL.d - 0.4, RAIL_Z - 1, [1.4, 2.6], P);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  return out.join('');
}

function matcherBase() {
  const plan = { x: -MATCH.w / 2, y: -MATCH.d / 2 - 6, w: MATCH.w, d: MATCH.d + 6, r: 2.5 };
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, 0, MATCH.h, P)}"/>`];
  out.push(box(plan, 0, MATCH.h - 1, { tone: 'mid' }, 3, 0.5));
  out.push(L(k.planOutline(k.insetPlan(plan, 3), MATCH.h - 1, P, 3), { tone: 'faint' }));
  // Cross rail for the jaws.
  out.push(box({ x: -JAW.open - 6, y: -JAW.d / 2 - 3, w: (JAW.open + 6) * 2, d: 4, r: 1 }, MATCH.h - 1, MATCH.h + 2, { tone: 'mid' }, 2, 0.3));
  return out.join('');
}

function gantry() {
  // Two posts and a beam over the matcher, carrying the validator lights.
  const out = [];
  const y0 = -JAW.d / 2 - 17;
  out.push(col(-30, y0 + 5, 2.6, 0, BEAM.top, { tone: 'mid' }, 18));
  out.push(col(30, y0 + 5, 2.6, 0, BEAM.top, { tone: 'mid' }, 18));
  out.push(box({ x: -36, y: y0, w: 72, d: 10, r: 1.8 }, BEAM.top, BEAM.top + 5, { tone: 'mid' }, 3, 0.4));
  // Four validator nodes on the beam, each with a light on its face.
  [-24, -8, 8, 24].forEach((x, i) => {
    out.push(box({ x: x - 5, y: y0 + 1, w: 10, d: 8, r: 1.2 }, BEAM.top + 5, BEAM.top + 13, { tone: 'mid' }, 2, 0.4));
    out.push(L(k.lineOnTop([x - 3, y0 + 4], [x + 3, y0 + 4], BEAM.top + 13, P), { tone: 'faint', free: true }));
    const [lx, ly] = at([x + 2.5, y0 + 9.1, BEAM.top + 9]);
    out.push(`<circle class="fig-led" data-validator="${i}" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.5" opacity="0.25"/>`);
  });
  // The lock light on the matcher's near face.
  const [lx, ly] = at([MATCH.w / 2 - 4, MATCH.d / 2 + 0.1, 3]);
  out.push(`<circle class="fig-led" data-part="lock-led" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.6" opacity="0.25"/>`);
  return out.join('');
}

function jaw(side) {
  const sign = side === 'bid' ? -1 : 1;
  // Built at the open position; the live script slides it inward.
  const x = sign * JAW.open - JAW.w / 2;
  return box({ x, y: -JAW.d / 2, w: JAW.w, d: JAW.d, r: 1 }, MATCH.h - 1, MATCH.h - 1 + JAW.h, { tone: 'mid' }, 2, 0.4) + D([at([sign * JAW.open, 0, MATCH.h - 1 + JAW.h])], { size: 0.5 });
}

function shelf() {
  const plan = { x: SHELF.x, y: SHELF.y, w: SHELF.w, d: SHELF.d, r: 2 };
  const out = [box(plan, 0, SHELF.h, { tone: 'mid' }, 3, 0.5)];
  out.push(L(k.sideSeam(plan, 4, P, 3), { tone: 'lo' }));
  // The chain of settled trades already on the shelf.
  const blocks = [];
  for (let i = 0; i < 6; i++) {
    const x = SHELF.x + 14 + i * 20;
    blocks.push(S(k.slabOf({ x, y: SHELF.y + 3, w: CHIP.w, d: CHIP.d, r: 1.2 }, SHELF.h, CHIP.h + 1, P, 2, 0.4), { tone: 'mid' }));
    if (i > 0) blocks.push(L(k.lineOnTop([x - 6, SHELF.y + 3 + CHIP.d / 2], [x, SHELF.y + 3 + CHIP.d / 2], SHELF.h + 2.5, P), { tone: 'mid' }));
  }
  out.push(`<g data-part="chain">${blocks.join('')}</g>`);
  return out.join('');
}

function lane() {
  const plan = { x: LANE.x - LANE.w / 2, y: LANE.to - 6, w: LANE.w, d: LANE.from - LANE.to + 14, r: 1.4 };
  return [
    box(plan, 0, RAIL_Z - 1, { tone: 'lo' }, 3, 0.3),
    L(k.lineOnTop([plan.x + 2, plan.y + 3], [plan.x + 2, plan.y + plan.d - 3], RAIL_Z - 1, P) + k.lineOnTop([plan.x + plan.w - 2, plan.y + 3], [plan.x + plan.w - 2, plan.y + plan.d - 3], RAIL_Z - 1, P), { tone: 'faint' }),
  ].join('');
}

function barrier() {
  const x0 = LANE.x - LANE.w / 2 - 6;
  return [
    col(x0, BARRIER.y, 2.4, 0, 16, { tone: 'mid' }, 16),
    box({ x: x0, y: BARRIER.y - 1.2, w: LANE.w + 10, d: 2.4, r: 0.8 }, 12, 14.4, { tone: 'mid', crease: 'none' }, 2, 0.2),
    (() => {
      const [lx, ly] = at([x0, BARRIER.y + 2.5, 15]);
      return `<circle class="fig-led" data-part="barrier-led" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.5" opacity="0.25"/>`;
    })(),
  ].join('');
}

// ---- paint back to front --------------------------------------------------

const body = [
  basePlate(P, PLATE, { label: { x: 104, y: 26, w: 34, d: 14, r: 1.5 }, ruler: { x: -140, y: 34, w: 100, d: 6, r: 1 } }),
  shelf(),
  `<g data-part="trade" opacity="0">${chipSvg(k, P, C, true)}</g>`,
  gantry(),
  magazine(MAG.xs[0], 'bid'),
  rail('bid'),
  matcherBase(),
  `<g data-part="jaw-bid">${jaw('bid')}</g>`,
  `<g data-part="bid">${chipSvg(k, P, C, false)}</g>`,
  `<g data-part="ask">${chipSvg(k, P, C, false)}</g>`,
  `<g data-part="jaw-ask">${jaw('ask')}</g>`,
  rail('ask'),
  magazine(MAG.xs[1], 'ask'),
  lane(),
  `<g data-part="cutter" opacity="0">${chipSvg(k, P, C, false)}</g>`,
  barrier(),
];

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    'An order book as a bench. Buy orders wait in a magazine on the left and sell orders in a magazine on the right. The front order of each side rides its rail to the matcher in the middle. The jaws clamp both orders, four validator lights come on together, the lock light turns green, and the trade joins the chain on the ledger shelf. An order that tries to cut in from the front lane is stopped at the barrier.',
  body,
});

const pins = pinsHtml(P, WIDTH, HEIGHT, [
  { id: 'bids', n: 1, at: [MAG.xs[0], 0, MAG.h + 3], icon: 'arrow-circle-up', title: 'Buy orders', sub: 'Queued by price, then by time', expand: true, seek: 'queue' },
  { id: 'asks', n: 1, at: [MAG.xs[1], 0, MAG.h + 3], icon: 'arrow-circle-down', title: 'Sell orders', sub: 'Queued by price, then by time', expand: true, seek: 'queue' },
  { id: 'match', n: 2, at: [0, -JAW.d / 2 - 12, BEAM.top + 13], icon: 'cpu', title: 'Matching in consensus', sub: 'Every validator gets the same fill', lift: 10, expand: true, seek: 'match' },
  { id: 'lock', n: 3, at: [MATCH.w / 2, MATCH.d / 2, 3], icon: 'lock-key', title: 'Atomic settlement', sub: 'Both sides settle, or neither', side: 'down', lift: 20, expand: true, seek: 'settle' },
  { id: 'chain', n: 4, at: [SHELF.x, SHELF.y + SHELF.d / 2, SHELF.h / 2], icon: 'link-simple', title: 'Final on Hyper 0X', sub: 'No reorgs, no undo', side: 'left', lift: 22, expand: true, seek: 'final' },
  { id: 'barrier', at: [LANE.x - LANE.w / 2 - 6, BARRIER.y, 16], icon: 'hand-palm', title: 'No queue jumping', sub: 'Nobody trades ahead of an order', side: 'left', lift: 18, expand: true },
]);

const steps = stepsHtml([
  { id: 'queue', icon: 'list-numbers', title: 'Orders queue fairly', sub: 'By price, then by arrival time' },
  { id: 'match', icon: 'cpu', title: 'Matched in consensus', sub: 'Every validator calculates the same fill' },
  { id: 'settle', icon: 'lock-key', title: 'Settled atomically', sub: 'Both sides settle in one step, or neither' },
  { id: 'final', icon: 'link-simple', title: 'Final on Hyper 0X', sub: 'The trade joins the chain, with no reorgs' },
]);

const T = {
  eject: [0.2, 0.6],
  slide: [0.6, 1.6],
  cut: [0.7, 1.5],
  retreat: [2.6, 3.2],
  clamp: [1.6, 2.0],
  vote: [2.0, 2.6],
  lock: [2.6, 2.9],
  lift: [3.0, 3.5],
  back: [3.5, 4.4],
  open: [3.2, 3.6],
  loop: 5.6,
};

const live = `
${chipSvg.toString()}
${playFigure.toString()}
const P = ${JSON.stringify(P)};
const C = ${JSON.stringify({ CHIP, RAIL_Z, MAG, RAIL, JAW, SHELF, LANE, BARRIER, MATCH, T, SLOT_X: SHELF.x + 14 + 6 * 20 + CHIP.w / 2 })};
const K = { slabOf, solidSvg, lineSvg, lineOnTop };
for (const stage of document.querySelectorAll('[data-figure="order-book"]')) {
  const svg = stage.querySelector('svg');
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const bid = q('bid'), ask = q('ask'), trade = q('trade'), cutter = q('cutter'), chain = q('chain');
  const jawBid = q('jaw-bid'), jawAsk = q('jaw-ask'), lockLed = q('lock-led'), barrierLed = q('barrier-led');
  const stacks = [...svg.querySelectorAll('[data-stack]')];
  const votes = [...svg.querySelectorAll('[data-validator]')];
  const figure = stage.closest('.iso-figure');
  const readout = figure.querySelector('[data-readout]');
  const pins = Object.fromEntries([...stage.querySelectorAll('[data-pin]')].map((el) => [el.dataset.pin, el]));
  const steps = [...figure.querySelectorAll('[data-step]')];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const span = (t, [a, b]) => clamp((t - a) / (b - a), 0, 1);
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const T = C.T;
  let prevT = 0, cycle = 0, shown = '';

  function draw(t) {
    if (t < prevT) cycle++;
    prevT = t;
    const cutting = cycle % 3 === 1;
    // Both front orders eject and ride to the middle.
    const out = ease(span(t, T.eject)), ride = ease(span(t, T.slide));
    const start = C.MAG.xs[1] - 6 * (1 - out);
    const meet = C.CHIP.w / 2 + 0.6;
    const x = start + (meet - start) * ride;
    const lifted = ease(span(t, T.lift)), back = ease(span(t, T.back));
    const merged = t >= T.lock[1];
    bid.setAttribute('transform', translateAlong(P, [-x, 0, 0]));
    ask.setAttribute('transform', translateAlong(P, [x, 0, 0]));
    bid.setAttribute('opacity', merged ? '0' : '1');
    ask.setAttribute('opacity', merged ? '0' : '1');
    // The stacks drop one place as the front order leaves.
    const drop = (C.CHIP.h + 0.6) * (1 - ease(span(t, [T.slide[0], T.slide[0] + 0.4])));
    const h = C.CHIP.h + 0.6;
    const sink = -h * ease(span(t, [T.slide[0], T.slide[0] + 0.4])) * (1 - ease(span(t, [T.loop - 0.5, T.loop])));
    stacks.forEach((s) => s.setAttribute('transform', translateAlong(P, [0, 0, sink])));
    // The jaws clamp, then open after the lift.
    const shut = ease(span(t, T.clamp)) * (1 - ease(span(t, T.open)));
    const dj = (C.JAW.open - C.JAW.shut) * shut;
    jawBid.setAttribute('transform', translateAlong(P, [dj, 0, 0]));
    jawAsk.setAttribute('transform', translateAlong(P, [-dj, 0, 0]));
    // Validators agree, the lock turns green, the trade lifts to the chain.
    votes.forEach((v, i) => {
      const lit = t >= T.vote[0] + i * 0.08 && t < T.back[1];
      v.setAttribute('opacity', lit ? '1' : '0.25');
      v.dataset.state = t >= T.vote[1] && t < T.back[1] ? 'ok' : '';
    });
    lockLed.dataset.state = t >= T.lock[0] && t < T.back[1] ? 'ok' : '';
    lockLed.setAttribute('opacity', t >= T.lock[0] && t < T.back[1] ? '1' : '0.25');
    // The trade lifts off the matcher and lands at the end of the chain.
    const tz = 8 * lifted + (C.SHELF.h - C.RAIL_Z - 8) * back;
    trade.setAttribute('transform', translateAlong(P, [C.SLOT_X * back, (C.SHELF.y + 3 + C.CHIP.d / 2) * back, tz]));
    trade.setAttribute('opacity', merged && t < T.loop - 0.3 ? '1' : '0');
    // A third order tries to cut in from the front lane.
    if (cutting) {
      const inn = ease(span(t, T.cut)), outn = ease(span(t, T.retreat));
      const cy = C.LANE.from - (C.LANE.from - C.BARRIER.y - 7) * inn * (1 - outn);
      cutter.setAttribute('transform', translateAlong(P, [0, cy, 0]));
      cutter.setAttribute('opacity', t >= T.cut[0] - 0.1 && t < T.retreat[1] ? '1' : '0');
      cutter.classList.toggle('fig-bad', t >= T.cut[1] - 0.1);
    } else cutter.setAttribute('opacity', '0');
    const stopped = cutting && t >= T.cut[1] - 0.1 && t < T.retreat[1];
    barrierLed.dataset.state = stopped ? 'bad' : '';
    barrierLed.setAttribute('opacity', stopped ? '1' : '0.25');
    // Labels, steps and readout.
    let stage, on;
    if (t < T.slide[1]) { stage = 'queue'; on = stopped ? ['bids', 'asks', 'barrier'] : ['bids', 'asks']; }
    else if (t < T.lock[0]) { stage = 'match'; on = stopped ? ['match', 'barrier'] : ['match']; }
    else if (t < T.lift[0]) { stage = 'settle'; on = ['lock']; }
    else { stage = 'final'; on = ['chain']; }
    const fill = 48213 + cycle;
    const msg = stopped && t < T.lock[0] ? 'order tried to cut in · stopped at the barrier' : 'fill #' + fill.toLocaleString('en-US') + ' · 0.50 ETH @ 3,412.20 · ' + (t >= T.lock[0] ? 'settled' : 'matching');
    const key = on.join() + '|' + msg;
    if (key !== shown) {
      shown = key;
      for (const [id, el] of Object.entries(pins)) { el.toggleAttribute('data-on', on.includes(id)); el.toggleAttribute('data-dim', !on.includes(id)); }
      for (const st of steps) st.toggleAttribute('data-on', st.dataset.step === stage);
      if (readout) readout.textContent = msg;
    }
  }
  playFigure(stage, (t) => draw(t), {
    loop: T.loop,
    stillAt: T.lock[1] + 0.05,
    seek: { queue: 0, match: T.clamp[0], settle: T.lock[0], final: T.lift[0] },
  });
}
`;

const plate = k.plateHtml({
  fig: 'Fig 6',
  title: 'A fair order book',
  hint: 'Both sides settle, or neither',
  readout: 'fill #48,213 · 0.50 ETH @ 3,412.20 · matching',
  body: `<div class="iso-stage" data-figure="order-book">${svg}${pins}</div>`,
}).replace('</figure>', `${steps}</figure>`);

writeFigure('order-book', { plate, live, title: 'Order book' });
