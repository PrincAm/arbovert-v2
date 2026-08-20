# Structured Data Audit — arbovert.cz

Category score: **55/100**

Evidence: JSON-LD (correct format, `https://schema.org`, no deprecated types) exists on only
8 of 30 pages (`/` and the 7 `/sluzby/*` pages). It is server-rendered (verified: raw HTML in
`pages/home.html` matches `src/app/page.js` byte-for-byte for both `<script type="application/ld+json">`
blocks — no client hydration gap). One required LocalBusiness address is missing `postalCode`
against the site's own displayed NAP, and the same business is represented 8 different,
un-linked ways across the site (1 full LocalBusiness on `/` + 7 stub duplicates on service
pages) with no `@id` tying them together. 22 pages — including all 17 realization case
studies, both index pages, `/o-nas`, `/kontakt`, `/gdpr` — emit zero structured data.

## 1. Detection results

| Page(s) | @type(s) found | Source file |
|---|---|---|
| `/` | `LocalBusiness`, `FAQPage` | `src/app/page.js` |
| `/sluzby/{7 slugs}` | `Service` (×7, one per page) | `src/app/sluzby/[slug]/page.js` |
| `/sluzby`, `/realizace`, `/realizace/{17 slugs}`, `/o-nas`, `/kontakt`, `/gdpr` | none | — |

Confirmed via `onpage.json` (`jsonld` field) and cross-checked one page (`pages/home.html`)
against source to confirm no client-only injection — both blocks are present in the raw
server HTML, identical to the literal objects in `page.js`.

## 2. Validation results

### `/` — LocalBusiness (`src/app/page.js:20-100`)

| Check | Result |
|---|---|
| `@context` https, `@type` valid/not deprecated | Pass |
| `name`, required `address` present | Pass (name present; address present but incomplete — see below) |
| No placeholder text | Pass |
| Absolute URLs | Pass |
| ISO 8601 dates | Pass (`foundingDate: "2011"` — bare year is valid reduced-precision ISO 8601) |
| `@id` present | **Fail** — no `@id`, so nothing on the other 29 pages can reference this entity |
| `address` complete (streetAddress, addressLocality, addressRegion, postalCode, addressCountry) | **Fail for the Praha entry** — see High findings below |
| Single physical-location semantics | **Warning** — one `LocalBusiness` node carries an *array* of two unrelated `PostalAddress`/`GeoCoordinates` (Vimperk + Praha). Schema.org permits array values, but Google's own multi-location guidance is one `LocalBusiness` per physical location; an array on a single node is ambiguous for entity resolution. Kept as one node here only because the site has no per-location landing pages — flagged as Medium, not Critical. |

### `/` — FAQPage (`src/app/page.js:9-19`)

Structurally valid (`mainEntity` → `Question`/`acceptedAnswer`/`Answer`, all 5 items from
`src/data/faq.js` mapped correctly). Per instructions this is **Info only**: Google retired
FAQ rich results for all sites on 7 May 2026, so there is no current SERP benefit. Any
AI/GEO value is unconfirmed. **No action recommended** — do not remove, do not expand.

### `/sluzby/{slug}` — Service (`src/app/sluzby/[slug]/page.js:64-79`, ×7)

| Check | Result |
|---|---|
| `@context`/`@type` valid | Pass — `Service` is not a Google rich-result type (no dedicated SERP feature exists for it), but it is valid, non-deprecated schema.org and the standard pattern for a services business |
| `name`, `description`, `image` | Pass |
| `provider` correctly typed and complete | **Fail** — see High findings below |
| `url` (recommended self-reference) | **Fail** — missing on all 7 |
| `areaServed` | Pass (simplified `City` list; consistent with homepage cities but drops the `containedInPlace` detail the homepage has) |

## 3. Findings

**High | LocalBusiness Praha address missing required `postalCode`, locality mismatch vs. site's own NAP | Evidence: `src/app/page.js:38-44` emits `{"streetAddress":"Jirsíkova 484/6","addressLocality":"Praha","addressCountry":"CZ"}` — no `postalCode`, no `addressRegion`. The actual `/kontakt` page (`src/app/kontakt/page.js:66-69`) displays "Jirsíkova 484/6 / Praha 8, 180 00". `postalCode` is a required `PostalAddress` subproperty per Google's LocalBusiness guidance and it's simply absent for this location. | Fix: in `src/app/page.js`, set `"addressLocality": "Praha 8", "postalCode": "18000", "addressRegion": "Hlavní město Praha"` for the second address object (Vimperk entry should likewise get `"addressRegion": "Jihočeský kraj"`). See ready-to-paste block below.**

