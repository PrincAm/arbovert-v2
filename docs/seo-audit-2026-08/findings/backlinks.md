# Backlink Profile — arbovert.cz

## Tier: 0 (Common Crawl + verify crawler only)

Confirmed via `backlinks_auth.py --check`: Moz and Bing Webmaster keys are not
configured, DataForSEO is not installed. Only Common Crawl's quarterly web graph
and the local verify-backlinks crawler are available. **A WebSearch tool was not
available in this session either**, so Czech directory presence below is taken
from the geo/local specialist's findings (which did fetch some of these directly),
not independently re-verified here — flagged per source below.

**This is domain-level coverage only, not a full link index.** No referring-domain
list, anchor text, spam score, or link-velocity data exists at this tier. Do not
read anything below as a complete backlink profile.

## Backlink Health Score: INSUFFICIENT DATA

Per the Tier 0 rule: fewer than 4 of the 7 scoring factors (referring domains,
domain quality distribution, anchor text, toxic ratio, link velocity, follow/nofollow,
geographic relevance) have any data source at this tier. **0 of 7 have real data.**
Producing a numeric score would be misleading — none is given. Validated by
`validate_backlink_report.py` (status: PASS, 0 issues, confirms no premature
numeric score was emitted).

## Common Crawl Web Graph — Source: Common Crawl (confidence: 0.50)

