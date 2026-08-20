# GEO / AI-Search-Readiness Audit — arbovert.cz
Checked: 2026-08-18, live requests against https://arbovert.cz/ (Cloudflare edge, PRG colo).
Tools available this session: Bash/curl, WebFetch, claude-seo scripts, pre-crawled corpus.
No DataForSEO MCP, no dedicated WebSearch tool, no PageSpeed/GSC/GA4 credentials — platform
visibility scores below are inferred from crawl-access + content quality, not measured via
live query APIs.

## GEO Health Score: 46 / 100

| Dimension | Weight | Score | Basis |
|---|---|---|---|
| Citability | 25% | 50 | Homepage FAQ has 5 self-contained Q&A answers (67-95 words each, below the 134-167 optimal band but genuinely extractable, one cites zákon č. 114/1992 Sb.). Service pages have no equivalent — generic 140-200 word blurbs, no pricing/stats/named credentials. |
| Structural Readability | 20% | 40 | Service page H2 is the literal word "Arbovert" (not descriptive/question-based) on all 7 `/sluzby/*` pages; only real content headings on the whole site are the homepage FAQ's implicit Q&A pairs. |
| Multi-Modal Content | 15% | 35 | No video/YouTube presence anywhere on-site; images all have alt text (per pre-crawled onpage.json) but no infographics, tables, or embedded stats visuals. |
| Authority & Brand Signals | 20% | 45 | Strong structured NAP/LocalBusiness data and a real external credential link (ETW/eac-arboriculture.com), undercut by conflicting "years of experience" claims across pages and no external brand presence found (YouTube/Reddit/Wikipedia/LinkedIn — see caveats below). |
| Technical Accessibility | 20% | 55 | Static export, SSR, full content served to every bot UA tested with identical bytes to a browser UA (no cloaking, no JS dependency) — good. Undercut by GPTBot/ClaudeBot being disallowed in the live (Cloudflare-injected) robots.txt and by llms.txt being absent. |

Weighted: 0.25×50 + 0.20×40 + 0.15×35 + 0.20×45 + 0.20×55 = **45.75 ≈ 46/100**

## AI Crawler Access — what was actually tested vs inferred

### robots.txt content (fetched live, https://arbovert.cz/robots.txt, HTTP 200, cf-ray a2ce859b8cb7f976-PRG)
The live file is **not** the same as the repo's `public/robots.txt`. Cloudflare injects a block
ahead of the site's own rules, delimited by `# BEGIN Cloudflare Managed content` /
`# END Cloudflare Managed Content`:

```
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

User-agent: Amazonbot            -> Disallow: /
User-agent: Applebot-Extended    -> Disallow: /
User-agent: Bytespider           -> Disallow: /
User-agent: CCBot                -> Disallow: /
User-agent: ClaudeBot            -> Disallow: /
User-agent: CloudflareBrowserRenderingCrawler -> Disallow: /
User-agent: Google-Extended      -> Disallow: /
User-agent: GPTBot               -> Disallow: /
User-agent: meta-externalagent   -> Disallow: /
```
After the Cloudflare block, the repo's own `public/robots.txt` content follows (generic
`Allow: /`, sitemap link, `Disallow: /api/ /_next/ /out/`).

**PerplexityBot and OAI-SearchBot are NOT in the disallow list** — they fall under the
`User-agent: *` rule (`Allow: /`, `Content-Signal: search=yes,ai-train=no,use=reference`).

### Content-Signal vs. Disallow — the distinction the task asked me to be precise about
- `Content-Signal: search=yes,ai-train=no,use=reference` on `User-agent: *` is a **declarative
  licensing signal** (per the spec text embedded in the same robots.txt, citing EU Directive
  2019/790 Art. 4): `ai-train=no` opts out of model **training/fine-tuning** only.
  `ai-input` (RAG / grounding / live AI-answer retrieval) is **not specified**, so per the
  spec's own rule (c), it is neither granted nor restricted — **`ai-train=no` does NOT block
  AI search retrieval** (ChatGPT Search, Perplexity, Copilot, AI Overviews citation fetches).
