// Fig 1: the Hyper 0X block press (Anatomy kit, MIT; see ./kit/LICENSE).
//
// Three hoppers, one per private L2 (bank, fintech, AI), each drop a state
// root token into a three-pocket tray. The tray slides into a press whose
// platen comes down once and seals the tray into a block: final in one pass.
// The sealed block joins the chain of blocks on the ledger bed, which moves
// one place along, and the block counter advances.
//
// Run: node scripts/figures/block-press.mjs
// Writes src/components/home/figures/block-press.{html,live.js} for the site,
// plus preview pages in scripts/figures/out/.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as k from './kit/iso-kit.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = join(HERE, '..', '..', 'src', 'components', 'home', 'figures');
const OUT = join(HERE, 'out');

const WIDTH = 760;
const HEIGHT = 440;

// World layout (units ≈ px, z up).
const PLATE = { x: -150, y: -70, w: 325, d: 140, r: 8 };
const PLATE_H = 12;
const FOOT_H = 5;
const RAIL_Y = [-22, 17];
const RAIL = { from: -128, to: 84 };
const TRAY = { x: -22, y: -30, w: 44, d: 60, r: 3 };
const TRAY_Z = 3;
const TRAY_TOP = 12;
const POCKETS = [-19, 0, 19];
const STATIONS = { load: -95, press: 0, drop: 60 };
const GANTRY_X = STATIONS.load;
const GANTRY_POSTS = [-50, 50];
const GANTRY_Z = 84;
const HOPPER_Z = [62, 80];
const NOZZLE_Z = 55;
const CHIP_R = 4.6;
const CHIP_H = 2.6;
const COLUMNS = [-46, 46];
const COLUMN_R = 4.6;
const BEAM = { x: -13, y: -57, w: 26, d: 114, r: 3 };
const BEAM_Z = [122, 136];
const PLATEN = { x: -17, y: -37, w: 34, d: 74, r: 3 };
const PLATEN_H = 8;
const BUSH_R = 7.5;
const BUSH_H = 12;
const PLATEN_REST = 62; // platen bottom z at rest
const PLATEN_DOWN = TRAY_TOP + 10; // touches the sealed lid top
const LID_H = 10;
const AIR = { r: 13, z0: BEAM_Z[1], z1: BEAM_Z[1] + 34 };
const BED = { x: 86, y: -24, w: 84, d: 48, r: 3 };
const BLOCK = { w: 32, d: 40 };
const ROW = [STATIONS.drop, 100, 140];
const ROW_STEP = 40;
const FIRST_BLOCK = 1204880;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [0, COLUMNS[0], AIR.z1 + 6], [0, COLUMNS[1], AIR.z1 + 6], [GANTRY_X, GANTRY_POSTS[0], GANTRY_Z + 10]],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: 60 },
);

const at = point => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = points => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const col = (x, y, r, z0, z1, style = { tone: 'mid', crease: 'none' }, steps = 28) => S(k.cylinder(x, y, r, z0, z1 - z0, P, steps), style);

function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: 'lo' }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: 'mid' }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: 'mid' }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: 'lo' }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(''), { tone: 'lo' }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // Ruler strip along the near edge, under the tray's travel.
  const strip = { x: -130, y: PLATE.y + PLATE.d - 15, w: 290, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: 'lo', crease: 'none' }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 5, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  out.push(D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], { size: 0.45 }));
  // Label plate with three rule lines (printed text stand-ins).
  const label = { x: -142, y: -62, w: 34, d: 20, r: 1.5 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3, 0.3), { tone: 'lo' }));
  [-56, -52, -48].forEach((y, i) => out.push(L(k.lineOnTop([label.x + 4, y], [label.x + (i === 2 ? 18 : 28), y], 0.8, P), { tone: 'faint', free: true })));
  out.push(D(k.corners(label, 2.2).map(([x, y]) => at([x, y, 0.8])), { size: 0.4 }));
  return out.join('');
}

function rails() {
  const out = [];
  for (const y of RAIL_Y) {
    out.push(S(k.slabOf({ x: RAIL.from, y, w: RAIL.to - RAIL.from, d: 5, r: 1 }, 0, 3, P, 3, 0.4), { tone: 'mid' }));
    out.push(D([RAIL.from + 6, -40, 40, RAIL.to - 6].map(x => at([x, y + 2.5, 3])), { size: 0.4 }));
  }
  const stop = { x: RAIL.from - 5, y: -25, w: 5, d: 48, r: 1.2 };
  out.push(S(k.slabOf(stop, 0, 7, P, 3, 0.5), { tone: 'mid' }));
  out.push(D([at([stop.x + 2.5, -20, 7]), at([stop.x + 2.5, 18, 7])], { size: 0.45 }));
  return out.join('');
}

