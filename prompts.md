# Image prompts (optional)

The site no longer needs any photos to ship. Every image is generated or drawn in code:

- **Architecture diagrams** (light and dark): `src/images/diagrams/*.webp`, made with archify from `../.archify/*/candidate.json`.
- **Home hero animation:** `src/components/sections/landing/PromptShieldAnimation.astro`.
- **Blog covers:** `src/components/ui/BlogCover.astro`, generated from each post's slug.
- **Social share images:** `src/pages/og/[slug].png.ts`, rendered at build time for every page.

The prompts below are for **extra** 3D art you may want to generate later, for example a product page backdrop or a launch announcement. Send me the files and I will place them.

**Shared style for every prompt:** _premium enterprise-tech 3D render; deep navy (#0b0f1a) background; violet (#7C3AED) light accents for the light-theme version, warm orange (#F54900) accents for the dark-theme version; subtle grid or node-network motifs; soft studio lighting; no text, no logos, no faces._

| Use | Aspect | Prompt |
|---|---|---|
| Hyper 0X backdrop | 16:9 (2400×1350) | One large glowing slab (the L1) with several translucent smaller layers (private L2s) docked above it, linked by thin light beams. Isometric view. |
| Pavii backdrop | 16:9 | A translucent shield ring with streams of small light packets arriving from the left; red packets shatter on the ring, violet packets pass through to a calm glowing node on the right. |
| Hyper Wallet backdrop | 16:9 | A sleek phone-shaped glass slab floating above a grid, with coins and token chips orbiting and swapping places along light trails. |
| H0X Pay teaser | 16:9 | A gold bar dissolving into small glowing gold cubes that stream into a phone-shaped glass slab. |
| HyperRun teaser | 16:9 | A futuristic arena corridor in motion blur, with holographic prediction odds floating in the air. Cinematic, no people. |
| Tokenization guide hero | 16:9 | A building, a gold bar and a document each splitting into glowing cubes that line up on a single bright rail. |