**High | Same business represented 8 different, disconnected ways with no `@id` linking | Evidence: `src/app/page.js` declares a full `LocalBusiness` (name, address×2, geo×2, openingHours, areaServed, sameAs, logo…) with no `@id`. `src/app/sluzby/[slug]/page.js:70-75` then re-declares a *different*, minimal `LocalBusiness` stub (`name`, `url`, `telephone` only — no address, no geo, no `@id`) as `provider`, repeated identically on all 7 service pages. Google/schema.org's documented pattern for this exact situation is to give the canonical entity an `@id` and reference it by `@id` elsewhere instead of re-declaring an incomplete copy. | Fix: add `"@id": "https://arbovert.cz/#organization"` to the homepage `LocalBusiness` in `src/app/page.js`; replace the `provider` object in `src/app/sluzby/[slug]/page.js:70-75` with `{"@id": "https://arbovert.cz/#organization", "name": "Arbovert s.r.o.", "url": "https://arbovert.cz"}` (keep name/url as a fallback for parsers that don't resolve cross-document `@id`, but the `@id` is what lets Google merge the entities).**

**Medium | Single LocalBusiness node carries an array of two locations instead of one node per location | Evidence: `src/app/page.js:34-70` — `address` and `geo` are both 2-item arrays (Vimperk, Praha) on one `LocalBusiness`. Google's multi-location guidance (see plugin reference `local-schema-types.md`, "Multi-Location Schema Pattern") is one `LocalBusiness` per physical address, optionally under a parent `Organization`. | Full fix requires per-location pages, which don't currently exist — out of scope for a markup-only change. Documenting as a structural limitation; the ready-to-paste fix below keeps the array (pragmatic, matches current single-page architecture) rather than proposing new pages.**

**Medium | Organization `logo` is SVG-only | Evidence: `src/app/page.js:96` — `"logo": "https://arbovert.cz/images/arbovert-logo.svg"`; `public/images/` contains only `arbovert-logo.svg` and `arbovert-logo-cropped.svg`, no raster version. I am **moderately, not fully, confident** that Google's Logo structured-data guidance disfavors SVG for the Knowledge Panel logo (raster JPG/PNG/WEBP is the commonly-documented safe choice) — verify against current Google docs before treating this as certain. | If confirmed, export a PNG/WEBP version (square, ≥112×112px) and swap the `logo` URL in `src/app/page.js:96`.**

**Medium | No `BreadcrumbList` anywhere on the site (0 of 30 pages) | Evidence: `onpage.json` shows empty `jsonld` on every page except `/` and `/sluzby/*`, and those two don't include `BreadcrumbList` either. Site has a real 3-level hierarchy (`/sluzby` → `/sluzby/[slug]`, `/realizace` → `/realizace/[slug]`) that maps directly to breadcrumbs. | Add to `src/app/sluzby/page.js`, `src/app/sluzby/[slug]/page.js`, `src/app/realizace/page.js`, `src/app/realizace/[slug]/page.js`. Templates below.**

**Medium | No `WebSite` schema on the homepage | Evidence: `src/app/page.js` and `src/app/layout.js` contain no `WebSite` entity at all. | Add alongside the existing `LocalBusiness`/`FAQPage` scripts in `src/app/page.js`. Template below.**

**Medium | 17 realization case studies carry zero structured data | Evidence: `src/data/realizations.js` — every entry has real, dated (ISO 8601 already), substantive editorial content (`title`, `date`, `excerpt`, `content` HTML, `imageSrc`, `gallery[]`) rendered at `src/app/realizace/[slug]/page.js`, but that file emits no JSON-LD (confirmed empty `jsonld` in `onpage.json` for all 17). This is genuine, differentiated content — a natural `Article`/`CreativeWork` candidate. | Add to `src/app/realizace/[slug]/page.js`. Template below.**

**Low | Service pages missing `url` self-reference and per-service `serviceType` | Evidence: `src/app/sluzby/[slug]/page.js:64-79` — no `url` property, no `serviceType`. Both are cheap, low-risk additions. | Included in the fixed Service template below.**

