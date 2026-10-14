// Fig 5 (services: asset tokenization): from vault to token, one to one
// (Anatomy kit, MIT).
//
// A gold bar leaves the custodian's vault through a slot; the reserve meter
// beside it counts the bar. The bar rides a track into the mint press, which
// stamps it into a token (the lit part). The token rides the belt through
// the investor-check gate: a verified investor's token goes on into the
// wallet; every third loop the investor is over the limit, the gate light
// turns red and a pusher moves the token into the held tray for review.
//
// Run: node scripts/figures/token-mint.mjs
import { k, tools, basePlate, pinsHtml, stepsHtml, vcoil, playFigure, writeFigure } from './lib.mjs';

const WIDTH = 760;
const HEIGHT = 420;

const PLATE = { x: -176, y: -58, w: 336, d: 116, r: 8 };
const VAULT = { x: -166, y: -46, w: 54, d: 62, r: 3, h: 56 };
const SLOT = { z: [6, 13] };
const METER = { x: -150, y: 26, w: 26, d: 20, r: 2.5, h: 12 };
const TRACK = { from: -112, to: -38, ys: [-7, 3] };
const BELT_Z = 8;
const PRESS = { x: -30, posts: [-26, 24], beam: [80, 88], rest: 48, die: 7.5 };
const ANVIL = { r: 10 };
const BELT = { x: -22, y: -8, w: 98, d: 16 };
const GATE = { x: 34, posts: [-15, 15], top: 36 };
const PUSHER = { x: 52, y: -30, w: 10, d: 8 };
const HELD = { x: 44, y: 14, w: 24, d: 22, r: 2, h: 5 };
const WALLET = { x: 80, y: -26, w: 44, d: 52, r: 4, h: 30 };
const STATIONS = { start: -118, press: PRESS.x, gate: GATE.x, wallet: 86 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -17, 0), [PRESS.x, -30, PRESS.beam[1]], [PRESS.x, 28, PRESS.beam[1]], [VAULT.x, VAULT.y, VAULT.h + 8]],
  WIDTH,
  HEIGHT,
  { pad: 14, azimuth: 52 },
);

const { at, S, L, D, col, box, path, faceCircle } = tools(P);

// ---- live builders (pure; embedded with toString()) ----------------------

function ramLive(K, P, C, dz, coil) {
  // The die, its rod and the return spring, rebuilt as the ram moves.
  const p = C.PRESS;
  const z = p.rest + dz;
  const spring = coil(p.x, 0, 4.4, z + 6.6, p.beam[0] - 6, 7, P, K.iso, K.depthOf, K.pathOf);
  return [
    K.solidSvg(K.cylinder(p.x, 0, p.die, z, 4.2, P, 36, 0.5), { tone: 'mid' }),
    K.solidSvg(K.cylinder(p.x, 0, 4.6, z + 4.2, 2.4, P, 28, 0.3), { tone: 'mid', crease: 'none' }),
    K.lineSvg(spring.back, { tone: 'lo' }),
    K.solidSvg(K.cylinder(p.x, 0, 2.2, z + 6.6, p.beam[0] - z - 6.6, P, 18), { tone: 'hi', crease: 'none' }),
    K.lineSvg(spring.front, { tone: 'mid' }),
  ].join('');
}
function meterNeedle(K, P, C, turn) {
  const m = C.METER;
  const cx = m.x + m.w / 2;
  const cy = m.y + m.d / 2;
  const a = -2.2 + turn;
  const tip = [cx + Math.cos(a) * 6.4, cy + Math.sin(a) * 6.4, m.h + 0.6];
  return K.lineSvg(K.pathOf([K.iso([cx, cy, m.h + 0.6], P), K.iso(tip, P)]), { tone: 'hi' }) + K.dotsSvg([K.iso([cx, cy, m.h + 0.6], P)], { size: 0.7, tone: 'hi' });
}

const C = { PRESS, METER };

// ---- static parts ---------------------------------------------------------

