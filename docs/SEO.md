# Estrategia SEO - Learnify

## SEO On-Page

### H1 Único por Página

Cada página tiene un H1 único y descriptivo que resume el contenido principal.

```astro
<!-- Página de inicio -->
<h1>Aprende Programación Online</h1>

<!-- Página de cursos -->
<h1>Cursos Disponibles</h1>

<!-- Página individual de curso -->
<h1>{course.attributes.title}</h1>
```

Ventaja: Los buscadores entienden el tema principal de la página.

### Meta Tags Dinámicos

Los meta tags (title y description) se generan desde Strapi para cada página.

```astro
---
const course = await fetchCourseBySlug(slug);
const title = `${course.attributes.title} | Learnify`;
const description = course.attributes.seo?.metaDescription;
---

<BaseLayout title={title} description={description}>
```

Requisitos:
- Meta title: 50-60 caracteres
- Meta description: 150-160 caracteres
- Incluir palabras clave relevantes

### URLs Amigables

Las URLs usan slugs generados automáticamente desde los títulos.

```
/cursos/introduccion-a-javascript
/blog/10-mejores-practicas-en-javascript
/categorias/desarrollo-web
```

Ventaja: URLs legibles para humanos y buscadores.

### Texto Alternativo en Imágenes

Todas las imágenes tienen atributo alt descriptivo.

```astro
<img 
  src={course.attributes.image} 
  alt="Portada del curso: Introducción a JavaScript"
/>
```

Ventaja: Accesibilidad y SEO de imágenes.

### Enlaces Internos

Las páginas están conectadas con enlaces internos coherentes.

```astro
<a href="/cursos">Ver todos los cursos</a>
<a href={`/cursos/${course.slug}`}>Leer más</a>
```

Ventaja: Distribuye autoridad entre páginas.

## SEO Técnico

### Sitemap XML

Se genera automáticamente en build time.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://learnify.netlify.app/</loc>
    <lastmod>2024-05-30</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://learnify.netlify.app/cursos</loc>
    <lastmod>2024-05-30</lastmod>
    <priority>0.9</priority>
  </url>
</urlset>
```

Ubicación: `/sitemap.xml`

### Robots.txt

Archivo que indica a los buscadores qué pueden y no pueden rastrear.

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://learnify.netlify.app/sitemap.xml
```

Ubicación: `/robots.txt`

### HTML Semántico

Uso de etiquetas HTML semánticas para mejor estructura.

```astro
<header>
  <nav>
    <a href="/">Learnify</a>
    <ul>
      <li><a href="/cursos">Cursos</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Título del artículo</h1>
    <p>Contenido...</p>
  </article>
</main>

<footer>
  <p>Copyright 2024</p>
</footer>
```

Ventaja: Los buscadores entienden mejor la estructura.

### Open Graph Tags

Etiquetas para compartir en redes sociales.

```astro
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={currentUrl} />
<meta property="og:type" content="website" />
```

Ventaja: Mejor apariencia al compartir en redes.

### Velocidad de Carga

Astro genera HTML estático que carga muy rápido.

- Tiempo de carga: < 1 segundo
- Optimización de imágenes: WebP + lazy loading
- Minificación de CSS y JavaScript
- Caché en Netlify

### Mobile-Friendly

El diseño es responsive y funciona perfectamente en móviles.

- Viewport configurado correctamente
- Botones clickeables (mínimo 48x48px)
- Texto legible sin zoom
- Sin elementos que no se vean bien

## Palabras Clave

Las palabras clave principales son:

- Cursos online
- Aprender programación
- JavaScript
- Desarrollo web
- Educación online

Se incluyen en:
- Títulos de páginas
- Meta descriptions
- Encabezados (H1, H2)
- Contenido del cuerpo
- URLs

## Monitoreo

Para monitorear el SEO:

1. Google Search Console: Ver cómo Google rastrea el sitio
2. Google Analytics: Ver tráfico y comportamiento de usuarios
3. Lighthouse: Auditar rendimiento y SEO
4. Screaming Frog: Analizar estructura del sitio

## Mejoras Futuras

- Agregar schema.json para cursos y artículos
- Implementar breadcrumbs
- Agregar FAQ schema
- Crear contenido más extenso
- Construir backlinks de calidad
