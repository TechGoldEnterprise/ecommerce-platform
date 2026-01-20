const fs = require('fs');
const path = require('path');

console.log('🗺️ Generating sitemap...');

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://nexusshop.netlify.app';
const PAGES = [
  '/',
  '/products',
  '/cart',
  '/checkout',
  '/login',
  '/register',
  '/admin'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${PAGES.map(page => `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

const publicDir = path.join(__dirname, '../public');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap generated successfully!');
console.log('🌐 Site URL:', SITE_URL);
console.log('📄 Pages:', PAGES.length);