function vault() {
  const plan = { x: VAULT.x, y: VAULT.y, w: VAULT.w, d: VAULT.d, r: VAULT.r };
  const face = VAULT.y + VAULT.d;
  const side = VAULT.x + VAULT.w;
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, 0, VAULT.h, P)}"/>`];
  out.push(box(plan, 0, VAULT.h, { tone: 'mid' }, 3, 0.8));
  out.push(L(k.sideSeam(plan, 6, P, 3), { tone: 'lo' }));
  out.push(L(k.planOutline(k.insetPlan(plan, 4), VAULT.h, P, 3), { tone: 'faint' }));
  // Door on the near face: frame, dial, handle and hinges.
  out.push(L(path([[VAULT.x + 6, face, 8], [VAULT.x + 6, face, 48], [VAULT.x + 48, face, 48], [VAULT.x + 48, face, 8]], true), { tone: 'lo' }));
  out.push(L(faceCircle([VAULT.x + 27, face, 30], 10, 'y', 40), { tone: 'mid' }));
  out.push(L(faceCircle([VAULT.x + 27, face, 30], 7.5, 'y', 32), { tone: 'faint' }));
  const spokes = [0, 1, 2].map(i => {
    const a = (i * Math.PI * 2) / 3 + 0.4;
    return path([[VAULT.x + 27 + Math.sin(a) * 2.4, face, 30 + Math.cos(a) * 2.4], [VAULT.x + 27 + Math.sin(a) * 7, face, 30 + Math.cos(a) * 7]]);
  });
  out.push(L(spokes.join(''), { tone: 'mid' }));
  out.push(D([at([VAULT.x + 27, face, 30])], { size: 0.9, tone: 'hi' }));
  out.push(D([[VAULT.x + 9, 42], [VAULT.x + 9, 14]].map(([x, z]) => at([x, face, z])), { size: 0.55 }));
  // The outlet slot on the right face, where bars leave.
  out.push(L(path([[side, -9, SLOT.z[0]], [side, -9, SLOT.z[1]], [side, 5, SLOT.z[1]], [side, 5, SLOT.z[0]]], true), { tone: 'hi' }));
  out.push(L(path([[side, -12, SLOT.z[1] + 3.5], [side, 8, SLOT.z[1] + 3.5]]), { tone: 'lo' }));
  // Vents and a label on the right face.
  for (let i = 0; i < 4; i++) out.push(L(path([[side, -36 + i * 3.2, 44], [side, -36 + i * 3.2, 50]]), { tone: 'lo' }));
  out.push(D([[-42, 52], [12, 52], [-42, 4], [12, 4]].map(([y, z]) => at([side, y, z])), { size: 0.4 }));
  return out.join('');
}

function meter() {
  const plan = { x: METER.x, y: METER.y, w: METER.w, d: METER.d, r: METER.r };
  const cx = METER.x + METER.w / 2;
  const cy = METER.y + METER.d / 2;
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, 0, METER.h, P)}"/>`];
  out.push(box(plan, 0, METER.h, { tone: 'mid' }, 3, 0.5));
  out.push(L(k.ring(cx, cy, 8.4, METER.h, P, 40), { tone: 'mid' }));
  const ticks = k.radialTicks(cx, cy, 8, 24, 4, METER.h, [1.2, 2.2], P, 0);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  out.push(`<g data-part="needle">${meterNeedle(k, P, C, 0)}</g>`);
  // Cable from the meter to the vault.
  out.push(k.wireSvg(at([METER.x + 4, METER.y, 4]), at([VAULT.x + 30, VAULT.y + VAULT.d, 3]), { via: [at([METER.x + 4, METER.y - 4, 1.5])], tone: 'lo' }));
  return out.join('');
}

function track() {
  const out = [];
  for (const y of TRACK.ys) {
    out.push(box({ x: TRACK.from, y, w: TRACK.to - TRACK.from, d: 4, r: 1 }, 0, 6, { tone: 'mid' }, 3, 0.4));
    out.push(D([TRACK.from + 8, -80, -56].map(x => at([x, y + 2, 6])), { size: 0.4 }));
  }
  return out.join('');
}

function post(x, y, top, r = 3.4) {
  return [col(x, y, r + 3.2, 0, 2.4, { tone: 'mid' }), col(x, y, r, 2.4, top), L([24, 56].map(z => k.sideArc(x, y, r, z, P, 14)).join(''), { tone: 'faint' })].join('');
}

function pressBeam() {
  const plan = { x: PRESS.x - 9, y: PRESS.posts[0] - 6, w: 18, d: PRESS.posts[1] - PRESS.posts[0] + 12, r: 2 };
  return [
    box(plan, PRESS.beam[0], PRESS.beam[1], { tone: 'mid' }, 3, 0.5),
    L(k.planOutline(k.insetPlan(plan, 3), PRESS.beam[1], P, 3), { tone: 'faint' }),
    col(PRESS.x, 0, 7, PRESS.beam[1], PRESS.beam[1] + 5, { tone: 'mid' }, 30),
    L(k.knurl(PRESS.x, 0, 7, PRESS.beam[1], PRESS.beam[1] + 5, 28, P), { tone: 'lo' }),
    D(PRESS.posts.map(y => at([PRESS.x, y, PRESS.beam[1]])), { size: 0.5 }),
  ].join('');
}

