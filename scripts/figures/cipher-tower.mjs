// Fig 4: the cipher tower, four layers of encryption (Anatomy kit, MIT).
//
// A record (the lit chip) drops into the core of a tower of four rings. Each
// ring is one layer of encryption: in transit, in use, on the ledger, at
// rest. As the record goes in, the rings spin one after another to a
// scrambled position and their lights come on: four independent locks. To
// read it back, the owner's key comes from the HSM on the side, the rings
// spin back into line with the index bar, and the record comes out.
//
// Run: node scripts/figures/cipher-tower.mjs
import { k, tools, basePlate, pinsHtml, stepsHtml, writeFigure } from './lib.mjs';

const WIDTH = 560;
const HEIGHT = 520;

const PLATE = { x: -76, y: -76, w: 152, d: 152, r: 10 };
const R = 40;
const RING_H = 13;
const SPACER = { r: 36, h: 2 };
const PLINTH = { r: 46, h: 4 };
const rings = [0, 1, 2, 3].map(i => {
  // Ring 0 (in transit) is on top; ring 3 (at rest) at the bottom.
  const level = 3 - i;
  const z0 = PLINTH.h + SPACER.h + level * (RING_H + SPACER.h);
  return { i, z0, z1: z0 + RING_H };
});
const TOP = rings[0].z1;
const CAP = { r: 31, z: [TOP + SPACER.h, TOP + SPACER.h + 6] };
const CORE = { r: 9, z: [CAP.z[1], CAP.z[1] + 13] };
const CHIP = { w: 12, h: 3, top: CORE.z[1] + 24 };
const BAR = { angle: (72 * Math.PI) / 180, r: 46.5 };
const LED_ANGLE = (14 * Math.PI) / 180;
const HSM = { x: -68, y: 18, w: 24, d: 28, r: 2, h: 24 };
const SCRAMBLE = [130, -150, 205, -115].map(d => (d * Math.PI) / 180);

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -17, 0), [0, 0, CHIP.top + CHIP.h], [R, -R, TOP], [-R, R, TOP]],
  WIDTH,
  HEIGHT,
  { pad: 10, azimuth: 45 },
);

const { at, S, L, D, byDepth, col, box, path } = tools(P);

// ---- live builders (pure; embedded with toString()) ----------------------

function ringMarks(K, P, C, ring, phi) {
  // Cell dividers round the ring's side, the alignment mark beside the index
  // bar, and the tick scale on the ring's exposed top rim; all turn with phi.
  const { z0, z1 } = ring;
  const view = [Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)];
  const side = [];
  const marks = [];
  for (let k = 0; k < 16; k++) {
    const a = phi + (k / 16) * Math.PI * 2;
    if (Math.cos(a) * view[0] + Math.sin(a) * view[1] < 0.2) continue;
    side.push(K.pathOf([K.iso([C.R * Math.cos(a), C.R * Math.sin(a), z0 + 2.4], P), K.iso([C.R * Math.cos(a), C.R * Math.sin(a), z1 - 2.4], P)]));
  }
  for (const d of [-0.07, 0.07]) {
    const a = phi + C.BAR + d;
    if (Math.cos(a) * view[0] + Math.sin(a) * view[1] < 0.05) continue;
    marks.push(K.pathOf([K.iso([C.R * Math.cos(a), C.R * Math.sin(a), z0 + 1.6], P), K.iso([C.R * Math.cos(a), C.R * Math.sin(a), z1 - 1.6], P)]));
  }
  const ticks = K.radialTicks(0, 0, C.R - 0.6, 32, 4, z1, [1.4, 2.8], P, phi);
  return K.lineSvg(side.join(''), { tone: 'faint' }) + K.lineSvg(ticks.minor, { tone: 'lo' }) + K.lineSvg(ticks.major, { tone: 'mid' }) + K.lineSvg(marks.join(''), { tone: 'hi' });
}

const C = { R, BAR: BAR.angle };

// ---- static parts ---------------------------------------------------------

function plinth() {
  const out = [`<path class="iso-halo" d="${k.haloOf({ x: -PLINTH.r, y: -PLINTH.r, w: PLINTH.r * 2, d: PLINTH.r * 2, r: PLINTH.r }, 0, PLINTH.h, P)}"/>`];
  out.push(col(0, 0, PLINTH.r, 0, PLINTH.h, { tone: 'mid' }, 64));
  const bolts = Array.from({ length: 8 }, (_, i) => [43.2 * Math.cos((i / 8) * Math.PI * 2 + 0.2), 43.2 * Math.sin((i / 8) * Math.PI * 2 + 0.2)]);
  out.push(L(bolts.map(([x, y]) => k.ring(x, y, 1.2, PLINTH.h, P, 12)).join(''), { tone: 'lo' }));
  out.push(D(bolts.map(([x, y]) => at([x, y, PLINTH.h])), { size: 0.45 }));
  return out.join('');
}

