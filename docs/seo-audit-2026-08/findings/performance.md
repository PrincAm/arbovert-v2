# Performance / Core Web Vitals — arbovert.cz

## Score: 45/100

## Method note (read first)
- **CrUX field data is unavailable.** Google API credentials are not configured on this
  machine. `pagespeed_check.py` was not usable and `lcp_subparts.py https://arbovert.cz/
  --form-factor PHONE --json` returned `Error: Google API key not configured.` No 75th-
  percentile real-user LCP/INP/CLS numbers exist in this report — Google's pass/fail
  verdict cannot be confirmed from here.
- No full Lighthouse trace (`npx lighthouse`) was run either, so there are **no measured
  millisecond LCP/INP/CLS lab numbers** in this report. Everything below is inferred from
  static analysis: on-disk file weights/dimensions, live response headers (`curl -I`),
  rendered markup, and `preload_check.py` (a resource-hint auditor, not a CWV timer).
  Anywhere a number looks like a metric, it is explicitly labelled an estimate.
- Measured on: homepage `/`, one realization detail page
  (`/realizace/staticka-vazba-lipy-cerna-v-posumavi`), the realizations index
  `/realizace`, and one service page pattern (`ServicePageClient.js`, applies to all 7
  `/sluzby/[slug]` pages). Mobile viewport assumed for image-fold reasoning.

## Findings

Critical | Multi-MB unresized camera originals used as the LCP image on 16 of 17 realization detail pages | `IMG_8291.jpg` is 4032×3024px / 6.28MB on disk (`public/images/realizace/liliovnik-prachatice/IMG_8291.jpg`); confirmed live via `curl -I https://arbovert.cz/images/realizace/liliovnik-prachatice/IMG_8291.jpg` → `content-length: 6284182`, `content-type: image/jpeg`. This exact file is the hero image for slug `staticka-vazba-lipy-cerna-v-posumavi` (mapped via `src/data/realizations.js` `imageSrc`), rendered inside a 256–384px-tall container (`h-64 md:h-96` in `src/app/realizace/[slug]/page.js:93`). Same pattern confirmed for 15 other realizations — only the newest entry (id 17, `osetreni-lipy-zamek-kozel`, `kozel-*.webp`, 900×1200px, ~300KB) is properly sized. On a mobile connection a 6MB above-the-fold image alone is very likely to push LCP past the 4.0s "poor" threshold. | Re-encode every file under `public/images/realizace/*` to ~1200–1600px longest edge, WebP, q75-80 — mirror the already-correct pattern at `src/data/realizations.js:18-21` (`kozel-1.webp` etc., ~300KB). Use a script (e.g. `sharp`) as a one-time batch pass, not manual per-file edits.

High | Same raw-original problem repeats across every gallery photo and every index-page thumbnail | `public/images/realizace/` = 60 files, 193MB total, ~3.2MB average. Examples: `injektaz-vinohrady/` 20MB/4 files, `lipa-prachatice/` 26MB/6 files, `topoly-labe/` 18MB/4 files. These render as small gallery cards (`aspect-square` grid, `src/app/realizace/[slug]/page.js:114-130`) and index thumbnails (`h-48 md:h-64`, `src/app/realizace/page.js:44-53`). `next.config.js` sets `images: { unoptimized: true, loader: 'cloudinary', path: '' }` — the `cloudinary` loader is never actually invoked for local `/public` paths when `unoptimized:true`, so these images get **zero** resizing, format conversion, or srcset generation; the browser fetches the full original regardless of the ~250-380px display size. | Either (a) upload these to Cloudinary and reference them the same way `Welcome.js` does (`f_auto,q_auto`, width breakpoints), matching the existing hero pattern, or (b) pre-resize/convert every realizace image to WebP at realistic display sizes before committing to `public/images/realizace/`. Also flag: local images bypass Next's image optimizer entirely by design (`unoptimized: true` in `next.config.js`) — any fix must happen at source-file level, not via the `<Image>` component.

High | Realization-detail hero image has no `priority` / `sizes`, despite being the likely LCP element | `src/app/realizace/[slug]/page.js:94-99` — `<Image src={realization.imageSrc} alt={realization.title} fill className="object-cover" />` — no `priority`, no `sizes`. It sits directly under the H1 inside the initial mobile viewport. Without `priority`, Next applies default lazy-loading behavior, which can delay LCP discovery on top of the multi-MB payload above. Contrast with `src/components/Welcome.js:39-56`, which correctly sets `priority={true}` and `fetchPriority="high"` on the homepage hero. | Add `priority` and an appropriate `sizes` (e.g. `sizes="(max-width: 768px) 100vw, 800px"`) to the `<Image>` at `src/app/realizace/[slug]/page.js:94-99`.

