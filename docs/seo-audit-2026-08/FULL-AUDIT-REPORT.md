# SEO Audit — arbovert.cz

**Date:** 18 August 2026 · **Business type:** Local Service (hybrid — two published street
addresses plus a wide service area) · **Pages analysed:** 30 (28 in sitemap + `/gdpr`, all HTTP 200)

## SEO Health Score: 55 / 100

| Category | Weight | Score | Contribution |
|---|---|---|---|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality | 23% | 44 | 10.1 |
| On-Page SEO | 20% | 62 | 12.4 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance (CWV) | 10% | 45 | 4.5 |
| AI Search Readiness | 10% | 46 | 4.6 |
| Images | 5% | 35 | 1.8 |
| **Total** | **100%** | | **55.2** |

Two further categories were assessed but sit outside the weighting model:

| Category | Score | Note |
|---|---|---|
| Local SEO | 34 | For a service-area business this is the most commercially important number in the audit. The health score understates it. |
| Search Experience (SXO) | 51 | Page-type fit is mostly right; one page type is missing entirely. |
| Backlinks | Insufficient data | Free tier only — see limitations. |

The On-Page and Images scores are the orchestrator's aggregation of evidence from the
content, technical and performance specialists; no separate specialist produced them.

## Top 5 issues

1. **Google Business Profile status is unknown.** For a local service business this is the
   dominant ranking factor and it could not be verified from outside — Google served
   consent walls. Two Firmy.cz/Mapy.cz listings do exist, both under the generic category
   "Údržba zeleně a rekultivace" rather than anything arborist-specific.
2. **No pricing content of any kind.** Zero "Kč" on 30 pages, against a SERP for
   "kácení stromů cena" made up entirely of ceník pages. A whole page type is missing.
3. **Realization photos are unprocessed camera JPEGs.** `public/images/realizace/` is
   193MB across 60 files; 49 of the site's 97 image files exceed 1MB. `IMG_8291.jpg` is
   4032×3024 and 6.28MB, served into a 256–384px box, as the LCP image on its page.
4. **No page emits `<link rel="canonical">`.** All 30 lack it. `src/hooks/use-canonical-url.js`
   exists but has zero call sites — it is dead code, and no page sets `alternates.canonical`.
5. **Three contradictory experience claims.** "14+ let" in metadata, "12+ let" on `/o-nas`
   and `/kontakt`, and a computed 15 in the hero — plus `foundingDate: 2011` in schema
   against an ARES registration date of 2020-09-17.

## Top 5 quick wins

1. Add `alternates.canonical` to every metadata export, and delete the dead hook.
2. Add the missing `FooterLink` for `/sluzby/prorezavani-ovocnych-stromu` — it has 1
   internal link against roughly 30 for its six siblings (`src/layouts/Footer.js:48-88`).
3. Add `/gdpr` to `public/sitemap.xml` and correct the stale `lastmod` on 9 URLs.
4. Fix the missing space in the homepage H1 (`src/components/Welcome.js:69-72`).
5. Reconcile the experience number to one computed source.

## Technical SEO — 74

Crawlability is genuinely good: http→https and www→apex both single-hop 301, trailing
slashes 308 to the canonical form, a real 404 on unknown paths, valid robots.txt with the
sitemap declared, and content fully present in the server HTML (static export, no SPA
dependency).

Against that: no page emits a canonical tag; there are no HSTS or CSP headers (both fixable
only at the Cloudflare edge, since a static export has no server runtime); `src/app/layout.js:73`
hardcodes a robots meta tag that duplicates and conflicts with the metadata API's output
(on the 404 page this yields `index,follow`→`noindex`→`index,follow`); no `BreadcrumbList`
anywhere; and one service page is orphaned from the footer navigation.

The legacy URL `/inventarizace-drevin.html` still appears in search results and returns a
genuine 404 — a 301 to `/sluzby/inventarizace-drevin` would recover any residual equity.

## Content Quality — 44

Service pages run 142–200 words and realization pages 143–221, against a median of 157
across the site. The specialist measured them at 18–25% of its topical-coverage floor.
Treat that floor as a heuristic rather than a rule — but the direction is not in doubt:
`/sluzby/inventarizace-drevin` at 169 words is competing against long-form methodology and
tender documentation.