function post(y) {
  const out = [];
  out.push(col(GANTRY_X, y, 7, 0, 2.4, { tone: 'mid' }));
  out.push(col(GANTRY_X, y, 3.6, 2.4, GANTRY_Z));
  out.push(L([30, 58].map(z => k.sideArc(GANTRY_X, y, 3.6, z, P, 14)).join(''), { tone: 'faint' }));
  return out.join('');
}

function gantryTop() {
  const out = [];
  const bar = { x: GANTRY_X - 6, y: GANTRY_POSTS[0] - 5, w: 12, d: GANTRY_POSTS[1] - GANTRY_POSTS[0] + 10, r: 2.5 };
  out.push(S(k.slabOf(bar, GANTRY_Z, 8, P, 4, 0.6), { tone: 'mid' }));
  out.push(D(GANTRY_POSTS.map(y => at([GANTRY_X, y, GANTRY_Z + 8])), { size: 0.5 }));
  out.push(L(k.lineOnTop([bar.x + 3, bar.y + 12], [bar.x + 3, bar.y + bar.d - 12], GANTRY_Z + 8, P), { tone: 'faint' }));
  // One hopper per L2, back to front.
  for (const y of POCKETS) {
    const hop = { x: GANTRY_X - 8, y: y - 7.5, w: 16, d: 15, r: 2 };
    out.push(col(GANTRY_X, y, 2.4, HOPPER_Z[1], GANTRY_Z, { tone: 'mid', crease: 'none' }, 16));
    out.push(S(k.slabOf(hop, HOPPER_Z[0], HOPPER_Z[1] - HOPPER_Z[0], P, 3, 0.5), { tone: 'mid' }));
    out.push(L(k.sideSeam(hop, HOPPER_Z[0] + 6, P, 3), { tone: 'lo' }));
    out.push(L(k.planOutline(k.insetPlan(hop, 2.4), HOPPER_Z[1], P, 3), { tone: 'faint' }));
    out.push(col(GANTRY_X, y, 3.4, NOZZLE_Z + 3, HOPPER_Z[0], { tone: 'mid' }, 18));
    out.push(col(GANTRY_X, y, 2.4, NOZZLE_Z, NOZZLE_Z + 3, { tone: 'lo' }, 16));
    // Gate lever on the near side of each hopper.
    const lever = { x: hop.x + hop.w, y: y - 1.2, w: 5, d: 2.4, r: 0.8 };
    out.push(S(k.slabOf(lever, HOPPER_Z[0] + 8, 2.4, P, 2), { tone: 'mid', crease: 'none' }));
    out.push(D([at([lever.x + lever.w, y, HOPPER_Z[0] + 9.2])], { size: 0.5 }));
  }
  return out.join('');
}

function column(y, z0, z1) {
  return col(0, y, COLUMN_R, z0, z1);
}

function columnBase(y) {
  return col(0, y, 8.5, 0, 3, { tone: 'mid' }) + D(byDepth([[-6, y], [6, y]]).map(([x, yy]) => at([x, yy, 3])), { size: 0.45 });
}

function tray() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(TRAY, 3), TRAY_Z, 0.1, P)}" style="filter:blur(4px)"/>`];
  out.push(S(k.slabOf(TRAY, TRAY_Z, TRAY_TOP - TRAY_Z, P, 4, 0.6), { tone: 'mid' }));
  out.push(L(k.sideSeam(TRAY, TRAY_Z + 3.5, P, 4), { tone: 'lo' }));
  out.push(L(POCKETS.map(y => k.ring(0, y, CHIP_R + 1.2, TRAY_TOP, P, 24)).join(''), { tone: 'lo' }));
  out.push(D([[-16, -26], [16, -26], [-16, 26], [16, 26]].map(([x, y]) => at([x, y, TRAY_TOP])), { size: 0.4, tone: 'lo' }));
  // Push handle on the near end.
  out.push(S(k.slabOf({ x: TRAY.x + TRAY.w - 1, y: -4, w: 5, d: 8, r: 1.2 }, TRAY_Z + 2, 4, P, 2), { tone: 'mid', crease: 'none' }));
  out.push(S(k.cylinder(TRAY.x + TRAY.w + 6, 0, 3, TRAY_Z + 1.5, 5, P, 20), { tone: 'mid' }));
  out.push(L(k.knurl(TRAY.x + TRAY.w + 6, 0, 3, TRAY_Z + 1.5, TRAY_Z + 6.5, 18, P), { tone: 'lo' }));
  // Three tokens, one per L2 pocket (shown once they land).
  POCKETS.forEach((y, i) => {
    out.push(`<g data-part="seat-${i}" opacity="0">${S(k.cylinder(0, y, CHIP_R, TRAY_TOP, CHIP_H, P, 24, 0.4), { tone: 'hi', crease: 'lo' })}</g>`);
  });
  // The sealed lid, shown once the press has come down.
  const lid = { x: -BLOCK.w / 2, y: -BLOCK.d / 2, w: BLOCK.w, d: BLOCK.d, r: 2 };
  out.push(`<g data-part="lid" opacity="0">${block(lid, TRAY_TOP)}</g>`);
  return out.join('');
}

