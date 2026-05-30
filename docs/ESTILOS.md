# Sistema de Estilos - Learnify

## Variables CSS

Las variables CSS se definen en :root y permiten cambiar el tema de toda la aplicación sin modificar componentes individuales.

### Colores

```css
:root {
  --color-primary: #2563eb;      /* Azul principal */
  --color-secondary: #64748b;    /* Gris secundario */
  --bg-primary: #ffffff;          /* Fondo claro */
  --bg-secondary: #f8fafc;        /* Fondo secundario */
  --text-primary: #1e293b;        /* Texto oscuro */
  --text-secondary: #64748b;      /* Texto gris */
  --border: #e2e8f0;              /* Bordes */
}

html.dark {
  --bg-primary: #0f172a;          /* Fondo oscuro */
  --bg-secondary: #1e293b;        /* Fondo secundario oscuro */
  --text-primary: #f1f5f9;        /* Texto claro */
  --text-secondary: #cbd5e1;      /* Texto gris claro */
  --border: #334155;              /* Bordes oscuros */
}
```

Ventaja: Cambiar a dark mode es solo cambiar las variables, no reescribir CSS.

## Componentes Reutilizables

### Button

Componente de botón con variantes.

```astro
<Button variant="primary" size="md">Enviar</Button>
<Button variant="secondary" href="/cursos">Ver Cursos</Button>
<Button variant="outline" disabled>Deshabilitado</Button>
```

Variantes:
- primary: Azul, para acciones principales
- secondary: Gris, para acciones secundarias
- outline: Transparente con borde, para acciones alternativas

Tamaños:
- sm: Pequeño
- md: Mediano (default)
- lg: Grande

### Card

Componente de tarjeta para mostrar contenido.

```astro
<Card
  title="Introducción a JavaScript"
  description="Aprende los fundamentos"
  image="/images/js.jpg"
  href="/cursos/introduccion-a-javascript"
/>
```

Características:
- Imagen opcional
- Título y descripción
- Link opcional
- Hover effect (levanta la tarjeta)

## Dark Mode

El dark mode se implementa con una clase en el elemento html.

```javascript
// Detectar preferencia del usuario
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', prefersDark);

// Permitir toggle manual
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}
```

## Responsive Design

El proyecto utiliza media queries para adaptarse a diferentes tamaños de pantalla.

```css
/* Mobile first */
.courses-grid {
  grid-template-columns: 1fr;
}

/* Tablet */
@media (min-width: 768px) {
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .courses-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

Breakpoints utilizados:
- 480px: Teléfono pequeño
- 768px: Tablet
- 1024px: Desktop
- 1280px: Desktop grande

## Animaciones

Las animaciones son sutiles y rápidas para mejorar la experiencia.

### Transiciones

```css
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Timing

- Hover: 0.3s (rápido, feedback inmediato)
- Modal: 0.5s (más lento, transición importante)
- Fade: 0.2s (muy rápido, cambios sutiles)

## Tipografía

```css
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

h1 { font-size: 2rem; font-weight: bold; }
h2 { font-size: 1.5rem; font-weight: bold; }
h3 { font-size: 1.25rem; font-weight: 600; }
p { font-size: 1rem; line-height: 1.6; }
```

Stack de fuentes: Sistema operativo → Roboto → Fallback genérico

## Espaciado

```css
:root {
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
}
```

Uso: `padding: var(--spacing-md);` en lugar de valores hardcodeados.

## Sombras

```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);      /* Sombra pequeña */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);    /* Sombra mediana */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);     /* Sombra grande */
```

Las sombras dan profundidad sin ser excesivas.

## Accesibilidad

- Contraste suficiente entre texto y fondo (WCAG AA)
- Focus visible en elementos interactivos
- Tamaño de fuente mínimo 16px
- Espaciado suficiente entre elementos clickeables
- Colores no como único indicador (usar iconos también)
