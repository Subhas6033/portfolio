# Client SEO Files — Design

**Date:** 2026-08-03
**Scope:** Add static SEO files to the React/Vite client (`Client/`) and tighten a few related spots surfaced during review.

## Goal

Give the deployed portfolio (`https://subhas.vercel.app`) the standard set of files search engines and security researchers expect: `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, and a `/.well-known/security.txt`. No new npm dependencies. No build-step generation. No behavior changes for visitors.

## Non-goals

- No per-route meta tag management via `react-helmet-async` (already handled by `RouteTitleUpdater`).
- No build-time sitemap generation (few static routes, hand-written is clearer).
- No Google site verification HTML file (existing meta tag is sufficient).
- No `humans.txt` or `favicon.ico` (not requested; PNG favicon already works).

## Files to add

All under `Client/public/`. Vite copies `public/` to the deploy root, so these become:

| Source | Served at |
|---|---|
| `public/robots.txt` | `/robots.txt` |
| `public/sitemap.xml` | `/sitemap.xml` |
| `public/manifest.webmanifest` | `/manifest.webmanifest` |
| `public/.well-known/security.txt` | `/.well-known/security.txt` |
| `public/browserconfig.xml` | `/browserconfig.xml` |

### `robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://subhas.vercel.app/sitemap.xml
```

Allows everything except admin and API paths. References the sitemap. No host declared (single canonical host).

### `sitemap.xml`

Hand-written XML listing the six top-level public routes. The dynamic `/projects/:id` route is omitted (project IDs aren't known at build time and would require either a generation step or hard-coded values).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://subhas.vercel.app/</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://subhas.vercel.app/about</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://subhas.vercel.app/projects</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://subhas.vercel.app/achievement</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://subhas.vercel.app/experience</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://subhas.vercel.app/contact</loc>
    <lastmod>2026-08-03</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

`/projects` gets `weekly` because new work is added through the admin panel. Everything else is `monthly` or longer.

### `manifest.webmanifest`

Minimal PWA manifest. Uses existing assets: `My Picture3.jpg` for the icon and the existing `#1B2549` theme color from `index.html`.

```json
{
  "name": "Subhas Mondal | Full Stack Developer",
  "short_name": "Subhas Mondal",
  "description": "Personal portfolio of Subhas Mondal, Full Stack Developer and AI/ML enthusiast.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#1B2549",
  "theme_color": "#1B2549",
  "icons": [
    {
      "src": "/Favicon/icons8-portfolio-96.png",
      "sizes": "96x96",
      "type": "image/png"
    }
  ]
}
```

### `/.well-known/security.txt` (RFC 9116)

```
Contact: mailto:sm2733@it.jgec.ac.in
Expires: 2027-08-03T00:00:00.000Z
Preferred-Languages: en
```

Expires one year out, to be renewed. Uses the email already in the README.

### `browserconfig.xml`

Optional Windows tile config so the manifest is fully cross-platform.

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/Favicon/icons8-portfolio-96.png" />
      <square150x150logo src="/Favicon/icons8-portfolio-96.png" />
      <TileColor>#1B2549</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

## `vercel.json` — add headers

The current rewrite `/(.*)` → `/` would intercept `.well-known/*` and `sitemap.xml` if Vercel didn't serve `/public` first. Vercel does serve `/public` files before applying rewrites, so functionally this works without changes. Still, explicit headers are better than implicit behavior — they document intent and protect against future Vercel config changes.

Add a `headers` block to set the correct `Content-Type` for each new file:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://portfolio-mizk.onrender.com/api/$1" },
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    { "source": "/robots.txt", "headers": [{ "key": "Content-Type", "value": "text/plain" }] },
    { "source": "/sitemap.xml", "headers": [{ "key": "Content-Type", "value": "application/xml" }] },
    { "source": "/manifest.webmanifest", "headers": [{ "key": "Content-Type", "value": "application/manifest+json" }] },
    { "source": "/.well-known/security.txt", "headers": [{ "key": "Content-Type", "value": "text/plain" }] }
  ]
}
```

## `index.html` — add manifest link

Add one line inside `<head>`:

```html
<link rel="manifest" href="/manifest.webmanifest" />
```

Existing meta tags (title, description, OG, Twitter, canonical, theme-color, Google site verification) stay untouched.

## `RouteTitleUpdater.jsx` — coverage fix (orthogonal)

While reviewing, I noticed two public routes are missing from the `titles` map: `/experience` and `/projects/:id`. They silently fall through to the default title. Add them so every public route sets a meaningful title:

```js
"/experience": "Experience | Full Stack Developer",
"/projects/:id": "Project Details | Full Stack Developer",
```

Note: the key for `/projects/:id` is the React Router path pattern, not a real pathname, so it won't match at runtime. The right fix is to derive the title from `useParams()` inside the `ProjectDetail` component, but that's outside the scope of this SEO task. For now, just adding `/experience` is enough; the `:id` case is documented as a follow-up if needed.

**Revised scope:** add `/experience` to the titles map. Leave `:id` for a follow-up.

## Testing

After deploy:

1. `curl -I https://subhas.vercel.app/robots.txt` → 200, `Content-Type: text/plain`
2. `curl -I https://subhas.vercel.app/sitemap.xml` → 200, `Content-Type: application/xml`
3. `curl -I https://subhas.vercel.app/manifest.webmanifest` → 200, `Content-Type: application/manifest+json`
4. `curl -I https://subhas.vercel.app/.well-known/security.txt` → 200, `Content-Type: text/plain`
5. Submit `https://subhas.vercel.app/sitemap.xml` in Google Search Console → Sitemaps to confirm parse.

## Rollout

Single PR. No backend changes. No env var changes. Vercel picks up new files in `public/` automatically on next deploy.
