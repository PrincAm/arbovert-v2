# Local SEO Findings — arbovert.cz

Business type as briefed: **SAB** (service-area business). Note: the site itself is
actually **hybrid** — it discloses two real street addresses (a registered office in
Vimperk and a branch in Praha), not just a service-area statement. That changes the
correct schema/GBP pattern (see Local Schema section) even though the field work itself
is performed at customer sites, which is the classic SAB behavior.

Industry vertical: **Home Services** (closest fit — arborist/tree care has no dedicated
Schema.org subtype; `LocalBusiness` or `HomeAndConstructionBusiness` is the correct
top-level type per `local-schema-types.md`, not a mis-categorization).

## Local SEO Score: 34 / 100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| GBP Signals | 25% | 15/100 | No Maps embed, no review widget, no GBP place reference anywhere on-page. Existence of a Google Business Profile could not be confirmed externally (see Limitations). |
| Reviews & Reputation | 20% | 10/100 | Zero visible review signal anywhere: no `aggregateRating` in schema, no rating/count in HTML, none found on Firmy.cz. |
| Local On-Page SEO | 20% | 55/100 | 17 realization pages are genuinely place-named with real city/site names (Praha-Vyšehrad, Kladno, Prachatice, Vacov, Lázně Toušeň, etc.) — real geo signal. No dedicated service-area landing pages exist (see Location Page Strategy). |
| NAP Consistency & Citations | 15% | 55/100 | Phone, email, IČO/DIČ identical across every crawled page and match ARES exactly. Firmy.cz/Mapy.cz shows two active listings matching the site's addresses, but under a generic category, not an arborist-specific one. Other CZ directories not verifiable via automated fetch (403s). |
| Local Schema Markup | 10% | 35/100 | LocalBusiness present sitewide with good property breadth (areaServed, geo, serviceType, foundingDate) but the multi-location pattern is technically invalid (single node, `address`/`geo` as arrays) and geo precision falls short of the 5-decimal recommendation. |
| Local Link & Authority Signals | 10% | 25/100 | `sameAs` has only 2 entries (Facebook + a *different* sister company's domain). No links to Firmy.cz/Mapy.cz profile. Backlink profile not measured (out of scope tools). |

Weighted: 0.25(15) + 0.20(10) + 0.20(55) + 0.15(55) + 0.10(35) + 0.10(25) ≈ **34/100**

Proximity (55.2% of local ranking variance per Search Atlas) is outside the site's
control and not reflected in this score.

---

## NAP Extraction & Consistency

| Field | `/kontakt` visible HTML | `home.html` JSON-LD (`LocalBusiness`) | ARES (IČO 02059690, ground truth registry) | Firmy.cz/Mapy.cz (external) |
|---|---|---|---|---|
| Legal name | Arbovert s.r.o. | Arbovert s.r.o. (alternateName: Arbovert) | ARBOVERT s.r.o. (all caps — registry formatting only, not a real discrepancy) | ARBOVERT s.r.o. |
| Sídlo (registered office) | Pasovská 84/37, Vimperk, 38501 | Pasovská 84/37, Vimperk, 38501, CZ | Pasovská 84/37, Vimperk II, 38501 Vimperk | Pasovská 84/37, Vimperk II |
| Pobočka (branch) | Jirsíkova 484/6, Praha 8, 180 00 | Jirsíkova 484/6, Praha (no postalCode, no addressRegion) | not present at this ARES endpoint (registry only carries the legal sídlo; branch/provozovna registration was not independently checked) | Jirsíkova 484/6, Praha, Karlín — listing live, "brzy otevírá / dnes od 8:00" |
| Phone | +420 739 969 933 | +420-739-969-933 | — | not captured by fetch |
| Email | info@arbovert.cz | info@arbovert.cz | — | not captured by fetch |
| IČO | 02059690 | not present in schema | 02059690 | — |
| DIČ | CZ02059690 | not present in schema | CZ02059690 | — |

**Consistency verdict:** phone, email, and legal name are identical across every source
checked, including the one ground-truth external source (ARES) that could be verified.
This is a real strength — do not let the schema/GBP issues below overshadow it.

**One real gap:** the Praha `PostalAddress` in the homepage JSON-LD (`src/app/page.js:43-47`)
omits `postalCode` and `addressRegion`, while the same address on `/kontakt` and on the
Firmy.cz listing carries "180 00" / "Praha 8". Minor, but it's the one place the sources
diverge.

## GBP Signals

- No `<iframe>` Maps embed, no "Otevřít v Mapách" / directions link, no review-count
  widget, no photo-gallery-from-GBP pattern found in any of the 30 crawled pages
  (`grep -l 'maps\|mapy\.cz\|iframe'` matched only because every page's cookie-consent
  script references generic map libraries, not an actual embed — verified by opening
  `home.html` and `kontakt.html` directly, no `<iframe src="...google.com/maps` or
  `mapy.cz` present).
- **Could not verify whether a Google Business Profile listing exists.** Google Search
  and Google Maps served a consent-wall redirect that WebFetch could not get past to
  real result content (JS-rendered SPA), and Bing/DuckDuckGo returned no relevant
  results for "Arbovert" (DuckDuckGo hit a CAPTCHA, Bing returned unrelated generic
  results). This is a genuine gap in this audit, not an assumption either way — treat
  "does a GBP exist / is it verified / what's its category and rating" as **unconfirmed**
  and check manually.
- What *was* confirmed externally: two active Seznam **Firmy.cz** listings (Seznam is
  the dominant Czech search engine and Mapy.cz is arguably more relevant to this
  audience than Google Maps for a Šumava/Vimperk-area business) — one for the Vimperk
  address, one for the Praha address, both under the category **"Údržba zeleně a
  rekultivace"** (green-space maintenance / land reclamation). That is a generic
  landscaping category, not an arborist/tree-care-specific one. Per Whitespark's 2026
  factor weighting, primary category is the #1 ranking factor and wrong category is the
  #1 negative factor — this applies to Firmy.cz/Mapy.cz's own ranking the same way it
  applies to Google, and should be corrected to the most specific tree-care category
  available on each platform (and checked against whatever the actual GBP primary
  category is, once confirmed).
- No sameAs link to the Mapy.cz/Firmy.cz profile from the homepage schema — see Schema
  section.

## Review Health

No rating or review count is visible anywhere on the crawled pages, no
`aggregateRating` in any JSON-LD, and the Firmy.cz listings fetched did not surface a
rating either. **Could not confirm actual review count/rating on Google or Mapy.cz** —
this needs a manual check (or a DataForSEO/Firecrawl-backed pull) rather than a WebFetch
one, since both platforms are JS-rendered SPAs behind consent walls in this environment.
Given the 18-day review-velocity cliff (Sterling Sky), if reviews are actually sparse or
stale, that alone could be suppressing rankings independent of everything else in this
report — worth confirming first, since it would reprioritize the whole list below.

## Citation Presence

| Source | Status |
|---|---|
| ARES (justice.cz business register) | Confirmed via API — name/address/IČO/DIČ match the site exactly. Active status (`AKTIVNI`). |
| Firmy.cz / Mapy.cz (Seznam) | Confirmed live, two listings (Vimperk + Praha), generic category (see above), no rating captured. |
| Google Business Profile | **Not verified** — could not confirm existence, verification status, category, or reviews from this environment. |
| BBB equivalent | Not applicable — BBB is US-only; no direct CZ equivalent checked here beyond the ones above. |
| Zivefirmy.cz | Attempted direct fetch, returned 404 on the guessed URL — could not confirm presence or absence. |
| Najisto.cz | Attempted direct fetch, blocked with HTTP 403 (bot protection) — could not confirm. |
| Edb.cz | Attempted direct fetch, blocked with HTTP 403 (bot protection) — could not confirm. |

Three of these four "could not confirm" outcomes are tool limitations (bot-blocked or
JS-rendered), not evidence of absence. Recommend a manual pass across firmy.cz (correct
category), zivefirmy.cz, najisto.cz, edb.cz, and Mapy.cz to claim/verify/correct each
profile — 3 of the top 5 AI-visibility factors are citation-related per the brief, and
none of these are currently linked from the site's `sameAs`.

## Sister-company / brand overlap

`sameAs` in `src/app/page.js:100-103` includes `https://vyskoveprace-arbovert.cz/`. That
domain resolves to a **different, related company** ("Arbovert" work-at-height / facade
and roof maintenance business, same brand name, shares the same two addresses and phone
number, but a distinct service line — facade repair, window cleaning, roof work, not
tree care). Linking it as `sameAs` on the tree-care `LocalBusiness` tells Google's
Knowledge Graph these are the same entity, when they're two different service
businesses sharing a brand and contact point. This can blur category/entity signals for
both. Recommend either splitting into two clearly separate Organization entities with
`sameAs` removed, or explicitly modeling them as sibling brands under one parent
Organization — not as interchangeable `sameAs` references on a single LocalBusiness.

## Local Schema Validation

Source: `src/app/page.js:26-104` (LocalBusiness), replicated in the pre-rendered
`home.html` JSON-LD.

**Required properties:** `name` ✓, `address` ✓ (present, but wrong shape — see below).

**Recommended properties:**
- `telephone` ✓, `url` ✓, `email` ✓ (not in Google's recommended list but harmless)
- `geo` — present but **two problems**: (1) `latitude`/`longitude` are strings
  (`"50.0755"`) not numbers, and Praha's coordinate `50.0755, 14.4378` is only 4 decimal
  places, Vimperk's `49.0556, 13.7733` also 4 — short of the 5-decimal-place
  recommendation (~1.1m accuracy). (2) `geo` is an array of two `GeoCoordinates`, which
  is not how a single `LocalBusiness` node is supposed to carry multiple locations (see
  next point).
- `openingHoursSpecification` — **missing**. The page uses `"openingHours": "Mo-Fr
  08:00-17:00"` (`src/app/page.js:81`), a valid but less-preferred string format;
  structured `OpeningHoursSpecification` is the recommended property.
- `aggregateRating` / `review` — **missing** (consistent with the Review Health finding
  above — there's genuinely nothing to mark up yet).
- `priceRange` ✓ (`"$$"`).

**Structural issue — the real one:** `address` (`src/app/page.js:35-47`) and `geo`
(`src/app/page.js:67-79`) are both **arrays holding two different locations** inside a
single `LocalBusiness` node. Per Schema.org and Google's guidance (and per this audit's
own `local-schema-types.md` reference, "Multi-Location Schema Pattern"), a `LocalBusiness`
node takes **one** `address` and **one** `geo`. Two real, distinct locations should be
two separate `LocalBusiness` nodes (or one parent `Organization` + two location nodes
linked via `branchOf`/`@id`), not one node with array-valued address/geo. As currently
written this is likely to be ignored or mis-parsed by Google's structured-data parser
(which expects singular values for these properties on `LocalBusiness`), meaning the
Vimperk/Praha distinction the business clearly wants to communicate isn't reliably
reaching Google's entity graph.

**`@type`:** `LocalBusiness` is an acceptable generic choice — Schema.org has no
arborist/tree-care-specific subtype in Google's supported list. `HomeAndConstructionBusiness`
would be marginally more specific and is a valid alternative, but this is a Low-priority
refinement, not a correctness issue.

**Service pages** (`/sluzby/*`, 7 pages) each carry a `Service` schema with a nested
`provider.LocalBusiness` (name, url, telephone only — no address) and `areaServed`
(Praha, Vimperk). This is reasonable and consistent with the "dedicated service page"
factor called out in the brief (#1 local organic factor). No `Menu`/`servesCuisine`-type
issues apply here (not that vertical).

**FAQPage** on the homepage: flagged Info-only per the brief (Google retired FAQ rich
results 7 May 2026) — no action recommended, do not remove, do not expand.

## Location Page Quality / Strategy

The site has **no dedicated city/service-area landing pages** (no `/sluzby-praha`,
`/arborista-vimperk`, etc.). Instead it has 17 realization (case-study) pages, each
genuinely tied to a real place and project: Praha-Vyšehrad, Praha-Vinohrady, Kladno,
Prachatice, Vacov, Lázně Toušeň, Lhenice, Hoštka, Černá v Pošumaví, Lčovice, Dolany u
Kladna, Nebílovy, Vlachovo Březí — each with a unique H1, unique project description,
and real photos (per `onpage.json`, realization pages run 145-220 words each, all images
carry alt text).

**Assessment: this is doing real geographic work, and it's the right kind for a
business this size.** Real project pages with genuine place names, genuine content, and
photo evidence are exactly what dedicated service-area pages are trying to fake when a
business writes thin, templated "we serve `[city]`" pages — the realization pages
already deliver the substance (unique content, real entities like "Zámek Kozel" and
"Týnský chrám") that a doorway page would need to earn, without the risk.

**On adding formal city pages:** applying the plugin's quality gates, this would only be
justified if each city page could clear ~60%+ unique content, avoid a doorway-swap test
(i.e., swapping the city name shouldn't make the page identical to another city's page),
and sit within 3 clicks of the homepage with real internal links from relevant service
and realization pages. For a business this size — one phone number, two people
(Vimperk + Praha), no city-specific pricing, staffing, or inventory differences — most
city pages would fail that bar and read as templated "we also serve [city]" pages
stacked on top of content that's already thin (94-597 words per `onpage.json`). **Do not
recommend building standalone city pages at this scale.** Better ROI: keep publishing
realization pages (the repo already has a monthly-cadence mechanism for this in
`src/data/realizations.js`) in the specific towns/regions being targeted, and — if
Google Search Console data (not available in this audit) later shows real query volume
for underserved cities — reconsider only then, backed by that data rather than
speculatively.

## Czech Market Trust Signals

| Signal | Status |
|---|---|
| IČO | ✓ shown on `/kontakt` (`src/app/kontakt/page.js:69-71`) and `/gdpr`; matches ARES exactly |
| DIČ | ✓ shown on `/kontakt`; matches ARES |
| ETW (European Tree Worker) certification | ✓ called out on the homepage with a badge/image (`home.html` — "Evropská certifikace ETW") — this is a genuine, recognized arborist credential and a strong trust signal, good to keep prominent |
| ČAA (Česká asociace arboristiky) | Not found anywhere on the site |
| Insurance ("pojištění") / liability coverage | Not found anywhere on the site — for a business felling large trees near buildings and power lines, an explicit insurance statement is a standard CZ trust/conversion signal and is currently absent |
| Named contact person | ✓ "Lukáš Kačer" named on `/kontakt` as the certified arborist point of contact |
| Founding date discrepancy | Site and schema (`foundingDate: "2011"`, "12+ let zkušeností") vs. ARES `datumVzniku: 2020-09-17` for the legal entity ARBOVERT s.r.o. Likely explained by prior operation as a sole trader (OSVČ) before incorporating in 2020 — common in CZ — but flagged as Info since it's a discrepancy between the on-page claim and the one hard registry fact checked, in case it needs a supporting sentence ("arboristikou se zabýváme od 2011, firma ARBOVERT s.r.o. založena 2020") to preempt a skeptical reader cross-checking ARES themselves. |

## Limitations (explicit)

- **Could not confirm whether a Google Business Profile exists for Arbovert**, its
  verification status, primary category, star rating, or review count. Google
  Search/Maps served consent-wall redirects that WebFetch could not resolve to real
  content (Maps is a JS SPA), and Bing/DuckDuckGo did not return usable results for this
  query in this environment. This is the single biggest open question for this report —
  GBP primary category is Whitespark's #1 ranking factor — and it needs a manual login
  check or a DataForSEO Business Listings pull (not installed here) to close.
- najisto.cz and edb.cz blocked automated fetches with HTTP 403; zivefirmy.cz's guessed
  URL returned 404. None of these were confirmed present or absent — only that this
  audit couldn't check them programmatically.
- No paid rank-tracking, GSC, or GA4 data was available (per CONTEXT.md), so no query
  volume, click-through, or actual local-pack position data backs the location-page
  recommendation above — it's based on quality-gate reasoning, not measured demand.
- Praha branch address on ARES was not independently verified beyond the sídlo record
  (the basic ARES endpoint used only returns the registered office; provozovna/branch
  registration in the Živnostenský rejstřík was not separately queried).
- Backlink profile, domain authority, and citation link-equity were not measured (Common
  Crawl only available per CONTEXT.md; not run as part of this local-specific check).