The 17 realization pages follow an identical three-paragraph template. Measured word-level
Jaccard overlap is 0.13, so this is structural repetition, not duplicate content — it will
not trigger a penalty, but it caps how much each page can distinguish itself.

Real credentials exist (ETW certification, SZKT) and real clients are named (ČEZ, Povodí
Vltavy, Zámek Kozel, Týnský chrám). They surface only on the homepage: `TrustSection` is
imported in `src/app/page.js` and nowhere else, so `/o-nas` and `/kontakt` — the two pages
a cautious customer actually opens — carry no proof at all.

Zero internal links connect `/sluzby/*` to the `/realizace/*` pages that prove those exact
services. That is the largest structural content gap in the audit.

## On-Page SEO — 62

Every page has exactly one H1. All 30 titles and all 30 meta descriptions are unique and
keyword-targeted in Czech — genuinely well written, not boilerplate.

Nine titles exceed 60 characters and will truncate in the SERP (the homepage at 74 is the
worst). Eight meta descriptions fall under 120 characters and six exceed 160. Service pages
use the brand name "Arbovert" as their H2 (`ServicePageClient.js:34`) — a wasted heading on
every one of the seven. The service-page CTA uses `router.push` rather than a crawlable
`<NextLink>`, so it passes no link equity, while `realizace/[slug]/page.js:138-146` already
does this correctly.

## Schema / Structured Data — 55

Valid JSON-LD, server-rendered, no deprecated types — but on only 8 of 30 pages. All 17
realization pages, both index pages, `/o-nas`, `/kontakt` and `/gdpr` emit nothing.

The Praha `PostalAddress` omits the required `postalCode` and its locality disagrees with
the NAP shown on `/kontakt`. The business entity is redeclared eight times with no `@id`
linking them: the homepage `LocalBusiness` has no `@id`, and each service page re-declares
a stub `provider`. One `LocalBusiness` node carries an array of two unrelated addresses and
geo points. `sameAs` links `vyskoveprace-arbovert.cz` — a separate facade and roof-work
business sharing the brand — as though it were the same entity.

Missing with real value here: `BreadcrumbList`, `WebSite`, and `Article` on the 17 dated
case studies. Ready-to-paste JSON-LD for all of these is in `findings/schema.md`.

The existing `FAQPage` is valid and well built. Google retired FAQ rich results for all
sites on 7 May 2026, so it no longer earns a SERP feature — keep it, don't extend it.

## Performance — 45

**No field data.** No Google API credentials are configured, so CrUX and PageSpeed were
unavailable, and no Lighthouse trace was run. There are no measured LCP, INP or CLS values
in this audit. Everything below is static analysis of file weights, response headers and
markup.

The homepage hero is done well — Cloudinary with `f_auto`/`q_auto`, preloaded, with
`fetchpriority` — and should be the template for everything else.

Everything else is not. 16 of 17 realization pages use a raw camera JPEG as their LCP
image. `next.config.js` sets `unoptimized: true`, which is correct for a static export but
means local images get no resizing at all — whatever is committed is what ships. The
realization hero `<Image>` at `src/app/realizace/[slug]/page.js:94-99` has neither
`priority` nor `sizes`. Images are served with a 4-hour `max-age` and returned
`cf-cache-status: REVALIDATED` rather than `HIT`. GTM and a separate GA4 `gtag.js` both
load on the homepage.

## Images — 35

`public/images/` totals 201MB; `realizace/` alone is 193MB across 60 files, averaging
3.2MB. 49 of 97 files exceed 1MB. Portrait originals are force-cropped into wide banners —
`strom.webp` is 1200×1800 displayed at 1920×320, discarding roughly 85% of the frame.

The one bright spot: every `<img>` on all 30 pages carries a non-empty alt attribute, and
the Kozel realization already uses ~300KB WebP files. That is the pattern to copy.

## AI Search Readiness — 46

Cloudflare prepends a managed block to your `public/robots.txt` that disallows GPTBot,
ClaudeBot, CCBot, Google-Extended, Bytespider, Amazonbot, Applebot-Extended and
meta-externalagent. Your repo file allows everything — the live file is Cloudflare's, and
only the dashboard can change it.

