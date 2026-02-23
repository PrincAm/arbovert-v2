# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server (Next.js)
yarn build        # Build static export to out/
npx serve out     # Serve the static build locally
yarn lint         # ESLint (next lint)
```

No test framework is configured.

## Git Commit Convention

Format: `feat|bug|chore|hotfix(scope): message. TICKET` or `NOTICKET`

Examples: `feat(seo): update keywords. NOTICKET`, `fix(form): button color. DAE-123`

## Architecture

**Static-export Next.js 16 site** (`output: 'export'`) — no server runtime, no API routes. All pages pre-render to static HTML in `out/`. The site is Czech-only (`lang="cs"`), plain JavaScript (no TypeScript).

### Key Directories

- `src/app/` — App Router pages and layouts
- `src/components/` — Page section components (hero, intro, contact form, etc.)
- `src/data/` — Static content data files that drive all service and realization pages
- `src/hooks/` — Custom hooks (media query, body scroll lock, canonical URL)
- `src/layouts/` — NavBar, Footer, shared layout wrappers
- `src/styles/` — Global CSS with Tailwind v4 + HeroUI imports
- `backup/` — Old Pages Router code (reference only, not active)

### Routes

| Route | Description |
|---|---|
| `/` | Homepage (client component with Schema.org JSON-LD) |
| `/sluzby` | Services index |
| `/sluzby/[slug]` | Service detail (7 services, slugs from `src/data/arbo.js`) |
| `/realizace` | Realizations index |
| `/realizace/[slug]` | Realization detail (slugs from `src/data/realizations.js`) |
| `/o-nas` | About us |
| `/kontakt` | Contact (EmailJS form) |
| `/gdpr` | Privacy policy |

### Data-Driven Content

All service and realization content lives in `src/data/`:

- **`arbo.js`** — `serviceContent` object keyed by slug. Each entry has `title`, `description`, `longDescription`, `imageSrc`, `benefits[]`, `seoTitle`, `seoDescription`.
- **`realizations.js`** — `realizations` array. Future entries are commented out with `// --- MONTH N ---` markers, intended to be uncommented one per month for SEO freshness. **The sitemap (`public/sitemap.xml`) must be updated manually when publishing new realizations.**

### Server vs Client Component Pattern

Dynamic `[slug]` pages use a **Server Component** for `generateMetadata` / `generateStaticParams`, delegating rendering to a `*Client.js` file when interactivity (`useRouter`, etc.) is needed.

### Styling

- **Tailwind CSS v4** — configured via CSS (`globals.css`) and PostCSS plugin only. No `tailwind.config.js` file exists.
- **HeroUI v3 beta** (`@heroui/react`) — UI component library.
- Color theme uses oklch custom properties in `globals.css`. Primary CTA: `bg-emerald-600`.
- Mobile breakpoint: 650px (via `useIsMobile()` hook).

### Images

- Local images in `public/images/` with `unoptimized: true` (no server for optimization).
- Cloudinary URLs used only for hero background images in `Welcome.js`.

### Forms & Analytics

- Contact form uses `@emailjs/browser` (client-side, no backend). Requires `NEXT_PUBLIC_EMAILJS_*` env vars in `.env.local`.
- Google Tag Manager (`GTM-5V7DRKB`) with cookie consent via `js-cookie`.

### SEO Metadata

Each page uses App Router native `export const metadata` or `export async function generateMetadata()`. The `next-seo.config.js` file is a legacy artifact and is not imported anywhere.
