# Learnify

Plataforma de cursos online construida con Astro, Strapi y Tailwind CSS. Proyecto integrador para DAW 2 en DIGITECH FP.

## Stack Tecnologico

- **Frontend:** Astro (SSR)
- **Backend:** Strapi (CMS Headless)
- **Estilos:** Tailwind CSS
- **Base de datos:** SQLite (local)
- **Lenguaje:** JavaScript/TypeScript

## Como Empezar

### Requisitos

- **Node.js 18** (recomendado exactamente v18 por compatibilidad con better-sqlite3)
- pnpm

### Instalacion

**Terminal 1 - Strapi (backend):**

```bash
cd strapi
pnpm install
pnpm run dev
```

> Si pnpm falla con errores SSL, usa: npm install

Al arrancar por primera vez, ve a http://localhost:1337/admin, crea tu cuenta y configura los permisos publicos:

1. Settings > Roles > Public
2. Habilita find y findOne para: Categories, Courses, Lessons, Instructors, BlogPosts
3. Habilita create para ContactSubmissions
4. Guarda

El servidor siembra datos automaticamente en el primer arranque: 3 categorias, 6 cursos, 12 lecciones y 3 articulos de blog.

**Terminal 2 - Astro (frontend):**

```bash
cd astro
pnpm install
pnpm run dev
```

Accede a http://localhost:4321

## Colecciones de Datos

- **Categories** - Frontend, Backend, DevOps
- **Instructors** - Profesores con nombre, email y bio
- **Courses** - Cursos con slug, dificultad y relaciones
- **Lessons** - Lecciones ordenadas por curso
- **BlogPosts** - Articulos con tiempo de lectura automatico
- **ContactSubmissions** - Mensajes del formulario de contacto

## Paginas del Sitio

- / - Inicio con cursos destacados
- /cursos - Busqueda, filtros, ordenacion y paginacion
- /cursos/[slug] - Detalle con lecciones
- /categorias - Listado de categorias
- /categorias/[slug] - Cursos por categoria
- /blog - Articulos con tiempo de lectura
- /blog/[slug] - Articulo completo
- /contacto - Formulario con validacion
- /recursos - Repositorios de GitHub en tiempo real

## Funcionalidades

- Busqueda con expresiones regulares en tiempo real
- Filtros dinamicos por categoria y dificultad
- Ordenacion por titulo y dificultad
- Paginacion del listado de cursos
- Validacion de formulario con regex y feedback visual
- Calculo automatico de tiempo de lectura
- Dark mode y light mode
- Diseno responsive desde 360px
- SEO completo: meta tags, sitemap dinamico, robots.txt

## Conceptos JavaScript

- Desestructuracion, array methods (map, filter, sort, slice)
- Async/await con try/catch
- Expresiones regulares
- Normalizacion de texto para slugs

## Autor

Angel Rios - Estudiante de DAW 2 en DIGITECH FP

