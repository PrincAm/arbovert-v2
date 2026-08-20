# Visual / Mobile Rendering — arbovert.cz

**Score: 58/100**

Written by the orchestrator from the screenshots and DOM measurements the visual
specialist captured before it was cut off. Every claim below traces to a screenshot in
`screenshots/` or to a measured rect in `screenshots/analysis1.json` / `analysis2.json`.

Captured: `/`, `/sluzby`, `/sluzby/rizikove-kaceni-stromu`, `/realizace`,
`/realizace/osetreni-lipy-zamek-kozel`, `/kontakt` — desktop (1920) and mobile (375) fold
+ full, plus 360 / 650 / 651 breakpoint captures of `/` and a realization detail page.

## What works

- **No horizontal overflow at any width tested** — 360, 375, 650, 651, 1920 all report
  `docWidth == winWidth` (`analysis1.json`, `analysis2.json`). The 650px breakpoint
  switches cleanly: at 651 the desktop nav row appears, at 650 the hamburger is used.
- **Hero text contrast is fine.** The homepage hero photo carries a dark overlay; white
  and green headline text stays legible (`home_mobile_fold.png`).
- **H1 is above the fold on every page type** measured, on both desktop and mobile.
- **The main hero CTA is a real, large button** — "Chci nabídku zdarma", 220×49 px, well
  over the 44×44 minimum.

## Findings

| Severity | Title | Evidence | Fix |
|---|---|---|---|
| High | Cookie banner covers the primary CTA on mobile | Banner occupies y=672–812 in a 812px-tall mobile viewport — the bottom 140px, i.e. the whole remaining fold. In `home_mobile_fold.png` it clips the "Chci nabídku zdarma" button mid-height. Same on `/sluzby`, `/sluzby/*`, `/realizace`, `/realizace/*`, `/kontakt`. | Shrink to a slim bar or bottom sheet that does not overlap page content, or push content up by the banner height while it is shown. Component that renders it (uses `js-cookie`) — check `src/layouts/` and `src/app/providers.js`. |
| High | Phone number is unreachable on mobile without opening the menu | Measured rect for the header phone link at 375px is `left: 415` — off-screen, inside the closed drawer. `home_mobile_fold.png` shows only the logo and a hamburger. A visitor with a storm-damaged tree cannot tap to call from the first screen. | Put a persistent tap-to-call element in the mobile header (`src/layouts/NavBar.js`), or a sticky bottom call bar on mobile. |
| Medium | Hamburger toggle is a 24×24 tap target | `small_targets` on every mobile capture lists `Toggle menu` at 24×24, against the 44×44 guidance. | Increase the hit area (padding) in `src/layouts/NavBar.js` — the icon can stay 24px. |
| Medium | Service pages open with an undifferentiated wall of bold text | `sluzby-detail_mobile_fold.png`: below the H1 the entire visible area is bold body copy inside one card, no image, no CTA, no phone. The card's heading is the brand name "Arbovert", not a topical H2. | Give the service page an intro image or icon row, normal-weight body copy with only lead sentences bold, and a visible CTA above the fold. `src/app/sluzby/[slug]/ServicePageClient.js`. |
| Medium | Portrait photos force-cropped into wide banners | `strom.webp` is 1200×1800 (portrait) displayed at 1920×320 with `object-fit: cover` — roughly 85% of the image height is discarded. Realization thumbnails are 3024×4032 displayed at 464×256. | Crop deliberately at build time, or set `object-position` so the subject survives the crop. |
| Medium | `/realizace` is a ~9,000px scroll on mobile | Last CTA measured at y=9029 on the 375px capture, with 17 full-weight gallery images above it. Combined with the multi-MB JPEGs the performance specialist found, this is a heavy page on a phone. | Paginate or lazy-load beyond the first 6 cards; ship resized thumbnails. |
| Low | Consent buttons are small | "Přijmout" 79×36, "Odmítnout" 94×36 — under 44px tall. | Raise to 44px min height. |
| Info | Homepage states "Přes 15 let zkušeností" in the hero | `home_mobile_fold.png` — the dynamic value, which disagrees with the "14+" and "12+" strings elsewhere. Cross-reference the content and schema findings. | Single source of truth for the number. |

## Screenshots retained

Only the two captures that prove a finding on their own were kept in the repo:
`screenshots/home_mobile_fold.png` and `screenshots/sluzby-detail_mobile_fold.png`, plus
the full DOM measurements in `analysis1.json` / `analysis2.json`. The other 28 captures
(desktop and mobile fold/full for `/`, `/sluzby`, `/realizace`, a realization detail page
and `/kontakt`, plus 360/650/651 breakpoints) were measured for this report but not
committed, to keep 20MB of PNGs out of git history. Regenerate with
`claude-seo run capture_screenshot.py <url>`.

## Not captured

No tablet-portrait (768) capture, and no rendered tap-target audit beyond the elements
listed in `small_targets`. Contrast was judged by eye from screenshots, not measured with
a contrast-ratio tool.
