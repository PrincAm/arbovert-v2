# SXO (Search Experience Optimization) Audit — arbovert.cz

**SXO Gap Score: 51/100** (separate from any SEO Health Score elsewhere in this audit)

Method: SERP-backwards analysis on 6 Czech queries the business competes for, via WebSearch
(no DataForSEO/rank tracker available — see Limitations). Target pages fetched from the
pre-crawled HTML in `scratchpad/pages/*.html` and cross-referenced against source files in
`/Users/adam/git/arbovert-v2`.

---

## Headline finding: partial page-type mismatch, concentrated in one query cluster

The site's base page type (Service Page — service description + phone + contact form) is
**broadly aligned** with what ranks for most of the arborist/service queries tested. The
mismatch is not systemic — it is concentrated and severe in one specific, high-intent
cluster: **pricing/cost queries have no matching page type on arbovert.cz at all.**

### SERP consensus by query

| Query | Dominant page type in results | Target page | Alignment |
|---|---|---|---|
| "rizikové kácení stromů Praha" | Service Page (agency/freelancer sites); several with explicit price ranges or an "insurance up to 10M CZK" trust claim in copy | `/sluzby/rizikove-kaceni-stromu` (Service schema) | **HIGH gap** — right type, missing price/insurance elements competitors show |
| "arborista Praha" | Directory listings (firmy.cz, top 2 results) + Service Pages + **one dedicated price-guide page** ("Kolik stojí péče o stromy \| Kompletní přehled cen 2025", we-wood.eu) ranking for the head term | `/` (homepage) | MEDIUM — homepage/service page present, no directory-style trust bundle (reviews, map) |
| "kácení stromů cena" | **100% dedicated ceník/pricing pages** (7/7 results: drevorubec3.webnode.cz/cenik, rikast.cz/cenik-kaceni-stromu, kaposgreen.cz price-factors article, kaceni-bezrizika.cz/cenik, chranimedomy.cz, treework.cz/cenik, rizikabezrizika.cz/cenik) | **none — no `/cenik` page exists on arbovert.cz** (confirmed against `urls.txt`, 30/30 known URLs) | **CRITICAL — page type absent entirely** |
| "ošetření stromů Praha" | Local directories with review counts (idatabaze.cz x2, firmy.cz, nejremeslnici.cz x2) + a couple of Service Pages (stromoskop.cz, bsarbo.cz) | `/sluzby/odborne-osetrovani-stromu` (169 words, no reviews shown anywhere on-site) | MEDIUM-HIGH — arbovert.cz did not appear in the WebSearch result set for this query (unverified as literal Google top-10, see Limitations) |
| "inventarizace dřevin" | Long-form technical/methodology pages + municipal tender PDFs (GIS output formats, staging/urgency classification) — a B2B/procurement-oriented format | `/sluzby/inventarizace-drevin` (169 words, generic service copy) — arbovert.cz *did* appear (position ~8 of 10) but at `arbovert.cz/inventarizace-drevin.html`, a legacy non-`/sluzby/` URL not in the current sitemap | **CRITICAL content-depth mismatch** for this persona; also flag the stray legacy URL for a redirect/indexing check (Info, cross-ref technical audit) |
| "štěpkování dřevní hmoty Praha" | Service Pages of specialized chipping operators with technical specs (chipper brand/model, max diameter) | Homepage ranked (4th) instead of the dedicated `/sluzby/likvidace-drevni-hmoty` page — **keyword cannibalization**; neither page states chipper capacity or diameter limits | HIGH — cannibalization + missing technical specificity |

**Net read:** the taxonomy mismatch is not "wrong page type" in the CRITICAL/blog-vs-landing
sense — it's a **missing page type** (no pricing/cost page) for one of the most transactional
query patterns in this vertical, plus a content-depth shortfall on the one query cluster
(inventarizace) that skews toward B2B/procurement buyers.

---

## User stories (derived from SERP signals, 3 journey stages)

1. **Urgent storm-damage homeowner** (awareness, emergency).
   *Signal:* competitor SERP title "Rizikové kácení stromů Praha, **rychle a odborně**"
   (bsarbo.cz); "havarijní" framing appears repeatedly in arbovert's own case-study copy
   (`realizace_kaceni-topolu-jerabem-labe.html`: "Havarijní kácení topolů...").
   *Story:* I want someone who can act today, because a tree is threatening my house right
   now, but I'm blocked because the only response-time promise on the whole site is
   **"Ozveme se vám do příštího pracovního dne"** (next business day) — `src/components/ContactUs.js:53,84`.
   That line actively contradicts the urgency this persona needs resolved.

