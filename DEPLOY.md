# Deploy checklist (Resizer India)

Use this before and after each production deploy to [Vercel](https://resizer-india.vercel.app/).

## Before deploy

1. **Contact email** — Set your real address in `contact.html` (`CONTACT_EMAIL` in the mailto link).
2. **OG image** — `og-image.svg` is used for social previews. For best WhatsApp/Facebook support, export it as `og-image.png` (1200×630) and update `og:image` / `twitter:image` URLs in `index.html` (and other pages if you add meta there).
3. **Quick local check** — Open `index.html` via a local server (or Vercel preview), upload a test image, run Photo + Signature + Custom presets, and confirm download works.

## Deploy

```bash
git add .
git commit -m "Your message"
git push
```

If the project is linked to Vercel, push triggers a deploy. Otherwise:

```bash
npx vercel --prod
```

## After deploy (verify live site)

1. Homepage shows **“JPG, PNG or WebP input”** (not “JPG only”).
2. **Rotate 90°** button appears after upload.
3. **Contact** page shows your email link (not placeholder copy).
4. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or similar — scrape URL and confirm title, description, and image.
5. [Google Rich Results Test](https://search.google.com/test/rich-results) — FAQ schema on homepage.
6. `https://resizer-india.vercel.app/sitemap.xml` loads and lists all pages.

## Optional next steps

- Custom domain on Vercel → update all `canonical` and `og:url` links.
- Add analytics only after updating `privacy.html` with vendor details.
