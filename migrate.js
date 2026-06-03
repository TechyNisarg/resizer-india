const fs = require('fs');
const path = require('path');

const files = [
  'rto-photo-resizer.html',
  'rto-signature-resizer.html',
  'resize-image-to-20kb.html',
  'about.html',
  'contact.html',
  'privacy.html',
  'terms.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';
  
  const descMatch = content.match(/<meta name="description"[\s\S]*?content="(.*?)"/);
  const description = descMatch ? descMatch[1] : '';
  
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const mainContent = mainMatch ? `<main class="text-page">\n${mainMatch[1]}\n</main>` : '';

  const frontmatter = `---
layout: base.njk
title: "${title}"
description: "${description}"
---
${mainContent}
`;

  fs.writeFileSync(path.join('src', file), frontmatter);
});
