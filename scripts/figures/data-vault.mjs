// Fig 1 (hero): the Hyper 0X data vault (Anatomy kit, MIT; see ./kit/LICENSE).
//
// A customer record rides in a locked box on a carriage through four
// stations, and the box is never opened on the way:
//   1. in transit   - a shielded tunnel (post-quantum TLS: X25519 + ML-KEM-768)
//   2. in use       - a compute head works on the box through its contact pads
//   3. on the ledger - a stamp marks the lid with the two parties' keys and a
//                      copy is filed on the ledger stack
//   4. at rest      - the vault opens, takes the box, closes and bolts; the
//                      keys live in the HSM on its side
// When the next record leaves the tunnel the loop starts again.
//
// Run: node scripts/figures/data-vault.mjs
import { k, tools, basePlate, pinsHtml, stepsHtml, vcoil, playFigure, writeFigure } from './lib.mjs';

const WIDTH = 760;
const HEIGHT = 430;

const PLATE = { x: -178, y: -64, w: 330, d: 128, r: 8 };
const RAIL_Y = [-16, 11];
const RAIL = { from: -172, to: 64 };
const CAR = { x: -15, y: -19, w: 30, d: 38, r: 3 };
const CAR_Z = [3, 9];
const BOX = { x: -11, y: -13, w: 22, d: 26, r: 2 };
const BOX_Z = [9, 25];
const LID_TOP = 29;
const TUNNEL = { x0: -168, x1: -110, h: 42 };
const CPU = { x: -60, posts: [-44, 44], beam: [96, 104], rest: 60, h: 16, pin: 4, housing: 84 };
const HEAD_DOWN = LID_TOP + CPU.pin;
const STAMP = { x: 4, col: -46, arm: [80, 88], housing: [68, 80], foot: 7, footH: 6, rest: 50 };
const LEDGER = { x: 16, y: 28, w: 30, d: 20, r: 2 };
const PLATES = 5;
const VAULT = { x: 66, y: -40, w: 70, d: 80, r: 3, h: 66 };
const DOOR = { x: 61, y: -27, w: 4, d: 54, r: 1, z: [2, 54], open: 50 };
const GUIDE = { x: 63, ys: [-31, 31], top: 108 };
const DIAL = { x: 98, z: 33, face: 40.4 };
const HSM = { x: 136, y: -14, w: 7, d: 28, z: [16, 42] };
const STATIONS = { start: -139, cpu: CPU.x, stamp: STAMP.x, vault: 101 };

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -17, 0),
    [CPU.x, -50, CPU.beam[1]],
    [CPU.x, 50, CPU.beam[1]],
    [STAMP.x, -52, STAMP.arm[1]],
    [GUIDE.x, -34, GUIDE.top + 4],
    [GUIDE.x, 34, GUIDE.top + 4],
  ],
  WIDTH,
  HEIGHT,
  { pad: 16, azimuth: 56 },
);

const { at, S, L, D, byDepth, col, box, path, faceCircle } = tools(P);

// ---- live parts: pure builders shared by the build and the page ----------

// Everything here takes the kit as K so the same source runs in Node and in
// the browser (embedded with toString()).
function headRod(K, P, C, dz) {
  const top = C.CPU.rest + C.CPU.h + dz;
  return K.solidSvg(K.cylinder(C.CPU.x, 0, 2.4, top, C.CPU.housing - top, P, 20), { tone: 'hi', crease: 'none' });
}
function needle(K, P, C, angle) {
  const pivot = [C.CPU.x, 14.7, C.CPU.rest + 6];
  const a = (angle * Math.PI) / 180;
  const tip = [pivot[0] + Math.sin(a) * 5.4, 14.7, pivot[2] + Math.cos(a) * 5.4];
  return K.lineSvg(K.pathOf([K.iso(pivot, P), K.iso(tip, P)]), { tone: 'hi' }) + K.dotsSvg([K.iso(pivot, P)], { size: 0.7, tone: 'hi' });
}
function stampLive(K, P, C, fz, coil) {
  const s = C.STAMP;
  const top = fz + s.footH;
  const spring = coil(s.x, 0, 4.2, top + 0.6, s.housing[0] - 0.4, 6, P, K.iso, K.depthOf, K.pathOf);
  return [
    K.solidSvg(K.cylinder(s.x, 0, s.foot, fz, s.footH, P, 32, 0.5), { tone: 'mid' }),
    K.lineSvg(K.pathOf([K.iso([s.x - 3, 0, fz], P), K.iso([s.x + 3, 0, fz], P)]), { tone: 'faint', free: true }),
    K.lineSvg(spring.back, { tone: 'lo' }),
    K.solidSvg(K.cylinder(s.x, 0, 2, top, s.housing[0] - top, P, 18), { tone: 'hi', crease: 'none' }),
    K.lineSvg(spring.front, { tone: 'mid' }),
  ].join('');
}
function bolts(K, P, C, out) {
  // Three bolts on the vault's front face; out = 0 (flush) .. 1 (thrown).
  const d = 0.6 + out * 2.6;
  return [46, 33, 20]
    .map(z => K.solidSvg(K.slabOf({ x: 70, y: C.VAULT.y + C.VAULT.d, w: 7, d, r: 0.8 }, z - 2.5, 5, P, 2, 0.3), { tone: 'mid', crease: 'none' }))
    .join('');
}
function dial(K, P, C, turn) {
  const { x, z, face } = C.DIAL;
  const at = (a, r) => K.iso([x + Math.sin(a) * r, face, z + Math.cos(a) * r], P);
  const lines = [];
  const knobs = [];
  for (let i = 0; i < 3; i++) {
    const a = turn + (i * Math.PI * 2) / 3;
    lines.push(K.pathOf([at(a, 4.2), at(a, 9.5)]));
    knobs.push(at(a, 10.4));
  }
  const pointer = K.pathOf([at(turn + Math.PI / 3, 4.2), at(turn + Math.PI / 3, 7)]);
  return K.lineSvg(lines.join(''), { tone: 'mid' }) + K.lineSvg(pointer, { tone: 'hi' }) + K.dotsSvg(knobs, { size: 1.15, tone: 'hi' });
}