- The explicit `User-agent: GPTBot / Disallow: /` and `User-agent: ClaudeBot / Disallow: /`
  lines are ordinary robots.txt exclusions — a **binary "don't fetch at all"** instruction to
  any crawler that identifies as GPTBot or ClaudeBot and honors robots.txt, regardless of
  purpose (training or retrieval). This is a stronger and different kind of restriction than
  the Content-Signal line.

### Live UA tests (actually executed via curl, 2026-08-18 ~05:30 UTC, against `https://arbovert.cz/`)
| User-Agent tested | HTTP status |
|---|---|
| GPTBot | 200 |
| ClaudeBot | 200 |
| PerplexityBot | 200 |
| OAI-SearchBot | 200 |
| CCBot | 200 |
| Bytespider | 200 |
| Google-Extended | 200 |
| Googlebot | 200 |
| meta-externalagent | 200 |
| Bingbot | 200 |
| plain Chrome UA | 200 |

Response bodies for GPTBot and ClaudeBot were **66,449 bytes**, identical in length to the
plain-browser response, with the same `<title>`, same visible text, and the only textual diff
being the Cloudflare email-obfuscation token (randomized per request, unrelated to bot
detection). No challenge page, no cloaked/truncated content, no 403/429.

**Conclusion: the Disallow rules for GPTBot/ClaudeBot/etc. are currently declarative only —
there is no active Cloudflare Bot Management / WAF rule enforcing them at the edge on this
zone today.** A crawler that ignores robots.txt would get full content anyway. But a
*compliant* crawler — which is exactly what GPTBot and ClaudeBot are documented to be — will
see the Disallow line and simply not fetch the site at all. That is a real, if
policy-rather-than-technical, block on two of the four crawlers this framework says should be
allowed for AI search visibility (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot). Only 2 of
the 4 (OAI-SearchBot, PerplexityBot) are currently allowed.

I could not test whether Cloudflare's dashboard has an "AI Crawlers" / "AI Crawl Control"
managed toggle enabled or disabled for this zone (that's an account-level setting, not visible
via public HTTP requests) — the injected block strongly suggests Cloudflare's default
"Block AI bots" managed rule is switched **on** for this zone, since this exact bot list
matches Cloudflare's standard AI-scraper category, and this is not something that would appear
in a plain, self-authored `public/robots.txt`.

## llms.txt
`https://arbovert.cz/llms.txt` → **HTTP 404** (confirmed via curl). Not present. Per the
task's own framework this is optional and Google does not use it, so treat as Low priority —
noted, not scored as a major gap.

No RSL 1.0 (`<link rel="license">` or `/rsl.xml`) found in the homepage `<head>` — not present.

## Citability of the Czech content