function anvil() {
  return [
    `<path class="iso-halo" d="${k.haloOf({ x: PRESS.x - ANVIL.r, y: -ANVIL.r, w: ANVIL.r * 2, d: ANVIL.r * 2, r: ANVIL.r }, 0, BELT_Z, P)}"/>`,
    col(PRESS.x, 0, ANVIL.r + 2, 0, 2, { tone: 'mid' }, 40),
    col(PRESS.x, 0, ANVIL.r, 2, BELT_Z, { tone: 'mid' }, 40),
    L(k.ring(PRESS.x, 0, 6.5, BELT_Z, P, 32), { tone: 'faint' }),
  ].join('');
}

function belt() {
  const frame = { x: BELT.x, y: BELT.y - 2, w: BELT.w, d: BELT.d + 4, r: 2 };
  const out = [box(frame, 0, BELT_Z - 1.4, { tone: 'mid' }, 3, 0.4)];
  out.push(box({ x: BELT.x + 2, y: BELT.y, w: BELT.w - 4, d: BELT.d, r: 1.4 }, BELT_Z - 1.4, BELT_Z, { tone: 'lo', crease: 'none' }, 2, 0.2));
  const slats = [];
  for (let x = BELT.x + 6; x < BELT.x + BELT.w - 4; x += 6) slats.push(k.lineOnTop([x, BELT.y + 1.5], [x, BELT.y + BELT.d - 1.5], BELT_Z, P));
  out.push(L(slats.join(''), { tone: 'faint' }));
  out.push(D([BELT.x + 4, BELT.x + BELT.w - 4].flatMap(x => [at([x, BELT.y - 1, BELT_Z - 1.4]), at([x, BELT.y + BELT.d + 1, BELT_Z - 1.4])]), { size: 0.45 }));
  return out.join('');
}

function gateBar() {
  const plan = { x: GATE.x - 4, y: GATE.posts[0] - 4, w: 8, d: GATE.posts[1] - GATE.posts[0] + 8, r: 1.6 };
  const out = [box(plan, GATE.top, GATE.top + 5, { tone: 'mid' }, 3, 0.4)];
  out.push(box({ x: GATE.x - 6, y: -6, w: 12, d: 12, r: 2 }, GATE.top - 4, GATE.top, { tone: 'mid', crease: 'none' }, 2, 0.3));
  const [lx, ly] = at([GATE.x + 6.1, 0, GATE.top - 2]);
  out.push(`<circle class="fig-led" data-part="gate-led" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.7" opacity="0.25"/>`);
  out.push(D([at([GATE.x, GATE.posts[0], GATE.top + 5]), at([GATE.x, GATE.posts[1], GATE.top + 5])], { size: 0.45 }));
  return out.join('');
}

function pusher() {
  // A block on a rod behind the belt; it moves +y to push a token aside.
  const base = { x: PUSHER.x - 6, y: PUSHER.y - 10, w: 12, d: 8, r: 1.5 };
  return [
    box(base, 0, 14, { tone: 'mid' }, 3, 0.4),
    `<g data-part="pusher">${box({ x: PUSHER.x - 1.6, y: PUSHER.y - 2, w: 3.2, d: 12, r: 1 }, 9, 12, { tone: 'hi', crease: 'none' }, 2, 0.2)}${box({ x: PUSHER.x - PUSHER.w / 2, y: PUSHER.y + 10, w: PUSHER.w, d: 3, r: 1 }, 8, 14, { tone: 'mid' }, 2, 0.3)}</g>`,
  ].join('');
}

function held() {
  const plan = { x: HELD.x, y: HELD.y, w: HELD.w, d: HELD.d, r: HELD.r };
  return [
    box(plan, 0, 1.2, { tone: 'lo' }, 3, 0.3),
    box({ x: HELD.x, y: HELD.y, w: HELD.w, d: 2, r: 0.8 }, 1.2, HELD.h, { tone: 'mid', crease: 'none' }, 2, 0.2),
    box({ x: HELD.x, y: HELD.y, w: 2, d: HELD.d, r: 0.8 }, 1.2, HELD.h, { tone: 'mid', crease: 'none' }, 2, 0.2),
  ].join('');
}
function heldFront() {
  return [
    box({ x: HELD.x + HELD.w - 2, y: HELD.y, w: 2, d: HELD.d, r: 0.8 }, 1.2, HELD.h, { tone: 'mid', crease: 'none' }, 2, 0.2),
    box({ x: HELD.x, y: HELD.y + HELD.d - 2, w: HELD.w, d: 2, r: 0.8 }, 1.2, HELD.h, { tone: 'mid', crease: 'none' }, 2, 0.2),
  ].join('');
}