const C = { CPU, STAMP, VAULT, DIAL };

// ---- static parts ---------------------------------------------------------

function rails() {
  const out = [];
  for (const y of RAIL_Y) {
    out.push(box({ x: RAIL.from, y, w: RAIL.to - RAIL.from, d: 5, r: 1 }, 0, 3, { tone: 'mid' }, 3, 0.4));
    out.push(D([RAIL.from + 6, -90, -30, 30].map(x => at([x, y + 2.5, 3])), { size: 0.4 }));
  }
  const stop = { x: RAIL.from - 5, y: -18, w: 5, d: 36, r: 1.2 };
  out.push(box(stop, 0, 7, { tone: 'mid' }));
  out.push(D([at([stop.x + 2.5, -13.5, 7]), at([stop.x + 2.5, 13.5, 7])], { size: 0.45 }));
  return out.join('');
}

function post(x, y, top) {
  return [
    col(x, y, 7, 0, 2.4, { tone: 'mid' }),
    col(x, y, 3.6, 2.4, top),
    L([30, 62].map(z => k.sideArc(x, y, 3.6, z, P, 14)).join(''), { tone: 'faint' }),
  ].join('');
}

function ledger() {
  const out = [`<path class="iso-halo" d="${k.haloOf(LEDGER, 0, 3, P)}" style="filter:blur(3px)"/>`];
  out.push(box(LEDGER, 0, 3, { tone: 'mid' }, 3, 0.4));
  // Two guide pins on the back edge hold the filed records square.
  for (const x of [LEDGER.x + 6, LEDGER.x + LEDGER.w - 6]) out.push(col(x, LEDGER.y + 0.6, 1.3, 3, 24, { tone: 'mid', crease: 'none' }, 14));
  const sheet = { x: LEDGER.x + 2, y: LEDGER.y + 2, w: LEDGER.w - 4, d: LEDGER.d - 4, r: 1.5 };
  const plates = [];
  for (let i = 0; i < PLATES; i++) {
    const z = 3 + i * 3;
    plates.push(`<g data-plate="${i}"${i === PLATES - 1 ? ' opacity="0"' : ''}>${box(sheet, z, z + 2.4, { tone: 'mid' }, 3, 0.3)}${L(k.lineOnTop([sheet.x + 4, sheet.y + 5], [sheet.x + 16, sheet.y + 5], z + 2.4, P), { tone: 'faint', free: true })}${L(k.ring(sheet.x + sheet.w - 6, sheet.y + sheet.d / 2, 1.8, z + 2.4, P, 14), { tone: 'lo' })}</g>`);
  }
  // Records sink into the tray when the oldest is archived: clip the stack
  // to everything above the tray's near top edges.
  const z = 3;
  const a = at([LEDGER.x, LEDGER.y + LEDGER.d, z]);
  const b = at([LEDGER.x + LEDGER.w, LEDGER.y + LEDGER.d, z]);
  const c = at([LEDGER.x + LEDGER.w, LEDGER.y, z]);
  const clip = `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}L${c[0].toFixed(1)} ${c[1].toFixed(1)}L${c[0].toFixed(1)} 0L${a[0].toFixed(1)} 0Z`;
  out.push(`<clipPath id="dv-tray"><path d="${clip}"/></clipPath><g clip-path="url(#dv-tray)"><g data-part="plates">${plates.join('')}</g></g>`);
  return out.join('');
}

