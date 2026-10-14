// Fig 2 (Why Hyper 0X): one L1, as many L2s as you need (Anatomy kit, MIT).
//
// The L1 is a long chassis. Each customer L2 is a module plugged into a bay
// on top: bank, fintech, AI and asset issuer, each a different size because
// each runs its own rules. Modules send transactions down a feeder onto the
// L1 bus; the L1 gathers whatever arrived into one block, so a block is
// longer when traffic is heavy and shorter when it is quiet, and the block
// joins the chain on the bed. Mid-loop a new L2 module drops into the empty
// bay, starts sending, and later lifts out again: L2s come and go without
// touching the others.
//
// Run: node scripts/figures/chain-rack.mjs
import { k, tools, basePlate, pinsHtml, stepsHtml, writeFigure } from './lib.mjs';

const WIDTH = 760;
const HEIGHT = 400;

const PLATE = { x: -176, y: -40, w: 350, d: 84, r: 8 };
const MOD_Y = { y: -27, d: 22 };
const SOCKET_Z = 3;
const MODS = [
  { id: 'bank', x: -162, w: 36, h: 56, period: 1.5, offset: 0.2 },
  { id: 'fintech', x: -114, w: 30, h: 40, period: 1.15, offset: 0.7 },
  { id: 'ai', x: -72, w: 34, h: 54, period: 1.8, offset: 1.1 },
  { id: 'asset', x: -24, w: 30, h: 38, period: 2.2, offset: 0.4 },
  { id: 'new', x: 12, w: 32, h: 48, period: 1.3, offset: 0.1 },
];
const LIFT = 34; // how far above its bay the new module waits
const BUS = { x: -168, y: 10, w: 226, d: 12 };
const LANE_Z = 4;
const ARCH = { x: 52, ys: [3, 29], top: 40 };
const BED = { x: 58, y: 6, w: 112, d: 20, r: 2 };
const TRAY_X = 58;
const CHAIN_X = 94;
const CUBE = 5.6;
const CHAIN_END = 168;
const COUNTER = { x: 100, y: -34, w: 44, d: 22, r: 2.5, h: 16 };
const FIRST_BLOCK = 48213;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -16 - 5, 0), ...MODS.map(m => [m.x + m.w / 2, MOD_Y.y, SOCKET_Z + m.h + 8 + (m.id === 'new' ? LIFT : 0)]), [ARCH.x, ARCH.ys[0], ARCH.top + 5]],
  WIDTH,
  HEIGHT,
  { pad: 16, azimuth: 56 },
);

const { at, S, L, D, byDepth, col, box, path, faceCircle } = tools(P);

// ---- live builders (pure; embedded in the page with toString()) -----------

function packetSvg(K, P) {
  return K.solidSvg(K.slabOf({ x: -2.6, y: -2.6, w: 5.2, d: 5.2, r: 0.8 }, 0, 5, P, 2, 0.3), { tone: 'hi', crease: 'lo' });
}
function blockSvg(K, P, n) {
  const len = 4 + n * 4.6;
  const plan = { x: 0, y: -8, w: len, d: 16, r: 1.5 };
  const rings = [];
  for (let i = 0; i < n; i++) rings.push(K.ring(4.3 + i * 4.6, 0, 1.3, 8, P, 12));
  return K.solidSvg(K.slabOf(plan, 0, 8, P, 3, 0.5), { tone: 'hi', crease: 'lo' }) + K.lineSvg(K.planOutline(K.insetPlan(plan, 1.8), 8, P, 3), { tone: 'faint' }) + K.lineSvg(rings.join(''), { tone: 'mid' });
}

// ---- static parts ---------------------------------------------------------

