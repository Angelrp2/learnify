# Astro - Frontend de Learnify

Este es el frontend de Learnify. Aquí se renderizan todas las páginas del sitio consumiendo la API de Strapi.

## Instalación

Primero instala las dependencias:

```bash
pnpm install
```

## Configuración

Copia el archivo .env.example a .env:

```bash
cp .env.example .env
```

Asegúrate de que STRAPI_URL apunta a donde esté corriendo Strapi (por defecto http://localhost:1337).

## Desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
pnpm run dev
```

Accede a http://localhost:3000 para ver el sitio.

## Estructura

La carpeta src/ contiene:
- pages/: Las rutas del sitio. Cada archivo .astro es una página.
- layouts/: Plantillas reutilizables que envuelven las páginas.
- components/: Componentes reutilizables (Button, Card, etc.).
- lib/: Funciones auxiliares (conexión a API, búsqueda, validación, etc.).
- styles/: Estilos globales con variables CSS.

## Cómo Funciona

Astro genera HTML estático en build time. Cuando construyes el proyecto, Astro consulta la API de Strapi, obtiene todos los datos, y genera archivos HTML para cada página.

Los componentes interactivos (búsqueda, filtros) se hidratan en el navegador usando JavaScript mínimo.

## Build para Producción

```bash
pnpm run build
```

Esto genera la carpeta dist/ con todos los archivos HTML estáticos listos para servir.

## Despliegue

Para desplegar en Netlify:
1. Conecta tu repositorio de GitHub
2. Configura el comando de build: pnpm run build
3. Configura la carpeta de salida: dist
4. Netlify automáticamente reconstruye el sitio cada vez que haces push
