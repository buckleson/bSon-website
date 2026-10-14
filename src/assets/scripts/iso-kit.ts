// Exposes the Anatomy kit (MIT, scripts/figures/kit) to the figures' live
// scripts, and loads lazy figures when they come near: the drawing goes into
// its already-sized box, then the figure's script is imported and runs.
// Bundled once per page however many figures it has.
import * as kit from '../../../scripts/figures/kit/iso-kit.mjs';

type Runner = () => void;
const w = window as unknown as { IsoKit: typeof kit; __isoRun?: Record<string, Runner> };

w.IsoKit = kit;
window.dispatchEvent(new Event('isokit'));

async function load(el: HTMLElement) {
  const { isoSrc: src, isoJs: js, isoLazy: name = '' } = el.dataset;
  if (!src || !js) return;
  el.removeAttribute('data-iso-src');
  try {
    const response = await fetch(src);
    if (!response.ok) return;
    const box = el.querySelector<HTMLElement>(`[data-figure="${name}"]`) ?? el;
    box.innerHTML = await response.text();
    if (w.__isoRun?.[name]) w.__isoRun[name]();
    else await import(/* @vite-ignore */ js);
  } catch {
    // Offline or blocked: the frame and steps still read fine without it.
  }
}

const lazy = [...document.querySelectorAll<HTMLElement>('[data-iso-src]')];
if (lazy.length) {
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        load(entry.target as HTMLElement);
      }
    },
    { rootMargin: '900px 0px' }
  );
  lazy.forEach(el => observer.observe(el));
}
