# Sitemap Architecture — arbovert.cz

Score: 78/100

## Evidence summary
- `https://arbovert.cz/sitemap.xml` fetched live and byte-identical (`diff` clean) to
  `/Users/adam/git/arbovert-v2/public/sitemap.xml` — confirms the deployed sitemap is
  exactly this hand-maintained repo file, so repo-level fixes apply 1:1 to production.
- `xmllint --noout public/sitemap.xml` → valid XML. `urlset` namespace correct
  (`http://www.sitemaps.org/schemas/sitemap/0.9`).
- 29 `<url>` entries. Well under the 50,000-URL / 50MB cap — no split/index needed.
- Live crawl (`urls.txt`, 30 URLs, all HTTP 200 per pre-crawl) vs sitemap URL set: **exact
  match except `/gdpr`**, which is live (200, own `metadata` export, no noindex) and linked
  sitewide from `src/layouts/Footer.js:100` and `src/components/ContactUs.js:183`, but is
  absent from the sitemap.
- Spot-checked 4 sitemap URLs directly (`/`, `/sluzby`, a realization page, `/gdpr`) with
  `curl -w %{http_code}/%{redirect_url}` — all 200, zero redirects, confirming CONTEXT.md's
  pre-crawl data. No 404s, no redirect chains, no noindex found in `onpage.json` (checked
  `robots` field across all 30 pages).
- `robots.txt` declares `Sitemap: https://arbovert.cz/sitemap.xml` correctly, plus separately
  `Allow: /` for `User-agent: *` (Cloudflare-managed AI-crawler block section is unrelated to
  indexability — Googlebot is not disallowed).
- Every entry carries `priority` and `changefreq` — both ignored by Google since 2020, purely
  informational, harmless but dead weight.

## Question: does sitemap.xml match the uncommented realizations in realizations.js?
**Yes, exactly.** `src/data/realizations.js` currently has **17 active entries, none
commented out** (no `// --- MONTH N ---` blocks present right now — the backlog was fully
uncommented in commit `99472b4`). All 17 slugs appear 1:1 in the sitemap's 17
`/realizace/*` `<url>` entries plus the `/realizace` index — verified by diffing the sorted
slug lists. **No drift exists today.** This is notable given the repo's own warning that the
sitemap "must be updated manually" — so far the author has kept sitemap.xml and
realizations.js in the same commit every time (`git log` on both files shows identical
commit hashes: `99472b4`, `07b2519`, `dcbe3da`, `7020a3d`, `b7761dc`). That discipline is the
only thing preventing drift; there is no structural guarantee against a future publish that
forgets the sitemap edit.