const spacer = z => col(0, 0, SPACER.r, z, z + SPACER.h, { tone: 'lo', crease: 'none' }, 56);

function ring(r) {
  const out = [col(0, 0, R, r.z0, r.z1, { tone: 'mid' }, 72)];
  out.push(L(k.sideArc(0, 0, R, r.z0 + 1.2, P, 40), { tone: 'faint' }));
  out.push(`<g data-marks="${r.i}">${ringMarks(k, P, C, r, 0)}</g>`);
  const [lx, ly] = at([(R + 0.2) * Math.cos(LED_ANGLE), (R + 0.2) * Math.sin(LED_ANGLE), (r.z0 + r.z1) / 2]);
  out.push(`<circle class="fig-led" data-led="${r.i}" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.6" opacity="0.18"/>`);
  return out.join('');
}

function cap() {
  const out = [col(0, 0, CAP.r, CAP.z[0], CAP.z[1], { tone: 'mid' }, 60)];
  out.push(L(k.knurl(0, 0, CAP.r, CAP.z[0], CAP.z[1], 40, P), { tone: 'lo' }));
  out.push(L(k.ring(0, 0, CAP.r - 4, CAP.z[1], P, 48), { tone: 'faint' }));
  const screws = [0, 1, 2, 3].map(i => [24 * Math.cos(i * Math.PI / 2 + Math.PI / 4), 24 * Math.sin(i * Math.PI / 2 + Math.PI / 4)]);
  out.push(D(screws.map(([x, y]) => at([x, y, CAP.z[1]])), { size: 0.5 }));
  out.push(col(0, 0, CORE.r + 3, CAP.z[1], CAP.z[1] + 2, { tone: 'mid' }, 32));
  out.push(col(0, 0, CORE.r, CAP.z[1] + 2, CORE.z[1], { tone: 'mid' }, 36));
  out.push(L(k.sideArc(0, 0, CORE.r, CORE.z[1] - 4, P, 20), { tone: 'faint' }));
  // The slot the record drops through.
  out.push(S(k.slabOf({ x: -CHIP.w / 2 - 1, y: -CHIP.w / 2 - 1, w: CHIP.w + 2, d: CHIP.w + 2, r: 1 }, CORE.z[1], 0.4, P, 2), { tone: 'lo', crease: 'none', flat: true }));
  return out.join('');
}

function chip() {
  const plan = { x: -CHIP.w / 2, y: -CHIP.w / 2, w: CHIP.w, d: CHIP.w, r: 1.4 };
  const z = CHIP.top;
  return [
    S(k.slabOf(plan, z, CHIP.h, P, 2, 0.4), { tone: 'hi', lit: true }),
    L([-3, 0, 3].map(y => k.lineOnTop([-3.5, y], [3.5, y], z + CHIP.h, P)).join(''), { tone: 'mid', free: true }),
    D(k.corners(k.insetPlan(plan, 1.8)).map(([x, y]) => at([x, y, z + CHIP.h])), { size: 0.4, tone: 'mid' }),
  ].join('');
}

function indexBar() {
  const bx = BAR.r * Math.cos(BAR.angle);
  const by = BAR.r * Math.sin(BAR.angle);
  const plan = { x: bx - 1.8, y: by - 1.8, w: 3.6, d: 3.6, r: 0.6 };
  const arm = { x: bx - 2.4, y: 20, w: 4.8, d: by - 20 + 2, r: 1 };
  return [
    box(plan, PLINTH.h, CAP.z[1], { tone: 'mid', crease: 'none' }, 2, 0.3),
    box(arm, CAP.z[1], CAP.z[1] + 2.4, { tone: 'mid', crease: 'none' }, 2, 0.3),
    D([at([bx, 22, CAP.z[1] + 2.4]), at([bx, by, CAP.z[1] + 2.4])], { size: 0.45 }),
  ].join('');
}

