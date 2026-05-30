# Esquema de Datos para Strapi

Este documento describe la estructura de todas las colecciones que necesita Strapi.

## Categories

Las categorías organizan los cursos y artículos. Cada categoría tiene un nombre, una descripción opcional, un slug (URL amigable) que se genera automáticamente, un icono y un color.

Campos:
- name (texto, requerido, 3-100 caracteres)
- slug (texto único, generado automáticamente desde name)
- description (texto largo, opcional)
- icon (URL, opcional)
- color (color hexadecimal, opcional)

Ejemplo:
```
name: "Desarrollo Web"
slug: "desarrollo-web"
description: "Aprende a crear sitios web modernos"
color: "#2563eb"
```

## Instructors

Los instructores son los profesores que crean los cursos. Cada instructor tiene un nombre, email, biografía, foto de perfil y enlaces a redes sociales.

Campos:
- name (texto, requerido)
- email (email único, requerido)
- bio (texto largo, opcional)
- avatar (imagen, opcional)
- socialLinks (JSON con enlaces a redes, opcional)

Ejemplo:
```
name: "Juan García"
email: "juan@example.com"
bio: "Desarrollador web con 10 años de experiencia"
socialLinks: {
  "twitter": "https://twitter.com/juangarcia",
  "linkedin": "https://linkedin.com/in/juangarcia"
}
```

## Courses

Los cursos son el contenido principal. Cada curso tiene un título, descripción, contenido completo, categoría, instructor, nivel de dificultad, duración, imagen, lecciones asociadas y datos SEO.

Campos:
- title (texto, requerido, 5-200 caracteres)
- slug (texto único, generado automáticamente)
- description (texto, requerido)
- content (editor de texto enriquecido, requerido)
- category (relación con Categories, requerido)
- instructor (relación con Instructors, requerido)
- difficulty (enum: beginner, intermediate, advanced, requerido)
- duration (número en minutos, requerido)
- image (imagen, requerido)
- lessons (relación con Lessons, opcional)
- seo (componente SEO, opcional)
- publishedAt (fecha, requerido)

El componente SEO contiene:
- metaTitle (máximo 60 caracteres)
- metaDescription (máximo 160 caracteres)
- metaKeywords (palabras clave)
- canonicalURL (URL canónica, opcional)
- ogImage (imagen para redes sociales, opcional)

Ejemplo:
```
title: "Introducción a JavaScript"
slug: "introduccion-a-javascript"
description: "Aprende los fundamentos de JavaScript desde cero"
difficulty: "beginner"
duration: 240
seo: {
  "metaTitle": "Introducción a JavaScript | Learnify",
  "metaDescription": "Aprende JavaScript desde cero con nuestro curso completo"
}
```

## Lessons

Las lecciones son las unidades dentro de cada curso. Cada lección tiene un título, contenido, orden dentro del curso, URL de video opcional y recursos descargables.

Campos:
- title (texto, requerido)
- slug (texto único, generado automáticamente)
- content (editor de texto enriquecido, requerido)
- order (número, requerido)
- course (relación con Courses, requerido)
- videoUrl (URL, opcional)
- duration (número en minutos, opcional)
- resources (JSON con enlaces a recursos, opcional)

Ejemplo:
```
title: "Variables y Tipos de Datos"
slug: "variables-y-tipos-de-datos"
order: 1
videoUrl: "https://youtube.com/watch?v=abc123"
duration: 15
```

## BlogPosts

Los artículos del blog son contenido educativo adicional. Cada artículo tiene un título, contenido, categoría, autor, imagen destacada y datos SEO.

Campos:
- title (texto, requerido)
- slug (texto único, generado automáticamente)
- content (editor de texto enriquecido, requerido)
- excerpt (texto, requerido)
- category (relación con Categories, requerido)
- author (relación con Instructors, requerido)
- image (imagen, requerido)
- publishedAt (fecha, requerido)
- seo (componente SEO, opcional)

Ejemplo:
```
title: "10 Mejores Prácticas en JavaScript"
slug: "10-mejores-practicas-en-javascript"
excerpt: "Descubre las 10 mejores prácticas que todo desarrollador debe conocer"
```

## ContactSubmissions

Los mensajes de contacto se guardan en esta colección. Cada mensaje tiene nombre, email, asunto, contenido y estado.

Campos:
- name (texto, requerido)
- email (email, requerido)
- subject (texto, requerido)
- message (texto largo, requerido)
- status (enum: pending, read, resolved, default: pending)
- createdAt (fecha automática)

Ejemplo:
```
name: "María López"
email: "maria@example.com"
subject: "Consulta sobre el curso de React"
message: "Hola, tengo una pregunta sobre el módulo 3..."
status: "pending"
```

## Relaciones Entre Colecciones

Categories tiene relación 1:N con Courses (una categoría puede tener muchos cursos).

Categories tiene relación 1:N con BlogPosts (una categoría puede tener muchos artículos).

Instructors tiene relación 1:N con Courses (un instructor puede crear muchos cursos).

Instructors tiene relación 1:N con BlogPosts (un instructor puede escribir muchos artículos).

Courses tiene relación 1:N con Lessons (un curso contiene muchas lecciones).

ContactSubmissions no tiene relaciones con otras colecciones.

## Permisos Públicos

Las colecciones Categories, Instructors, Courses, Lessons y BlogPosts deben permitir que cualquiera las lea (find y findOne) pero solo los administradores pueden crear, editar o eliminar.

ContactSubmissions permite que cualquiera cree nuevos mensajes (para el formulario de contacto), pero solo los administradores pueden verlos, editarlos o eliminarlos.

## Slugs Automáticos

Los slugs se generan automáticamente desde el título. El proceso convierte el texto a minúsculas, elimina acentos, reemplaza espacios por guiones y elimina caracteres especiales.

Ejemplos:
- "Introducción a JavaScript" → "introduccion-a-javascript"
- "¿Qué es React?" → "que-es-react"
- "10 Mejores Prácticas" → "10-mejores-practicas"

## Contenido de Prueba

Para empezar, crea al menos:
- 3 categorías (Desarrollo Web, Diseño, Programación)
- 2 instructores
- 4 cursos (variando dificultad)
- 8 lecciones (2 por curso)
- 3 artículos de blog
- Sin mensajes de contacto (se llenarán cuando los usuarios envíen)

## Implementación

Cuando crees las colecciones en Strapi, recuerda:
- Configurar los slugs como campos únicos
- Establecer las relaciones correctamente
- Crear el componente SEO reutilizable
- Configurar los permisos públicos
- Agregar contenido de prueba
- Verificar que la API REST funciona accediendo a http://localhost:1337/api/courses
