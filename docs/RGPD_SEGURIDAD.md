# RGPD y Seguridad - Learnify

## Datos Personales Recopilados

El formulario de contacto recopila:
- Nombre (dato personal)
- Email (dato personal)
- Asunto (dato no personal)
- Mensaje (puede contener datos personales)

## Cumplimiento RGPD

### Consentimiento Informado

El formulario debe incluir un checkbox de consentimiento:

```astro
<label>
  <input type="checkbox" name="consent" required />
  Acepto la política de privacidad y el tratamiento de mis datos
</label>
```

### Política de Privacidad

Debe existir una página con política de privacidad que incluya:

1. Responsable del tratamiento
2. Finalidad del tratamiento (responder consultas)
3. Base legal (consentimiento del usuario)
4. Derechos del usuario (acceso, rectificación, eliminación)
5. Tiempo de retención (máximo 1 año)
6. Medidas de seguridad

### Derechos del Usuario

Los usuarios tienen derecho a:
- Acceder a sus datos
- Rectificar datos incorrectos
- Solicitar eliminación (derecho al olvido)
- Revocar consentimiento

Implementación: Crear endpoint en Strapi para gestionar estas solicitudes.

### Transferencia de Datos

Los datos se almacenan en:
- Base de datos de Strapi (Railway)
- Ubicación: Servidores de Railway (UE)

No se transfieren a terceros países sin consentimiento.

## Medidas de Seguridad

### Validación de Entradas

```javascript
function validateForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = 'Nombre inválido';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
```

Protege contra: Inyección de código, datos malformados.

### Protección contra XSS

Astro sanitiza automáticamente el contenido dinámico.

```astro
<!-- Seguro: Astro escapa caracteres especiales -->
<h1>{course.attributes.title}</h1>

<!-- NO hacer esto (vulnerable) -->
<h1 set:html={unsafeHTML}></h1>
```

### Protección contra Inyección SQL

Strapi usa ORM que previene inyecciones SQL automáticamente.

```javascript
// Seguro: Strapi lo maneja
const courses = await fetch(`${STRAPI_URL}/api/courses?filters[slug][$eq]=${slug}`);

// NO hacer esto (vulnerable)
const query = `SELECT * FROM courses WHERE slug = '${slug}'`;
```

### HTTPS

El sitio se sirve con HTTPS en producción.

- Netlify: Certificado SSL automático
- Railway: Certificado SSL automático
- Comunicación encriptada entre cliente y servidor

### Variables de Entorno

Secretos se almacenan en variables de entorno, no en código.

```javascript
const STRAPI_URL = import.meta.env.STRAPI_URL;
const API_KEY = import.meta.env.API_KEY;
```

Nunca se commitean a Git.

### Autenticación

Para el panel de administración de Strapi:

- Contraseña fuerte requerida
- JWT para sesiones
- Logout automático después de inactividad
- Dos factores recomendado

### Rate Limiting

Strapi debe tener rate limiting para prevenir ataques.

```javascript
// En Strapi middleware
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests
}));
```

## Auditoría y Monitoreo

### Logs

Strapi registra:
- Accesos al panel admin
- Cambios en datos
- Errores de API
- Intentos de acceso no autorizados

Ubicación: Logs de Railway

### Backups

La base de datos debe tener backups regulares.

- Frecuencia: Diaria
- Retención: 30 días
- Ubicación: Almacenamiento seguro

### Cumplimiento

Checklist de RGPD:

- [x] Consentimiento informado recopilado
- [x] Política de privacidad disponible
- [x] Datos almacenados de forma segura
- [x] HTTPS en todo el sitio
- [x] Validación de entradas
- [x] Protección contra XSS
- [x] Protección contra inyecciones SQL
- [ ] Derecho al olvido implementado
- [ ] Acceso a datos implementado
- [ ] Auditoría de accesos implementada

## Responsabilidades

### Responsable del Tratamiento

Ángel Ríos (angelrip05@gmail.com)

### Encargado del Tratamiento

Railway (almacenamiento)
Netlify (hosting frontend)

## Política de Retención

Los datos de contacto se retienen máximo 1 año.

Después de 1 año, se eliminan automáticamente.

## Incidentes de Seguridad

En caso de incidente:

1. Evaluar el alcance
2. Notificar a usuarios afectados
3. Reportar a autoridades si es necesario
4. Implementar medidas correctivas

## Conclusión

Learnify cumple con los requisitos básicos de RGPD para un proyecto educativo pequeño. Para producción a mayor escala, se recomienda:

- Auditoría de seguridad profesional
- Implementar DPO (Data Protection Officer)
- Realizar pruebas de penetración
- Mantener registro de actividades de tratamiento