function hsm() {
  const plan = { x: HSM.x, y: HSM.y, w: HSM.w, d: HSM.d, r: HSM.r };
  const face = HSM.y + HSM.d;
  const side = HSM.x + HSM.w;
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, 0, HSM.h, P)}"/>`];
  out.push(box(plan, 0, HSM.h, { tone: 'mid' }, 3, 0.5));
  out.push(L(k.sideSeam(plan, 4, P, 3), { tone: 'lo' }));
  out.push(L(k.planOutline(k.insetPlan(plan, 3), HSM.h, P, 3), { tone: 'faint' }));
  for (let i = 0; i < 5; i++) out.push(L(k.planOutline({ x: HSM.x + 5 + i * 3.2, y: HSM.y + 6, w: 1.4, d: 12, r: 0.7 }, HSM.h, P, 2), { tone: 'lo' }));
  // Key slot on the near face, with the key that comes in to unlock.
  out.push(L(path([[HSM.x + 8, face, 14], [HSM.x + 16, face, 14]]), { tone: 'hi' }));
  out.push(`<g data-part="key">${box({ x: HSM.x + 10, y: face, w: 4, d: 7, r: 0.8 }, 12.6, 15.4, { tone: 'mid', crease: 'none' }, 2, 0.2)}${L(k.ring(HSM.x + 12, face + 9.5, 3, 14, P, 18), { tone: 'mid' })}</g>`);
  const [lx, ly] = at([HSM.x + 19, face + 0.1, 19]);
  out.push(`<circle class="fig-led" data-part="hsm-led" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.4" opacity="0.18"/>`);
  out.push(D([[HSM.y + 3, 20], [HSM.y + HSM.d - 3, 20], [HSM.y + 3, 6], [HSM.y + HSM.d - 3, 6]].map(([y, z]) => at([side, y, z])), { size: 0.4 }));
  // Cable from the HSM to the tower's plinth.
  out.push(k.wireSvg(at([side, HSM.y + 8, 5]), at([-34, 20, 1.5]), { via: [at([side + 8, HSM.y + 8, 1.5])], tone: 'lo' }));
  return out.join('');
}

// ---- paint back to front --------------------------------------------------

const body = [
  basePlate(P, PLATE, { label: { x: 36, y: 46, w: 28, d: 16, r: 1.5 } }),
  hsm(),
  plinth(),
  spacer(PLINTH.h),
  [...rings].reverse().map(r => `<g data-ring="${r.i}">${ring(r)}</g>${spacer(r.z1)}`).join(''),
  cap(),
  `<g data-part="chip">${chip()}</g>`,
  indexBar(),
];

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    'A tower of four rings stands around a core. Each ring is one layer of encryption: in transit, in use, on the ledger and at rest. A record drops into the core, and the rings turn one after another to a locked position and light up. The key of the owner comes from the HSM on the side. It turns the rings back into line with the index bar, and the record comes out.',
  body,
});

const mid = r => (r.z0 + r.z1) / 2;
const edge = [R * Math.cos(-Math.PI / 4), R * Math.sin(-Math.PI / 4)];
const pins = pinsHtml(P, WIDTH, HEIGHT, [
  { id: 'transit', at: [...edge, mid(rings[0])], icon: 'lock-key', title: 'In transit', side: 'right' },
  { id: 'use', at: [...edge, mid(rings[1])], icon: 'cpu', title: 'In use', side: 'right' },
  { id: 'ledger', at: [...edge, mid(rings[2])], icon: 'users-three', title: 'On the ledger', side: 'right' },
  { id: 'rest', at: [...edge, mid(rings[3])], icon: 'vault', title: 'At rest', side: 'right' },
  { id: 'hsm', at: [HSM.x + HSM.w / 2, HSM.y + HSM.d / 2, HSM.h], icon: 'key', title: 'Keys in HSM' },
  { id: 'data', at: [-CHIP.w / 2, 0, CHIP.top + CHIP.h / 2], icon: 'file-lock', title: 'Your data', side: 'left' },
]);

const steps = stepsHtml([
  { id: 'transit', icon: 'lock-key', title: 'In transit', sub: 'TLS 1.3 with hybrid X25519 and ML-KEM-768' },
  { id: 'use', icon: 'cpu', title: 'In use', sub: 'The system works on data and does not expose it' },
  { id: 'ledger', icon: 'users-three', title: 'On the ledger', sub: 'Each party has its own key to its own record' },
  { id: 'rest', icon: 'vault', title: 'At rest', sub: 'AES-256-GCM, with the master keys in an HSM' },
]);

const T = {
  drop: [0.1, 1.1],
  lock: [[1.2, 1.8], [1.9, 2.5], [2.6, 3.2], [3.3, 3.9]],
  key: [5.6, 6.0],
  unlock: [[6.9, 7.4], [6.6, 7.1], [6.3, 6.8], [6.0, 6.5]],
  rise: [7.5, 8.4],
  loop: 9.2,
};
const LAYERS = ['transit', 'use', 'ledger', 'rest'];
const TEXT = ['in transit · X25519 + ML-KEM-768', 'in use · processed sealed', 'on the ledger · per-party keys', 'at rest · AES-256-GCM'];

