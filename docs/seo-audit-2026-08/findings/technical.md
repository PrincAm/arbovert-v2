# Technical SEO — arbovert.cz

Audited: 2026-08-18. 30 URLs (28 sitemap + /gdpr), all HTTP 200 per pre-crawl. Live checks
below via curl against production (Cloudflare-fronted). Source-level fixes verified against
`/Users/adam/git/arbovert-v2` (static export, Next.js 16, App Router).

## Technical Score: 74/100

Crawlability 90 | Indexability 55 | Security 55 | URL structure 95 | Mobile 80 (partial) |
Core Web Vitals 70 (source-inspection only, no lab/field data) | Structured data 65 |
JS rendering 95 | Internal linking 70 | IndexNow 0 (not implemented)

---

## 1. Crawlability — 90/100

- Sitemap: declared in robots.txt (`Sitemap: https://arbovert.cz/sitemap.xml`), fetched
  successfully (200, valid `urlset`), confirmed via `sitemap_discovery.py` — PASS. No
  `sitemap_index.xml` / `wp-sitemap.xml` fallback needed since the declared sitemap
  validates.
- robots.txt is Cloudflare-managed (auto-injected "BEGIN/END Cloudflare Managed content"
  block) plus the repo's own rules (`public/robots.txt`). For `User-agent: *` it sets
  `Content-Signal: search=yes,ai-train=no,use=reference` and `Allow: /` — mainstream search
  crawlers (Googlebot, Bingbot) are NOT blocked, so classic organic indexing is unaffected.
  Separately it fully `Disallow: /` for named AI crawlers: Amazonbot, Applebot-Extended,
  Bytespider, CCBot, ClaudeBot, CloudflareBrowserRenderingCrawler, Google-Extended, GPTBot,
  meta-externalagent. Content-Signal is a new (2025) opt-in extension most crawlers don't yet
  honor, so the explicit per-bot `Disallow` blocks are what actually stops those specific UAs
  (Cloudflare also enforces this at the edge for zones with "Block AI Bots" enabled). Net
  effect: the site opts out of AI-training use of its content and blocks crawlers used for
  that purpose, but does not block AI answer-engine crawlers with other UAs (e.g.
  OAI-SearchBot, PerplexityBot are not in the list) or classic search engines.
