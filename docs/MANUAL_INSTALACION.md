# Manual de Instalación - Learnify

## Requisitos Previos

- Node.js 18 o superior
- pnpm (gestor de paquetes)
- Git
- Un editor de código (VS Code recomendado)

## Instalación Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Angelrp2/learnify.git
cd learnify
```

### 2. Instalar Strapi

```bash
cd strapi
pnpm install
cp .env.example .env
```

Edita `.env` si es necesario (los valores por defecto funcionan para desarrollo).

### 3. Instalar Astro

```bash
cd ../astro
pnpm install
cp .env.example .env
```

Verifica que `STRAPI_URL=http://localhost:1337` en `.env`.

### 4. Crear Colecciones en Strapi

Abre una terminal en la carpeta `strapi`:

```bash
pnpm run dev
```

Accede a http://localhost:1337/admin

En la primera ejecución, Strapi te pedirá crear una cuenta de administrador. Completa el formulario.

Luego, crea las colecciones según ESQUEMA_DATOS_STRAPI.md:
- Categories
- Instructors
- Courses
- Lessons
- BlogPosts
- ContactSubmissions

Agrega contenido de prueba en cada colección.

### 5. Iniciar Astro

Abre otra terminal en la carpeta `astro`:

```bash
pnpm run dev
```

Accede a http://localhost:3000

Deberías ver la página principal de Learnify.

## Verificación

Para verificar que todo funciona:

1. Abre http://localhost:3000
2. Navega a la página de cursos
3. Deberías ver los cursos que creaste en Strapi
4. Prueba el formulario de contacto
5. Verifica que los datos se guarden en Strapi

## Troubleshooting

### Error: "Cannot find module 'strapi'"

Solución: Ejecuta `pnpm install` en la carpeta strapi.

### Error: "STRAPI_URL is not defined"

Solución: Verifica que existe `.env` en la carpeta astro con `STRAPI_URL=http://localhost:1337`.

### Error: "Port 1337 already in use"

Solución: Cambia el puerto en `.env` de Strapi o mata el proceso que usa el puerto:

```bash
# En Windows
netstat -ano | findstr :1337
taskkill /PID <PID> /F

# En Mac/Linux
lsof -i :1337
kill -9 <PID>
```

### Error: "Cannot GET /api/courses"

Solución: Verifica que creaste la colección "Courses" en Strapi y que tiene contenido.

## Despliegue en Producción

### Backend - Railway

1. Ve a railway.app
2. Conecta tu repositorio de GitHub
3. Crea un nuevo proyecto
4. Selecciona la carpeta `strapi`
5. Configura variables de entorno
6. Railway automáticamente ejecuta `pnpm install` y `pnpm run build`

### Frontend - Netlify

1. Ve a netlify.com
2. Conecta tu repositorio de GitHub
3. Crea un nuevo sitio
4. Configura:
   - Build command: `cd astro && pnpm run build`
   - Publish directory: `astro/dist`
5. Agrega variable de entorno: `STRAPI_URL=https://tu-strapi.railway.app`
6. Netlify automáticamente reconstruye en cada push

## Estructura de Carpetas

```
learnify/
├── strapi/              Backend
│   ├── src/
│   ├── package.json
│   └── .env
├── astro/               Frontend
│   ├── src/
│   ├── package.json
│   └── .env
├── docs/                Documentación
│   ├── ARQUITECTURA.md
│   ├── CONTENIDOS_TECNICOS.md
│   ├── ESTILOS.md
│   ├── SEO.md
│   ├── RGPD_SEGURIDAD.md
│   └── DIAGRAMA_ER.md
├── README.md
├── ESQUEMA_DATOS_STRAPI.md
└── GITHUB_SETUP.md
```

## Comandos Útiles

### Strapi

```bash
cd strapi

# Desarrollo
pnpm run dev

# Build
pnpm run build

# Producción
pnpm start

# Crear colección
pnpm strapi generate:api
```

### Astro

```bash
cd astro

# Desarrollo
pnpm run dev

# Build
pnpm run build

# Preview
pnpm run preview
```

## Variables de Entorno

### Strapi (.env)

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_key
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
TRANSFER_TOKEN_SALT=your_salt
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=your_jwt_secret
```

### Astro (.env)

```
STRAPI_URL=http://localhost:1337
```

En producción:
```
STRAPI_URL=https://tu-strapi.railway.app
```

## Próximos Pasos

1. Agregar más contenido a Strapi
2. Personalizar estilos en Astro
3. Implementar autenticación de usuarios
4. Agregar más funcionalidades
5. Optimizar rendimiento y SEO