function wallet() {
  const plan = { x: WALLET.x, y: WALLET.y, w: WALLET.w, d: WALLET.d, r: WALLET.r };
  const face = WALLET.y + WALLET.d;
  const side = WALLET.x + WALLET.w;
  const out = [`<path class="iso-halo" d="${k.haloOf(plan, 0, WALLET.h, P)}"/>`];
  out.push(box(plan, 0, WALLET.h, { tone: 'mid' }, 3, 0.8));
  out.push(L(k.sideSeam(plan, 5, P, 3), { tone: 'lo' }));
  out.push(L(k.planOutline(k.insetPlan(plan, 4), WALLET.h, P, 3), { tone: 'faint' }));
  // Screen on the near face: three balance lines and an LED.
  out.push(L(path([[WALLET.x + 8, face, 10], [WALLET.x + 8, face, 24], [WALLET.x + 36, face, 24], [WALLET.x + 36, face, 10]], true), { tone: 'mid' }));
  [20, 16.5, 13].forEach((z, i) => out.push(L(path([[WALLET.x + 11, face, z], [WALLET.x + (i === 2 ? 22 : 31), face, z]]), { tone: 'faint', free: true })));
  const [lx, ly] = at([WALLET.x + 40, face + 0.1, 20]);
  out.push(`<circle class="fig-led" data-part="wallet-led" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="1.5" opacity="0.25"/>`);
  // Mouth on the left face where tokens go in, and a card slot on top.
  out.push(L(k.planOutline({ x: WALLET.x + 14, y: -6, w: 16, d: 12, r: 2 }, WALLET.h, P, 2), { tone: 'lo' }));
  out.push(D([[-20, 26], [20, 26], [-20, 4], [20, 4]].map(([y, z]) => at([side, y, z])), { size: 0.4 }));
  return out.join('');
}

function token() {
  // Built at x = 0 on the belt, moved along x by the live script.
  return [
    S(k.cylinder(0, 0, 6, BELT_Z, 2.2, P, 40, 0.4), { tone: 'hi', lit: true }),
    L(k.ring(0, 0, 4.2, BELT_Z + 2.2, P, 32), { tone: 'mid' }),
    L(k.lineOnTop([-1.8, 0], [1.8, 0], BELT_Z + 2.2, P) + k.lineOnTop([0, -1.8], [0, 1.8], BELT_Z + 2.2, P), { tone: 'mid', free: true }),
  ].join('');
}
function bar() {
  const plan = { x: -7, y: -4, w: 14, d: 8, r: 1 };
  return [
    S(k.slabOf(plan, 6, 4.4, P, 2, 0.6), { tone: 'hi', lit: true }),
    L(k.planOutline(k.insetPlan(plan, 1.6), 10.4, P, 2), { tone: 'mid' }),
  ].join('');
}

// ---- paint back to front --------------------------------------------------

const body = [
  basePlate(P, PLATE, { label: { x: 104, y: 36, w: 34, d: 14, r: 1.5 }, ruler: { x: -100, y: 46, w: 130, d: 6, r: 1 } }),
  vault(),
  pusher(),
  track(),
  post(PRESS.x, PRESS.posts[0], PRESS.beam[0]),
  post(GATE.x, GATE.posts[0], GATE.top),
  anvil(),
  belt(),
  held(),
  `<g data-part="bar">${bar()}</g>`,
  `<g data-part="ram">${ramLive(k, P, C, 0, vcoil)}</g>`,
  `<g data-part="token" opacity="0">${token()}</g>`,
  `<g data-part="held-token" opacity="0">${token()}</g>`,
  heldFront(),
  post(PRESS.x, PRESS.posts[1], PRESS.beam[0]),
  post(GATE.x, GATE.posts[1], GATE.top),
  pressBeam(),
  gateBar(),
  wallet(),
  meter(),
];

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    'A minting bench. A gold bar leaves the vault of the custodian, and the reserve meter counts it. The bar rides a track into the mint press, which stamps it into a token. The token rides a belt through the investor check gate. A token for a verified investor goes into the wallet. A token for an investor over the limit is pushed into the held tray for review.',
  body,
});

