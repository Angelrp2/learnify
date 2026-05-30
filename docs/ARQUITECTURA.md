# Arquitectura de Learnify

## Visión General

Learnify es una plataforma de cursos online que utiliza una arquitectura desacoplada (Headless CMS). El backend gestiona los datos y el frontend los renderiza.

## Componentes Principales

### Backend - Strapi

Strapi es un CMS Headless construido con Node.js que proporciona:

- API REST automática para todas las colecciones
- Panel de administración para gestionar contenido
- Autenticación y autorización con JWT
- Base de datos SQLite para desarrollo local
- Escalable a PostgreSQL en producción

Las colecciones principales son:
- Categories: Categorías de cursos
- Instructors: Profesores
- Courses: Cursos con lecciones
- Lessons: Lecciones individuales
- BlogPosts: Artículos educativos
- ContactSubmissions: Mensajes de contacto

### Frontend - Astro

Astro es un framework de generación estática que:

- Genera HTML estático en build time
- Consume la API de Strapi durante el build
- Proporciona excelente rendimiento y SEO
- Usa Islands Architecture para interactividad mínima
- Genera sitemap.xml y robots.txt automáticamente

Las páginas principales son:
- Inicio: Hero section y cursos destacados
- Cursos: Listado con búsqueda, filtros y paginación
- Curso individual: Detalles del curso
- Blog: Listado de artículos
- Artículo individual: Contenido del artículo
- Contacto: Formulario de contacto
- 404: Página de error

## Flujo de Datos

1. Usuario accede a learnify.com
2. Netlify sirve el HTML estático pre-generado
3. Si interactúa (búsqueda, filtros), JavaScript en el navegador maneja la lógica
4. Si envía un formulario, se hace fetch a la API de Strapi
5. Strapi procesa la solicitud y guarda los datos

## Tecnologías Utilizadas

| Capa | Tecnología | Propósito |
|------|-----------|----------|
| Frontend | Astro | Generación estática |
| Estilos | Tailwind CSS | Utilidades de CSS |
| Backend | Strapi | CMS Headless |
| Base de datos | SQLite | Almacenamiento local |
| Despliegue Frontend | Netlify | Hosting estático |
| Despliegue Backend | Railway | Hosting Node.js |
| Control de versiones | Git | Versionado de código |

## Decisiones de Diseño

### Por qué Astro SSG en lugar de SPA

- Mejor SEO: HTML estático es indexable
- Mejor rendimiento: No necesita JavaScript para renderizar
- Menor costo: Hosting estático es más barato
- Mejor experiencia: Carga más rápida

### Por qué Strapi

- CMS Headless flexible
- API REST automática
- Panel de administración intuitivo
- Comunidad activa
- Fácil de desplegar

### Por qué SQLite en desarrollo

- Sin dependencias externas
- Rápido de configurar
- Perfecto para desarrollo local
- Fácil de migrar a PostgreSQL

## Seguridad

- Validación de entradas en cliente y servidor
- Protección contra XSS con sanitización
- Protección contra inyecciones SQL con Strapi
- JWT para autenticación
- CORS configurado en Strapi
- Variables de entorno para secretos

## Escalabilidad

El proyecto puede escalar:
- Frontend: Agregar más páginas dinámicas
- Backend: Migrar a PostgreSQL, agregar caché
- Base de datos: Replicación y backups
- API: Rate limiting y autenticación avanzada

## Despliegue

### Desarrollo Local

```bash
# Terminal 1
cd strapi && pnpm run dev

# Terminal 2
cd astro && pnpm run dev
```

### Producción

```bash
# Build Strapi
cd strapi && pnpm run build && pnpm start

# Build Astro
cd astro && pnpm run build
```

Strapi se despliega en Railway, Astro en Netlify.

## Monitoreo

- Logs de Strapi en Railway
- Analytics de Netlify
- Errores de frontend en consola del navegador
- Errores de API en logs de Strapi