function block(plan, z) {
  const out = [];
  out.push(S(k.slabOf(plan, z, LID_H, P, 3, 0.6), { tone: 'hi', crease: 'lo' }));
  out.push(L(k.planOutline(k.insetPlan(plan, 3), z + LID_H, P, 3), { tone: 'faint' }));
  out.push(L(k.sideSeam(plan, z + 3, P, 3), { tone: 'faint' }));
  // Three stamped marks: the three L2 roots sealed inside.
  out.push(L(POCKETS.map(y => k.ring(plan.x + plan.w / 2, y * 0.7, 2.6, z + LID_H, P, 16)).join(''), { tone: 'mid' }));
  return out.join('');
}

function chip(i) {
  return `<g data-part="chip-${i}" opacity="0">${S(k.cylinder(GANTRY_X, POCKETS[i], CHIP_R, 0, CHIP_H, P, 24, 0.4), { tone: 'hi', crease: 'lo' })}</g>`;
}

function platen() {
  const out = [];
  out.push(S(k.slabOf(PLATEN, PLATEN_REST, PLATEN_H, P, 4, 0.6), { tone: 'hi', lit: true }));
  out.push(L(k.sideSeam(PLATEN, PLATEN_REST + 3, P, 4), { tone: 'lo' }));
  out.push(L(k.ring(0, 0, 6, PLATEN_REST + PLATEN_H, P, 24), { tone: 'mid' }));
  out.push(D([[-12, -30], [12, -30], [-12, 30], [12, 30]].map(([x, y]) => at([x, y, PLATEN_REST + PLATEN_H])), { size: 0.45 }));
  return out.join('');
}

const bushing = y => S(k.cylinder(0, y, BUSH_R, PLATEN_REST - 2, BUSH_H, P, 28, 0.4), { tone: 'mid' }) + L(k.sideArc(0, y, BUSH_R, PLATEN_REST + 4, P, 18), { tone: 'lo' });

function beam() {
  const out = [];
  out.push(S(k.slabOf(BEAM, BEAM_Z[0], BEAM_Z[1] - BEAM_Z[0], P, 4, 0.8), { tone: 'mid' }));
  out.push(L(k.sideSeam(BEAM, BEAM_Z[0] + 4, P, 4), { tone: 'lo' }));
  out.push(D(COLUMNS.map(y => at([0, y, BEAM_Z[1]])), { size: 0.55 }));
  out.push(L(COLUMNS.map(y => k.ring(0, y, 3, BEAM_Z[1], P, 16)).join(''), { tone: 'lo' }));
  // Air cylinder that drives the platen.
  out.push(col(0, 0, AIR.r + 2, AIR.z0, AIR.z0 + 3, { tone: 'mid' }, 36));
  out.push(col(0, 0, AIR.r, AIR.z0 + 3, AIR.z1, { tone: 'mid', crease: 'none' }, 40));
  out.push(L([AIR.z0 + 11, AIR.z0 + 19, AIR.z0 + 27].map(z => k.sideArc(0, 0, AIR.r, z, P, 28)).join(''), { tone: 'faint' }));
  out.push(col(0, 0, AIR.r + 2, AIR.z1, AIR.z1 + 4, { tone: 'mid' }, 36));
  out.push(D(byDepth([[9, 9], [-9, 9], [9, -9], [-9, -9]]).map(([x, y]) => at([x, y, AIR.z1 + 4])), { size: 0.5 }));
  // Two air fittings on the near face, with a hose to the valve block.
  for (const z of [AIR.z0 + 8, AIR.z1 - 6]) out.push(S(k.slabOf({ x: AIR.r - 2, y: -2, w: 5, d: 4, r: 1 }, z - 2, 4, P, 2), { tone: 'mid', crease: 'none' }));
  return out.join('');
}