2. **Price-comparing homeowner** (consideration → decision).
   *Signal:* 7/7 results for "kácení stromů cena" are dedicated price-list pages with real
   Kč ranges (e.g. "900–4.900 Kč" style figures).
   *Story:* I want a ballpark cost before I call, because a phone call feels like a
   commitment, but I'm blocked by price sensitivity — the only pricing content anywhere on
   arbovert.cz is one qualitative FAQ answer ("cena se pohybuje **řádově v tisících korun**",
   `src/data/faq.js:18-20`), homepage-only, inside a collapsed FAQ accordion, with no number
   range and no equivalent for the other six services.

3. **Risk-averse trust verifier** (any stage). *Signal:* AI-summary synthesis for "rizikové
   kácení stromů Praha" names liability insurance ("up to 10 million CZK") as a common
   competitor differentiator.
   *Story:* I want to confirm this company is insured and certified before letting them near
   my roof/power lines, because tree work carries real liability risk, but I'm blocked — the
   site shows an ETW certification badge and a link to szkt.cz (`src/components/TrustSection.js:29-37`),
   but that block renders **only on the homepage** (not on service or contact pages,
   confirmed via `grep -rn TrustSection src/app`), and there is no insurance/liability
   statement anywhere I could find (0 hits for "pojišt*" across home.html, kontakt.html, and
   the rizikove-kaceni-stromu service page) and no reviews or star rating anywhere on-site.

4. **Municipal/property-manager buyer commissioning a tree inventory** (decision, B2B).
   *Signal:* SERP for "inventarizace dřevin" is dominated by long methodology pages and
   municipal procurement PDFs describing GIS output formats and urgency/staging
   classification.
   *Story:* I need to see the deliverable meets a procurement spec, because this is a formal
   tender, but I'm blocked by content-depth mismatch — `/sluzby/inventarizace-drevin` is 169
   words of generic pitch with no methodology, output-format, or sample-report detail.