function stampColumn() {
  return [
    col(STAMP.x, STAMP.col, 9, 0, 3, { tone: 'mid' }),
    D(byDepth([[STAMP.x - 6.5, STAMP.col], [STAMP.x + 6.5, STAMP.col]]).map(([x, y]) => at([x, y, 3])), { size: 0.45 }),
    col(STAMP.x, STAMP.col, 5, 3, STAMP.arm[0]),
    L([24, 52].map(z => k.sideArc(STAMP.x, STAMP.col, 5, z, P, 16)).join(''), { tone: 'faint' }),
  ].join('');
}

function stampTop() {
  const arm = { x: STAMP.x - 7, y: -52, w: 14, d: 60, r: 2 };
  return [
    col(STAMP.x, 0, 6, STAMP.housing[0], STAMP.housing[1], { tone: 'mid' }, 30),
    L(k.sideArc(STAMP.x, 0, 6, STAMP.housing[0] + 5, P, 18), { tone: 'lo' }),
    box(arm, STAMP.arm[0], STAMP.arm[1], { tone: 'mid' }, 4, 0.6),
    L(k.sideSeam(arm, STAMP.arm[0] + 3, P, 4), { tone: 'lo' }),
    L(k.lineOnTop([STAMP.x, -40], [STAMP.x, -6], STAMP.arm[1], P), { tone: 'faint' }),
    L(k.ring(STAMP.x, STAMP.col, 3, STAMP.arm[1], P, 16), { tone: 'lo' }),
    D([at([STAMP.x, STAMP.col, STAMP.arm[1]]), at([STAMP.x, 0, STAMP.arm[1]])], { size: 0.55 }),
  ].join('');
}

function tunnelBack() {
  return box({ x: TUNNEL.x0, y: -32, w: TUNNEL.x1 - TUNNEL.x0, d: 4, r: 1 }, 0, TUNNEL.h, { tone: 'mid' });
}

function tunnelFront() {
  const { x0, x1, h } = TUNNEL;
  const face = 32;
  const out = [box({ x: x0, y: 28, w: x1 - x0, d: 4, r: 1 }, 0, h, { tone: 'mid' })];
  out.push(L(path([[x0 + 1, face, 5], [x1 - 1, face, 5]]), { tone: 'lo' }));
  // Vent slots near the open end.
  for (let i = 0; i < 5; i++) {
    const x = x1 - 24 + i * 3.8;
    out.push(L(path([[x, face, 11], [x + 1.6, face, 11], [x + 1.6, face, 32], [x, face, 32]], true), { tone: 'lo' }));
  }
  // Badge plate with a lock ring.
  const bx = x0 + 12;
  out.push(box({ x: bx, y: face, w: 18, d: 0.8, r: 0.4 }, 12, 30, { tone: 'mid', crease: 'none' }));
  out.push(L(faceCircle([bx + 9, face + 0.8, 22.5], 3.6, 'y'), { tone: 'mid' }));
  out.push(L(path([[bx + 9, face + 0.8, 18.9], [bx + 9, face + 0.8, 15.6]]), { tone: 'mid', free: true }));
  out.push(D([[bx + 2, 14], [bx + 16, 14], [bx + 2, 28], [bx + 16, 28]].map(([x, z]) => at([x, face + 0.8, z])), { size: 0.4 }));
  // Front halves of the bands that clamp the tunnel, and the end flange.
  for (const c of [x0 + 7, x0 + 30, x0 + 48]) out.push(box({ x: c - 1.5, y: face, w: 3, d: 2, r: 0.5 }, 0, h, { tone: 'mid', crease: 'none' }, 2, 0.2));
  out.push(box({ x: x1 - 3, y: 27, w: 4, d: 7, r: 0.8 }, 0, h, { tone: 'mid' }, 2, 0.3));
  return out.join('');
}

function tunnelRoof() {
  const { x0, x1, h } = TUNNEL;
  const roof = { x: x0 - 2, y: -34, w: x1 - x0 + 3, d: 68, r: 2 };
  const out = [box(roof, h, h + 5, { tone: 'mid' }, 3, 0.6)];
  for (const c of [x0 + 7, x0 + 30, x0 + 48]) out.push(box({ x: c - 1.5, y: -35, w: 3, d: 69, r: 0.5 }, h + 5, h + 6.4, { tone: 'mid', crease: 'none' }, 2, 0.2));
  out.push(box({ x: x1 - 3, y: -35, w: 4, d: 69, r: 0.8 }, h + 5, h + 7, { tone: 'mid' }, 2, 0.3));
  out.push(D([[x0 + 16, -26], [x0 + 16, 26], [x0 + 40, -26], [x0 + 40, 26]].map(([x, y]) => at([x, y, h + 5])), { size: 0.45 }));
  out.push(L(k.lineOnTop([x0 + 12, 0], [x0 + 44, 0], h + 5, P), { tone: 'faint' }));
  return out.join('');
}

