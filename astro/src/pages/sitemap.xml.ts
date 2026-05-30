export const prerender = true;

export default function GET() {
  const baseUrl = 'https://learnify.netlify.app';
  
  const pages = [
    { url: '/', lastmod: new Date().toISOString().split('T')[0], priority: '1.0' },
    { url: '/cursos', lastmod: new Date().toISOString().split('T')[0], priority: '0.9' },
    { url: '/blog', lastmod: new Date().toISOString().split('T')[0], priority: '0.8' },
    { url: '/contacto', lastmod: new Date().toISOString().split('T')[0], priority: '0.7' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