**Strength — homepage FAQ:** 5 Q&A pairs, present both as visible DOM content (under H2 "Často
kladené otázky") and as `FAQPage` JSON-LD. Each answer is self-contained and would survive
being lifted out of context:
- "Kolik stojí rizikové kácení stromu?" (67 words) — gives the actual price *drivers* (height,
  diameter, access, need for a crane) and a directional price band ("v tisících korun" for
  simple jobs), plus a call to action (free on-site quote). No hard number, so it's a weak
  pricing signal, not a strong one.
- "Kdy je potřeba povolení ke kácení stromu…" (95 words) — cites the actual law, zákon č.
  114/1992 Sb., and the 80 cm / 130 cm threshold. This is exactly the kind of specific,
  attributable fact an AI answer engine can quote.
- The other three (tree-hazard signs, fruit-tree pruning timing, wood-chipping/waste handling)
  are similarly self-contained, 71-82 words.
- All 5 are shorter than the 134-167 word optimal citation length — extractable, but not
  maximally so.

**Gap — everything else:** The 7 `/sluzby/*` service pages (word counts ~140-200 per
pre-crawled onpage.json) have no equivalent direct-answer paragraph. Checked
`sluzby_rizikove-kaceni-stromu.html` directly: intro sentence + 4 short bullet fragments
("Obtížně přístupná místa", "Citlivé prostředí", …), no price signal, no named certification,
no statistic. `/o-nas` (287 words) is generic ("Jsme tým certifikovaných pracovníků…") with no
named individual or certifying body in the visible text. `/kontakt` is 94 words.

**Entity clarity:** Business name is unambiguous and consistent — "Arbovert s.r.o." /
"Arbovert" — with IČO 02059690 / DIČ CZ02059690 on `/kontakt`, and two physical addresses
(Vimperk HQ, Praha branch) plus phone/email in the homepage `LocalBusiness` JSON-LD. What an
"arborista" does is explained implicitly through service names and the FAQ, but never defined
directly ("arborista je odborník na…" does not appear anywhere in the crawled corpus) — a
missed easy win for entity grounding of a term a global AI model may not map confidently to
the Czech niche term.

**Real inconsistency found — years of experience:**
- `home.html` and `sluzby_rizikove-kaceni-stromu.html`: "**14+** lety zkušeností"
- `o-nas.html` and `kontakt.html`: "**12+** lety zkušeností"
- Homepage `LocalBusiness` JSON-LD: `"foundingDate":"2011"` (→ ~15 years as of 2026, per the
  site's own footer "© 2026")

Three different numbers for the same fact, live on the same domain. AI answer engines that
cross-check facts across a domain (or that get asked "how many years of experience does
Arbovert have") will hit contradictory source text.

**Credentials:** ETW (European Tree Worker) certification is shown as a clickable logo badge
on the homepage only, linking out to eac-arboriculture.com (a real third-party arboriculture
authority) — but no sentence anywhere explains what ETW is or who holds it. "Lukáš Kačer"
appears by name only on `/kontakt`, with no role/credential attached in the visible body text
(the pairing "Lukáš Kačer — certifikovaný arborista s 12+ lety zkušeností" exists only in that
page's `<meta name="description">`, not in on-page prose an AI crawler would read as content).

## Brand mention / authority signals for "Arbovert" — what I found and what I could not verify

On-site (fully verified via grep of all 30 crawled pages): zero references to YouTube anywhere
(no channel link in nav, footer, or the JSON-LD `sameAs` array). `sameAs` contains exactly two
URLs: `https://www.facebook.com/arbovertcz/` and the sister site
`https://vyskoveprace-arbovert.cz/`. No `aggregateRating` or `Review` schema anywhere.

Off-site, using DuckDuckGo's HTML search endpoint and a Bing search via WebFetch (no dedicated
WebSearch tool and no DataForSEO MCP were available in this session):
- `site:reddit.com Arbovert arborista` → 0 results
- `site:youtube.com Arbovert` → 0 results
- `site:linkedin.com "Arbovert s.r.o."` → 0 results
- `site:wikipedia.org Arbovert` → 0 results
- DuckDuckGo started returning an anomaly/rate-limit interstitial after ~5 queries in quick
  succession, so the four zero-result queries above should be read as "nothing found within a
  handful of attempts before being rate-limited," **not** as a confirmed, exhaustive absence.
- A Bing search via WebFetch for `"Arbovert" arborista recenze` returned entirely unrelated
  results (Japanese precious-metals pricing sites) — inconclusive (likely a WebFetch/Bing
  rendering artifact), not evidence of anything.
- An unfiltered DuckDuckGo query for `"Arbovert" arborista` (before rate-limiting) surfaced
  arbovert.cz's own homepage and service page, plus one firmy.cz category-directory page for
  "Arborista, Výškové práce" in Říčany — that firmy.cz result did not visibly name "Arbovert"
  in its title/snippet, so I cannot confirm it is actually an Arbovert business listing rather
  than a coincidental keyword match. Not counted as a confirmed citation.

**Bottom line: no Wikipedia entity, no confirmed Reddit presence, no confirmed LinkedIn
company page, no YouTube channel — for a signal the framework calls the single strongest
correlate (~0.737) with AI citation, this is a real gap, but given the rate-limited/failed
searches above, treat "not found" as best-effort, not exhaustive.** A follow-up with a proper
SERP API (DataForSEO) is needed to confirm.

## Technical accessibility for AI crawlers

Positive: `render_page.py` output for the homepage (`home.json`) reports `is_spa: false`, HTTP
200 — the site is a Next.js static export (`output: 'export'`), so all crawled pages ship
fully pre-rendered HTML. Confirmed directly: raw `curl` fetches (no JS execution) return the
complete FAQ text, service copy, and JSON-LD for every bot UA tested. No CSR dependency to
worry about for this dimension.

Negative, noted but out of primary GEO scope (flagging for cross-reference with the technical
SEO audit if one exists): 0 of 30 pages emit a `<link rel="canonical">` in server HTML
(per pre-crawled onpage.json) — this also affects AI systems' ability to pick a single
canonical URL to cite when duplicate/parameterized variants exist.

## Platform-specific scores (estimated from crawl access + content quality — NOT measured via
live query tools; DataForSEO MCP was unavailable this session, treat as directional only)

| Platform | Est. score /100 | Basis |
|---|---|---|
| Google AI Overviews | 50 | Googlebot unaffected (only Google-Extended, which governs Gemini training/app use, is disallowed — does not block Search/AIO crawling); LocalBusiness+FAQ schema present; thin service-page content caps citability. |
| ChatGPT (Search) | 45 | OAI-SearchBot allowed (200, unblocked); GPTBot itself disallowed, which may limit inclusion in broader OpenAI corpora/browsing beyond live search. |
| Perplexity | 45 | PerplexityBot allowed (200, unblocked); content accessible without JS; thin, non-question-based service content limits citation depth. |
| Bing Copilot | 45 | Bingbot unaffected (200); same content-depth ceiling as above. |

## Findings

Critical | — | No Critical findings — nothing here actively blocks indexing or triggers a penalty; the robots.txt issue below is a policy-level exclusion for 2 of 4 target crawlers, not an enforced technical block. | —

High | GPTBot and ClaudeBot excluded via Cloudflare-injected robots.txt | Live `https://arbovert.cz/robots.txt` (fetched 2026-08-18) contains `User-agent: GPTBot / Disallow: /` and `User-agent: ClaudeBot / Disallow: /` inside a Cloudflare-managed block that sits ahead of the repo's own `public/robots.txt`; OAI-SearchBot and PerplexityBot are not disallowed. Live curl tests confirm both bots still get HTTP 200 with full content today (no edge enforcement yet), so this is a compliance-only block for now, but a compliant crawler will honor it and stop fetching. | Not fixable in `public/robots.txt` (Cloudflare overrides it at the edge) — requires changing the Cloudflare zone's "AI Crawl Control" / "Block AI Bots" managed-rule setting in the Cloudflare dashboard to allow GPTBot and ClaudeBot, matching the site's own stated Content-Signal (`search=yes`).

High | Conflicting "years of experience" claims across pages | `home.html` + `sluzby_rizikove-kaceni-stromu.html` say "14+ lety zkušeností"; `o-nas.html` + `kontakt.html` say "12+ lety zkušeností"; `foundingDate:"2011"` in the homepage LocalBusiness JSON-LD implies ~15 years as of the site's own "© 2026" footer. | `src/data/arbo.js` (rizikove-kaceni-stromu entry), homepage hero/stats component, `src/app/o-nas/page.js`, `src/app/kontakt/page.js` — standardize on one number, ideally computed from `foundingDate` (2011).

Medium | Service pages have no self-contained, citable answer block | 7 `/sluzby/*` pages run ~140-200 words with no direct-answer paragraph, no pricing signal, no named credential — unlike the homepage FAQ. Checked directly in `sluzby_rizikove-kaceni-stromu.html`. | `src/data/arbo.js` — add a 100-160 word direct-answer paragraph per service (definition, who needs it, price driver) to each `longDescription`.

Medium | Service page headings are not descriptive or question-based | All 7 `/sluzby/*` pages use literal H2 text "Arbovert" for the main content heading; the only other H3s present ("Kácení stromů Praha", "Arboristika Jižní Čechy", "Arbovert s.r.o.") are footer navigation, not content subheadings — confirmed via `<h[23]>` grep across all `sluzby_*.html`. | `src/app/sluzby/[slug]/...` template + `src/data/arbo.js` — replace the generic H2 with the service name or a question ("Co je [služba]?"), add 2-3 real content H3s.

Medium | No named practitioner credentials in visible on-page text | "Lukáš Kačer" appears only on `/kontakt`, with role/credential ("certifikovaný arborista s 12+ lety zkušeností") present only in that page's `<meta name="description">`, not in visible body text. ETW certification shown only as a homepage badge/logo linking to eac-arboriculture.com, with no explanatory sentence anywhere. | `src/app/kontakt/page.js` (or `o-nas`) — add the name+role+credential as visible prose, not just meta; add one sentence near the ETW badge explaining the certification.

Medium | No confirmed external brand-authority presence (YouTube/Reddit/Wikipedia/LinkedIn) | Zero YouTube references on-site (grep of all 30 pages, and absent from JSON-LD `sameAs`, which lists only Facebook + sister site). Off-site DuckDuckGo `site:` searches for reddit.com/youtube.com/linkedin.com/wikipedia.org returned 0 results before the search endpoint started rate-limiting; a Bing check via WebFetch was inconclusive. YouTube presence is the framework's strongest known correlate (~0.737) with AI citation. | Not a code fix — content/marketing: publish real job videos (e.g., link them from `src/data/realizations.js` entries) and claim a Google Business Profile / LinkedIn company page; re-verify with a proper SERP API (DataForSEO) since this session's search checks were rate-limited, not exhaustive.

Low | llms.txt absent | `https://arbovert.cz/llms.txt` → HTTP 404. Optional per this framework and ignored by Google; low priority. | If pursued, add `public/llms.txt` to the repo.

Low | No RSL 1.0 licensing markup | No `<link rel="license">` or `/rsl.xml` found in the homepage `<head>`. Optional/emerging standard. | If pursued, add an RSL license file and reference it from `src/app/layout.js`.

Info | Homepage FAQ is genuinely citable content | 5 Q&A pairs, visible in DOM (under H2 "Často kladené otázky") and in `FAQPage` JSON-LD, self-contained, one cites zákon č. 114/1992 Sb. Per audit rules, FAQPage schema itself is flagged Info only (Google retired FAQ rich results 2026-05-07) — do not remove existing markup, do not add more.

Info | Site is technically well-suited for AI crawling (SSR, no JS dependency) | `home.json` (render_page.py): `is_spa: false`, HTTP 200; raw curl fetches with bot UAs return full pre-rendered content identical in length to a browser fetch, no cloaking. Static export (`output: 'export'`) means every page ships complete HTML.

Info | Content-Signal `ai-train=no` does not block AI-search retrieval | `User-agent: * / Content-Signal: search=yes,ai-train=no,use=reference` opts out of model training only; `ai-input` (live RAG/grounding for AI answers) is unspecified and therefore neither granted nor restricted per the spec text embedded in the same robots.txt file. Do not conflate this with the separate, stronger `Disallow: /` lines for GPTBot/ClaudeBot (see High finding above).

Info | LocalBusiness JSON-LD entity data is solid | Homepage `LocalBusiness` schema includes name, alternateName, both addresses, phone, email, areaServed, geo, openingHours, priceRange, serviceType list, and foundingDate — good grounding data for AI entity resolution. No fix needed.
