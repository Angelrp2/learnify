# Subir el Proyecto a GitHub

## Crear el Repositorio

Primero necesitas crear un repositorio vacío en GitHub. Ve a github.com, inicia sesión con tu cuenta (Angelrp2) y haz clic en el + arriba a la derecha. Selecciona "New repository".

Llena los datos:
- Nombre: learnify
- Descripción: Plataforma de Cursos Online - Proyecto Integrador DAW 2
- Elige "Public"
- No marques "Add a README file" ni ".gitignore" porque ya los tenemos

Crea el repositorio.

## Conectar Git Local

Abre una terminal en la carpeta del proyecto y ejecuta estos comandos en orden:

```bash
cd /home/ubuntu/learnify

git init

git config user.name "Ángel Ríos"
git config user.email "angelrip05@gmail.com"

git add .

git commit -m "Inicial: Estructura base de Learnify"

git remote add origin https://github.com/Angelrp2/learnify.git

git branch -M main

git push -u origin main
```

Si todo va bien, verás que los archivos se suben a GitHub.

## Verificar que Funcionó

Ve a https://github.com/Angelrp2/learnify y comprueba que ves los archivos (README.md, .gitignore, etc.).

## Próximos Cambios

Cada vez que hagas cambios en el código, simplemente ejecuta:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

## Si Pide Contraseña

GitHub puede pedirte autenticación. Lo más fácil es usar un token de acceso personal:

1. Ve a GitHub Settings > Developer settings > Personal access tokens
2. Crea un nuevo token con permisos "repo"
3. Copia el token
4. Usa el token como contraseña cuando Git lo pida

Alternativamente puedes configurar SSH, pero es más complicado.

## Solución de Problemas

Si algo no funciona, verifica que:
- El repositorio existe en GitHub
- Usas la URL correcta (https://github.com/Angelrp2/learnify.git)
- Tienes permisos en el repositorio
- Git está correctamente instalado
