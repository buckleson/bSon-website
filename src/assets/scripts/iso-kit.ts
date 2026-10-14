// Exposes the Anatomy kit (MIT, scripts/figures/kit) to the figures' inline
// live scripts. Bundled once per page however many figures it has.
import * as kit from '../../../scripts/figures/kit/iso-kit.mjs';

(window as unknown as { IsoKit: typeof kit }).IsoKit = kit;
window.dispatchEvent(new Event('isokit'));