function chassisFront() {
  // Details on the chassis' near face (y = PLATE.y + PLATE.d): label plate,
  // vent slots and a status window; the L1's own face.
  const face = PLATE.y + PLATE.d;
  const out = [];
  out.push(L(path([[PLATE.x + 8, face, -4], [PLATE.x + PLATE.w - 8, face, -4]]), { tone: 'lo' }));
  const lp = { x: -150, y: face, w: 36, d: 0.6, r: 0.5 };
  out.push(box(lp, -13, -6, { tone: 'mid', crease: 'none' }, 2, 0.2));
  [-8.5, -10.5].forEach((z, i) => out.push(L(path([[lp.x + 4, face + 0.6, z], [lp.x + (i ? 20 : 30), face + 0.6, z]]), { tone: 'faint', free: true })));
  for (let i = 0; i < 14; i++) {
    const x = -96 + i * 6;
    out.push(L(path([[x, face, -12.5], [x + 3, face, -12.5], [x + 3, face, -7], [x, face, -7]], true), { tone: 'lo' }));
  }
  const win = { x: 40, y: face, w: 60, d: 0.6, r: 0.6 };
  out.push(box(win, -13, -6, { tone: 'lo', crease: 'none' }, 2, 0.2));
  out.push(D([0, 1, 2, 3, 4, 5, 6, 7].map(i => at([win.x + 5 + i * 7, face + 0.6, -9.5])), { size: 0.7, tone: 'mid' }));
  out.push(D([[PLATE.x + 14, -9.5], [PLATE.x + PLATE.w - 14, -9.5]].map(([x, z]) => at([x, face, z])), { size: 0.5 }));
  return out.join('');
}

function socket(m) {
  const plan = { x: m.x - 2, y: MOD_Y.y - 3, w: m.w + 4, d: MOD_Y.d + 6, r: 1.5 };
  return [
    box(plan, 0, SOCKET_Z, { tone: 'mid' }, 3, 0.4),
    L(k.planOutline({ x: m.x + 2, y: MOD_Y.y + 8, w: m.w - 4, d: 6, r: 1 }, SOCKET_Z, P, 2), { tone: 'lo' }),
    D(byDepth([[plan.x + 2, plan.y + 2], [plan.x + plan.w - 2, plan.y + 2]]).map(([x, y]) => at([x, y, SOCKET_Z])), { size: 0.4 }),
  ].join('');
}

function module(m) {
  const plan = { x: m.x, y: MOD_Y.y, w: m.w, d: MOD_Y.d, r: 2 };
  const z0 = SOCKET_Z;
  const z1 = z0 + m.h;
  const face = MOD_Y.y + MOD_Y.d;
  const side = m.x + m.w;
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, z0, 0.1, P)}" style="filter:blur(3px)"/>`];
  out.push(box(plan, z0, z1, { tone: 'mid' }, 3, 0.6));
  out.push(L(k.sideSeam(plan, z0 + 4, P, 3), { tone: 'lo' }));
  out.push(L(k.sideSeam(plan, z1 - 5, P, 3), { tone: 'faint' }));
  // Front face: display window with bars, vent slots, port, LED.
  const win = { x: m.x + 4, y: face, w: m.w - 8, d: 0.6, r: 0.6 };
  out.push(box(win, z1 - 17, z1 - 8, { tone: 'lo', crease: 'none' }, 2, 0.2));
  const bars = [0.8, 0.45, 0.65, 0.3];
  bars.forEach((share, i) => {
    const z = z1 - 10 - i * 1.8;
    out.push(L(path([[win.x + 2.5, face + 0.6, z], [win.x + 2.5 + (win.w - 5) * share, face + 0.6, z]]), { tone: 'mid', free: true }));
  });
  const slots = Math.floor((m.w - 8) / 4);
  for (let i = 0; i < slots; i++) {
    const x = m.x + 5 + i * 4;
    out.push(L(path([[x, face, z0 + 10], [x + 1.6, face, z0 + 10], [x + 1.6, face, z1 - 22], [x, face, z1 - 22]], true), { tone: 'lo' }));
  }
  const cx = m.x + m.w / 2;
  out.push(box({ x: cx - 4, y: face, w: 8, d: 1.4, r: 0.6 }, z0, z0 + 6, { tone: 'mid', crease: 'none' }, 2, 0.2));
  out.push(L(path([[cx - 2.4, face + 1.4, z0 + 3], [cx + 2.4, face + 1.4, z0 + 3]]), { tone: 'hi', free: true }));
  // Fins on the near end, a lifting handle on top.
  const fins = [];
  for (let z = z0 + 8; z < z1 - 6; z += 4) fins.push(path([[side, MOD_Y.y + 2, z], [side, face - 2, z]]));
  out.push(L(fins.join(''), { tone: 'faint' }));
  const hy = MOD_Y.y + MOD_Y.d / 2;
  for (const x of byDepth([[m.x + 6, hy], [side - 6, hy]])) out.push(col(x[0], x[1], 1.4, z1, z1 + 5, { tone: 'mid', crease: 'none' }, 12));
  out.push(box({ x: m.x + 4.6, y: hy - 1.4, w: m.w - 9.2, d: 2.8, r: 1.2 }, z1 + 5, z1 + 7, { tone: 'mid', crease: 'none' }, 2, 0.2));
  out.push(D(k.corners(k.insetPlan(plan, 2.6)).map(([x, y]) => at([x, y, z1])), { size: 0.4, tone: 'lo' }));
  const [lx, ly] = at([side - 3.5, face + 0.2, z1 - 4]);
  out.push(`<circle class="fig-led" data-led="${m.id}" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.4" opacity="0.2"/>`);
  return out.join('');
}