**Medium | `foundingDate` in schema (2011) implies ~15 years experience, but on-page copy says "14+" and "12+" years — three different numbers for one fact | Evidence: `src/app/page.js:94` sets `"foundingDate": "2011"`. `src/components/Welcome.js:6-10` and `src/components/Intro.js:9-13` both hardcode `foundedYear = 2011` and compute `currentYear - foundedYear` live (currently 15, in 2026), so the schema's `foundingDate` is internally *correct* and consistent with those two components. But `src/app/layout.js:9` (global meta description) hardcodes the static string "14+ lety zkušeností", and `src/app/o-nas/page.js:12,15` + `src/app/kontakt/page.js:25` hardcode "12+ lety zkušeností" — both stale, unrelated to the 2011 founding date and to each other. This is an E-E-A-T/NAP-adjacent consistency problem: a fact machine-readable in schema (founded 2011 -> 15 years) contradicts two different hardcoded numbers shown to users and search engines elsewhere on the same site. | Fix: replace the static "12+"/"14+" substrings in `src/app/layout.js:9,54` (metadata + openGraph description), `src/app/o-nas/page.js:12,15` (metadata + openGraph description), and `src/app/kontakt/page.js:25` with a value derived the same way `Welcome.js`/`Intro.js` already compute it (`new Date().getFullYear() - 2011`), or at minimum update the three static strings to match "15+" so they agree with `foundingDate: "2011"` in the schema. `foundingDate` itself needs no change — it is the one accurate number here.**

**Low | `openingHours` uses the shorthand string form instead of `openingHoursSpecification` | Evidence: `src/app/page.js:79` — `"openingHours": "Mo-Fr 08:00-17:00"`. Valid schema.org syntax, but Google lists `openingHoursSpecification` as the recommended (more parseable) form. | Optional; not urgent given no seasonal/holiday hours to express.**

**Info | Generic `LocalBusiness` @type is the correct choice | Evidence: checked plugin reference `references/local-schema-types.md` — schema.org has no `TreeService`/`Arborist`/`Landscaping` subtype under `LocalBusiness` or `HomeAndConstructionBusiness`. `LocalBusiness` is the appropriate fallback; no change recommended here.**

**Info | FAQPage present and valid, no SERP benefit | Evidence: see validation section above. Do not remove, do not add more.**

## 4. Ready-to-paste JSON-LD

### 4.1 Fixed homepage `LocalBusiness` — `src/app/page.js` (replace `structuredData`, lines ~20-100)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://arbovert.cz/#organization",
  "name": "Arbovert s.r.o.",
  "alternateName": "Arbovert",
  "description": "Arbovert - profesionální arborista Praha. Rizikové kácení stromů, inventarizace dřevin a stromů, štěpkování dřevní hmoty, likvidace dřevního odpadu. Technika kácení stromů v Praze a na Šumavě.",
  "url": "https://arbovert.cz",
  "telephone": "+420-739-969-933",
  "email": "info@arbovert.cz",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Pasovská 84/37",
      "addressLocality": "Vimperk",
      "addressRegion": "Jihočeský kraj",
      "postalCode": "38501",
      "addressCountry": "CZ"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Jirsíkova 484/6",
      "addressLocality": "Praha 8",
      "addressRegion": "Hlavní město Praha",
      "postalCode": "18000",
      "addressCountry": "CZ"
    }
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Praha",
      "containedInPlace": { "@type": "AdministrativeArea", "name": "Hlavní město Praha" }
    },
    {
      "@type": "City",
      "name": "Vimperk",
      "containedInPlace": { "@type": "AdministrativeArea", "name": "Jihočeský kraj" }
    }
  ],
  "geo": [
    { "@type": "GeoCoordinates", "latitude": "50.0755", "longitude": "14.4378", "name": "Praha" },
    { "@type": "GeoCoordinates", "latitude": "49.0556", "longitude": "13.7733", "name": "Vimperk" }
  ],
  "openingHours": "Mo-Fr 08:00-17:00",
  "priceRange": "$$",
  "serviceType": [
    "Rizikové kácení stromů", "Arborista Praha", "Inventarizace dřevin", "Inventarizace stromů",
    "Štěpkování dřevní hmoty", "Štěpkování dřeva", "Likvidace dřevního odpadu", "Likvidace dřeva",
    "Technika kácení stromů", "Ošetřování stromů", "Prořezávání stromů", "Výsadby stromů"
  ],
  "foundingDate": "2011",
  "image": "https://arbovert.cz/images/welcome.jpg",
  "logo": "https://arbovert.cz/images/arbovert-logo.svg",
  "sameAs": [
    "https://vyskoveprace-arbovert.cz/",
    "https://www.facebook.com/arbovertcz/"
  ]
}
```

Only three keys actually changed vs. the current object: added `"@id"`, and on the Praha
`PostalAddress` changed `addressLocality` to `"Praha 8"` and added `addressRegion` +
`postalCode`; added `addressRegion` to the Vimperk address. Everything else is unchanged —
do not treat this as a rewrite, only those fields are new/edited.

### 4.2 `WebSite` — add as a third script block in `src/app/page.js`

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://arbovert.cz/#website",
  "name": "Arbovert",
  "url": "https://arbovert.cz",
  "inLanguage": "cs-CZ",
  "publisher": { "@id": "https://arbovert.cz/#organization" }
}
```

