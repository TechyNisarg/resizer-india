import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the SSR rendering function
const { render } = await import('../dist/server/entry-server.js');

const routes = {
  '/rto-photo-resizer': {
    title: 'RTO & Parivahan Photo Resizer - Resizer India',
    description: 'Instantly resize photos and signatures to match exact Parivahan / RTO specifications without losing quality. 100% secure client-side processing.',
  },
  '/rto-signature-resizer': {
    title: 'RTO Signature Resizer - Resizer India',
    description: 'Resize and compress signatures to the 256x64px RTO / Parivahan upload format within the 10KB-20KB limit.',
  },
  '/pan-card-photo-resizer': {
    title: 'PAN Card Photo & Signature Resizer - Resizer India',
    description: 'Resize for NSDL or UTIITSL PAN card portals. 213x213px at 300DPI for photos, and 2:1 ratio for signatures.',
  },
  '/pan-card-signature-resizer': {
    title: 'PAN Card Signature Resizer - Resizer India',
    description: 'Create a JPEG signature for PAN card applications with the correct 2:1 ratio and file size under 50KB.',
  },
  '/passport-photo-resizer': {
    title: 'Passport Size Photo Maker (2x2 inch) - Resizer India',
    description: 'Create standard Indian Passport/Visa sizes (2x2 inch or 51x51mm). Perfect for online OCI or Passport Seva applications.',
  },
  '/ssc-photo-resizer': {
    title: 'SSC Photo & Signature Resizer (20KB - 50KB) - Resizer India',
    description: 'Exact 4.5x3.5cm sizes for SSC photos, signatures, and thumb impressions. 20-50KB limits strictly enforced natively on your browser.',
  },
  '/ssc-signature-resizer': {
    title: 'SSC Signature Resizer (10KB - 20KB) - Resizer India',
    description: 'Resize SSC exam signatures to the correct 4.0cm x 2.0cm format and compress them between 10KB and 20KB.',
  },
  '/ssc-thumb-resizer': {
    title: 'SSC Thumb Impression Resizer - Resizer India',
    description: 'Resize left thumb impressions for SSC applications with correct dimensions and strict KB limits.',
  },
  '/upsc-photo-resizer': {
    title: 'UPSC Photo & Signature Resizer - Resizer India',
    description: 'Meet the strict UPSC 350x350px limits. Crops accurately and compresses within 20KB-300KB securely on your device.',
  },
  '/upsc-signature-resizer': {
    title: 'UPSC Signature Resizer - Resizer India',
    description: 'Resize UPSC signatures to the required 350x350px minimum format and compress within the 20KB-300KB range.',
  },
  '/ibps-photo-resizer': {
    title: 'IBPS Bank Photo, Signature & Thumb Resizer - Resizer India',
    description: 'Instantly resize photos, signatures, left thumb impressions, and handwritten declarations to meet strict IBPS/SBI limits.',
  },
  '/ibps-signature-resizer': {
    title: 'IBPS Signature Resizer (10KB - 20KB) - Resizer India',
    description: 'Prepare IBPS and SBI exam signatures at 140x60 pixels with the required 10KB-20KB upload size.',
  },
  '/ibps-thumb-resizer': {
    title: 'IBPS Thumb Impression Resizer - Resizer India',
    description: 'Resize left thumb impressions for IBPS and SBI applications to 240x240 pixels and 20KB-50KB.',
  },
  '/image-compressor': {
    title: 'Image Compressor - Reduce File Size in KB - Resizer India',
    description: 'Easily compress any image file size (KB) without changing its dimensions. Simple, fast, and 100% secure client-side compression.',
  },
  '/ibps-declaration-resizer': {
    title: 'IBPS Handwritten Declaration Resizer - Resizer India',
    description: 'Resize handwritten declarations for IBPS and SBI applications to 800x400 pixels and 50KB-100KB.',
  },
  '/rrb-photo-resizer': {
    title: 'RRB Railway Exams Photo Resizer - Resizer India',
    description: 'Ensure your RRB application is not rejected. Perfectly crops to 35x45mm on a strict white background.',
  },
  '/rrb-signature-resizer': {
    title: 'RRB Signature Resizer - Resizer India',
    description: 'Resize railway recruitment signatures to the 50mm x 20mm format and compress them within 10KB-40KB.',
  },
  '/neet-photo-resizer': {
    title: 'NEET Postcard & Passport Photo Resizer - Resizer India',
    description: 'Resize NEET passport, postcard photos, and finger impressions according to the latest NTA brochure guidelines.',
  },
  '/neet-postcard-resizer': {
    title: 'NEET Postcard Photo Resizer - Resizer India',
    description: 'Crop NEET postcard photos to the correct 4x6 inch ratio and compress them within the NTA upload limit.',
  },
  '/neet-signature-resizer': {
    title: 'NEET Signature Resizer - Resizer India',
    description: 'Resize NEET signatures and compress them within the required 4KB-30KB file size range.',
  },
  '/neet-thumb-resizer': {
    title: 'NEET Thumb Impression Resizer - Resizer India',
    description: 'Resize NEET thumb and finger impression images securely in your browser within the required KB limits.',
  },
  '/acpc-photo-resizer': {
    title: 'ACPC Admission Photo Resizer - Resizer India',
    description: 'Fast resize for Gujarat ACPC engineering and diploma admission portals. Prepare your photos and signatures accurately.',
  },
  '/acpc-signature-resizer': {
    title: 'ACPC Signature Resizer - Resizer India',
    description: 'Resize ACPC admission signatures to JPEG format and compress them within the portal upload limits.',
  },
  '/state-psc-photo-resizer': {
    title: 'State PSC Photo & Signature Resizer - Resizer India',
    description: 'Instantly resize photos and signatures to match exact State Public Service Commission (MPSC, WBCS, KPSC) specifications.',
  },
  '/state-psc-signature-resizer': {
    title: 'State PSC Signature Resizer - Resizer India',
    description: 'Resize signatures for state public service commission applications with browser-only compression.',
  },
  '/defence-photo-resizer': {
    title: 'Defence & Army Photo Resizer - Resizer India',
    description: 'Perfectly resize photos and signatures for Agniveer, NDA, CDS and other Indian Defence recruitment portals.',
  },
  '/defence-signature-resizer': {
    title: 'Defence & Army Signature Resizer - Resizer India',
    description: 'Compress defence exam signatures to very small KB limits while keeping them readable for portal uploads.',
  },
  '/pdf-compressor': {
    title: 'PDF Compressor & Merger - Resizer India',
    description: 'Combine images and PDFs into a single optimized PDF file under exact KB limits. Secure, fast, and works 100% in your browser.',
  },
  '/custom-resizer': {
    title: 'Custom Image Resizer & Compressor - Resizer India',
    description: 'Need a specific pixel width, height, or KB size? Use the custom tool to manually set your own form requirements.',
  },
  '/about': {
    title: 'About Us - Resizer India',
    description: 'Learn more about Resizer India, the 100% free and secure browser-based tool for Indian government forms.',
  },
  '/privacy': {
    title: 'Privacy Policy - Resizer India',
    description: 'We value your privacy. Read how Resizer India ensures 100% client-side processing so your images never leave your device.',
  },
  '/terms': {
    title: 'Terms of Service - Resizer India',
    description: 'Read the terms of service for using Resizer India.',
  },
  '/contact': {
    title: 'Contact Us - Resizer India',
    description: 'Get in touch with the Resizer India team.',
  },
  '/faq': {
    title: 'Frequently Asked Questions - Resizer India',
    description: "Got questions about Resizer India? Find answers about privacy, security, how client side processing works, and why it's free.",
  }
};

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("index.html not found in dist. Run npm run build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const fullRoutesMap = {
  '/': {
    title: 'Resizer India - Free Photo & Signature Resizer for SSC, UPSC, IBPS, NEET, RRB',
    description: 'Free browser based photo & signature resizer for SSC, UPSC, IBPS, NEET, RRB & PAN. 100% client side — your images never leave your device.'
  },
  ...routes
};

for (const [route, meta] of Object.entries(fullRoutesMap)) {
  const canonicalUrl = `https://resizer-india.vercel.app${route === '/' ? '' : route}`;
  
  const appHtml = render(route);

  let modifiedHtml = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${meta.description}" />`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`);

  if (route === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), modifiedHtml);
    console.log(`Generated index.html (Root)`);
  } else {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), modifiedHtml);
    console.log(`Generated ${route}/index.html`);
  }
}

const sitemapRoutes = ['/', ...Object.keys(routes)];
const staticRoutes = new Set(['/about', '/privacy', '/terms', '/contact', '/faq']);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapRoutes.map((route) => {
    const loc = `https://resizer-india.vercel.app${route === '/' ? '/' : route}`;
    const changefreq = staticRoutes.has(route) ? 'monthly' : 'weekly';
    const priority = route === '/'
      ? '1.0'
      : route === '/custom-resizer'
        ? '0.6'
        : staticRoutes.has(route)
          ? '0.5'
          : route === '/pdf-compressor'
            ? '0.7'
            : route.includes('photo')
              ? '0.8'
              : '0.7';

    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>'
    ].join('\n');
  }),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log("Generated sitemap.xml");

console.log("Prerendering complete!");
