// Exposes the Anatomy kit (MIT, scripts/figures/kit) to the figures' inline
// live scripts, and loads lazy figures when they scroll near. Bundled once
// per page however many figures it has.
import * as kit from '../../../scripts/figures/kit/iso-kit.mjs';

type Runner = () => void;
const w = window as unknown as { IsoKit: typeof kit; __isoRun?: Record<string, Runner> };

w.IsoKit = kit;
window.dispatchEvent(new Event('isokit'));

async function load(el: HTMLElement) {
  const src = el.dataset.isoSrc;
  if (!src) return;
  el.removeAttribute('data-iso-src');
  try {
    const response = await fetch(src);
    if (!response.ok) return;
    el.innerHTML = await response.text();
    w.__isoRun?.[el.dataset.isoLazy ?? '']?.();
  } catch {
    // Offline or blocked: the placeholder stays; the page still reads fine.
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
