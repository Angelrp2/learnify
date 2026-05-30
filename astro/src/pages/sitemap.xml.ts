import { fetchCourses, fetchBlogPosts } from '../lib/api.js';

export const prerender = true;

export async function GET() {
  const baseUrl = 'https://learnify.netlify.app';
  const today = new Date().toISOString().split('T')[0];

  const [courses, blogPosts] = await Promise.all([fetchCourses(), fetchBlogPosts()]);

  const staticPages = [
    { url: '/', priority: '1.0' },
    { url: '/cursos', priority: '0.9' },
    { url: '/blog', priority: '0.8' },
    { url: '/contacto', priority: '0.7' },
  ];

  const coursePages = courses.map((course: any) => ({
    url: `/cursos/${course.attributes?.slug ?? course.slug}`,
    priority: '0.8',
  }));

  const blogPages = blogPosts.map((post: any) => ({
    url: `/blog/${post.attributes?.slug ?? post.slug}`,
    priority: '0.7',
  }));

  const pages = [...staticPages, ...coursePages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