function carriage() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(CAR, 3), CAR_Z[0], 0.1, P)}" style="filter:blur(4px)"/>`];
  out.push(box(CAR, CAR_Z[0], CAR_Z[1], { tone: 'mid' }, 4, 0.6));
  out.push(L(k.sideSeam(CAR, CAR_Z[0] + 2.5, P, 4), { tone: 'lo' }));
  out.push(D([[-12, -16], [12, -16], [-12, 16], [12, 16]].map(([x, y]) => at([x, y, CAR_Z[1]])), { size: 0.4, tone: 'lo' }));
  // Push lug and knob on the near end.
  out.push(box({ x: CAR.x + CAR.w - 1, y: -4, w: 5, d: 8, r: 1.2 }, CAR_Z[0] + 1, CAR_Z[0] + 5, { tone: 'mid', crease: 'none' }, 2));
  out.push(S(k.cylinder(CAR.x + CAR.w + 6, 0, 3, CAR_Z[0] + 0.5, 5, P, 20), { tone: 'mid' }));
  out.push(L(k.knurl(CAR.x + CAR.w + 6, 0, 3, CAR_Z[0] + 0.5, CAR_Z[0] + 5.5, 18, P), { tone: 'lo' }));
  // The locked box: body, lit lid, contact pads, keyhole plate, padlock.
  out.push(`<path class="iso-halo" d="${k.haloOf(BOX, BOX_Z[0], 0.1, P)}" style="filter:blur(3px)"/>`);
  out.push(box(BOX, BOX_Z[0], BOX_Z[1], { tone: 'mid' }, 3, 0.5));
  out.push(L(k.sideSeam(BOX, BOX_Z[0] + 4, P, 3), { tone: 'lo' }));
  out.push(S(k.slabOf(BOX, BOX_Z[1], LID_TOP - BOX_Z[1], P, 3, 0.5), { tone: 'hi', lit: true }));
  out.push(L(k.planOutline(k.insetPlan(BOX, 2.5), LID_TOP, P, 3), { tone: 'faint' }));
  const pads = [[-6, -7], [6, -7], [-6, 7], [6, 7]];
  out.push(L(pads.map(([x, y]) => k.ring(x, y, 1.6, LID_TOP, P, 14)).join(''), { tone: 'mid' }));
  out.push(D(pads.map(([x, y]) => at([x, y, LID_TOP])), { size: 0.45, tone: 'mid' }));
  const face = BOX.y + BOX.d;
  out.push(box({ x: -4, y: face, w: 8, d: 1, r: 0.4 }, 13, 22, { tone: 'mid', crease: 'none' }, 2, 0.2));
  out.push(D([at([0, face + 1, 19.4])], { size: 0.8, tone: 'hi' }));
  out.push(L(path([[0, face + 1, 18.6], [0, face + 1, 15.6]]), { tone: 'hi', free: true }));
  const side = BOX.x + BOX.w;
  out.push(box({ x: side, y: -3.5, w: 1, d: 7, r: 0.3 }, 18, 26.5, { tone: 'mid', crease: 'none' }, 2, 0.2));
  out.push(L(path(Array.from({ length: 9 }, (_, i) => { const a = (i / 8) * Math.PI; return [side + 2.6, -2.1 * Math.cos(a), 19 + 3 * Math.sin(a)]; })), { tone: 'hi' }));
  out.push(box({ x: side + 1, y: -3, w: 3.2, d: 6, r: 1 }, 12.5, 19, { tone: 'mid' }, 3, 0.3));
  out.push(D([at([side + 4.2, 0, 14.6])], { size: 0.5, tone: 'hi' }));
  // The parties' key marks, stamped on the lid at the ledger.
  out.push(`<g data-part="marks" opacity="0">${L([-5.5, 5.5].map(y => k.ring(0, y, 2.4, LID_TOP, P, 18)).join(''), { tone: 'hi' })}${D([at([0, -5.5, LID_TOP]), at([0, 5.5, LID_TOP])], { size: 0.7, tone: 'hi' })}</g>`);
  return out.join('');
}

function head() {
  const plan = { x: CPU.x - 12, y: -14, w: 24, d: 28, r: 3 };
  const z0 = CPU.rest;
  const out = [];
  for (const [x, y] of byDepth([[-6, -7], [6, -7], [-6, 7], [6, 7]])) out.push(col(CPU.x + x, y, 1.1, z0 - CPU.pin, z0 + 0.5, { tone: 'mid', crease: 'none' }, 12));
  out.push(box(plan, z0, z0 + CPU.h, { tone: 'mid' }, 4, 0.6));
  out.push(L(k.sideSeam(plan, z0 + 4, P, 4), { tone: 'lo' }));
  // Meter window on the front face with its scale; the needle is live.
  out.push(box({ x: CPU.x - 8, y: 14, w: 16, d: 0.6, r: 0.6 }, z0 + 4.5, z0 + 13.5, { tone: 'lo', crease: 'none' }, 3, 0.2));
  const pivot = [CPU.x, 14.7, z0 + 6];
  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const a = ((-50 + i * 10) * Math.PI) / 180;
    const r0 = i % 5 === 0 ? 5.6 : 6.2;
    ticks.push(path([[pivot[0] + Math.sin(a) * r0, 14.7, pivot[2] + Math.cos(a) * r0], [pivot[0] + Math.sin(a) * 6.8, 14.7, pivot[2] + Math.cos(a) * 6.8]]));
  }
  out.push(L(ticks.join(''), { tone: 'mid', free: true }));
  out.push(`<g data-part="needle">${needle(k, P, C, -50)}</g>`);
  // Status lights on the near end, cable gland on top.
  out.push(D([-7, -3.5, 0].map(y => at([CPU.x + 12, y, z0 + 12])), { size: 0.6, tone: 'hi' }));
  out.push(col(CPU.x, 0, 3.4, z0 + CPU.h, z0 + CPU.h + 2, { tone: 'mid' }, 20));
  return out.join('');
}

