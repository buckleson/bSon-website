
const P = {"origin":[363.25142276106135,284.63734964390375],"scale":1.2231431413179072,"azimuth":60,"elevation":30};
const C = {"STATIONS":{"load":-95,"press":0,"drop":60},"POCKETS":[-19,0,19],"GANTRY_X":-95,"NOZZLE_Z":55,"TRAY_TOP":12,"CHIP_H":2.6,"COLUMNS":[-46,46],"COLUMN_R":4.6,"BEAM_Z":[122,136],"PLATEN_REST":62,"PLATEN_DOWN":22,"PLATEN_H":8,"BUSH_R":7.5,"BUSH_H":12,"ROW_STEP":40,"FIRST_BLOCK":1204880,"T":{"drop":[0,0.3,0.6],"fall":0.55,"toPress":[1.4,2.4],"down":[2.5,2.85],"up":[2.85,3.3],"toDrop":[3.4,4.3],"shift":[4.4,5.2],"back":[5.2,6],"loop":6.2}};
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
