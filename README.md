# Resizer India

Browser-based **RTO photo and signature resizer** for Indian driving licence and form uploads. Images are processed locally in your browser (no server upload).

**Live site:** [resizer-india.vercel.app](https://resizer-india.vercel.app/)

## Features

- RTO photo preset (420×525 px, 10–20 KB JPG)
- RTO signature preset (256×64 px, 10–20 KB JPG)
- Custom width, height, and max KB
- Crop with zoom/position and 90° rotate
- SEO landing pages, privacy, and contact

## Deploy

Connected to Vercel via GitHub. Push to `main` to deploy. See [DEPLOY.md](DEPLOY.md) for a full checklist.

## Project structure

```
index.html          Main tool
script.js           Client-side resize/compress logic
style.css           Shared styles
icons/              UI icons (SVG)
*-resizer.html      SEO landing pages
about.html, contact.html, privacy.html, terms.html
sitemap.xml, robots.txt, vercel.json, og-image.svg
```

## Contact

Update the email in `contact.html` before production use.
