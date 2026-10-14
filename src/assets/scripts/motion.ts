/**
 * Loads the scroll motion (motion-run.ts: GSAP, ScrollTrigger, SplitText)
 * only on pages that use it: scrubbed statements, count-ups, the FAQ
 * timeline and the stacked cards. Other pages (the blog, for one) skip GSAP
 * and its layout work. It starts after load, when the browser is idle, so
 * it never competes with the first paint.
 */
const USES_MOTION = '[data-words], [data-count], [data-faq-fill], [data-stack]';

const start = () => {
  if (!document.querySelector(USES_MOTION)) return;
  import('./motion-run').then(motion => motion.start());
};
const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
if (document.readyState === 'complete') idle(start);
else window.addEventListener('load', () => idle(start), { once: true });
