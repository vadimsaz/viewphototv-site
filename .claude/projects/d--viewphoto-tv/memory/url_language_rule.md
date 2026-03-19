---
name: URL Language Rule
description: Standard pattern for building locale-aware URLs across the application
type: reference
---

## URL Language Rule

For all links and URLs in the application, follow this pattern:

### English (Default)
- No language prefix
- Format: `/section-name`
- Examples:
  - `/how-it-works`
  - `/perfect-for`
  - `/works-on`
  - `/faq`

### Other Languages
- Language code prefix required
- **Use English section names** (no localized slugs)
- Format: `/LANG/section-name`
- Examples (Russian):
  - `/ru/how-it-works` ✅ (CORRECT)
  - `/ru/perfect-for` ✅ (CORRECT)
  - `/ru/works-on` ✅ (CORRECT)
  - `/ru/faq` ✅ (CORRECT)

**NOT:**
  - `/ru/kak-eto-rabotaet` ❌ (WRONG - localized slug)
  - `/ru/podhodit-dlya` ❌ (WRONG - localized slug)
  - `/ru/rabotaet-na` ❌ (WRONG - localized slug)

**Why?** English slugs match the actual file structure in Next.js, ensuring all routes work across all languages without redirects.

### Supported Language Codes
- es (Spanish)
- fr (French)
- de (German)
- ru (Russian)
- zh (Chinese)
- hi (Hindi)
- pt (Portuguese)
- ar (Arabic)
- he (Hebrew)
- bn (Bengali)
- ja (Japanese)
- ko (Korean)

### Implementation
Use the `getLocalizedUrl()` helper function:

```typescript
const { lang } = useLanguage();

const getLocalizedUrl = (path: string): string => {
  if (lang === "en") return path;
  return `/${lang}${path}`;
};

// Usage:
<a href={getLocalizedUrl("/how-it-works")}>Link</a>
```

### Menu Sections
The following menu sections use this rule:
1. How it works
2. Works on
3. Perfect for
4. FAQ

Apply this pattern when adding or updating any new navigation links across the application.