function bed() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BED, 0, TRAY_TOP, P)}" style="filter:blur(3px)"/>`];
  out.push(S(k.slabOf(BED, 0, TRAY_TOP, P, 4, 0.6), { tone: 'mid' }));
  out.push(L(k.lineOnTop([BED.x, -BLOCK.d / 2 - 2], [BED.x + BED.w, -BLOCK.d / 2 - 2], TRAY_TOP, P), { tone: 'faint' }));
  out.push(L(k.lineOnTop([BED.x, BLOCK.d / 2 + 2], [BED.x + BED.w, BLOCK.d / 2 + 2], TRAY_TOP, P), { tone: 'faint' }));
  const ticks = k.topTicks(BED.x + 3, BED.x + BED.w - 3, 4, 10, BLOCK.d / 2 + 2.5, TRAY_TOP, [1.5, 3], P);
  out.push(L(ticks.minor, { tone: 'lo' }), L(ticks.major, { tone: 'mid' }));
  out.push(D([[BED.x + 4, -20], [BED.x + BED.w - 4, -20]].map(([x, y]) => at([x, y, TRAY_TOP])), { size: 0.4 }));
  return out.join('');
}

function row() {
  const out = [];
  // Blocks on the bed, linked by coupling pins. The leading slot (at the
  // drop station) is filled by the block arriving on the tray.
  ROW.forEach((cx, i) => {
    const plan = { x: cx - BLOCK.w / 2, y: -BLOCK.d / 2, w: BLOCK.w, d: BLOCK.d, r: 2 };
    const pin = i > 0 ? S(k.slabOf({ x: cx - ROW_STEP + BLOCK.w / 2, y: -3, w: ROW_STEP - BLOCK.w, d: 6, r: 1.5 }, TRAY_TOP + 3, 4, P, 2), { tone: 'mid', crease: 'none' }) : '';
    out.push(`<g data-block="${i}"${i === 0 ? ' opacity="0"' : ''}>${pin}${block(plan, TRAY_TOP)}</g>`);
  });
  return out.join('');
}

function counter() {
  // Block counter on its own little stand at the end of the bed.
  const box = { x: 128, y: -62, w: 40, d: 22, r: 2.5 };
  const out = [];
  out.push(S(k.slabOf(box, 0, 18, P, 4, 0.6), { tone: 'mid' }));
  out.push(L(k.sideSeam(box, 4, P, 4), { tone: 'lo' }));
  const win = k.insetPlan(box, 4);
  out.push(S(k.slabOf(win, 18, 0.6, P, 3), { tone: 'lo', crease: 'none', flat: true }));
  out.push(`<g data-part="count">${k.faceTextSvg(k.topMatrix([box.x + box.w / 2 - 1.6, box.y + box.d / 2], 18.6, P, 'y'), String(FIRST_BLOCK).slice(-4), { size: 6.5, tone: 'hi', anchor: 'middle' })}</g>`);
  out.push(D(k.corners(box, 2.2).map(([x, y]) => at([x, y, 18])), { size: 0.4 }));
  return out.join('');
}

// Paint back to front.
const body = [
  plate(),
  rails(),
  post(GANTRY_POSTS[0]),
  columnBase(COLUMNS[0]),
  `<g data-part="col-back">${column(COLUMNS[0], 3, BEAM_Z[0])}</g>`,
  `<g data-part="bush-back">${bushing(COLUMNS[0])}</g>`,
  `<g data-part="col-back-up"></g>`,
  counter(),
  `<g data-part="tray">${tray()}</g>`,
  POCKETS.map((_, i) => chip(i)).join(''),
  gantryTop(),
  post(GANTRY_POSTS[1]),
  `<g data-part="rod"></g>`,
  `<g data-part="platen">${platen()}</g>`,
  columnBase(COLUMNS[1]),
  `<g data-part="col-front">${column(COLUMNS[1], 3, BEAM_Z[0])}</g>`,
  `<g data-part="bush-front">${bushing(COLUMNS[1])}</g>`,
  `<g data-part="col-front-up"></g>`,
  beam(),
  bed(),
  `<g data-part="row">${row()}</g>`,
];

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    'A bench-top block press. Three hoppers, one for a bank L2, a fintech L2 and an AI L2, each drop a token into a three-pocket tray. The tray slides between two columns, where an air-driven platen comes down once and seals the tray into a block. The sealed block joins a linked row of blocks on the ledger bed and the block counter advances.',
  body,
});

