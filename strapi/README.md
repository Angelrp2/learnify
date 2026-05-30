# Strapi - Backend de Learnify

Este es el backend de Learnify. Aquí se gestiona todo el contenido: cursos, categorías, instructores, artículos de blog y mensajes de contacto.

## Instalación

Primero instala las dependencias:

```bash
pnpm install
```

## Configuración

Copia el archivo .env.example a .env y rellena los valores:

```bash
cp .env.example .env
```

Los valores por defecto funcionan para desarrollo local.

## Desarrollo

Para iniciar el servidor en modo desarrollo:

```bash
pnpm run dev
```

Accede a http://localhost:1337/admin para crear tu cuenta de administrador y gestionar el contenido.

## Estructura

Las colecciones están en src/api/. Cada colección tiene:
- content-types: Define la estructura de datos
- controllers: Lógica de negocio
- routes: Endpoints de la API
- services: Funciones reutilizables

## Crear Colecciones

En el admin de Strapi puedes crear las colecciones manualmente o importar desde archivos. Ver ESQUEMA_DATOS_STRAPI.md en la raíz del proyecto para los detalles exactos.

## API REST

Una vez que crees las colecciones, la API estará disponible en:
- http://localhost:1337/api/courses
- http://localhost:1337/api/categories
- http://localhost:1337/api/instructors
- http://localhost:1337/api/lessons
- http://localhost:1337/api/blog-posts
- http://localhost:1337/api/contact-submissions

## Build para Producción

```bash
pnpm run build
pnpm start
```

## Despliegue

Para desplegar en Railway:
1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. Railway automáticamente ejecutará pnpm install y pnpm run build
