export async function GET() {
  return new Response(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://learnify.netlify.app/sitemap.xml
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
