# Contenidos Técnicos - Conceptos JavaScript Aplicados

## 1. Desestructuración

La desestructuración permite extraer valores de objetos de forma concisa.

En api.js:
```javascript
const { attributes } = course;
```

En utils.js:
```javascript
const { difficulty, category } = course.attributes;
```

Ventaja: Código más limpio y legible que `course.attributes.difficulty`.

## 2. Array Methods

### map()
Transforma cada elemento de un array.

```javascript
const courseNames = courses.map(course => course.attributes.title);
```

Uso en el proyecto: Listar todos los cursos en la página.

### filter()
Filtra elementos que cumplen una condición.

```javascript
const beginnerCourses = courses.filter(
  course => course.attributes.difficulty === 'beginner'
);
```

Uso en el proyecto: Filtrar por dificultad, categoría, búsqueda.

### sort()
Ordena elementos según una función comparadora.

```javascript
const sortedCourses = courses.sort((a, b) =>
  a.attributes.title.localeCompare(b.attributes.title)
);
```

Uso en el proyecto: Ordenar cursos alfabéticamente.

### slice()
Extrae una porción del array sin modificarlo.

```javascript
const page1 = courses.slice(0, 6);
const page2 = courses.slice(6, 12);
```

Uso en el proyecto: Paginación de resultados.

## 3. Async/Await

Permite escribir código asincrónico de forma sincrónica.

```javascript
export async function fetchCourses() {
  const response = await fetch(`${STRAPI_URL}/api/courses`);
  const data = await response.json();
  return data.data;
}
```

Ventaja: Más legible que Promises con .then().

## 4. Try/Catch

Manejo de errores en código asincrónico.

```javascript
export async function fetchCourses() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/courses`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}
```

Ventaja: Previene que la aplicación se bloquee si hay error.

## 5. Expresiones Regulares (Regex)

Patrones para buscar y validar texto.

### Búsqueda
```javascript
function searchCourses(courses, query) {
  const regex = new RegExp(query, 'i'); // 'i' = case insensitive
  return courses.filter(course =>
    regex.test(course.attributes.title)
  );
}
```

Uso: Buscar "JavaScript" encuentra "javascript", "JAVASCRIPT", etc.

### Validación de Email
```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

Uso: Validar que el email sea válido antes de enviar.

## 6. Normalización de Texto

Convertir texto a un formato estándar.

```javascript
function slugify(text) {
  return text
    .toLowerCase()                    // Minúsculas
    .normalize('NFD')                 // Descomponer caracteres
    .replace(/[\u0300-\u036f]/g, '')  // Eliminar acentos
    .replace(/[^\w\s-]/g, '')         // Eliminar caracteres especiales
    .replace(/\s+/g, '-')             // Espacios a guiones
    .trim();                          // Eliminar espacios al inicio/final
}
```

Uso: "Introducción a JavaScript" → "introduccion-a-javascript"

## 7. Cálculo de Tiempo de Lectura

Estimar cuánto tarda en leer un artículo.

```javascript
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}
```

Uso: Mostrar "Tiempo de lectura: 5 minutos" en artículos.

## 8. Validación de Formularios

Validar datos antes de enviar.

```javascript
function validateForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
```

Uso: Mostrar mensajes de error al usuario si los datos son inválidos.

## 9. Paginación

Dividir resultados en páginas.

```javascript
function paginateCourses(courses, page = 1, pageSize = 6) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedCourses = courses.slice(start, end);
  const totalPages = Math.ceil(courses.length / pageSize);

  return {
    courses: paginatedCourses,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
```

Uso: Mostrar 6 cursos por página, con botones de siguiente/anterior.

## Conclusión

Todos estos conceptos se aplican en el proyecto de forma práctica:
- Desestructuración: Código más limpio
- Array methods: Filtrar, buscar, paginar
- Async/await: Consumir API de Strapi
- Try/catch: Manejo de errores
- Regex: Búsqueda y validación
- Normalización: Generar URLs amigables
- Validación: Proteger datos del usuario