5. **Portfolio-comparing shopper** (consideration).
   *Signal:* Service Page taxonomy requires "at least one case study"; realizace pages
   average 145-220 words (per pre-crawl data).
   *Story:* I want proof of competence on a job like mine, because I'm comparing several
   local arborists, and this is mostly served well — case studies name prestigious sites
   (zámek Kozel, ČEZ, Vyšehrad) and each ends with a working CTA ("Potřebujete podobnou
   službu? Kontaktujte nás" + phone, confirmed in `realizace_osetreni-lipy-zamek-kozel.html`)
   — but each case shows a visible publish date in plain text only ("9. června 2026"), **not**
   in schema (`jsonld: []` for all realizace pages per pre-crawl `onpage.json`), so Google
   cannot use it as a freshness signal even though the content cadence would support one.

---

## Gap Analysis (7 dimensions, 100 pts)

| Dimension | Score | Evidence |
|---|---|---|
| Page Type | 8/15 | Right base type (Service) for most queries; total type-absence for pricing queries; homepage cannibalizes `/sluzby/likvidace-drevni-hmoty` for "štěpkování" |
| Content Depth | 5/15 | Service pages 140-200 words, realizace pages 145-220 words (pre-crawl data) vs. SERP-dominant long-form methodology pages for inventarizace and detailed price/spec pages elsewhere |
| UX Signals | 9/15 | Phone number (`tel:+420739969933`) sits ~2.3KB into `<body>` on every page checked (header nav) — good click-to-call proximity; "zdarma"/"nezávazná nabídka" reassurance present; but stated response SLA is "next business day," no map, no chat |
| Schema | 9/15 | LocalBusiness + FAQPage on `/`, Service schema on all 7 `/sluzby/*` pages (per CONTEXT.md); no Review/AggregateRating (consistent with no visible reviews), realizace pages carry `jsonld: []` despite having a clear publish date in visible text |
| Media | 8/15 | All images carry alt text, homepage has 23 images, realizace pages 5-19 images (pre-crawl data); no video, no map embed, no before/after comparison UI |
| Authority | 8/15 | Real ETW certification badge + szkt.cz link, "od roku 2011"/"14+ let" tenure claims, prestigious case-study clients (zámek Kozel, ČEZ, Vyšehrad, Týnský chrám) — but trust badges render homepage-only (`src/app/page.js:131` `<TrustSection />`, not imported elsewhere), 0 insurance/liability statement found, 0 reviews/star ratings anywhere on-site |
| Freshness | 4/10 | Realizace publish cadence exists in principle (`src/data/realizations.js`, one/month intended per repo convention) but dates are plain text, not `datePublished`/`dateModified` schema, so the signal is invisible to Google |
| **Total** | **51/100** | |

---

## Persona Scoring

| Persona | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|
| Price-Comparing Homeowner | 5/25 | 5/25 | 10/25 | 10/25 | **30/100** | Critical Mismatch |
| Municipal/Tender Buyer (inventarizace) | 10/25 | 8/25 | 10/25 | 12/25 | **40/100** | Needs Work |
| Risk-Averse Trust Verifier | 14/25 | 13/25 | 9/25 | 12/25 | **48/100** | Needs Work |
| Urgent Storm-Damage Homeowner | 15/25 | 12/25 | 10/25 | 14/25 | **51/100** | Needs Work |
| Portfolio-Comparing Consideration Shopper | 18/25 | 16/25 | 16/25 | 18/25 | **68/100** | Good |

### Weakest persona: Price-Comparing Homeowner (30/100)
**Top issue:** zero numeric pricing anywhere on the site; the one FAQ answer that touches
price is qualitative only and homepage-only.
**Recommended fix:** add a real price-range block (even "od X Kč, konečná cena po prohlídce
zdarma" framing, matching how competitors like rizikabezrizika.cz/cenik and treework.cz/cenik.html
present ranges) to each `/sluzby/[slug]` page in `src/data/arbo.js`, and surface the existing
`faq.js` price answer un-collapsed on `/sluzby/rizikove-kaceni-stromu` instead of only inside
the homepage FAQ accordion.

### Systemic issue
**Trust dimension is the low point across every persona (9-16/25)** — no reviews, no
insurance statement, and the one credential block (`TrustSection`) is homepage-only. This is
a single fixable pattern that would lift four of five persona scores simultaneously.

### Priority actions (weakest persona first)
1. Add price-range signals per service (`src/data/arbo.js`) — fixes Price-Comparing Homeowner.
2. Add a methodology/output-format section to `/sluzby/inventarizace-drevin` (sample report,
   GIS/staging terminology) — fixes Municipal/Tender Buyer.
3. Add an insurance/liability statement and render `TrustSection` (or a lighter version of it)
   on `/kontakt` and all `/sluzby/*` pages, not just `/` — fixes Trust Verifier and lifts every
   other persona's Trust score.
4. Change the response-time copy in `src/components/ContactUs.js:53,84` from "next business
   day" to something that doesn't contradict the emergency-felling positioning elsewhere on
   the site, or add a distinct "havarijní zásah" fast-track CTA — fixes Urgent Storm-Damage
   Homeowner.
5. Add `datePublished`/`dateModified` to realizace pages' (currently absent) structured data
   and point `/sluzby/likvidace-drevni-hmoty` internal links/anchor text more aggressively at
   "štěpkování dřevní hmoty Praha" to stop the homepage from cannibalizing it.

---

## Findings (Severity | Title | Evidence | Fix)

- **Critical | No pricing page for a 100%-price-page-dominated query** | 7/7 Google results
  for "kácení stromů cena" are dedicated ceník/pricing pages; `urls.txt` (30/30 known URLs)
  contains no `/cenik` equivalent; 0 "Kč" mentions found in `home.html` | Add a
  `/cenik` (or per-service price range) page; source content in `src/data/arbo.js`, new route
  under `src/app/`.

- **High | Response-time promise contradicts emergency-felling positioning** | The only
  stated SLA site-wide is "Ozveme se vám do příštího pracovního dne" | `src/components/ContactUs.js:53,84`.
  Add a same-day/emergency path for "havarijní" cases, or remove the "next business day" framing
  from urgency-adjacent pages.

- **High | Homepage cannibalizes the dedicated štěpkování service page** | Homepage ranked in
  the WebSearch result set for "štěpkování dřevní hmoty Praha" instead of
  `/sluzby/likvidace-drevni-hmoty` | Strengthen internal linking/anchor text and on-page
  keyword focus on `/sluzby/likvidace-drevni-hmoty` (`src/data/arbo.js`, `likvidace-drevni-hmoty` entry).

- **High | Trust/authority badges are homepage-only** | `TrustSection` (ETW cert + szkt.cz
  link) is imported only in `src/app/page.js:131`; `grep -rn TrustSection src/app` returns no
  other pages | Render a lighter trust strip (cert badge + tenure) on `/kontakt` and all
  `/sluzby/[slug]` pages.

- **Medium | `inventarizace dřevin` service page is far shallower than what ranks** | 169
  words (per pre-crawl `onpage.json`) vs. SERP-dominant long-form methodology/tender content
  | Expand `src/data/arbo.js` `inventarizace-drevin` entry with methodology, output format,
  staging/urgency classification detail; recommend `/seo content` for a full E-E-A-T-oriented
  rewrite.

- **Medium | No insurance/liability statement anywhere on-site** | 0 hits for "pojišt*"
  across `home.html`, `kontakt.html`, `sluzby_rizikove-kaceni-stromu.html`; competitor AI
  summary names liability insurance as a common differentiator for this exact query | Add an
  insurance statement to `src/components/TrustSection.js` and/or `src/data/arbo.js` service
  copy.

- **Medium | No reviews or star ratings anywhere on-site** | 0 hits for "recenz"/"review"/"hvězd"
  across every crawled page | Cannot fix on-page alone — recommend `/seo local` to check GBP
  review volume and consider embedding a review widget (Google/Firmy.cz) once volume supports it.

- **Info | Realizace case studies have a visible date but no date schema** | `jsonld: []` for
  all `realizace/*` pages per pre-crawl `onpage.json`, despite each page showing a plain-text
  publish date (e.g. "9. června 2026" in `realizace_osetreni-lipy-zamek-kozel.html`) | Add
  `datePublished` to a CreativeWork/Article-style schema for realizace pages; recommend
  `/seo schema` for generation.

- **Info | Legacy/stray URL indexed for "inventarizace dřevin"** | Google search result
  showed `arbovert.cz/inventarizace-drevin.html` (a `.html`, non-`/sluzby/`-prefixed path),
  not present in current `urls.txt`/sitemap | Verify whether this URL 404s, redirects, or is
  served by a stray artifact from `backup/` (old Pages Router); cross-reference with the
  technical/indexing track of this audit.

---

## Limitations

- No DataForSEO, Firecrawl, or Google Search Console/rank-tracking access — all SERP data
  comes from WebSearch tool result sets, which are **not guaranteed to reflect exact Google
  top-10 order or presence for a Czech, non-US searcher**. Where a competitor domain did not
  appear in a WebSearch result, I noted it as "did not appear in the result set observed,"
  not "does not rank."
- No PAA, featured-snippet, AI-Overview-citation, or related-searches data was directly
  observable through WebSearch in a structured form — user stories above are derived from
  title tags, AI-summary text, and result-set composition, not from a literal PAA/snippet
  scrape. This is a lower-fidelity signal source than the standard framework calls for.
- No actual rank position for arbovert.cz on any of the 6 queries was confirmed (WebSearch
  does not expose ordinal SERP rank).
- Did not check off-site presence (Google Business Profile review count, firmy.cz listing
  completeness) — flagged for `/seo local` instead of guessed here.
- Did not fetch or parse every one of the 18 realizace pages individually; case-study depth
  and CTA pattern claims are based on the pre-crawled word counts in `onpage.json` plus one
  fully parsed example page (`realizace_osetreni-lipy-zamek-kozel.html`).
- No PageSpeed/CrUX/INP data (not configured) — UX Signals score above reflects DOM-order
  phone placement and copy only, not measured load performance or interaction responsiveness.

Cross-skill references: `/seo content` for the inventarizace-drevin depth gap and E-E-A-T
insurance/credentials work; `/seo schema` for realizace date schema and any new pricing-page
schema; `/seo local` for review-volume and GBP verification; `/seo page` if a full page-level
audit of `/sluzby/inventarizace-drevin` is wanted.

Generate a PDF report? Use `/seo google report`.
