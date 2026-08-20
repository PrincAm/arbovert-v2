# Action Plan — arbovert.cz

Ordered by dependency, not just severity. Each item states how you would know it failed and
what to watch afterwards without re-running the audit.

## Phase 0 — Settle the unknown (this week, before anything else)

**0.1 Check the Google Business Profile.** Log in and confirm it exists, is verified, and
that the primary category is tree-care-specific rather than generic landscaping. Check the
review count.
*Why first:* for a service-area business GBP outranks every on-site fix in this document,
and every recommendation below is written not knowing its state. If the profile is missing
or unverified, that becomes the whole plan.
*Failed if:* you find no profile, or a profile under a generic category, and nothing changes.
*Watch:* GBP insights — discovery searches and calls.

**0.2 Decide the AI-crawler policy deliberately.** Cloudflare's managed robots.txt block is
in effect. Decide whether blocking GPTBot/ClaudeBot/Google-Extended matches your intent.
*Note:* OAI-SearchBot and PerplexityBot are already allowed, so ChatGPT search and
Perplexity can cite you regardless. This is about training corpora.
*Failed if:* the setting stays as it is because nobody looked at it.

## Phase 1 — Critical fixes (week 1)

**1.1 Compress the realization images.** 193MB across 60 files, averaging 3.2MB, is the
single largest technical defect. Re-encode `public/images/realizace/*` to ~1200–1600px WebP
at q75–80, mirroring the Kozel files that are already ~300KB. Then add `priority` and
`sizes` to the realization hero at `src/app/realizace/[slug]/page.js:94-99`.
*Depends on:* nothing. *Unblocks:* any meaningful mobile performance work.
*Failed if:* the largest file in that directory still exceeds ~400KB afterwards.
*Watch:* total page weight of a realization page in DevTools — it should fall by an order
of magnitude.

**1.2 Fix the mobile contact path.** Put a tap-to-call element in the mobile header
(`src/layouts/NavBar.js`) and stop the cookie banner covering the primary CTA. Raise the
hamburger hit area to 44×44.
*Failed if:* a 375px screenshot of the homepage still shows no phone number and a clipped
CTA button.
*Watch:* calls from mobile, and form submissions.

**1.3 Add canonical tags.** Set `alternates.canonical` in every `metadata` and
`generateMetadata` export. Delete `src/hooks/use-canonical-url.js` — it has no call sites.
*Failed if:* `curl -s https://arbovert.cz/ | grep canonical` still returns nothing.

## Phase 2 — High-impact (weeks 2–3)

**2.1 Publish pricing.** A `/cenik` page, or price-range content on each service page. Even
"od X Kč" ranges with the factors that move the price would fill a page type that currently
has no representation at all.
*Depends on:* a business decision about disclosing rates. That is the real blocker, not the code.
*Failed if:* the site still contains zero "Kč" in three months.
*Watch:* impressions for queries containing "cena" or "ceník".

**2.2 Cross-link services and realizations.** Add a `services: []` tag to each entry in
`src/data/realizations.js`, then render related-work blocks on service pages and
related-service links on realization pages. Also add the missing `FooterLink` for
`/sluzby/prorezavani-ovocnych-stromu` (`src/layouts/Footer.js:48-88`), and convert the
service-page CTA from `router.push` to `<NextLink>` in `ServicePageClient.js:19-24,62-70`.
*Why:* proof and claim currently live on pages with no path between them.
*Failed if:* every service page still has zero outbound links to a realization.

**2.3 Move the trust signals off the homepage.** `TrustSection` is imported only in
`src/app/page.js`. Put the ETW/SZKT credentials, named practitioner and client logos on
`/o-nas` and `/kontakt`. Add an insurance statement — currently zero mentions site-wide.
*Failed if:* `/o-nas` still shows no credential.

**2.4 Reconcile the experience claim.** One computed source, derived from the real founding
date. Then add a sentence explaining the 2011 (OSVČ) versus 2020 (s.r.o., per ARES)
distinction.
*Failed if:* grep still finds "12+" and "14+" in the same repo.

**2.5 Fix the schema errors.** Add `postalCode` and correct locality to the Praha address;
add `@id` to the homepage entity and reference it from the service-page `provider`; convert
`geo` coordinates from strings to numbers; remove or re-model the `vyskoveprace-arbovert.cz`
`sameAs`. Templates are in `findings/schema.md`.
*Failed if:* the Rich Results Test still reports a missing required property.

## Phase 3 — Content and authority (month 2)

**3.1 Deepen the service pages.** Expand `longDescription` in `src/data/arbo.js`, starting
with `inventarizace-drevin` — the query with the most demanding competition. Give each page
a topical H2 instead of the brand name. Add self-contained factual passages in the style of
the homepage FAQ, which is already the most citable content you have.

**3.2 Add the missing schema.** `BreadcrumbList` on both `[slug]` routes, `WebSite` on the
homepage, `Article` on the 17 dated case studies.

**3.3 Outreach to the named sites.** Zámek Kozel, Zámek Nebílovy, Zámek Vlachovo Březí,
Týnský chrám, ČEZ, and the municipalities. Offer the case-study photos and text you have
already published. No new pages required.
*Watch:* referring domains, once you have a source that can count them.

**3.4 Correct the Firmy.cz/Mapy.cz categories** to something arborist-specific, and claim
zivefirmy.cz / najisto.cz / edb.cz if not already held.

## Phase 4 — Maintenance (ongoing)

**4.1 Generate the sitemap.** Replace hand-maintained `public/sitemap.xml` with
`src/app/sitemap.js` built from `src/data/realizations.js` and `src/data/arbo.js`. Until
then, add `/gdpr` and fix the stale `lastmod` on the 9 affected URLs.
*Why:* it is in sync today only because every publish commit happened to touch both files.

**4.2 Add HSTS and CSP** at the Cloudflare edge, and a cache rule for `/images/*` at 1 year
immutable (currently 4 hours).

**4.3 Housekeeping.** Delete the hardcoded robots meta at `src/app/layout.js:73`; remove
the duplicate GA4 `gtag.js` that runs alongside GTM; 301 `/inventarizace-drevin.html` to
`/sluzby/inventarizace-drevin`; fix the missing space in the homepage H1
(`src/components/Welcome.js:69-72`); translate the 404 page into Czech.

**4.4 Close the measurement gap.** Connect Search Console and a free Moz API key. Most of
this audit's limitations come from having no field data — with GSC connected, the next audit
measures instead of infers.

**4.5 Capture a drift baseline** so future deploys can be diffed:
`claude-seo run drift_baseline.py https://arbovert.cz/`.
