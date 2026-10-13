/**
 * Shared scroll motion (GSAP + ScrollTrigger + SplitText):
 * - `[data-words]`: a statement whose words fade from faint to full as it
 *   scrolls through the viewport (scrubbed, like the reference "Our vision").
 * - `[data-count]`: a number that counts up once when it enters the view.
 *   The final value is in the markup, so it reads correctly without JS.
 * Everything is skipped under prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  document.querySelectorAll<HTMLElement>('[data-words]').forEach(el => {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'word', aria: 'none' });
    gsap.fromTo(
      split.words,
      { opacity: 0.35 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: 0.6 },
      }
    );
  });

  document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
    const target = Number(el.dataset.count);
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString('en-US')}${suffix}`;
    const state = { n: 0 };
    el.textContent = format(0);
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      once: true,
      onEnter: () =>
        gsap.to(state, { n: target, duration: 1.6, ease: 'expo.out', onUpdate: () => (el.textContent = format(state.n)) }),
    });
  });
}
