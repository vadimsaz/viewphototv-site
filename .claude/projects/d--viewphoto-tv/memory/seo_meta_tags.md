---
name: SEO Meta Tags Implementation
description: Guidelines for maintaining hreflang and Open Graph meta tags across the site
type: reference
---

## SEO Meta Tags Implementation

The project implements comprehensive SEO metadata for all pages across 13 languages.

### What's Implemented:

#### 1. **Hreflang Tags** (Multi-language SEO)
- Tells Google which versions of a page exist in different languages
- Prevents duplicate content penalties
- Implemented via Next.js `alternates.languages` in metadata
- Covers all 13 languages (en + 12 localized)
- X-default fallback for content not in user's language

#### 2. **Open Graph Tags** (Social Media Sharing)
- `og:title` - Page title for social sharing
- `og:description` - Preview description
- `og:image` - 1200×630px preview image
- `og:url` - Canonical URL
- `og:type` - Content type (website, article, etc)
- `og:locale` - Language locale (en_US, ru_RU, etc)
- `og:site_name` - Brand name "ViewPhoto.TV"

#### 3. **Twitter Card Tags**
- `twitter:card` - Use summary_large_image for best presentation
- `twitter:title` - Tweet preview title
- `twitter:description` - Tweet preview text
- `twitter:image` - Card image

#### 4. **Canonical URLs**
- Absolute URL to prevent duplicate content issues
- Placed in `alternates.canonical`
- Important for pagination and variant pages

#### 5. **Robots Directives**
- `index: true` - Allow page indexing
- `follow: true` - Follow links on page
- `googleBot` specific directives for Google crawlers
- max-snippet, max-image-preview, max-video-preview for SERP display

### Files Involved:

1. **src/lib/seo-helpers.ts** - Helper functions for generating metadata
   - `generateHreflangAlternates(path, currentLang)`
   - `generateOpenGraphMetadata(options)`
   - `generateTwitterMetadata(options)`
   - `generateDocPageMetadata(options)`
   - `generateDynamicPageMetadata(options)`
   - `generateHomeMetadata()`

2. **src/app/layout.tsx** - Root layout with home page metadata
   - Includes hreflang for all 13 languages
   - Complete Open Graph for homepage
   - Twitter card support

3. **src/app/[lang]/layout.tsx** - Language-specific layout wrapper

4. **src/app/[lang]/*/page.tsx** - Individual page metadata
   - Each page has generateMetadata() function
   - Includes language-specific alternates
   - Localized Open Graph titles/descriptions

### Locale Mapping:

```typescript
const localeMap: Record<Language, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  ru: "ru_RU",
  pt: "pt_BR",
  zh: "zh_CN",
  hi: "hi_IN",
  ar: "ar_SA",
  he: "he_IL",
  bn: "bn_IN",
  ja: "ja_JP",
  ko: "ko_KR",
};
```

### When to Update:

- ✅ After creating new documentation pages
- ✅ After adding new device types
- ✅ After adding new use cases
- ✅ When changing page titles or descriptions
- ✅ When updating preview images

### How to Implement for New Pages:

1. Create generateMetadata() async function in page.tsx
2. Use helper functions from src/lib/seo-helpers.ts
3. Include hreflang alternates for all 13 languages
4. Add Open Graph with title, description, image
5. Add Twitter card support
6. Set canonical URL

Example:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { lang } = await params;
  const title = t(lang, "page.title");
  const description = t(lang, "page.description");
  const url = `https://viewphoto.tv${getLocalePath(lang, "/page-path")}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: generateHreflangAlternates("/page-path", lang),
    },
    openGraph: generateOpenGraphMetadata({
      title,
      description,
      url,
    }),
    twitter: generateTwitterMetadata({ title, description }),
  };
}
```

### Testing:

- Use [Yoast SEO Analyzer](https://seo.yoast.com/) to check meta tags
- Test social sharing with [Open Graph Debugger](https://www.opengraph.xyz/)
- Verify hreflang with Google Search Console
- Check mobile preview with [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
