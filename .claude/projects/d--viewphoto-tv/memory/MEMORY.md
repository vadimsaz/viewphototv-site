# Project Memory: viewphoto.tv

## Development Freeze
- **TV version (`/tv/[sessionCode]`) is FROZEN** — no functional changes
- All new features go to **web viewer (`/view/[sessionCode]`)** only
- Shared infra (API routes, lib/, components) can be changed but must not break TV

## Key Architecture
- Next.js 14 App Router, Vercel deployment
- Storage: Cloudflare R2 (photos) + Cloudflare D1 (metadata)
- Plan tiers: LITE (free), EVENT ($0.99), PREMIUM (subscription) — no test overrides in production
- Ambient colors extracted **client-side** at upload via canvas (`extractColorsFromBlob()` in `src/lib/image-processing.ts`), stored as JSON in D1 `photos.colors` column (tl, tr, bl, br, avg, naturalW, naturalH)
- **No server-side color extraction** — `/api/image-colors` was deleted; `AmbientBackground` uses preloaded colors or FALLBACK_RGB

## Deploy
- **ALWAYS commit + push to GitHub first** — the repo is connected to Vercel via GitHub Integration
- `git add ... && git commit && git push origin main` → Vercel auto-deploys and updates viewphoto.tv
- `vercel --prod` alone is NOT enough — GitHub Integration overwrites direct Vercel deploys with git code
- After schema changes: POST https://viewphoto.tv/api/db/init
- To manually re-point domain after a direct deploy: `vercel alias set <deployment-url> viewphoto.tv`

## Plan Tiers (current production)
- Free users → LITE (2h session, 200 photos, slideshow ✓, ambient ✓, no multi-upload, no delete)
- EVENT = paid $0.99 pass (24h, 200 photos)
- PREMIUM = subscription (24h, 500 photos, 4K)
- Slideshow + Ambient locked for LITE, show UpgradeModal on attempt

## Porting Plans
See `porting.md` for full estimates. Summary:
- Tizen (Samsung) + webOS (LG): ~1–2 days each, hosted web app, no UI changes
- Apple TV: significant effort, Siri Remote needs JS bridge, $99/year Dev account

## URL Language Rule
- **English**: `/section-name` (no prefix)
- **Other languages**: `/LANG/section-name` (e.g., `/ru/how-it-works`)
- Supported langs: es, fr, de, ru, zh, hi, pt, ar, he, bn, ja, ko
- Use `getLocalizedUrl()` helper when building links (see url_language_rule.md)

## Sitemap & SEO
- Dynamic sitemap generation at `src/app/sitemap.ts` (200+ URLs across 13 languages)
- Auto-covers: home, documentation, device pages, use cases, application pages
- Robots.txt at `public/robots.txt` with permissions for all crawlers
- **Update rule:** Rebuild/deploy after adding devices, use cases, or languages (see sitemap_maintenance.md)

## Meta Tags (Hreflang & Open Graph)
- **Hreflang tags:** Implemented via `alternates.languages` in metadata for all 13 languages
- **Open Graph:** Social media preview tags (og:title, og:description, og:image, og:locale)
- **Twitter Cards:** summary_large_image format for better tweets
- **Canonical URLs:** Set for all pages to prevent duplicate content
- **Robots directives:** index, follow, and googleBot specific settings
- **Helper functions:** `src/lib/seo-helpers.ts` for consistent metadata generation (see seo_meta_tags.md)

## Visual Theme
All pages use: `radial-gradient(circle at 30% 20%, #3b1d74, #1a1040 60%, #0e0825)` bg
Modal cards: `rgba(255,255,255,0.06)` bg, `rgba(179,136,255,0.18)` border, `blur(16px)`
Purple accent: `#b388ff`, active buttons: `linear-gradient(135deg, #7c3aed, #b388ff)`