function lanes() {
  const out = [];
  // Feeder from each module's port to the bus, then the bus to the L1 bed.
  for (const m of MODS) {
    const cx = m.x + m.w / 2;
    out.push(box({ x: cx - 4, y: MOD_Y.y + MOD_Y.d + 1.4, w: 8, d: BUS.y - (MOD_Y.y + MOD_Y.d + 1.4) + 1, r: 0.8 }, 0, LANE_Z, { tone: 'mid', crease: 'none' }, 2, 0.3));
  }
  out.push(box({ ...BUS, r: 1.5 }, 0, LANE_Z, { tone: 'mid' }, 3, 0.4));
  out.push(L(k.lineOnTop([BUS.x + 4, BUS.y + 3], [BUS.x + BUS.w, BUS.y + 3], LANE_Z, P), { tone: 'faint' }));
  out.push(L(k.lineOnTop([BUS.x + 4, BUS.y + BUS.d - 3], [BUS.x + BUS.w, BUS.y + BUS.d - 3], LANE_Z, P), { tone: 'faint' }));
  return out.join('');
}

function bed() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BED, 0, LANE_Z, P)}" style="filter:blur(3px)"/>`];
  out.push(box(BED, 0, LANE_Z, { tone: 'mid' }, 3, 0.4));
  // Tray guides where the next block forms, ticks along the chain.
  for (const y of [BED.y + 1, BED.y + BED.d - 2.5]) out.push(box({ x: TRAY_X - 1, y, w: CHAIN_X - TRAY_X - 3, d: 1.5, r: 0.5 }, LANE_Z, LANE_Z + 2.5, { tone: 'mid', crease: 'none' }, 2, 0.2));
  const ticks = k.topTicks(CHAIN_X, CHAIN_END - 2, 4, 5, BED.y + BED.d - 0.4, LANE_Z, [-1.4, -2.6], P);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  out.push(D([[BED.x + 3, BED.y + 3], [BED.x + BED.w - 3, BED.y + 3]].map(([x, y]) => at([x, y, LANE_Z])), { size: 0.4 }));
  return out.join('');
}

function counter() {
  const out = [];
  out.push(box(COUNTER, 0, COUNTER.h, { tone: 'mid' }, 4, 0.6));
  out.push(L(k.sideSeam(COUNTER, 4, P, 4), { tone: 'lo' }));
  out.push(S(k.slabOf(k.insetPlan(COUNTER, 4), COUNTER.h, 0.6, P, 3), { tone: 'lo', crease: 'none', flat: true }));
  out.push(`<g data-part="count">${k.faceTextSvg(k.topMatrix([COUNTER.x + COUNTER.w / 2 - 1.6, COUNTER.y + COUNTER.d / 2], COUNTER.h + 0.6, P, 'y'), String(FIRST_BLOCK).slice(-4), { size: 6.5, tone: 'hi', anchor: 'middle' })}</g>`);
  out.push(D(k.corners(COUNTER, 2.2).map(([x, y]) => at([x, y, COUNTER.h])), { size: 0.4 }));
  return out.join('');
}

const archPost = y => col(ARCH.x, y, 5, 0, 2, { tone: 'mid' }) + col(ARCH.x, y, 2.4, 2, ARCH.top, { tone: 'mid', crease: 'none' }, 18);