const T = { drop: [0, 0.3, 0.6], fall: 0.55, toPress: [1.4, 2.4], down: [2.5, 2.85], up: [2.85, 3.3], toDrop: [3.4, 4.3], shift: [4.4, 5.2], back: [5.2, 6.0], loop: 6.2 };

const live = `
const P = ${JSON.stringify(P)};
const C = ${JSON.stringify({ STATIONS, POCKETS, GANTRY_X, NOZZLE_Z, TRAY_TOP, CHIP_H, COLUMNS, COLUMN_R, BEAM_Z, PLATEN_REST, PLATEN_DOWN, PLATEN_H, BUSH_R, BUSH_H, ROW_STEP, FIRST_BLOCK, T })};
for (const stage of document.querySelectorAll('[data-figure="block-press"]')) {
  const svg = stage.querySelector('svg');
  const q = (name) => svg.querySelector('[data-part="' + name + '"]');
  const tray = q('tray'), platen = q('platen'), rod = q('rod'), lid = q('lid'), count = q('count');
  const colBackUp = q('col-back-up'), colFrontUp = q('col-front-up');
  const bushBack = q('bush-back'), bushFront = q('bush-front');
  const chips = C.POCKETS.map((_, i) => q('chip-' + i));
  const seats = C.POCKETS.map((_, i) => q('seat-' + i));
  const rowEl = q('row');
  const blocks = [...rowEl.querySelectorAll('[data-block]')];
  const readout = stage.closest('.iso-plate').querySelector('[data-readout]');
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const span = (t, [a, b]) => clamp((t - a) / (b - a), 0, 1);
  const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const solid = (paths) => solidSvg(paths, { tone: 'mid', crease: 'none' });
  let height = C.FIRST_BLOCK, lastLoop = -1, frame = 0, start = 0, visible = false;

  function trayX(t) {
    if (t < C.T.toPress[0]) return C.STATIONS.load;
    if (t < C.T.toPress[1]) return C.STATIONS.load + (C.STATIONS.press - C.STATIONS.load) * ease(span(t, C.T.toPress));
    if (t < C.T.toDrop[0]) return C.STATIONS.press;
    if (t < C.T.toDrop[1]) return C.STATIONS.press + (C.STATIONS.drop - C.STATIONS.press) * ease(span(t, C.T.toDrop));
    if (t < C.T.back[0]) return C.STATIONS.drop;
    return C.STATIONS.drop + (C.STATIONS.load - C.STATIONS.drop) * ease(span(t, C.T.back));
  }
  function platenZ(t) {
    const down = span(t, C.T.down), up = span(t, C.T.up);
    const travel = C.PLATEN_REST - C.PLATEN_DOWN;
    if (t < C.T.down[0] || t > C.T.up[1]) return 0;
    if (t < C.T.down[1]) return -travel * down * down;
    return -travel * (1 - ease(up));
  }
  function draw(t) {
    const x = trayX(t);
    tray.setAttribute('transform', translateAlong(P, [x, 0, 0]));
    // Tokens fall from the nozzles into the pockets.
    const sealed = t >= C.T.down[1] && t < C.T.shift[0];
    C.POCKETS.forEach((y, i) => {
      const s = (t - C.T.drop[i]) / C.T.fall;
      const falling = s >= 0 && s < 1;
      chips[i].setAttribute('opacity', falling ? '1' : '0');
      if (falling) chips[i].setAttribute('transform', translateAlong(P, [0, 0, C.NOZZLE_Z - 2 + (C.TRAY_TOP - C.NOZZLE_Z + 2) * s * s]));
      seats[i].setAttribute('opacity', s >= 1 && !sealed && t < C.T.down[1] ? '1' : '0');
    });
    lid.setAttribute('opacity', sealed && t < C.T.shift[0] ? '1' : '0');
    // The platen comes down once.
    const dz = platenZ(t);
    const pz = C.PLATEN_REST + dz;
    platen.setAttribute('transform', translateAlong(P, [0, 0, dz]));
    bushBack.setAttribute('transform', translateAlong(P, [0, 0, dz]));
    bushFront.setAttribute('transform', translateAlong(P, [0, 0, dz]));
    const top = pz - 2 + C.BUSH_H;
    colBackUp.innerHTML = solid(cylinder(0, C.COLUMNS[0], C.COLUMN_R, top, C.BEAM_Z[0] - top, P, 28));
    colFrontUp.innerHTML = solid(cylinder(0, C.COLUMNS[1], C.COLUMN_R, top, C.BEAM_Z[0] - top, P, 28));
    const rodTop = pz + C.PLATEN_H;
    rod.innerHTML = solidSvg(cylinder(0, 0, 3, rodTop, C.BEAM_Z[0] - rodTop, P, 20), { tone: 'hi', crease: 'none' });
    // The sealed block joins the row, which moves one place along.
    const shift = ease(span(t, C.T.shift));
    const shifting = t >= C.T.shift[0];
    blocks[0].setAttribute('opacity', shifting ? '1' : '0');
    rowEl.setAttribute('transform', translateAlong(P, [C.ROW_STEP * shift, 0, 0]));
    blocks[blocks.length - 1].setAttribute('opacity', String(1 - shift));
    const loop = Math.floor((performance.now() - start) / 1000 / C.T.loop);
    const n = height + (t >= C.T.shift[1] ? 1 : 0);
    const label = String(n).slice(-4);
    const text = count.querySelector('text');
    if (text && text.textContent !== label) text.textContent = label;
    const phase = t < C.T.toPress[0] ? 'L2 roots arriving' : t < C.T.down[0] ? 'to the press' : t < C.T.toDrop[0] ? 'sealed in one pass' : t < C.T.shift[1] ? 'added to the ledger' : 'ready for the next block';
    const msg = 'block #' + n.toLocaleString('en-US') + ' · ' + phase;
    if (readout && readout.textContent !== msg) readout.textContent = msg;
    if (loop !== lastLoop) { if (lastLoop >= 0) height++; lastLoop = loop; }
  }
  function tick(now) {
    if (!start) start = now;
    const t = ((now - start) / 1000) % C.T.loop;
    draw(t);
    frame = visible ? requestAnimationFrame(tick) : 0;
  }
  if (still.matches) { draw(C.T.toDrop[0] - 0.05); continue; }
  draw(0);
  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible && !frame) frame = requestAnimationFrame(tick);
  }, { rootMargin: '120px 0px' }).observe(stage);
}
`;