const pins = pinsHtml(P, WIDTH, HEIGHT, [
  { id: 'vault', n: 1, at: [VAULT.x + 10, VAULT.y + VAULT.d - 10, VAULT.h], icon: 'vault', title: 'Custodian vault', sub: 'The asset stays in custody', expand: true, seek: 'custody' },
  { id: 'reserve', n: 2, at: [METER.x + METER.w / 2, METER.y + METER.d, 0], icon: 'seal-check', title: 'Proof of reserve', sub: 'Tokens never exceed the reserve', side: 'down', lift: 10, expand: true, seek: 'reserve' },
  { id: 'press', n: 3, at: [PRESS.x, 0, PRESS.beam[1] + 5], icon: 'coins', title: 'Mint press', sub: 'One token for each unit', lift: 16, expand: true, seek: 'mint' },
  { id: 'gate', n: 4, at: [GATE.x, 0, GATE.top + 5], icon: 'identification-card', title: 'Investor check', sub: 'KYC and limits before delivery', lift: 20, expand: true, seek: 'check' },
  { id: 'wallet', at: [WALLET.x + WALLET.w / 2, WALLET.y + WALLET.d / 2, WALLET.h], icon: 'wallet', title: 'Investor wallet', sub: 'Settled on Hyper 0X', expand: true },
  { id: 'held', at: [HELD.x + HELD.w / 2, HELD.y + HELD.d, 0], icon: 'hand-palm', title: 'Held for review', sub: 'Over the investor limit', side: 'down', expand: true },
]);

const steps = stepsHtml([
  { id: 'custody', icon: 'vault', title: 'In custody', sub: 'The asset stays with a regulated custodian' },
  { id: 'reserve', icon: 'seal-check', title: 'Proof of reserve', sub: 'Every token is backed one to one' },
  { id: 'mint', icon: 'coins', title: 'Mint', sub: 'The press makes one token for each unit' },
  { id: 'check', icon: 'identification-card', title: 'Investor check', sub: 'KYC and limits run before delivery' },
]);

const T = {
  out: [0.2, 0.7],
  track: [0.7, 1.7],
  down: [1.8, 2.05],
  up: [2.05, 2.5],
  belt: [2.6, 3.6],
  check: [3.6, 4.2],
  go: [4.2, 5.0],
  push: [4.3, 4.9],
  loop: 6.2,
};