function archTop() {
  const bar = { x: ARCH.x - 3.5, y: ARCH.ys[0] - 3.5, w: 7, d: ARCH.ys[1] - ARCH.ys[0] + 7, r: 2 };
  const [lx, ly] = at([ARCH.x + 3.5, 16, ARCH.top + 2.5]);
  return [
    box(bar, ARCH.top, ARCH.top + 5, { tone: 'mid' }, 3, 0.5),
    D(ARCH.ys.map(y => at([ARCH.x, y, ARCH.top + 5])), { size: 0.45 }),
    col(ARCH.x, 16, 3.2, ARCH.top - 6, ARCH.top, { tone: 'mid' }, 20),
    `<circle class="fig-led" data-part="seal" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.5" opacity="0.2"/>`,
  ].join('');
}

function trayCubes() {
  return Array.from({ length: 6 }, (_, i) => `<g data-cube="${i}" opacity="0" transform="${k.translateAlong(P, [TRAY_X + 4 + i * CUBE, 16, LANE_Z])}">${packetSvg(k, P)}</g>`).join('');
}

// ---- paint back to front --------------------------------------------------

const body = [
  basePlate(P, PLATE, { height: 16, ruler: { x: -150, y: 33, w: 190, d: 6, r: 1 } }),
  chassisFront(),
  MODS.map(socket).join(''),
  MODS.map(m => `<g data-module="${m.id}"${m.id === 'new' ? ` transform="${k.translateAlong(P, [0, 0, LIFT])}" opacity="0"` : ''}>${module(m)}</g>`).join(''),
  counter(),
  archPost(ARCH.ys[0]),
  lanes(),
  bed(),
  `<g data-part="tray">${trayCubes()}</g>`,
  `<g data-part="packets"></g>`,
  archPost(ARCH.ys[1]),
  archTop(),
  `<g data-part="chain"></g>`,
];

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    'A long chassis, the Hyper 0X L1, with L2 modules of different sizes plugged into bays on top: bank, fintech, AI and asset issuer. Each module sends transactions down a feeder onto the L1 bus. The L1 gathers what arrived into one block, longer when traffic is heavy and shorter when it is quiet, and the block joins the chain. A new L2 module drops into the empty bay, starts sending, and later lifts out again.',
  body,
});

const top = m => [m.x + m.w / 2, MOD_Y.y + MOD_Y.d / 2, SOCKET_Z + m.h + 7];
const pins = pinsHtml(P, WIDTH, HEIGHT, [
  { id: 'bank', at: top(MODS[0]), icon: 'bank', title: 'Bank L2', lift: 40 },
  { id: 'fintech', at: top(MODS[1]), icon: 'credit-card', title: 'Fintech L2', lift: 54 },
  { id: 'ai', at: top(MODS[2]), icon: 'robot', title: 'AI L2' },
  { id: 'asset', at: top(MODS[3]), icon: 'coins', title: 'Asset L2', lift: 50 },
  { id: 'new', at: top(MODS[4]), icon: 'plus-circle', title: 'New L2' },
  { id: 'blocks', at: [COUNTER.x + COUNTER.w - 6, COUNTER.y + 3, COUNTER.h], icon: 'stack', title: 'Dynamic blocks' },
  { id: 'l1', at: [-40, PLATE.y + PLATE.d, -16], icon: 'cube', title: 'Hyper 0X L1', side: 'down' },
]);

const steps = stepsHtml([
  { id: 'l1', icon: 'cube', title: 'One L1 under everything', sub: 'Hyper 0X settles every L2 and keeps the final record' },
  { id: 'l2', icon: 'tree-structure', title: 'An L2 per application', sub: 'Each with its own rules, privacy and size' },
  { id: 'new', icon: 'plus-circle', title: 'Add or remove any time', sub: 'A new L2 goes live without touching the others' },
  { id: 'blocks', icon: 'arrows-out-line-horizontal', title: 'Blocks follow demand', sub: 'Bigger when busy, smaller when quiet' },
]);

const LOOP = 16;
const PHASES = [
  { until: 4, step: 'l1', pins: ['l1'] },
  { until: 8, step: 'l2', pins: ['bank', 'fintech', 'ai', 'asset'] },
  { until: 12.5, step: 'new', pins: ['new'] },
  { until: LOOP, step: 'blocks', pins: ['blocks', 'ai'] },
];
const NEW = { down: [8, 9.2], up: [14.4, 15.4] };
const BURST = [12.4, 14];