function beam() {
  const plan = { x: CPU.x - 6, y: -50, w: 12, d: 100, r: 2.5 };
  return [
    col(CPU.x, 0, 5, CPU.housing, CPU.beam[0], { tone: 'mid' }, 28),
    L(k.sideArc(CPU.x, 0, 5, CPU.housing + 6, P, 18), { tone: 'lo' }),
    box(plan, CPU.beam[0], CPU.beam[1], { tone: 'mid' }, 4, 0.6),
    L(k.sideSeam(plan, CPU.beam[0] + 3, P, 4), { tone: 'lo' }),
    D(CPU.posts.map(y => at([CPU.x, y, CPU.beam[1]])), { size: 0.5 }),
    L(k.lineOnTop([CPU.x - 3, -38], [CPU.x - 3, 38], CPU.beam[1], P), { tone: 'faint' }),
  ].join('');
}

function door() {
  const out = [box(DOOR, DOOR.z[0], DOOR.z[1], { tone: 'mid' }, 2, 0.4)];
  const face = DOOR.x + DOOR.w;
  for (const z of [16, 30, 44]) out.push(L(path([[face, DOOR.y + 1, z], [face, DOOR.y + DOOR.d - 1, z]]), { tone: 'lo' }));
  out.push(D([[-20, 50], [20, 50]].map(([y, z]) => at([face, y, z])), { size: 0.45 }));
  return out.join('');
}

function guideTop() {
  const bar = { x: GUIDE.x - 3, y: -34, w: 6, d: 68, r: 1.5 };
  return [
    box(bar, GUIDE.top, GUIDE.top + 4, { tone: 'mid' }, 3, 0.4),
    D(GUIDE.ys.map(y => at([GUIDE.x, y, GUIDE.top + 4])), { size: 0.45 }),
    col(GUIDE.x, -12, 2.6, GUIDE.top + 4, GUIDE.top + 6.5, { tone: 'mid' }, 18),
    col(GUIDE.x, 12, 2.6, GUIDE.top + 4, GUIDE.top + 6.5, { tone: 'mid' }, 18),
  ].join('');
}