Tested live: all of those user-agents, plus Googlebot and Bingbot, returned HTTP 200 with
byte-identical content. Nothing is enforced at the edge; the block is declarative, and
compliant crawlers will self-exclude anyway. `OAI-SearchBot` and `PerplexityBot` are *not*
in the block, so ChatGPT search and Perplexity can still retrieve and cite. What is blocked
is mostly training-corpus collection. This is a business decision, not a defect — but it
should be a deliberate one.

`Content-Signal: ai-train=no` opts out of training only; it does not restrict AI-search
retrieval. `llms.txt` returns 404 (optional, and Google ignores it).

The homepage FAQ is the most citable content on the site — five self-contained answers of
67–95 words, one citing zákon č. 114/1992 Sb. The service pages have no equivalent.

## Local SEO — 34

NAP is consistent: the phone, email and legal name are identical across all 30 pages and
the homepage JSON-LD, and IČO 02059690 / DIČ CZ02059690 match ARES exactly.

**Unverified:** whether a Google Business Profile exists, and its category, verification
status, rating and review count. Google Maps and Search served consent-wall redirects.
This is an open question, not a negative finding — it needs a manual login check.

Two live Firmy.cz/Mapy.cz listings were confirmed, both categorised as "Údržba zeleně a
rekultivace" rather than arborist-specific. No review signal appears anywhere — no
`aggregateRating`, no visible rating or count on any page. No insurance or liability
statement exists anywhere on the site (searched all 30 pages for "pojišt/pojist" — zero
matches), which for tree-felling work is a standard Czech trust signal.

ARES records the legal entity's founding as 2020-09-17, against the site's "since 2011".
Most likely a predecessor OSVČ — worth one clarifying sentence so it doesn't read as
inflated to anyone who checks.

**Do not build templated city landing pages.** The 17 place-named realization pages already
do the geographic work with real content and real photographs. At this size, templated city
pages would fail the doorway-page quality gate.

## Search Experience — 51

Page-type fit is broadly right for the arborist queries tested, with one total mismatch:
every result for "kácení stromů cena" is a dedicated ceník page, and there is no pricing
content on the site at all — one qualitative line buried in a homepage FAQ accordion.

The homepage competes with `/sluzby/likvidace-drevni-hmoty` for "štěpkování dřevní hmoty
Praha". The contact page promises a next-business-day response, which contradicts the
emergency-felling positioning elsewhere. Weakest persona: the price-comparing homeowner
(30/100). Strongest: the portfolio-comparing shopper (68/100), carried by the case studies.

## Visual / Mobile — 58

No horizontal overflow at 360, 375, 650, 651 or 1920, and the 650px breakpoint switches
cleanly. Hero contrast is fine and the H1 is above the fold everywhere.

But the cookie banner occupies the bottom 140px of an 812px mobile viewport and clips the
primary "Chci nabídku zdarma" button mid-height, on every page type. And the header phone
link measures `left: 415` at 375px width — off-screen, inside the closed drawer. On mobile,
a visitor with a storm-damaged tree sees a logo and a hamburger. The hamburger itself is a
24×24 tap target against the 44×44 guidance.

Service pages open on mobile as an undifferentiated wall of bold text with no image, no CTA
and no phone number visible.

## Backlinks — insufficient data

Free tier only: Moz, Bing Webmaster and DataForSEO are all unconfigured. Common Crawl
confirms the domain is crawled and ranked (PageRank rank ~23.9M, harmonic centrality
~17.3M) — normal sparsity for a small local site, not a penalty signal. Common Crawl's
domain-level API exposes no referring-domain list, so no individual inbound link could be
named, and no toxicity screen was possible. Treat this as a snapshot, not a link profile.

The realization pages name Zámek Kozel, Zámek Nebílovy, Zámek Vlachovo Březí, Týnský chrám,
ČEZ and nine municipalities. Offering those organizations the already-published case-study
photos and text is a realistic zero-budget link angle that requires no new pages.

## Audit limitations

- **No Google field data.** No CrUX, no PageSpeed, no Search Console, no GA4. There are no
  measured Core Web Vitals in this report, and no indexation or impression data.
- **No GBP verification.** Blocked by consent walls; needs a manual check.
- **No rank data.** No DataForSEO or rank tracker. SERP evidence comes from search result
  sets, not confirmed Google top-10 positions.
- **No real backlink index.** See above.
- **Environment.** This machine sits behind Cloudflare Zero Trust TLS inspection; the
  bundled tools needed a patched CA bundle to reach the site at all. Unrelated to the site.
