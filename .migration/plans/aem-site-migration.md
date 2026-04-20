# Balmain Germany Homepage Migration Plan

## Source Page
- **URL:** `https://de.balmain.com/de`
- **Title:** Die offizielle Website von Balmain Deutschland | Designerkleidung & Taschen
- **Language:** German (de)

## Migrated Page

The migrated page is available for preview at: **`/content/balmain-home`**

(File: `content/balmain-home.plain.html` — 21.9KB)

## Content Strategy

The migrated page was created as a **new page** (`/balmain-home`) to preserve the existing homepage and cart page already in the project.

| Existing File | Action |
|---|---|
| `content/index.plain.html` | **Kept unchanged** |
| `content/nav.plain.html` | **Kept unchanged** |
| `content/balmain-home.plain.html` | **New** — migrated Balmain homepage |

## Page Analysis

The Balmain homepage is a luxury fashion e-commerce landing page with the following content sections:

| # | Section | Content | EDS Block Variant |
|---|---------|---------|-------------------|
| 1 | Hero Banner SS26 | Full-width SS26 Women's Collection image + CTA | **hero-fullbleed** |
| 2 | Spring Offers Cards | Two side-by-side image cards (Women & Men) | **cards-product** |
| 3 | Product Carousel | Scrollable category cards: Ébène Bags, Shoes, Belts | **carousel-product** |
| 4 | Sneakers & Men's Cards | Two side-by-side image cards | **cards-product** |
| 5 | Hero Banner FW26 | Full-width FW26 Women's Collection image + 2 CTAs | **hero-fullbleed** |
| 6 | Balmain Culture | 4 editorial slides: Antonin Tron, Pierre Balmain, Campaign, Collection | **carousel-product** |
| 7 | Newsletter Signup | Gender radio buttons + email input + privacy text | **form** |
| 8 | Info Cards | 3-column: Boutiques, Customer Care, FAQ | **cards-product** |

## Generated Artifacts

| Artifact | Path |
|---|---|
| Project config | `.migration/project.json` |
| Page templates | `tools/importer/page-templates.json` |
| Page analysis | `migration-work/authoring-analysis.json` |
| Screenshot | `migration-work/screenshot.png` |
| Hero variant | `blocks/hero-fullbleed/` |
| Cards variant | `blocks/cards-product/` |
| Carousel variant | `blocks/carousel-product/` |
| Form block | `blocks/form/` |
| Parsers (4) | `tools/importer/parsers/` |
| Transformers (2) | `tools/importer/transformers/` |
| Import script | `tools/importer/import-balmain-homepage.js` |
| **Migrated content** | **`content/balmain-home.plain.html`** |
| Import report | `tools/importer/reports/import-balmain-homepage.report.xlsx` |

## Design System Import Plan

Extract and apply global design tokens from `https://de.balmain.com/de` to the EDS project. This will use the `excat-complete-design-expert` skill for **site design only** (global tokens, colors, typography, spacing — not block-specific styling).

### Tokens to Extract
| Category | Expected Values |
|---|---|
| **Typography** | Custom Balmain fonts (likely proprietary serif/sans), font weights, sizes, line-heights |
| **Colors** | Black (#000), white (#fff), accent colors, link colors, background tones |
| **Spacing** | Section padding, content margins, generous luxury whitespace |
| **Buttons/Links** | CTA styling, underline treatments, hover states |

### Files to Update
| File | Changes |
|---|---|
| `styles/styles.css` | CSS custom properties (--color-*, --font-*, --spacing-*), base element styles |
| `styles/fonts.css` | @font-face declarations for Balmain brand fonts |

**Execution requires switching to Execute mode.** The `excat:excat-complete-design-expert` skill will handle extraction and application.

## Checklist

### Phase 1: Setup & Analysis
- [x] Configure project migration settings (`project.json`)
- [x] Run site analysis to create page template skeleton
- [x] Run detailed page analysis on homepage URL
- [x] Capture reference screenshots of original page

### Phase 2: Block Mapping & Variants
- [x] Map each content section to an EDS block (using enriched block catalog)
- [x] Identify required block variants (hero-fullbleed, cards-product, carousel-product, form)
- [x] Check for similarity with existing blocks in the workspace
- [x] Create block mapping entries in `page-templates.json`

### Phase 3: Import Infrastructure
- [x] Generate block parsers for each mapped block variant (4 parsers validated)
- [x] Generate page transformers (2 transformers: cleanup + sections)
- [x] Create and bundle the import script

### Phase 4: Content Import
- [x] Execute import script against the homepage URL (7 block instances imported)
- [x] Save migrated content as `content/balmain-home.plain.html`
- [ ] Preview imported page on local server

### Phase 5: Design System (NEXT)
- [ ] Extract design tokens (colors, typography, spacing) from `https://de.balmain.com/de`
- [ ] Map tokens to CSS custom properties in `styles/styles.css`
- [ ] Apply font declarations to `styles/fonts.css`
- [ ] Verify design tokens render correctly in preview

### Phase 6: Block Development
- [ ] Implement/customize block JS and CSS for each variant
- [ ] Ensure carousel blocks function correctly (navigation, autoplay)
- [ ] Style hero blocks to match original full-bleed layouts
- [ ] Style cards/columns for the two-up and three-up layouts

### Phase 7: Validation & QA
- [ ] Compare migrated page visually against original
- [ ] Verify all links resolve correctly
- [ ] Verify responsive behavior (mobile, tablet, desktop)
- [ ] Run block critique for pixel-fidelity checks