const live = `
${ringMarks.toString()}
const P = ${JSON.stringify(P)};
const C = ${JSON.stringify({ ...C, rings, SCRAMBLE, T, LAYERS, TEXT, CORE, CHIP })};
const K = { pathOf, iso, lineSvg, radialTicks };
for (const stage of document.querySelectorAll('[data-figure="cipher-tower"]')) {
  const svg = stage.querySelector('svg');
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const chipEl = q('chip'), keyEl = q('key'), hsmLed = q('hsm-led');
  const marks = C.rings.map((r) => svg.querySelector('[data-marks="' + r.i + '"]'));
  const leds = C.rings.map((r) => svg.querySelector('[data-led="' + r.i + '"]'));
  const figure = stage.closest('.iso-figure');
  const readout = figure.querySelector('[data-readout]');
  const pins = Object.fromEntries([...stage.querySelectorAll('[data-pin]')].map((el) => [el.dataset.pin, el]));
  const steps = [...figure.querySelectorAll('[data-step]')];
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const span = (t, [a, b]) => clamp((t - a) / (b - a), 0, 1);
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const T = C.T;
  let frame = 0, start = 0, visible = false, last = [], lastState = '';

  function angle(i, t) {
    const locked = ease(span(t, T.lock[i]));
    const open = ease(span(t, T.unlock[i]));
    return C.SCRAMBLE[i] * locked * (1 - open);
  }
  function draw(t) {
    // The record drops in, and later rises out.
    const down = ease(span(t, T.drop));
    const up = ease(span(t, T.rise));
    const depth = (C.CHIP.top - C.CORE.z[1] + 2) * (down - up);
    chipEl.setAttribute('transform', translateAlong(P, [0, 0, -depth]));
    const inside = depth > C.CHIP.top - C.CORE.z[1] - 2;
    chipEl.setAttribute('opacity', inside ? '0' : '1');
    pins.data?.toggleAttribute('data-hidden', inside);
    // Each ring spins to its scrambled position, then back.
    C.rings.forEach((r, i) => {
      const phi = angle(i, t);
      if (last[i] !== phi.toFixed(3)) { last[i] = phi.toFixed(3); marks[i].innerHTML = ringMarks(K, P, C, r, phi); }
      const on = t >= T.lock[i][1] && t < T.unlock[i][0];
      leds[i].setAttribute('opacity', on ? '1' : '0.18');
    });
    const keyIn = ease(span(t, T.key)) * (1 - ease(span(t, T.rise)));
    keyEl.setAttribute('transform', translateAlong(P, [0, -3.5 * keyIn, 0]));
    hsmLed.setAttribute('opacity', keyIn > 0.9 ? '1' : '0.18');
    // Labels, steps and readout.
    let state, on = [];
    const locking = T.lock.findIndex(([a, b]) => t >= a && t < b + 0.15);
    if (t < T.lock[0][0]) { state = 'your data goes in'; on = ['data']; }
    else if (locking >= 0 && t < T.lock[3][1] + 0.15) { state = 'layer ' + (locking + 1) + ' of 4 · ' + C.TEXT[locking]; on = [C.LAYERS[locking]]; }
    else if (t < T.key[0]) { state = 'four layers locked'; on = C.LAYERS; }
    else if (t < T.rise[0]) { state = 'owner key from the HSM · unlocking'; on = ['hsm']; }
    else { state = 'record returned to its owner'; on = ['data']; }
    if (state !== lastState) {
      lastState = state;
      for (const [id, el] of Object.entries(pins)) { el.toggleAttribute('data-on', on.includes(id)); el.toggleAttribute('data-dim', !on.includes(id)); }
      for (const s of steps) s.toggleAttribute('data-on', on.includes(s.dataset.step));
      if (readout) readout.textContent = state;
    }
  }
  function tick(now) {
    if (!start) start = now;
    draw(((now - start) / 1000) % T.loop);
    frame = visible ? requestAnimationFrame(tick) : 0;
  }
  if (still.matches) {
    draw(4.6);
    for (const pin of Object.values(pins)) pin.removeAttribute('data-dim');
    continue;
  }
  draw(0);
  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible && !frame) frame = requestAnimationFrame(tick);
  }, { rootMargin: '120px 0px' }).observe(stage);
}
`;

const plate = k.plateHtml({
  fig: 'Fig 4',
  title: 'Four layers of encryption',
  hint: 'Each ring is its own lock',
  readout: 'your data goes in',
  body: `<div class="iso-stage" data-figure="cipher-tower">${svg}${pins}</div>`,
}).replace('</figure>', `${steps}</figure>`);

writeFigure('cipher-tower', { plate, live, title: 'Cipher tower' });
