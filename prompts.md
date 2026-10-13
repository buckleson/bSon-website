# Image prompts

These are the images the site still needs. The architecture diagrams in `src/images/diagrams/` are already done (made with archify). Everything listed here is still a ScrewFast placeholder photo.

To swap an image, save it at the **target path** using the same file name (any of `.avif`, `.png`, `.jpg` or `.webp` works; if the extension changes, tell me and I'll update the import). Keep roughly the aspect ratio listed.

**Shared style for every prompt:** _clean, premium enterprise-tech aesthetic; deep navy/near-black background with violet (#7C3AED) and soft cyan accents; subtle grid or node-network motifs; no text, no logos, no people's faces unless stated; high detail, soft studio lighting._

## Home page

| Target path | Aspect | Prompt |
|---|---|---|
| `src/images/features-image.avif` | 16:9 (≈2400×1300) | Abstract 3D render of a glowing modular blockchain: one large central slab (the L1) with several smaller translucent layers (L2s) docked above it, connected by thin light beams. Isometric view, shared style. Also used on the Products page. |
| `src/images/social.png` | 2:1 (1200×600) | Social share card: dark navy background, a violet glowing chain of hexagonal blocks running left to right, plenty of empty space on the left for a title. Shared style. (I can add the "Buckleson · Hyper 0X" text on top afterwards.) |

## Product cards and product page headers

Each product needs a **card** image (`product-image-N`, about 7:5, 1460×1040) and a **header** image (`product-image-main-N`, about 16:10, 1760×1080).

| Product | Card target | Header target | Prompt |
|---|---|---|---|
| Hyper 0X | `src/images/product-image-1.avif` | `src/images/product-image-main-1.avif` | A monolithic glowing violet crystal block at the centre of a network of smaller blocks, with lattice-pattern encryption shields orbiting it. Conveys a secure, post-quantum-resistant L1 blockchain. Shared style. |
| Pavii | `src/images/product-image-2.avif` | `src/images/product-image-main-2.avif` | Stylised AI agent icons (abstract glowing orbs) flowing through a row of six translucent security gates, each gate scanning the orb, with a ledger of chained receipts below. Conveys AI-agent security and observability. Shared style. |
| Hyper Wallet & SDKs | `src/images/product-image-3.avif` | `src/images/product-image-main-3.avif` | A sleek smartphone showing an abstract trading/wallet UI (charts, balance cards, no readable text) floating above a developer code panel with SDK brackets `</>`. Conveys exchange + wallet in one app plus SDKs. Shared style. |
| H0X Pay (coming soon) | `src/images/product-image-4.avif` | `src/images/product-image-main-4.avif` | A payment terminal tap with a small stream of gold coins and gold bars splitting off into a growing on-chain portfolio graph. Conveys investing a slice of every payment, starting with gold. Warm gold accents on the shared style. |
| HyperRun (coming soon) | `src/images/product-image-5.avif` _(new file)_ | `src/images/product-image-main-5.avif` _(new file)_ | A cinematic first-person shooter scene in a neon-lit futuristic arena, with holographic prediction odds and reward tokens floating in the HUD. Realistic, high-energy. Violet and cyan neon. |

_HyperRun currently reuses the Hyper 0X images. When you send the two new files I'll point `src/content/products/en/hyperrun.md` at them._

## Services page

| Target path | Aspect | Section | Prompt |
|---|---|---|---|
| `src/images/person-working.avif` | 2:3 portrait (1330×2000) | Custom blockchains & asset tokenization | A gold bar, a property deed and a bond certificate dissolving into glowing digital tokens that stream onto a blockchain. Portrait composition. Shared style. |
| `src/images/construction-workers.avif` | 3:2 (1920×1280) | Wallet SDKs for internal apps | An enterprise dashboard on a large monitor showing abstract wallet activity, transfers and approval checkmarks (no readable text), in a modern dark office. Shared style. |
| `src/images/aerial-view.avif` | 3:2 (1920×1280) | Wallet SDKs for internal apps | Top-down view of an abstract network of connected app icons (cards, phones, terminals), all linked to one central glowing ledger. Shared style. |
| `src/images/under-construction.avif` | 2:3 portrait (1920×2880) | Forward-deployed engineering | An engineer's hands on a keyboard with holographic architecture diagrams of interconnected systems projected above the desk. Face not visible. Shared style. |

## Blog and insights

| Target path | Aspect | Post | Prompt |
|---|---|---|---|
| `src/images/blog/post-1.avif` | 3:2 (1500×1000) | Why Hyper 0X is post-quantum-resistant | Four nested translucent shields around a glowing data core, with a lattice pattern on the outermost shield. Shared style. |
| `src/images/blog/post-2.avif` | 3:2 (1500×1000) | Eight attacks Pavii stops | An AI orb approaching a security gate that deflects red malicious fragments while letting clean light through. Shared style. |
| `src/images/blog/post-3.avif` | 3:2 (1500×1000) | Atomic settlement in Hyper Wallet | Two glowing tokens (one violet, one cyan) swapping places inside a single locked transparent capsule. Shared style. |
| `src/images/insights/insight-1.avif` | 16:9 (1500×840) | Dynamic blocks | A row of blockchain blocks that grow taller where a wave of transactions arrives. Shared style. |
| `src/images/insights/insight-2.avif` | 16:9 (1500×840) | Proof of execution | A chain of glowing signed receipts linked together, emerging from an abstract AI core. Shared style. |
| `src/images/insights/insight-3.avif` | 16:9 (1500×840) | Account abstraction | A hand holding a phone with a face-scan outline completing a payment, with no keys or seed words in sight. Shared style. |