## Question: are lastmod values honest?
**Mixed — genuinely honest for realization pages, demonstrably stale for 9 non-realization
pages.**
- Realization page lastmods are trustworthy: each `<url>` was last touched in the same
  commit/day that the corresponding entry was published or edited in `realizations.js`
  (verified via `git log` per file — e.g. `2026-08-09` lastmod on Kozel/Toušeň/Lhenice/
  Hoštka/Černá v Pošumaví/Prachatice/Lčovice/Vacov/realizace-index matches commit `99472b4`
  at 07:49 which uncommented those 7 backlog entries + added Kozel; two later same-day
  bugfix commits `17d6546` (08:04, Toušeň photo rotation) and `c7b5dd9` (10:30, 3-way photo
  swap on Dolany/Kladno/Prachatice) don't change the calendar-day accuracy).
- **Home (`/`), `/sluzby` index, and all 7 `/sluzby/*` service pages are stale.** Sitemap
  lastmod is frozen at `2026-02-03` for all 9, but:
  - `src/app/page.js` (home) was substantively changed in commit `21367bf` (2026-02-24):
    "add FAQ section, Service schema, dark contact form, and layout fixes" — a real content
    and structured-data addition, never reflected in the sitemap.
  - `src/data/arbo.js` (drives every `/sluzby/*` page's title/description/benefits) was
    edited in `ca54667` (2026-02-05, SEO keyword optimization) — again unreflected.
  - Lower-confidence: `906a79a` (2026-03-30) touched `src/app/sluzby/[slug]/
    ServicePageClient.js` and `src/app/realizace/[slug]/page.js`, but those diffs are 1-line
    cosmetic/accessibility tweaks (CTA contrast color, image attrs) — arguably not
    "significant" changes under Google's guidance, so I'm not counting this one as proof of
    dishonesty, just noting it.
  - By contrast `/o-nas` and `/kontakt` are honest: their only content commit (`b7761dc`)
    is dated `2026-02-03`, exactly matching their sitemap lastmod.
  - As of today (2026-08-18) the home page lastmod undersells the page's actual freshness by
    ~5.5 months and the service pages by ~2 weeks to ~4.5 months depending on which commit
    counts — the opposite of the failure mode you'd normally worry about (overstating
    freshness), but still inaccurate and it undermines any trust signal `lastmod` is meant to
    carry.

## Question: is /gdpr's absence deliberate or an oversight?
**Oversight, not deliberate exclusion.** Nothing in the codebase marks `/gdpr` as
intentionally non-indexable: it has its own `export const metadata` block
(`src/app/gdpr/page.js:7`), no noindex robots meta (confirmed empty/absent across all 30
crawled pages in `onpage.json`), it returns 200, and it's linked from the global footer
(`src/layouts/Footer.js:100`) and the contact-form GDPR consent link
(`src/components/ContactUs.js:183`) — i.e. it's a normal, discoverable, indexable page that
was simply never added to the hand-maintained `public/sitemap.xml` list. It's low business
value for search but its omission is inconsistent with everything else on the site being
listed, and it costs nothing to add.

## Question: is the sitemap declared in robots.txt?
**Yes.** `https://arbovert.cz/robots.txt` contains `Sitemap: https://arbovert.cz/sitemap.xml`
directly below the `User-agent: * / Allow: /` block. No sitemap-discovery issue.

## Findings

Critical | none | — | —

High | none | — | —

Medium | `/gdpr` missing from sitemap | Live page (200), linked in `Footer.js:100` and `ContactUs.js:183`, no noindex, present in every other discovery surface, absent from `public/sitemap.xml`'s 29 entries | Add a `<url>` entry for `https://arbovert.cz/gdpr` to `public/sitemap.xml` (or, better, fix via the generator recommended below)

Medium | Stale `lastmod` on 9 URLs (`/`, `/sluzby`, all 7 `/sluzby/*`) | Sitemap lastmod frozen at `2026-02-03`; `git log` shows real content commits after that date not reflected: `src/app/page.js` FAQ+schema in `21367bf` (2026-02-24), `src/data/arbo.js` SEO copy in `ca54667` (2026-02-05) | Regenerate lastmod from source-of-truth timestamps (see generator recommendation) rather than editing dates by hand in `public/sitemap.xml:4-69`

Low | Hand-maintained sitemap with no structural safeguard against drift | `public/sitemap.xml` and `src/data/realizations.js` currently match only because every publish commit (`99472b4`, `07b2519`, `dcbe3da`, `7020a3d`) happened to touch both files together — there is no build-time check or generation step enforcing this, and `CLAUDE.md` itself flags this as a manual step that's easy to forget | Replace `public/sitemap.xml` with a generated `src/app/sitemap.js` (Next.js App Router native sitemap route, supported under `output: 'export'`) that imports `realizations` from `src/data/realizations.js` and the static route list, so the sitemap can never drift from what `generateStaticParams` actually builds. Delete `public/sitemap.xml` once the generated route is verified at build time in `out/sitemap.xml`.

Info | `priority` and `changefreq` present on every entry | Both tags deprecated/ignored by Google since 2020 (still valid per spec, harmless) | Optional cleanup — drop both tags from every `<url>` block in `public/sitemap.xml:4-178` if/when rewriting; not required

Info | `robots.txt` sitemap declaration correct | `Sitemap: https://arbovert.cz/sitemap.xml` present and reachable | No action

## Location page quality gate
Not applicable — the site has 0 location-swap doorway pages; the 17 realization pages are
individually-written project write-ups (~145-220 words each per CONTEXT.md), not
programmatic city-variant pages. Gate thresholds (30+/50+ pages) are not triggered.

## Recommended fix (concrete)
Add `/Users/adam/git/arbovert-v2/src/app/sitemap.js` implementing Next's native
`export default function sitemap()` returning entries built from:
- static routes: `/`, `/o-nas`, `/sluzby`, `/kontakt`, `/realizace`, `/gdpr`
- `serviceContent` keys from `src/data/arbo.js` → `/sluzby/[slug]`
- `realizations` array from `src/data/realizations.js` → `/realizace/[slug]`, with
  `lastModified` derived from each realization's actual `date` field (or file mtime) instead
  of a hand-typed date
Then delete `public/sitemap.xml`. This closes both the `/gdpr` gap and the stale-lastmod gap
permanently, and makes the "must update sitemap by hand" line in `CLAUDE.md` obsolete —
update that doc line once the generator ships.