const live = `
${ramLive.toString()}
${meterNeedle.toString()}
${vcoil.toString()}
${playFigure.toString()}
const P = ${JSON.stringify(P)};
const C = ${JSON.stringify({ PRESS, METER, VAULT, TRACK, BELT_Z, STATIONS, HELD, PUSHER, T })};
const K = { cylinder, solidSvg, lineSvg, dotsSvg, pathOf, iso, depthOf };
for (const stage of document.querySelectorAll('[data-figure="token-mint"]')) {
  const svg = stage.querySelector('svg');
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const barEl = q('bar'), ramEl = q('ram'), tokenEl = q('token'), heldEl = q('held-token'), pusherEl = q('pusher');
  const needleEl = q('needle'), gateLed = q('gate-led'), walletLed = q('wallet-led');
  const figure = stage.closest('.iso-figure');
  const readout = figure.querySelector('[data-readout]');
  const pins = Object.fromEntries([...stage.querySelectorAll('[data-pin]')].map((el) => [el.dataset.pin, el]));
  const steps = [...figure.querySelectorAll('[data-step]')];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const span = (t, [a, b]) => clamp((t - a) / (b - a), 0, 1);
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const T = C.T, S = C.STATIONS;
  let prevT = 0, cycle = 0, reserve = 12, supply = 12, held = 0, shown = '', lastRam = '', lastNeedle = '';

  function draw(t) {
    if (t < prevT) cycle++;
    prevT = t;
    const blocked = cycle % 3 === 2;
    // The bar leaves the vault, rides the track and sits on the anvil.
    const out = ease(span(t, T.out)), ride = ease(span(t, T.track));
    const minted = t >= T.down[1];
    const bx = S.start + (S.press - S.start) * ride - 8 * (1 - out);
    barEl.setAttribute('transform', translateAlong(P, [bx, -2, (C.BELT_Z - 6) * ride]));
    barEl.setAttribute('opacity', t >= T.out[0] && !minted ? '1' : '0');
    // The ram comes down hard and lifts back on its spring.
    const down = t < T.down[1] ? span(t, T.down) ** 2 : 1 - ease(span(t, T.up));
    const dz = -(C.PRESS.rest - C.BELT_Z - 2.6) * (t >= T.down[0] && t < T.up[1] ? down : 0);
    const ramKey = dz.toFixed(2);
    if (ramKey !== lastRam) { lastRam = ramKey; ramEl.innerHTML = ramLive(K, P, C, dz, vcoil); }
    // The meter counts the bar as it leaves; supply goes up at the stamp.
    const counted = t >= T.out[1];
    const turn = (counted ? 1 : 0) * 0.32 + ((cycle % 6) * 0.32);
    const needleKey = turn.toFixed(2);
    if (needleKey !== lastNeedle) { lastNeedle = needleKey; needleEl.innerHTML = meterNeedle(K, P, C, turn); }
    // The token rides the belt to the gate, then on or aside.
    const belt = ease(span(t, T.belt));
    let tx = S.press + (S.gate - S.press) * belt, ty = 0;
    let gone = false;
    if (!blocked) {
      tx += (S.wallet - S.gate) * ease(span(t, T.go));
      gone = t >= T.go[1] - 0.05;
    } else {
      const push = ease(span(t, T.push));
      ty = (C.HELD.y + C.HELD.d / 2) * push;
      tx = S.gate + (C.HELD.x + C.HELD.w / 2 - S.gate) * push;
      pusherEl.setAttribute('transform', translateAlong(P, [0, 14 * Math.sin(span(t, T.push) * Math.PI), 0]));
      gone = t >= T.push[1];
    }
    tokenEl.setAttribute('transform', translateAlong(P, [tx, ty, ty > 4 ? -(C.BELT_Z - 1.2) * span(t, [T.push[0] + 0.3, T.push[1]]) : 0]));
    tokenEl.setAttribute('opacity', minted && !gone ? '1' : '0');
    heldEl.setAttribute('transform', translateAlong(P, [C.HELD.x + C.HELD.w / 2, C.HELD.y + C.HELD.d / 2, -(C.BELT_Z - 1.2)]));
    heldEl.setAttribute('opacity', blocked && gone ? '1' : held ? '0.55' : '0');
    // Lights: the gate checks, then shows the answer; the wallet blinks on delivery.
    const checking = t >= T.check[0] && t < T.check[1];
    const decided = t >= T.check[1] && t < T.loop - 0.4;
    gateLed.dataset.state = decided ? (blocked ? 'bad' : 'ok') : '';
    gateLed.setAttribute('opacity', checking ? String(0.4 + 0.6 * Math.abs(Math.sin(t * 14))) : decided ? '1' : '0.25');
    walletLed.dataset.state = !blocked && t >= T.go[1] - 0.1 ? 'ok' : '';
    walletLed.setAttribute('opacity', !blocked && t >= T.go[1] - 0.1 && t < T.loop - 0.3 ? '1' : '0.25');
    // Labels, steps and readout.
    let stage, on;
    if (t < T.out[1]) { stage = 'custody'; on = ['vault']; }
    else if (t < T.down[0]) { stage = 'reserve'; on = ['reserve']; }
    else if (t < T.belt[1]) { stage = 'mint'; on = ['press']; }
    else if (t < T.check[1]) { stage = 'check'; on = ['gate']; }
    else { stage = 'check'; on = blocked ? ['gate', 'held'] : ['gate', 'wallet']; }
    const r = reserve + (cycle % 6) + (counted ? 1 : 0), s = supply + (cycle % 6) + (minted ? 1 : 0);
    const msg = t >= T.check[1] && blocked ? 'investor over the limit · held for review' : 'reserve ' + r + ' bars · supply ' + s + ' tokens';
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
    stillAt: T.belt[1] + 0.2,
    seek: { custody: 0, reserve: T.out[1], mint: T.down[0] - 0.1, check: T.belt[0] + 0.6 },
  });
}
`;

const plate = k.plateHtml({
  fig: 'Fig 5',
  title: 'From vault to token, one to one',
  hint: 'Every token has a bar behind it',
  readout: 'reserve 12 bars · supply 12 tokens',
  body: `<div class="iso-stage" data-figure="token-mint">${svg}${pins}</div>`,
}).replace('</figure>', `${steps}</figure>`);

writeFigure('token-mint', { plate, live, title: 'Token mint' });
