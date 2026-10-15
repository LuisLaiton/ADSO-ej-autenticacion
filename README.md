# Proyecto de autenticación

Aplicación web organizada en dos partes: un backend (API) y un frontend.

## Estructura del proyecto

```text
autenticacion/
├── api-autenticacion/       # Backend / API
├── frontend-autenticacion/  # Frontend (Vite)
├── .gitignore
└── README.md
```

## Requisitos

- Node.js y npm.
- Las herramientas o servicios externos que requiera el backend (por ejemplo, una base de datos), si aplica.

Comprueba las versiones recomendadas de Node.js y los comandos disponibles en los archivos `package.json` de cada aplicación.

## Configuración del backend

1. Entra en la carpeta del backend:

   ```bash
   cd api-autenticacion
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en `api-autenticacion/` a partir de las variables que documenta el archivo `.env.example`. Ajusta los nombres y valores según lo que lea realmente el código del backend.

4. Inicia el backend con el script:

   ```bash
   node src/app.js
   ```

## Configuración del frontend

1. Abre otra terminal y entra en la carpeta del frontend:

   ```bash
   cd frontend-autenticacion
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el frontend con el script definido en `frontend-autenticacion/package.json`:

   ```bash
   npm run dev
   ```

## Tecnologías

- Backend: Node.js.
- Frontend: Vite - React.