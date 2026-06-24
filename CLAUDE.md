# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing/landing site for **ViewPhoto.TV** — a browser-based tool that lets users show selected photos from their phone on any Smart TV via QR code. No apps, no accounts required. No build system, no dependencies, no package manager.

## Development

Open files directly in a browser. No build step required.

```
# Serve locally (any static server works)
python -m http.server 8000
# or
npx serve .
```

## Architecture

Pure HTML/CSS/JS static site:

- `index.html` — main landing page (hero, features, how-it-works, privacy sections)
- `faq.html`, `privacy.html`, `terms.html` — supporting pages
- `css/style.css` — single shared stylesheet for all pages (Apple-style design, SF Pro font stack)
- `js/menu.js` — hamburger mobile menu toggle
- `assets/` — SVG icons/logos and screen screenshots (`webp`/`jpg`/`png`)

All pages share `css/style.css`. Navigation uses both anchor links (within-page sections) and links to other HTML files. The mobile menu (`js/menu.js`) toggles `.mobile-menu` display on `.hamburger` click.

SEO/metadata files at root: `sitemap.xml`, `robots.txt`, `manifest.json`, `llms.txt`, `llms-full.txt`, `.well-known/security.txt`.

`index.html` contains a hidden `#ai-optimized` section (positioned off-screen) with structured content for search engines and AI crawlers — preserve this when editing.