const live = `
${packetSvg.toString()}
${blockSvg.toString()}
const P = ${JSON.stringify(P)};
const C = ${JSON.stringify({ CUBE, MODS, MOD_Y, SOCKET_Z, LIFT, BUS, LANE_Z, TRAY_X, CHAIN_X, CHAIN_END, FIRST_BLOCK, LOOP, PHASES, NEW, BURST, WIDTH, HEIGHT })};
const K = { slabOf, solidSvg, lineSvg, planOutline, insetPlan, ring };
for (const stage of document.querySelectorAll('[data-figure="chain-rack"]')) {
  const svg = stage.querySelector('svg');
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const packetsEl = q('packets'), chainEl = q('chain'), count = q('count'), seal = q('seal');
  const cubes = [...q('tray').querySelectorAll('[data-cube]')];
  const newMod = svg.querySelector('[data-module="new"]');
  const leds = Object.fromEntries([...svg.querySelectorAll('[data-led]')].map((el) => [el.dataset.led, el]));
  const figure = stage.closest('.iso-figure');
  const readout = figure.querySelector('[data-readout]');
  const pins = Object.fromEntries([...stage.querySelectorAll('[data-pin]')].map((el) => [el.dataset.pin, el]));
  const steps = [...figure.querySelectorAll('[data-step]')];
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const span = (t, [a, b]) => clamp((t - a) / (b - a), 0, 1);
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const packetMarkup = packetSvg(K, P);
  const SEAL = 2.6, SPEED = 78, DROP = 0.4, GAP = 5;
  const mods = C.MODS.map((m) => ({ ...m, cx: m.x + m.w / 2, next: m.offset, blink: -1 }));
  let clock = 0, lastSeal = 0, tray = 0, height = C.FIRST_BLOCK, lastSize = 0;
  let packets = [], chain = [], frame = 0, prev = 0, visible = false, phase = -1;

  function newState(t) {
    if (t < C.NEW.down[0] || t >= C.NEW.up[1]) return { lift: 1, seated: false };
    if (t < C.NEW.down[1]) return { lift: 1 - ease(span(t, C.NEW.down)), seated: false };
    if (t < C.NEW.up[0]) return { lift: 0, seated: true };
    return { lift: ease(span(t, C.NEW.up)), seated: false };
  }
  function emit(m) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    el.innerHTML = packetMarkup;
    packetsEl.appendChild(el);
    packets.push({ el, m, t0: clock });
    m.blink = clock;
  }
  function sealBlock() {
    if (!tray) return;
    const n = tray;
    tray = 0;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    el.innerHTML = blockSvg(K, P, n);
    chainEl.insertBefore(el, chainEl.firstChild);
    chain.unshift({ el, n, len: 4 + n * 4.6, x: C.TRAY_X, op: 1 });
    chain.forEach((b) => b.el.querySelector('.iso-solid')?.toggleAttribute('data-lit', b === chain[0]));
    height++;
    lastSize = n;
    const label = String(height).slice(-4);
    const text = count.querySelector('text');
    if (text) text.textContent = label;
    seal.setAttribute('opacity', '1');
    setTimeout(() => seal.setAttribute('opacity', '0.2'), 260);
  }
  function step(dt) {
    clock += dt;
    const t = clock % C.LOOP;
    // The new L2 drops in, runs, and lifts out again.
    const ns = newState(t);
    newMod.setAttribute('transform', translateAlong(P, [0, 0, C.LIFT * ns.lift]));
    newMod.setAttribute('opacity', String(clamp(1.6 - ns.lift * 1.6, 0, 1).toFixed(2)));
    const burst = t >= C.BURST[0] && t < C.BURST[1];
    for (const m of mods) {
      const live = m.id !== 'new' || ns.seated;
      if (!live) { m.next = clock + 0.4; continue; }
      if (clock >= m.next) {
        emit(m);
        const rate = burst && (m.id === 'ai' || m.id === 'bank') ? 0.3 : 1;
        m.next = clock + m.period * rate * (0.85 + ((m.next * 7.31) % 0.3));
      }
      leds[m.id]?.setAttribute('opacity', clock - m.blink < 0.22 ? '1' : '0.2');
    }
    // Packets: down the feeder, then along the bus into the tray.
    packets = packets.filter((p) => {
      const age = clock - p.t0;
      let x = p.m.cx, y;
      if (age < DROP) y = C.MOD_Y.y + C.MOD_Y.d + 2 + (16 - (C.MOD_Y.y + C.MOD_Y.d + 2)) * ease(age / DROP);
      else { y = 16; x = p.m.cx + (age - DROP) * SPEED; }
      if (x >= C.TRAY_X + 4 + Math.min(tray, 5) * C.CUBE) { p.el.remove(); tray = Math.min(tray + 1, 6); return false; }
      p.el.setAttribute('transform', translateAlong(P, [x, y, C.LANE_Z]));
      return true;
    });
    cubes.forEach((c, i) => c.setAttribute('opacity', i < tray ? '1' : '0'));
    if (clock - lastSeal >= SEAL) { lastSeal = clock; sealBlock(); }
    // Blocks follow their place in the chain; the oldest fade off the end.
    let target = C.CHAIN_X;
    const follow = 1 - Math.exp(-dt * 5);
    chain = chain.filter((b) => {
      b.x += (target - b.x) * follow;
      target += b.len + GAP;
      const over = b.x + b.len - C.CHAIN_END;
      b.op = clamp(1 - over / 10, 0, 1);
      if (b.op <= 0) { b.el.remove(); return false; }
      b.el.setAttribute('transform', translateAlong(P, [b.x, 16, C.LANE_Z]));
      b.el.setAttribute('opacity', b.op.toFixed(2));
      return true;
    });
    // Labels and steps follow the loop's phases.
    const index = C.PHASES.findIndex((p) => t < p.until);
    if (index !== phase) {
      phase = index;
      const on = C.PHASES[index];
      for (const [id, el] of Object.entries(pins)) {
        el.toggleAttribute('data-on', on.pins.includes(id));
        el.toggleAttribute('data-dim', !on.pins.includes(id));
      }
      for (const s of steps) s.toggleAttribute('data-on', s.dataset.step === on.step);
    }
    pins.new?.toggleAttribute('data-hidden', ns.lift > 0.5);
    const liveCount = 4 + (ns.seated ? 1 : 0);
    const msg = 'block #' + height.toLocaleString('en-US') + ' · ' + (lastSize || '-') + ' tx · ' + liveCount + ' L2s live';
    if (readout && readout.textContent !== msg) readout.textContent = msg;
  }
  function tick(now) {
    const dt = prev ? Math.min(0.05, (now - prev) / 1000) : 0;
    prev = now;
    step(dt);
    frame = visible ? requestAnimationFrame(tick) : 0;
  }
  if (still.matches) {
    // One still frame: every L2 seated and a chain of blocks of mixed sizes.
    clock = 10;
    newMod.setAttribute('transform', '');
    newMod.setAttribute('opacity', '1');
    for (const n of [2, 4, 3]) { tray = n; sealBlock(); }
    let x = C.CHAIN_X;
    for (const b of chain) { b.x = x; x += b.len + GAP; b.el.setAttribute('transform', translateAlong(P, [b.x, 16, C.LANE_Z])); }
    if (readout) readout.textContent = 'block #' + height.toLocaleString('en-US') + ' · 3 tx · 5 L2s live';
    continue;
  }
  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible && !frame) { prev = 0; frame = requestAnimationFrame(tick); }
  }, { rootMargin: '120px 0px' }).observe(stage);
}
`;

const plate = k.plateHtml({
  fig: 'Fig 2',
  title: 'One L1, as many L2s as you need',
  hint: 'Each app gets its own L2',
  readout: `block #${FIRST_BLOCK.toLocaleString('en-US')} · - tx · 4 L2s live`,
  body: `<div class="iso-stage" data-figure="chain-rack">${svg}${pins.replace('data-pin="new"', 'data-pin="new" data-hidden')}</div>`,
}).replace('</figure>', `${steps}</figure>`);

writeFigure('chain-rack', { plate, live, title: 'Chain rack' });