`commoncrawl_graph.py arbovert.cz --json`, release `cc-main-2026-jan-feb-mar`
(quarterly graph, per https://commoncrawl.org/web-graphs):

| Metric | Value |
|---|---|
| In crawl | true |
| In rankings | true |
| PageRank | 4.53e-09 |
| PageRank rank | 23,909,152 |
| Harmonic centrality | 12,594,841 |
| Harmonic centrality rank | 17,341,065 |
| Distinct hosts seen | 1 (arbovert.cz only — no `www.` variant or subdomain split, no evidence of a parked-domain or subdomain-spam pattern) |

**Interpretation, not fabrication:** the domain is present and ranked in CC's
graph, so it has *some* measurable inbound link presence within CC's crawl
sample — but the rank position (roughly 24M / ~1B+ hosts CC tracks) is
consistent with what's expected for a small, single-location local-service
site with a young/thin external footprint. This is **not** a "low authority"
verdict in the sense of a penalty or problem — CC coverage of small local-business
sites is inherently sparse, and PageRank/harmonic-centrality rank from a single
quarterly snapshot doesn't map to Moz DA or a competitive-ranking judgment. Do
not read this as "backlinks are bad"; read it as "no richer signal is available
at this tier."

CC's web graph does not expose the actual referring domains or pages for a
given target (`--top-referrers` is documented as a no-op in this build), so
there is no way at Tier 0 to name a single inbound link, confirm anchor text,
or assess toxicity from CC data.

## Verification crawler — not run against real candidates

`verify_backlinks.py` requires a `--links` file of candidate source URLs to
check for a live link back to the target. No known/candidate backlink URL
list was supplied for this audit and none could be discovered (no WebSearch
tool, no Moz/DataForSEO referring-domains export). Confirmed the script itself
works (test run against a missing file returned the expected file-not-found
error), but there is nothing to feed it. **Result: zero backlinks were
confirmed or refuted by direct crawl verification in this audit.**

## Czech directory / citation presence — Source: local/geo specialist's direct fetches (not re-verified here)

Per `arbovert.cz-audit/findings/local.md`, cross-referenced here since it is
directly relevant to link/citation equity:

| Directory | Status | Note |
|---|---|---|
| Firmy.cz / Mapy.cz (Seznam) | **Confirmed live** — two listings (Vimperk sídlo + Praha branch) | Filed under **"Údržba zeleně a rekultivace"** (generic green-space maintenance), not an arborist-specific category. Whether each listing includes a followed hyperlink back to arbovert.cz was not separately checked by either specialist — worth a manual look, since a citation without an actual outbound link carries much less link equity than one with. |
| Zivefirmy.cz | Not confirmed | Guessed URL returned 404 in the geo specialist's check — inconclusive, not evidence of absence. |
| Najisto.cz | Not confirmed | Blocked with HTTP 403 (bot protection). |
| Edb.cz | Not confirmed | Blocked with HTTP 403 (bot protection). |
| ČAA (Česká asociace arboristiky) member directory | Not checked | No fetch attempted against caa-cz.org or equivalent in either specialist's pass; the site itself does not mention ČAA membership (per local.md). This is a genuine open item, not a "no" finding. |
| ETW (European Tree Worker) registry | Not checked | Site claims the certification (homepage badge) but the ETW register itself was not queried to confirm a listing/backlink. |
| Google Business Profile | Not confirmed either way | Consent-wall/JS blocking in this environment per local.md; would also be a citation/link-adjacent signal (GBP → website link) if it exists. |

None of the "not confirmed" rows above should be read as "absent" — they are
tool-access limits (403s, JS rendering, no search tool), stated explicitly so
they aren't mistaken for a clean citation profile.

## Toxic / spam signals

**No toxic or spam link patterns were found — but this is a statement about
what wasn't visible with these tools, not a clean bill of health.** At Tier 0
there is no referring-domain list to screen for link farms, PBNs, or spun
anchor text, and Moz Spam Score / DataForSEO toxicity scoring are unavailable.
The one weak signal available — CC's single-host count and unremarkable
rank position — shows nothing unusual (no sudden authority spike, no
parked-domain footprint), which is consistent with an absence of manipulative
link building, but that is a low-confidence, indirect read, not a toxicity
audit.

## Link-acquisition angle: use the realization pages as outreach assets

The one genuine, concrete opening for this business is already sitting in
`src/data/realizations.js`: 17 case-study pages tied to real, named,
independently-verifiable sites, several of which are natural link-outreach
targets that a generic "we serve your city" business would not have access to:

- **Zámek Kozel** (`osetreni-lipy-zamek-kozel`), **Zámek Nebílovy**
  (`osetreni-dubu-zamek-nebilovi`), **Zámek Vlachovo Březí**
  (`osetreni-lip-zamek-vlachovo-brezi`) — state-run chateaux (typically
  administered by NPÚ, Národní památkový ústav, or a municipal trust).
  Heritage sites frequently publish "údržba a péče o park" / conservation
  work updates and contractor/supplier credits on their own web presence.
  A short pitch to each castle's administrator, offering photos/copy for a
  "care of our historic trees" post that links to the relevant Arbovert
  realization page, is a realistic, low-cost ask — the work is already done
  and documented.
- **Týnský chrám, Praha 1** (`osetreni-jirovce-tynsky-chram-praha`) — a
  major, well-known Prague landmark. Same pitch: a maintenance note on the
  church's own site or parish bulletin referencing the tree work.
- **ČEZ (Kladno)** (`osetreni-javoru-kladno-cez`) — the client named in this
  realization is a large utility with its own vendor/supplier pages and CSR
  content; worth checking whether ČEZ publishes anything that could credit
  the contractor.
- **Municipalities** with named, completed work — Hoštka, Vacov, Lčovice,
  Dolany u Kladna, Lázně Toušeň, Černá v Pošumaví, Lhenice, Prachatice — Czech
  town-hall (obecní/městský úřad) websites commonly run "aktuality" /
  "z obce" news sections and occasionally list contractors for public-space
  work (tree felling/care on municipal land almost always requires a permit
  and a named contractor of record). A short, specific email to each town's
  úřad — "we did the [tree/species] work you documented in [month/year],
  happy to provide photos for your site" — is a realistic, per-town ask, and
  each is already backed by a real, published case study.

This does not require a link-building budget or a directory-submission
campaign — it requires reusing content that already exists (`src/data/
realizations.js`) as the basis for direct outreach to a short, specific list
of named organizations. Recommend prioritizing the three chateaux and the
Prague church first (public-institution sites carry more topical/authority
relevance for arborist work than a generic directory listing would), then
the smaller municipalities.

## What remains genuinely unknown (be upfront, not evasive)

- Total referring domain count: unknown (no source at this tier).
- Anchor text distribution: unknown.
- Any actual toxic/spammy inbound links: unknown — not screened, not ruled out.
- Link velocity / growth trend: unknown (Common Crawl gives one quarterly
  snapshot, not a trend).
- Whether the confirmed Firmy.cz/Mapy.cz listings carry a live outbound link
  to arbovert.cz: unknown — presence of the listing was confirmed by the geo
  specialist, the hyperlink itself was not separately checked by either
  specialist.

## Recommendation

For any of this to become a real, numeric backlink audit, the free-tier gap
is Moz (free signup, 2,500 rows/month) — that alone would unlock referring-domain
count, DA/PA, spam score, and anchor text (Tier 1, confidence 0.85). Without it,
the honest deliverable at Tier 0 is exactly what's above: one domain-level CC
snapshot, an unverifiable citation list, and a concrete, low-cost outreach angle
built from real completed work — not a scored profile.
