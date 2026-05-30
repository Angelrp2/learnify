# Despliegue en Producción - Learnify

## Despliegue de Strapi en Railway

### Paso 1: Crear cuenta en Railway

Ve a railway.app y crea una cuenta con GitHub.

### Paso 2: Crear nuevo proyecto

Haz clic en "New Project" y selecciona "Deploy from GitHub repo".

### Paso 3: Conectar repositorio

Selecciona tu repositorio "learnify" de GitHub.

### Paso 4: Configurar Strapi

En Railway, crea un nuevo servicio:
- Haz clic en "Add Service"
- Selecciona "GitHub Repo"
- Elige la rama "main"
- En Root Directory, escribe: strapi

### Paso 5: Configurar variables de entorno

En Railway, ve a Variables y agrega:

```
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
JWT_SECRET=tu_jwt_secret_aqui
ADMIN_JWT_SECRET=tu_admin_secret_aqui
API_TOKEN_SALT=tu_token_salt_aqui
APP_KEYS=tu_app_key_aqui
TRANSFER_TOKEN_SALT=tu_transfer_salt_aqui
```

### Paso 6: Agregar PostgreSQL

En Railway, haz clic en "Add Service" y selecciona "PostgreSQL".

### Paso 7: Deploy

Railway automáticamente desplegará Strapi. Espera a que termine.

Cuando esté listo, verás una URL como: https://tu-strapi.railway.app

Guarda esta URL porque la necesitarás para Astro.

---

## Despliegue de Astro en Netlify

### Paso 1: Crear cuenta en Netlify

Ve a netlify.com y crea una cuenta con GitHub.

### Paso 2: Conectar repositorio

Haz clic en "New site from Git" y selecciona tu repositorio "learnify".

### Paso 3: Configurar build

Netlify te pedirá:
- Build command: `cd astro && pnpm run build`
- Publish directory: `astro/dist`

Déjalo así.

### Paso 4: Configurar variables de entorno

En Netlify, ve a Site settings > Build & deploy > Environment:

Agrega:
```
STRAPI_URL=https://tu-strapi.railway.app
```

(Reemplaza con la URL de tu Strapi en Railway)

### Paso 5: Deploy

Netlify automáticamente hará el build y desplegará. Espera a que termine.

Cuando esté listo, verás una URL como: https://tu-sitio.netlify.app

---

## Verificación Final

Una vez desplegado, verifica:

1. Accede a https://tu-sitio.netlify.app
2. Deberías ver la página de inicio
3. Navega a /cursos - deberías ver un mensaje de carga (sin contenido aún porque no agregaste datos a Strapi)
4. Accede a https://tu-strapi.railway.app/admin
5. Crea un usuario admin
6. Crea algunas categorías, instructores y cursos de prueba
7. Vuelve a tu sitio en Netlify y recarga - deberías ver los cursos

---

## Solución de Problemas

### Error: "STRAPI_URL is not defined"

Verifica que agregaste la variable de entorno en Netlify.

### Error: "Cannot connect to Strapi"

Verifica que la URL de Strapi es correcta en Netlify.

### Strapi no inicia en Railway

Verifica que las variables de entorno están correctas, especialmente DATABASE_*.

### Astro no se construye

Verifica que el comando de build es: `cd astro && pnpm run build`

---

## URLs Finales

Cuando todo esté desplegado, tendrás:

- Frontend: https://tu-sitio.netlify.app
- Backend: https://tu-strapi.railway.app
- Admin: https://tu-strapi.railway.app/admin

Comparte estas URLs en tu documentación final.