Medium | Two separate analytics systems execute on the homepage | `src/app/providers.js:19-20` manually injects `googletagmanager.com/gtag/js?id=GTM-5V7DRKB` into every page via `useEffect`. Separately, `src/app/page.js:117-129` (homepage only) loads a second, different tag: `<Script src="https://www.googletagmanager.com/gtag/js?id=G-8GZ2HM5LBZ" strategy="afterInteractive">` plus an inline `gtag('config', 'G-8GZ2HM5LBZ')` block. `src/app/layout.js:94-96` also emits the GTM noscript iframe. Two distinct tracking IDs/libraries both parse and fire on `/`, doubling third-party JS execution and pageview hits during the interactive window — a plausible INP/TBT contributor, not measured in ms here. | Consolidate to one implementation: if GTM container `GTM-5V7DRKB` already contains a GA4 tag pointed at `G-8GZ2HM5LBZ` (likely, given the naming), delete the redundant `<Script>` block at `src/app/page.js:117-129`. If not, remove the manual gtag injection in `src/app/providers.js:9-43` and let GTM own tag firing.

Medium | Weak edge cache-control on static image assets | `curl -I https://arbovert.cz/images/realizace/liliovnik-prachatice/IMG_8291.jpg` → `cache-control: public, max-age=14400, must-revalidate` (4 hours) and `cf-cache-status: REVALIDATED` (not `HIT`) for a file that never changes between deploys of a static export. Short cache lifetime forces repeat revalidation/re-fetch on return visits. | Add a Cloudflare Cache Rule for `/images/*` setting `Cache-Control: public, max-age=31536000, immutable`. Because filenames under `public/images/` are not content-hashed, pair this with a filename change whenever an existing image is replaced (otherwise stale cached copies persist for a year).

Low | No Speculation Rules for likely next-navigations | `preload_check.py https://arbovert.cz/ --json` → `score: 75`, single recommendation: `Add <script type="speculationrules"> for prefetch+prerender on top user-paths`. Not a Core Web Vital itself but affects perceived navigation speed to `/sluzby` and `/realizace`. | Add a speculation-rules block (prefetch, moderate eagerness) in `src/app/layout.js` targeting the primary nav links.

Info | Homepage hero LCP path is already correctly optimized — use as the template | `src/components/Welcome.js:39-56`: Cloudinary URLs with `f_auto,q_auto`, correct responsive widths (`w_828` mobile / `w_1920` desktop), `priority={true}`, `fetchPriority="high"`. `src/app/layout.js:79-89` preloads both variants with matching `media` queries, and `layout.js:75-77` preconnects/dns-prefetches `res.cloudinary.com`. `preload_check.py` confirmed `lcp_resource_hints.preload_lcp_candidate: true` and `fetchpriority_high: 2`. No action needed here.

Info | No web-font loading risk (no FOIT/FOUT) | `src/styles/globals.css:27-38` — system font stack only (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, ...`), no `@font-face` or `next/font` usage anywhere in the repo. Eliminates a common CLS/LCP-delay source entirely.

Info | No missing-dimension `<img>`/`<Image>` found (structural CLS risk looks low) | Every `<Image>` usage checked (`src/components/Welcome.js`, `TrustSection.js`, `Intro.js:44-47` with explicit `width={800} height={800}`, `NavBar.js`, `Footer.js`, `src/app/sluzby/[slug]/ServicePageClient.js:52-58` with explicit `width={400} height={300}`, `src/app/realizace/page.js`, `src/app/realizace/[slug]/page.js`) either sets explicit `width`/`height` or uses `fill` inside a parent with a fixed-height/aspect Tailwind class (`h-48`, `h-64`, `h-96`, `aspect-square`). This was not confirmed with a live layout-shift trace (no Lighthouse run), so treat as a structural indicator, not a measured CLS score.

Info | Service page images are already reasonably sized | `public/images/service/*.jpg` are 40–80KB each (e.g. `kaceni.jpg` 71KB, `osetreni.jpg` 52KB) — not a bottleneck. One unrelated file, `public/images/service/strom-cropped.jpg` (1.28MB), was not found referenced in `src/data/arbo.js` `imageSrc` values — flagging as possible dead weight, unverified whether it's used elsewhere.

## Not measured / could not confirm
- Real LCP/INP/CLS values at the 75th percentile (CrUX unavailable).
- Lab LCP/INP/CLS timing in milliseconds (no Lighthouse trace run in this session).
- Total transferred page weight / waterfall timing for the three page types under
  realistic network throttling.