function vault() {
  const { x, y, w, d, h } = VAULT;
  const face = y + d;
  const out = [`<path class="iso-halo" d="${k.haloOf(VAULT, 0, h, P)}"/>`];
  out.push(box(VAULT, 0, h, { tone: 'mid' }, 4, 1.2));
  out.push(L(k.sideSeam(VAULT, 5, P, 4), { tone: 'lo' }));
  out.push(L(k.sideSeam(VAULT, h - 6, P, 4), { tone: 'lo' }));
  // Roof: groove, corner screws, vent slots.
  out.push(L(k.planOutline(k.insetPlan(VAULT, 5), h, P, 4), { tone: 'lo' }));
  const screws = k.corners(VAULT, 9);
  out.push(L(screws.map(([sx, sy]) => k.ring(sx, sy, 2, h, P, 14)).join(''), { tone: 'lo' }));
  out.push(D(screws.map(([sx, sy]) => at([sx, sy, h])), { size: 0.5 }));
  for (let i = 0; i < 6; i++) out.push(L(k.planOutline({ x: x + 34 + i * 4.4, y: y + 12, w: 1.8, d: 18, r: 0.9 }, h, P, 3), { tone: 'lo' }));
  // Front face: the combination dial (rings, scale; spokes are live).
  out.push(L(faceCircle([DIAL.x, face, DIAL.z], 15, 'y', 48), { tone: 'mid' }));
  out.push(L(faceCircle([DIAL.x, face, DIAL.z], 12.4, 'y', 44), { tone: 'lo' }));
  out.push(L(faceCircle([DIAL.x, face, DIAL.z], 3.6, 'y', 20), { tone: 'mid' }));
  const scale = [];
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const r0 = i % 5 === 0 ? 12.4 : 13.3;
    scale.push(path([[DIAL.x + Math.sin(a) * r0, face, DIAL.z + Math.cos(a) * r0], [DIAL.x + Math.sin(a) * 15, face, DIAL.z + Math.cos(a) * 15]]));
  }
  out.push(L(scale.join(''), { tone: 'lo' }));
  out.push(D([at([DIAL.x, face, DIAL.z])], { size: 0.8, tone: 'hi' }));
  // Label plate with three rule lines, a status light.
  const lp = { x: x + w - 26, y: face, w: 18, d: 0.6, r: 0.4 };
  out.push(box(lp, h - 20, h - 10, { tone: 'mid', crease: 'none' }, 2, 0.2));
  [h - 13, h - 15.5, h - 18].forEach((z, i) => out.push(L(path([[lp.x + 3, face + 0.6, z], [lp.x + (i === 2 ? 10 : 15), face + 0.6, z]]), { tone: 'faint', free: true })));
  out.push(L(faceCircle([x + w - 12, face, 24], 2.2, 'y', 16), { tone: 'lo' }));
  // The HSM on the near end: body, key slot, screws, cable to the bench.
  const hsm = { x: HSM.x, y: HSM.y, w: HSM.w, d: HSM.d, r: 1.5 };
  out.push(box(hsm, HSM.z[0], HSM.z[1], { tone: 'mid' }, 3, 0.4));
  const hx = HSM.x + HSM.w;
  out.push(L(path([[hx, HSM.y + 1, HSM.z[0] + 4], [hx, HSM.y + HSM.d - 1, HSM.z[0] + 4]]), { tone: 'lo' }));
  out.push(L(path([[hx, -5, 34], [hx, 5, 34]]), { tone: 'hi' }));
  out.push(D([[HSM.y + 3, HSM.z[1] - 3], [HSM.y + HSM.d - 3, HSM.z[1] - 3], [HSM.y + 3, HSM.z[0] + 7], [HSM.y + HSM.d - 3, HSM.z[0] + 7]].map(([hy, z]) => at([hx, hy, z])), { size: 0.4 }));
  out.push(L(faceCircle([hx, 8, 26], 1.8, 'x', 14), { tone: 'lo' }));
  out.push(k.wireSvg(at([hx - 3, HSM.y + HSM.d - 4, HSM.z[0]]), at([hx + 6, HSM.y + HSM.d + 6, 0]), { via: [at([hx - 3, HSM.y + HSM.d - 4, 6])], tone: 'lo' }));
  return out.join('');
}

// ---- paint back to front --------------------------------------------------

const ledLight = (point, name) => {
  const [cx, cy] = at(point);
  return `<circle class="fig-led" data-part="${name}" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="1.5" opacity="0"/>`;
};

const body = [
  basePlate(P, PLATE, { label: { x: -172, y: -58, w: 30, d: 18, r: 1.5 }, ruler: { x: -150, y: 51, w: 190, d: 6, r: 1 } }),
  rails(),
  stampColumn(),
  post(CPU.x, CPU.posts[0], CPU.beam[0]),
  tunnelBack(),
  `<g data-part="car" transform="${k.translateAlong(P, [STATIONS.start, 0, 0])}">${carriage()}</g>`,
  tunnelFront(),
  tunnelRoof(),
  `<g data-part="head">${head()}</g>`,
  `<g data-part="rod">${headRod(k, P, C, 0)}</g>`,
  post(CPU.x, CPU.posts[1], CPU.beam[0]),
  beam(),
  `<g data-part="stamp">${stampLive(k, P, C, STAMP.rest, vcoil)}</g>`,
  stampTop(),
  ledger(),
  col(GUIDE.x, GUIDE.ys[0], 2, 0, GUIDE.top, { tone: 'mid', crease: 'none' }, 14),
  `<g data-part="door">${door()}</g>`,
  col(GUIDE.x, GUIDE.ys[1], 2, 0, GUIDE.top, { tone: 'mid', crease: 'none' }, 14),
  guideTop(),
  vault(),
  `<g data-part="bolts">${bolts(k, P, C, 1)}</g>`,
  `<g data-part="dial">${dial(k, P, C, 0)}</g>`,
  ledLight([VAULT.x + VAULT.w - 12, VAULT.y + VAULT.d, 24], 'led'),
  ledLight([HSM.x + HSM.w, 8, 26], 'hsm-led'),
];

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    'A bench model of how Hyper 0X protects a record. A locked box with the record leaves a shielded tunnel (in transit). A compute head works on the box through contact pads and does not open it (in use). A stamp marks the keys of the two parties on the lid, and a copy goes onto the ledger stack (on the ledger). Then the box goes into a vault that closes and bolts. The keys stay in an HSM on the side (at rest).',
  body,
});