- No `noindex` found on any of the 30 pages' robots meta (per `onpage.json`, all
  `index, follow`). One exception: the Next.js default not-found page correctly emits
  `noindex` (see Indexability #3 below for the conflicting-tags caveat).

**Findings:**
- Info | Cloudflare Content-Signal / AI-crawler robots.txt | `Content-Signal: search=yes,ai-train=no,use=reference` for `*`, plus explicit `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Amazonbot, Applebot-Extended, meta-externalagent, CloudflareBrowserRenderingCrawler (verified live at https://arbovert.cz/robots.txt) | No action required for organic SEO. If the business wants visibility in AI answer engines (ChatGPT, Perplexity, Gemini), confirm this default Cloudflare policy is an intentional choice — it currently blocks AI-training crawlers but not necessarily all AI-search crawlers. Decision belongs to the site owner, not a technical defect.

## 2. Indexability — 55/100

- **Canonicals: 0 of 30 pages emit `<link rel="canonical">` in server HTML** (confirmed
  again live on `/` and `/sluzby/rizikove-kaceni-stromu`). Root cause traced in the repo:
  - `src/app/layout.js:66` sets `metadataBase: new URL('https://arbovert.cz')`, but **no**
    page (`src/app/page.js`, `src/app/sluzby/page.js`, `src/app/sluzby/[slug]/page.js`,
    `src/app/realizace/page.js`, `src/app/realizace/[slug]/page.js`, `src/app/o-nas/page.js`,
    `src/app/kontakt/page.js`, `src/app/gdpr/page.js`) ever sets `alternates: { canonical }`
    in its `metadata`/`generateMetadata` export. Next.js only emits a canonical tag when
    `alternates.canonical` is set (or inherited); `metadataBase` alone does not generate one.
  - `src/hooks/use-canonical-url.js` exists (`"use client"` hook, computes
    `https://arbovert.cz${pathname}`) but **is dead code** — `grep -rn "useCanonicalUrl" src/`
    returns zero call sites. It is not the cause of a "client-side-only" injection; it is
    simply unused and injects nothing, client or server.
  - Real indexing risk on a static export behind Cloudflare: currently **low-to-moderate**,
    not critical. http→https and www→apex both redirect cleanly (single-hop 301 to
    `https://arbovert.cz/`, verified live), and trailing-slash URLs 308-redirect to the
    no-trailing-slash canonical form (verified on `/sluzby/rizikove-kaceni-stromu/`). So the
    obvious duplication vectors are already closed by redirects, not canonicals. But there is
    no safety net for tracking-parameter variants (`?utm_source=`, `?fbclid=`, etc.), which
    Google can index as separate near-duplicate URLs absent a self-referencing canonical, and
    the site has no other consolidation signal. This is a missing best-practice / weak
    signal-consolidation issue, not a blocked-indexing issue — rated High, not Critical.
  - Fix: add `alternates: { canonical: '<absolute-url>' }` to each page's metadata export
    (static pages: `src/app/page.js`, `src/app/o-nas/page.js`, `src/app/kontakt/page.js`,
    `src/app/gdpr/page.js`, `src/app/sluzby/page.js`, `src/app/realizace/page.js`; dynamic
    pages via `generateMetadata` in `src/app/sluzby/[slug]/page.js` and
    `src/app/realizace/[slug]/page.js`, building the URL from the slug). Then either delete
    `src/hooks/use-canonical-url.js` (genuinely unused) or wire it in if there's a reason to
    keep a client-side hook — but the server metadata fix is what actually renders the tag.

- **Duplicate/conflicting robots meta tags.** `src/app/layout.js:73` hardcodes
  `<meta name="robots" content="index, follow" />` directly in the `<head>` JSX, in addition
  to the `robots: { index: true, follow: true }` field already declared in the `metadata`
  export (`layout.js:43-46`), which Next.js's Metadata API also renders as a `<meta
  name="robots">` tag. Confirmed live: the homepage HTML contains **two** identical
  `<meta name="robots" content="index, follow"/>` tags. On the default Next.js not-found
  page (no custom `src/app/not-found.js` exists in the repo) this becomes three tags in
  the response: `index, follow` (from the hardcoded layout tag) → `noindex` (Next's built-in
  not-found metadata) → `index, follow` again. Confirmed live on
  `https://arbovert.cz/this-page-does-not-exist-xyz123` (HTTP 404, body has both `<title>404:
  This page could not be found.</title>` and a stray `<title>Arbovert - Arborista
  Praha...</title>`, plus the three robots tags in that order). Google's documented behavior
  is to honor the most restrictive directive when conflicting robots meta tags are present,
  so `noindex` likely still wins for Google specifically — but this is unverified for other
  crawlers, and the duplicate/conflicting markup is genuine technical debt regardless.
  - Fix: remove the hardcoded `<meta name="robots" content="index, follow" />` from
    `src/app/layout.js:73` and rely solely on the `robots` field in each page's `metadata`
    export (root layout's `robots` field already covers pages that don't override it).

- 404 handling: made-up URL `https://arbovert.cz/this-page-does-not-exist-xyz123` correctly
  returns **HTTP 404** (not a soft-404 200) with `Cache-Control: no-store` — PASS on status
  code. No custom `not-found.js` in `src/app/`, so it's Next's generic English "This page
  could not be found." page on a Czech-language site — Low severity UX/i18n gap, not an
  indexing problem given the correct 404 status + noindex.

- Trailing-slash and host-normalization: single canonical form enforced via redirects
  (verified live, see above) — PASS.

**Findings:**
- High | No page emits `<link rel="canonical">` (0/30) | Verified live on `/` and `/sluzby/rizikove-kaceni-stromu`; root cause is missing `alternates.canonical` in every page's metadata export, not the unused `src/hooks/use-canonical-url.js` hook | Add `alternates: { canonical }` to each metadata/generateMetadata export listed above.
- Medium | Duplicate `<meta name="robots">` tag on every page | `src/app/layout.js:73` (hardcoded) duplicates `layout.js:43-46` `robots` metadata field; confirmed 2x identical tags in live homepage HTML | Delete the hardcoded tag at `layout.js:73`.
- Medium | Conflicting robots directives on 404 page | Live fetch of a made-up URL returns `index,follow` → `noindex` → `index,follow` in that order, plus a duplicate/incorrect `<title>` fragment from the homepage | Same fix as above (removing the duplicate hardcoded tag resolves the conflict); optionally add `src/app/not-found.js` with a Czech-language error page.
- Low | Default (English) 404 page on a Czech-only site | `<title>404: This page could not be found.</title>` / `<h1>404</h1>` (Next.js default) | Add `src/app/not-found.js` with Czech copy and a link back to `/`.

## 3. Security — 55/100

Live response headers on `https://arbovert.cz/` (curl -D, Cloudflare edge):
present: `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`,
served over HTTPS via Cloudflare with HTTP/2. Absent: `Strict-Transport-Security` (HSTS),
`Content-Security-Policy`, `X-Frame-Options`, `Permissions-Policy`. Same set (nosniff +
referrer-policy only) confirmed on `/robots.txt` and the 404 response — the gaps are
site-wide, not page-specific.

Since this is a static export with `output: 'export'` and no server runtime (per
`CLAUDE.md`), these headers cannot be set in Next.js middleware/`next.config` at request
time — they must be added at the edge. The site is already Cloudflare-fronted, so this is a
Cloudflare Transform Rules / Response Headers configuration change, not a repo code change.

**Findings:**
- High | No HSTS (`Strict-Transport-Security`) | Confirmed absent from live headers on `/`, `/robots.txt`, and the 404 page | Add via Cloudflare (SSL/TLS → Edge Certificates → "Always Use HTTPS" + HSTS, or a Cloudflare Transform Rule / Response Header rule). Since http→https already redirects cleanly, start with a conservative `max-age` (e.g. 6 months) before preloading.
- High | No Content-Security-Policy | Confirmed absent live | Add via Cloudflare Transform Rules (Response Headers). Needs to allowlist `res.cloudinary.com` (hero/gallery images), `www.googletagmanager.com` (GTM, per `src/app/layout.js`), and EmailJS's endpoint (`@emailjs/browser`, client-side form per `CLAUDE.md`). Build and test carefully — CSP is easy to break with a static export that has no server to iterate against; recommend `Content-Security-Policy-Report-Only` first.
- Medium | No X-Frame-Options / frame-ancestors | Confirmed absent live | Add `X-Frame-Options: DENY` or `frame-ancestors 'none'` via CSP, at Cloudflare edge.
- Low | No Permissions-Policy | Confirmed absent live | Add a minimal Permissions-Policy (e.g. disable camera/microphone/geolocation) via Cloudflare edge.
- Info | `Access-Control-Allow-Origin: *` on HTML documents | Confirmed live on `/` and `/robots.txt` (appears to be a Cloudflare default, not repo config) | Not a vulnerability for public marketing pages with no auth/cookies, but worth confirming it's intentional rather than a blanket Cloudflare CORS default applied to non-API responses.

## 4. URL Structure — 95/100

All 30 URLs (`urls.txt`) use clean, lowercase, hyphenated, semantic paths with no query
strings, no session IDs, no case inconsistencies, 2-level-deep hierarchy
(`/sluzby/<slug>`, `/realizace/<slug>`) — PASS. http→https and www→apex both single-hop
301 redirects to the canonical host (verified live). Trailing slash 308-redirects to the
non-trailing-slash form (verified live) — one consistent canonical URL form is served
site-wide even without `<link rel="canonical">` backing it up.

- Info | Redirect chains are single-hop everywhere tested | `http://arbovert.cz/` → 301 → `https://arbovert.cz/`; `https://www.arbovert.cz/` → 301 → `https://arbovert.cz/`; `https://arbovert.cz/sluzby/rizikove-kaceni-stromu/` → 308 → `/sluzby/rizikove-kaceni-stromu` (all curl-verified) | No action needed.

## 5. Mobile — 80/100 (partial — source inspection only)

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present once,
  correctly, in `src/app/layout.js` output on every page checked — PASS.
- Responsive breakpoint at 650px via `useIsMobile()` per `CLAUDE.md`; Tailwind v4 utility
  classes throughout the crawled HTML (e.g. `object-cover`, responsive grid classes) suggest
  a mobile-first layout, but tap-target sizing, font-scaling and layout-shift-on-resize could
  not be verified without a rendered/visual check (no `capture_screenshot.py` /
  `analyze_visual.py` run in this pass) — **unverified**, not scored as a defect.

## 6. Core Web Vitals — 70/100 (source-inspection only; no PageSpeed/CrUX/lab data — not configured)

- **LCP**: homepage hero image is preloaded with responsive `media` queries
  (`src/app/layout.js:78-89`, mobile/desktop variants via Cloudinary `w_828`/`w_1920` with
  `f_auto,q_auto`) — a correct, deliberate LCP optimization. No PageSpeed/CrUX credentials
  configured, so an actual LCP time could not be measured.
- **CLS**: images inspected in raw HTML consistently carry explicit sizing — the logo has
  literal `width="180" height="62"`, and content images use Next/Image `fill` mode
  (`data-nimg="fill"`, `position:absolute; height:100%; width:100%` inline styles) inside
  what appear to be sized containers (e.g. `realizace_osetreni-lipy-zamek-kozel.html`).
  This is a good CLS pattern in principle, but confirming the parent containers have a fixed
  aspect-ratio/height at all viewport widths would require rendered/visual verification not
  performed here — **partially verified**.
- **INP**: no interactive widgets beyond nav/menu/gallery/contact form were inspected for
  handler cost; no field or lab data available. Not measured.
- Realization pages carry high image counts per page (5-19 `<img>` per `onpage.json`) all
  using `loading="lazy"` — good for initial load, but worth confirming below-the-fold
  gallery images don't cause layout shift as they lazy-load in.

- Info | No PageSpeed Insights / CrUX / lab CWV data available | Google API credentials not configured per `CONTEXT.md` | Recommend running PageSpeed Insights or Lighthouse manually before treating CWV as fully assessed; this report only covers what's inferable from HTML source.

## 7. Structured Data — 65/100

- JSON-LD present on `/` (`LocalBusiness` + `FAQPage`, confirmed via live
  `structured_data` block in `home.json`: types include `LocalBusiness`, `PostalAddress`,
  `GeoCoordinates`, `AdministrativeArea`, `City`, and `FAQPage`/`Question`/`Answer`) and on
  all 7 `/sluzby/*` pages (`Service` type per `onpage.json`).
- **No JSON-LD** on `/realizace` index, the 20 `/realizace/*` detail pages, `/o-nas`,
  `/kontakt`, `/gdpr`, or `/sluzby` index (per `onpage.json`, `jsonld: []` on all of these).
  Realization/case-study pages are a natural fit for `ImageObject`/`CreativeWork` or
  breadcrumb markup, currently absent.
- Info | `FAQPage` schema on homepage | Google retired FAQ rich results for all sites on 7 May 2026. Flagging as Info only — this is now inert for SERP purposes but not harmful. Do not remove it solely for that reason, and do not add new FAQPage markup expecting a rich-result benefit.
- Medium | No `BreadcrumbList` schema anywhere | Confirmed absent from all `jsonld` arrays in `onpage.json` | Add breadcrumb JSON-LD to `/sluzby/[slug]` and `/realizace/[slug]` pages (Home > Služby > <service> / Home > Realizace > <realization>) — straightforward win given the site's clean 2-level URL hierarchy already matches the breadcrumb structure.
- Low | No structured data on 20 realization detail pages | Confirmed `jsonld: []` for all `realizace_*` entries in `onpage.json` | Consider `ImageObject` for the gallery photos or a minimal `Article`/`CreativeWork` per realization in `src/app/realizace/[slug]/page.js`'s `generateMetadata`/render.

## 8. JavaScript Rendering — 95/100

- Static export (`output: 'export'`) confirmed working as intended: `render_page.py` on the
  homepage returned `is_spa: false`, `mode_used: "raw"` (no Playwright needed), and
  `extracted_text` (trafilatura, boilerplate-stripped) contains the real page copy — content
  is fully present in server-rendered HTML, not injected client-side. PASS — no JS rendering
  is required for crawlers to see the content.
- The only client-side-only code found relevant to SEO output is `src/hooks/use-canonical-url.js`
  (a `"use client"` hook) — but it is unused (see Indexability #1), so it has zero effect on
  the rendered output either way. It is not suppressing or delaying canonical tags; the tags
  simply don't exist anywhere in the pipeline.
- GTM script is loaded async with a `<noscript>` fallback iframe (`src/app/layout.js:92-97`)
  — correct pattern, doesn't block rendering or content visibility.

- Low | Dead client-side hook | `src/hooks/use-canonical-url.js` has no call sites (`grep -rn "useCanonicalUrl" src/` → 0 results) | Delete it, or wire it into a `generateMetadata`-based fix per Indexability #1 (the metadata-export approach is preferred since it renders server-side and works for a static export).

## 9. Internal Linking (30 URLs) — 70/100

Link graph built from `href="/..."` attributes across all 30 crawled HTML files.

- Home, all 7 `/sluzby/*` pages, `/realizace`, `/o-nas`, `/kontakt`, `/gdpr` each receive
  ~30 inlinks (present in the sitewide nav/footer) — no orphans among top-level and service
  pages.
- **Exception: `/sluzby/prorezavani-ovocnych-stromu` receives only 1 inlink** (from the
  `/sluzby` index page), versus ~30 for its 6 sibling service pages. Root cause: the sitewide
  footer's two service-link columns (`src/layouts/Footer.js` lines 48-67 "Služby Praha" and
  69-88 "Arboristika Jižní Čechy") hardcode 4 links each, covering only 6 of the 7 services —
  `prorezavani-ovocnych-stromu` ("Prořezávání ovocných stromů") is omitted from both columns.
  It's not a true orphan (reachable from `/sluzby` and present in the sitemap), but it gets
  dramatically less internal link equity than every other service page.
- All **20 realization detail pages receive exactly 1 inlink each**, only from the
  `/realizace` index listing — none link to each other (no "related realizations" /
  cross-linking), and none are linked from top-level nav, home, or service pages. Depth from
  home is only 2 clicks (Home → Realizace → detail), so this isn't a crawl-depth problem, but
  the link-equity concentration is thin and there's no topical cross-linking between related
  case studies (e.g. the many lime-tree/`lip-*` realizations don't reference each other).

**Findings:**
- Medium | `/sluzby/prorezavani-ovocnych-stromu` missing from sitewide footer | `src/layouts/Footer.js:48-88` hardcodes 6 of 7 service links in two columns; confirmed via link-graph analysis (1 inlink vs. ~30 for siblings) and by grepping `home.html` for the slug (zero matches) vs. `sluzby.html` (present) | Add a `FooterLink` for `/sluzby/prorezavani-ovocnych-stromu` to one of the two columns in `Footer.js` (e.g. "Prořezávání ovocných stromů Praha"/"Šumava").
- Low | Realization detail pages have no cross-linking | Confirmed: each of the 20 `/realizace/*` pages has exactly 1 inlink, all from `/realizace` | Add a small "related realizations" block (e.g. 2-3 links to other case studies) in `src/app/realizace/[slug]/page.js` to distribute internal link equity and improve topical relevance signals.

## IndexNow Protocol — 0/100 (not implemented)

- No IndexNow key file found and no IndexNow API call code found:
  `grep -rn "indexnow" src/ public/` returned no matches.
- Low | IndexNow not implemented | Confirmed via repo grep, no key file in `public/` | Since `realizations.js` publishes new pages roughly monthly (per `CLAUDE.md`'s `// --- MONTH N ---` markers) and the sitemap is updated by hand for each publish, an IndexNow ping (Bing/Yandex/Naver) on each new realization/sitemap update would be a low-effort way to speed up non-Google discovery. Given this is a static export with no server runtime, implementation would need to be a build/CI step or a manual curl after each deploy, not application code.

---

## Not measured (say so explicitly)
- PageSpeed Insights / CrUX field data (Google API credentials not configured).
- GSC/GA4 data (not configured).
- Actual rendered mobile viewport screenshots / tap-target measurements (no visual check run this pass).
- Whether Google/Bing/other crawlers actually treat the duplicate `index,follow`+`noindex` combination on the 404 page as noindex — inferred from Google's documented "most restrictive wins" policy, not directly tested.
