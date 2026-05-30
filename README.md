# Learnify

Plataforma de cursos online construida con Astro, Strapi y Tailwind CSS. Proyecto integrador para DAW 2 en DIGITECH FP.

## Qué es Learnify

Una plataforma donde los usuarios pueden explorar cursos de programación, filtrar por categoría y dificultad, buscar contenido específico y leer artículos educativos. Todo el contenido se gestiona desde Strapi y se renderiza estáticamente con Astro para máximo rendimiento y SEO.

## Stack Tecnológico

- **Frontend:** Astro (SSG + Islands Architecture)
- **Backend:** Strapi (CMS Headless)
- **Estilos:** Tailwind CSS
- **Base de datos:** SQLite (local)
- **Lenguaje:** JavaScript/TypeScript
- **Gestor de paquetes:** pnpm

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: el backend en Strapi y el frontend en Astro.

```
learnify/
├── strapi/                  Backend (Strapi)
├── astro/                   Frontend (Astro)
├── docs/                    Documentación
└── README.md               Este archivo
```

## Cómo Empezar

### Requisitos

Necesitas tener Node.js 18 o superior instalado. También es recomendable usar pnpm en lugar de npm.

### Instalación

Primero clona el repositorio:

```bash
git clone https://github.com/Angelrp2/learnify.git
cd learnify
```

Luego instala las dependencias de cada parte. En una terminal:

```bash
cd strapi
pnpm install
```

En otra terminal:

```bash
cd astro
pnpm install
```

### Desarrollo Local

Para trabajar en desarrollo necesitas dos terminales abiertas.

Terminal 1 - Strapi:
```bash
cd strapi
pnpm run dev
```

Accede a http://localhost:1337/admin para gestionar el contenido.

Terminal 2 - Astro:
```bash
cd astro
pnpm run dev
```

Accede a http://localhost:3000 para ver el sitio.

## Colecciones de Datos

El proyecto usa seis colecciones principales en Strapi:

**Categories** - Las categorías en las que se organizan los cursos (Desarrollo Web, Diseño, etc.)

**Instructors** - Los profesores que crean los cursos. Cada instructor puede tener múltiples cursos.

**Courses** - Los cursos principales. Cada curso pertenece a una categoría, tiene un instructor asignado y contiene varias lecciones.

**Lessons** - Las lecciones individuales dentro de cada curso. Tienen un orden específico.

**BlogPosts** - Artículos educativos. Cada artículo tiene un autor (instructor) y una categoría.

**ContactSubmissions** - Los mensajes que envían los usuarios a través del formulario de contacto.

Para más detalles sobre los campos exactos de cada colección, ver ESQUEMA_DATOS_STRAPI.md.

## Páginas del Sitio

La plataforma tiene estas páginas principales:

- Inicio con hero section y cursos destacados
- Listado de todos los cursos con búsqueda y filtros
- Página individual de cada curso
- Listado de categorías
- Cursos filtrados por categoría
- Blog con todos los artículos
- Página individual de cada artículo
- Formulario de contacto
- Página 404

El sitemap y robots.txt se generan automáticamente.

## Funcionalidades

El proyecto implementa todas las funcionalidades requeridas:

Búsqueda con expresiones regulares. Los usuarios pueden buscar cursos y el sistema filtra en tiempo real usando regex.

Filtros dinámicos por categoría y dificultad. Los filtros se aplican sin recargar la página.

Paginación. El listado de cursos está paginado para mejor rendimiento.

Validación de formulario. El formulario de contacto valida los datos usando regex y muestra feedback visual.

Cálculo automático de tiempo de lectura en los artículos del blog.

Dark mode y light mode. El sitio se adapta al tema preferido del usuario.

Diseño responsive que funciona desde 360px hasta pantallas grandes.

SEO completo con meta tags, URLs amigables, sitemap dinámico y robots.txt.

## Conceptos JavaScript Implementados

El proyecto usa todos los conceptos requeridos:

Desestructuración para acceder a propiedades de objetos de forma limpia.

Array methods como map para listar, filter para filtrar, sort para ordenar y slice para paginación.

Async/await para las llamadas a la API de Strapi.

Try/catch para el manejo de errores en todas las operaciones asincrónicas.

Expresiones regulares para búsqueda y validación de formularios.

Normalización de texto para generar slugs automáticamente.

## Sistema de Estilos

Los estilos se manejan con variables CSS en :root que se integran con Tailwind. Esto permite cambiar el tema completo modificando solo las variables.

Las variables principales incluyen colores (primario, secundario, éxito, error), espaciado (xs, sm, md, lg, xl), tipografía (fuentes, tamaños) y otros valores reutilizables.

Los componentes están separados en archivos individuales (Button, Card, Section, Container, Badge) para máxima reutilización.

## SEO

Cada página tiene un H1 único y descriptivo. Los meta tags (title y description) se generan desde Strapi para cada curso y artículo.

Las URLs son amigables usando slugs generados automáticamente desde los títulos. El sitemap.xml se genera dinámicamente en build time.

El HTML es semántico usando header, main, footer, article y otras etiquetas apropiadas.

Se incluyen Open Graph tags para compartir en redes sociales.

## Despliegue

El backend (Strapi) se despliega en Railway.app y el frontend (Astro) en Netlify.com. Ambos están conectados a este repositorio de GitHub, así que cada push automáticamente reconstruye el sitio.

## Documentación

Hay documentación detallada en la carpeta docs/:

- ARQUITECTURA.md explica las decisiones técnicas
- CONTENIDOS_TECNICOS.md muestra ejemplos de código
- ESTILOS.md detalla el sistema de estilos
- SEO.md explica la estrategia de SEO

## Autor

Ángel Ríos - Estudiante de DAW 2 en DIGITECH FP

## Licencia

Proyecto educativo. Todos los derechos reservados.
