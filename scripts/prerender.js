import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = {
  '/rto-photo-resizer': {
    title: 'RTO & Parivahan Photo Resizer - Resizer India',
    description: 'Instantly resize photos and signatures to match exact Parivahan / RTO specifications without losing quality. 100% secure client-side processing.',
  },
  '/pan-card-photo-resizer': {
    title: 'PAN Card Photo & Signature Resizer - Resizer India',
    description: 'Resize for NSDL or UTIITSL PAN card portals. 213x213px at 300DPI for photos, and 2:1 ratio for signatures.',
  },
  '/passport-photo-resizer': {
    title: 'Passport Size Photo Maker (2x2 inch) - Resizer India',
    description: 'Create standard Indian Passport/Visa sizes (2x2 inch or 51x51mm). Perfect for online OCI or Passport Seva applications.',
  },
  '/ssc-photo-resizer': {
    title: 'SSC Photo & Signature Resizer (20KB - 50KB) - Resizer India',
    description: 'Exact 4.5x3.5cm sizes for SSC photos, signatures, and thumb impressions. 20-50KB limits strictly enforced natively on your browser.',
  },
  '/upsc-photo-resizer': {
    title: 'UPSC Photo & Signature Resizer - Resizer India',
    description: 'Meet the strict UPSC 350x350px limits. Crops accurately and compresses within 20KB-300KB securely on your device.',
  },
  '/ibps-photo-resizer': {
    title: 'IBPS Bank Photo, Signature & Thumb Resizer - Resizer India',
    description: 'Instantly resize photos, signatures, left thumb impressions, and handwritten declarations to meet strict IBPS/SBI limits.',
  },
  '/rrb-photo-resizer': {
    title: 'RRB Railway Exams Photo Resizer - Resizer India',
    description: 'Ensure your RRB application is not rejected. Perfectly crops to 35x45mm on a strict white background.',
  },
  '/neet-photo-resizer': {
    title: 'NEET Postcard & Passport Photo Resizer - Resizer India',
    description: 'Resize NEET passport, postcard photos, and finger impressions according to the latest NTA brochure guidelines.',
  },
  '/acpc-photo-resizer': {
    title: 'ACPC Admission Photo Resizer - Resizer India',
    description: 'Fast resize for Gujarat ACPC engineering and diploma admission portals. Prepare your photos and signatures accurately.',
  },
  '/state-psc-photo-resizer': {
    title: 'State PSC Photo & Signature Resizer - Resizer India',
    description: 'Instantly resize photos and signatures to match exact State Public Service Commission (MPSC, WBCS, KPSC) specifications.',
  },
  '/defence-photo-resizer': {
    title: 'Defence & Army Photo Resizer - Resizer India',
    description: 'Perfectly resize photos and signatures for Agniveer, NDA, CDS and other Indian Defence recruitment portals.',
  },
  '/pdf': {
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
  }
};

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("index.html not found in dist. Run npm run build first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

Object.entries(routes).forEach(([route, meta]) => {
  const routeDir = path.join(distDir, route);
  
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  const canonicalUrl = `https://resizer-india.vercel.app${route}`;

  let modifiedHtml = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${meta.description}" />`);

  fs.writeFileSync(path.join(routeDir, 'index.html'), modifiedHtml);
  console.log(`Generated ${route}/index.html`);
});

console.log("Prerendering complete!");