const pins = pinsHtml(P, WIDTH, HEIGHT, [
  { id: 'transit', n: 1, at: [-139, 0, TUNNEL.h + 7], icon: 'lock-key', title: 'In transit', sub: 'Post-quantum TLS seals the line', expand: true, seek: 'transit' },
  { id: 'use', n: 2, at: [CPU.x, 0, CPU.beam[1]], icon: 'cpu', title: 'In use', sub: 'Worked on without being opened', expand: true, seek: 'use' },
  { id: 'ledger', n: 3, at: [STAMP.x, -24, STAMP.arm[1]], icon: 'users-three', title: 'On the ledger', sub: 'A hash on chain, a key per party', expand: true, seek: 'ledger' },
  { id: 'rest', n: 4, at: [VAULT.x + 46, -6, VAULT.h], icon: 'vault', title: 'At rest', sub: 'AES-256 lock, keys in an HSM', expand: true, seek: 'rest' },
  { id: 'record', at: [0, CAR.y + CAR.d, CAR_Z[0]], icon: 'file-lock', title: 'Your data', side: 'down' },
]);

const steps = stepsHtml([
  { id: 'transit', icon: 'lock-key', title: 'In transit', sub: 'Post-quantum-resistant TLS protects every connection' },
  { id: 'use', icon: 'cpu', title: 'In use', sub: 'The system works on the record and does not open it' },
  { id: 'ledger', icon: 'users-three', title: 'On the ledger', sub: 'Each party has its own key, and only the parties can read it' },
  { id: 'rest', icon: 'vault', title: 'At rest', sub: 'AES-256 encryption, with the master keys in an HSM' },
]);

const T = {
  leave: [0.6, 2.0],
  headDown: [2.0, 2.4],
  compute: [2.4, 3.4],
  headUp: [3.4, 3.8],
  toStamp: [3.9, 4.9],
  stampDown: [4.9, 5.15],
  stampUp: [5.15, 5.6],
  unlock: [5.4, 5.75],
  doorUp: [5.75, 6.25],
  toVault: [6.25, 7.35],
  doorDown: [7.35, 7.85],
  lock: [7.85, 8.3],
  archive: [8.9, 9.6],
  loop: 10.4,
};
const STAGES = [
  { id: 'transit', until: T.headDown[0], text: 'in transit · X25519 + ML-KEM-768' },
  { id: 'use', until: T.toStamp[0], text: 'in use · processed while encrypted' },
  { id: 'ledger', until: T.doorUp[0], text: 'on the ledger · encrypted per party' },
  { id: 'rest', until: T.loop + 1, text: 'at rest · AES-256 · keys in HSM' },
];