const plateBody = () =>
  k.plateHtml({
    fig: 'Fig 1',
    title: 'Hyper 0X block press',
    hint: 'Each L2 sends one state root',
    readout: `block #${(FIRST_BLOCK).toLocaleString('en-US')} · L2 roots arriving`,
    keys: [
      { mark: 'lit', label: 'The press: seals each block once' },
      { mark: 'raised', label: 'Tokens: one state root per private L2' },
    ],
    caption:
      'Each private L2 (bank, fintech, AI) sends one state root. Hyper 0X seals them into one block that is never reordered or undone, and the block joins the shared ledger.',
    body: `<div class="iso-stage" data-figure="block-press" role="img" aria-label="Animated block press">${svg}</div>`,
  });

mkdirSync(OUT, { recursive: true });
const kitSrc = readFileSync(join(HERE, 'kit', 'iso-kit.mjs'), 'utf8').replace(/^export /gm, '');
for (const theme of ['dark', 'light']) {
  writeFileSync(join(OUT, `block-press${theme === 'light' ? '-light' : ''}.html`), k.pageHtml({ title: 'Block press', theme, body: plateBody(), script: kitSrc + live, width: 820 }));
}
mkdirSync(SITE, { recursive: true });
writeFileSync(join(SITE, 'block-press.html'), plateBody());
writeFileSync(join(SITE, 'block-press.live.js'), live);
// Site stylesheet: the kit CSS, with the light palette keyed to the site's
// theme (html without .dark) and the card blended into dark sheets.
const css = readFileSync(join(HERE, 'kit', 'iso.css'), 'utf8').replace('.iso[data-theme="light"]', 'html:not(.dark) .iso.iso-auto');
writeFileSync(
  join(HERE, '..', '..', 'src', 'assets', 'styles', 'iso.css'),
  `/* Generated by scripts/figures/block-press.mjs from the Anatomy kit (MIT). */
${css}
.iso-sheet{--anatomy-page:transparent;--anatomy-card:var(--sheet-card);--anatomy-paper:var(--sheet-card)}
.iso .iso-figure{margin:0}
.iso .iso-plate{border-radius:1.6rem;box-shadow:0 0 0 1px color-mix(in oklab,var(--anatomy-mid) 45%,transparent)}
.iso .iso-legend{margin-top:14px}
`,
);
console.log('wrote figure + previews');
