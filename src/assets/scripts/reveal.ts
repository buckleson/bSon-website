/**
 * Scroll reveal for `[data-reveal]` blocks and the `[data-reveal-item]`
 * children of `[data-reveal-group]` (staggered). Content is visible by
 * default; the hidden start state only applies once this script has added
 * `reveal-ready` to <html>, and never under reduced motion.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced && 'IntersectionObserver' in window) {
  const root = document.documentElement;
  root.classList.add('reveal-ready');

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach(group => {
    group.querySelectorAll<HTMLElement>('[data-reveal-item]').forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 70}ms`);
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  document
    .querySelectorAll('[data-reveal], [data-reveal-item]')
    .forEach(element => observer.observe(element));
}