const live = `
${playFigure.toString()}
${headRod.toString()}
${needle.toString()}
${stampLive.toString()}
${bolts.toString()}
${dial.toString()}
${vcoil.toString()}
const P = ${JSON.stringify(P)};
const C = ${JSON.stringify({ ...C, STATIONS, LID_TOP, CAR, CAR_Z, HEAD_DOWN, DOOR, T, STAGES, WIDTH, HEIGHT, PLATES })};
const K = { cylinder, solidSvg, lineSvg, pathOf, iso, depthOf, dotsSvg, slabOf };
for (const stage of document.querySelectorAll('[data-figure="data-vault"]')) {
  const svg = stage.querySelector('svg');
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const car = q('car'), marks = q('marks'), headEl = q('head'), needleEl = q('needle'), rod = q('rod');
  const stamp = q('stamp'), doorEl = q('door'), boltsEl = q('bolts'), dialEl = q('dial');
  const led = q('led'), hsmLed = q('hsm-led');
  const platesEl = q('plates');
  const plates = [...platesEl.querySelectorAll('[data-plate]')];
  const figure = stage.closest('.iso-figure');
  const readout = figure.querySelector('[data-readout]');
  const pins = Object.fromEntries([...stage.querySelectorAll('[data-pin]')].map((el) => [el.dataset.pin, el]));
  const steps = [...figure.querySelectorAll('[data-step]')];
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const span = (t, [a, b]) => clamp((t - a) / (b - a), 0, 1);
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const T = C.T, S = C.STATIONS;
  let last = {};
  const set = (key, value, apply) => { if (last[key] !== value) { last[key] = value; apply(value); } };

  function carX(t) {
    if (t < T.leave[0]) return S.start;
    if (t < T.leave[1]) return S.start + (S.cpu - S.start) * ease(span(t, T.leave));
    if (t < T.toStamp[0]) return S.cpu;
    if (t < T.toStamp[1]) return S.cpu + (S.stamp - S.cpu) * ease(span(t, T.toStamp));
    if (t < T.toVault[0]) return S.stamp;
    return S.stamp + (S.vault - S.stamp) * ease(span(t, T.toVault));
  }
  function headDz(t) {
    const travel = C.CPU.rest - C.HEAD_DOWN;
    if (t < T.headDown[0] || t > T.headUp[1]) return 0;
    if (t < T.headDown[1]) return -travel * ease(span(t, T.headDown));
    if (t < T.headUp[0]) return -travel;
    return -travel * (1 - ease(span(t, T.headUp)));
  }
  function footZ(t) {
    const travel = C.STAMP.rest - C.LID_TOP;
    if (t < T.stampDown[0] || t > T.stampUp[1]) return C.STAMP.rest;
    if (t < T.stampDown[1]) { const s = span(t, T.stampDown); return C.STAMP.rest - travel * s * s; }
    return C.STAMP.rest - travel * (1 - ease(span(t, T.stampUp)));
  }
  function doorDz(t) {
    if (t < T.doorUp[0] || t > T.doorDown[1]) return 0;
    if (t < T.doorUp[1]) return C.DOOR.open * ease(span(t, T.doorUp));
    if (t < T.doorDown[0]) return C.DOOR.open;
    return C.DOOR.open * (1 - ease(span(t, T.doorDown)));
  }
  function locked(t) {
    if (t < T.unlock[0]) return 1;
    if (t < T.unlock[1]) return 1 - ease(span(t, T.unlock));
    if (t < T.lock[0]) return 0;
    return ease(span(t, T.lock));
  }
  function place(el, point) {
    const [x, y] = iso(point, P);
    el.style.left = (x / C.WIDTH) * 100 + '%';
    el.style.top = (y / C.HEIGHT) * 100 + '%';
  }

  function draw(t) {
    const x = carX(t);
    car.setAttribute('transform', translateAlong(P, [x, 0, 0]));
    marks.setAttribute('opacity', t >= T.stampDown[1] ? '1' : '0');
    // Compute head comes down; the needle swings while it works.
    const dz = headDz(t);
    headEl.setAttribute('transform', translateAlong(P, [0, 0, dz]));
    rod.innerHTML = headRod(K, P, C, dz);
    const working = t >= T.compute[0] && t < T.compute[1];
    const swing = working ? Math.abs(Math.sin(((t - T.compute[0]) / (T.compute[1] - T.compute[0])) * Math.PI * 3)) : 0;
    needleEl.innerHTML = needle(K, P, C, -50 + 100 * swing);
    // The stamp presses the keys onto the lid; a copy is filed.
    const fz = footZ(t);
    set('foot', fz.toFixed(2), () => { stamp.innerHTML = stampLive(K, P, C, fz, vcoil); });
    const filed = span(t, [T.stampDown[1] - 0.05, T.stampUp[1]]);
    const newest = plates[plates.length - 1];
    newest.setAttribute('opacity', t >= T.stampDown[1] - 0.05 ? '1' : '0');
    newest.setAttribute('transform', translateAlong(P, [0, 0, 18 * (1 - ease(filed))]));
    // Before the loop ends the stack sinks one record into the tray: the
    // oldest is archived and the stack looks as it did at the start.
    const sink = ease(span(t, T.archive));
    platesEl.setAttribute('transform', translateAlong(P, [0, 0, -3 * sink]));
    // The vault opens, takes the box, closes and bolts.
    doorEl.setAttribute('transform', translateAlong(P, [0, 0, doorDz(t)]));
    const lock = locked(t);
    set('lock', lock.toFixed(3), () => {
      boltsEl.innerHTML = bolts(K, P, C, lock);
      dialEl.innerHTML = dial(K, P, C, lock * Math.PI * 0.75);
      led.setAttribute('opacity', lock > 0.98 ? '1' : '0.15');
      hsmLed.setAttribute('opacity', lock > 0.98 ? '1' : '0.15');
    });
    // Labels: the current station is lit; the record's tag rides with it.
    const index = C.STAGES.findIndex((s) => t < s.until);
    const current = C.STAGES[index];
    set('stage', index, () => {
      for (const s of C.STAGES) {
        const on = s.id === current.id;
        pins[s.id]?.toggleAttribute('data-on', on);
        pins[s.id]?.toggleAttribute('data-dim', !on);
      }
      for (const step of steps) step.toggleAttribute('data-on', step.dataset.step === current.id);
      if (readout) readout.textContent = 'stage ' + (index + 1) + ' of 4 · ' + current.text;
    });
    if (pins.record) {
      place(pins.record, [x, C.CAR.y + C.CAR.d, C.CAR_Z[0]]);
      pins.record.toggleAttribute('data-hidden', x < -104 || x > 58);
    }
  }
  playFigure(stage, (t) => draw(t), {
    loop: T.loop,
    stillAt: T.stampDown[1] + 0.05,
    seek: { transit: 0.6, use: T.headDown[0], ledger: T.toStamp[0], rest: T.doorUp[0] },
  });
}
`;

const plate = k.plateHtml({
  fig: 'Fig 1',
  title: 'How Hyper 0X protects your data',
  hint: 'One record, sealed at every stage',
  readout: `stage 1 of 4 · ${STAGES[0].text}`,
  body: `<div class="iso-stage" data-figure="data-vault">${svg}${pins}</div>`,
}).replace('</figure>', `${steps}</figure>`);

writeFigure('data-vault', { plate, live, title: 'Data vault' });