No `SearchAction`/sitelinks-searchbox — the site has no internal search feature, so it isn't included.

### 4.3 Fixed `Service` block — `src/app/sluzby/[slug]/page.js` (replace `jsonLd`, lines ~64-79)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://arbovert.cz/sluzby/{slug}#service",
  "name": "{service.title}",
  "description": "{service.seoDescription}",
  "url": "https://arbovert.cz/sluzby/{slug}",
  "image": "https://arbovert.cz{service.imageSrc}",
  "serviceType": "{service.title}",
  "provider": {
    "@id": "https://arbovert.cz/#organization",
    "name": "Arbovert s.r.o.",
    "url": "https://arbovert.cz"
  },
  "areaServed": [
    { "@type": "City", "name": "Praha" },
    { "@type": "City", "name": "Vimperk" }
  ]
}
```

`{slug}` and `{service.*}` are the existing template variables already in scope in that file
(`slug`, `service.title`, `service.seoDescription`, `service.imageSrc`) — no new data needed.

### 4.4 `BreadcrumbList` — service detail (`src/app/sluzby/[slug]/page.js`)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Domů", "item": "https://arbovert.cz" },
    { "@type": "ListItem", "position": 2, "name": "Služby", "item": "https://arbovert.cz/sluzby" },
    { "@type": "ListItem", "position": 3, "name": "{service.title}", "item": "https://arbovert.cz/sluzby/{slug}" }
  ]
}
```

Same pattern for `src/app/realizace/[slug]/page.js`, substituting "Realizace" /
`https://arbovert.cz/realizace` and `{realization.title}` / `https://arbovert.cz/realizace/{slug}`.
For the two index pages (`src/app/sluzby/page.js`, `src/app/realizace/page.js`), a 2-level
breadcrumb (Domů → Služby / Domů → Realizace) is sufficient.

### 4.5 `Article` — realization detail (`src/app/realizace/[slug]/page.js`)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://arbovert.cz/realizace/{realization.slug}#article",
  "headline": "{realization.title}",
  "description": "{realization.excerpt}",
  "datePublished": "{realization.date}",
  "image": [
    "https://arbovert.cz{realization.imageSrc}"
  ],
  "author": { "@id": "https://arbovert.cz/#organization" },
  "publisher": { "@id": "https://arbovert.cz/#organization" },
  "mainEntityOfPage": "https://arbovert.cz/realizace/{realization.slug}"
}
```

`realization.date` is already ISO 8601 (`YYYY-MM-DD`) in `src/data/realizations.js`, so no
reformatting needed. Do not add `dateModified` unless the data model actually tracks edits —
don't invent a value. `author`/`publisher` reference the same `@id` as the homepage
Organization rather than duplicating NAP data a third time.

## 5. Files that need changes (summary)

- `src/app/page.js` — add `@id` to `LocalBusiness`, fix Praha `PostalAddress`, add
  `addressRegion` to Vimperk, add `WebSite` block.
- `src/app/sluzby/[slug]/page.js` — fix `provider` to reference `@id`, add `url`/`serviceType`,
  add `BreadcrumbList`.
- `src/app/sluzby/page.js` — add 2-level `BreadcrumbList`.
- `src/app/realizace/[slug]/page.js` — add `Article` block, add `BreadcrumbList`.
- `src/app/realizace/page.js` — add 2-level `BreadcrumbList`.
- `public/images/` — optional: add a raster (PNG/WEBP) logo if the SVG-logo caveat is confirmed.
