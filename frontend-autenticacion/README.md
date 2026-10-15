# Frontend de Autenticación

Aplicación web desarrollada con **React** y **Bootstrap** para realizar el inicio de sesión mediante una API REST.

## Tecnologías

- React
- Vite
- Bootstrap
- JavaScript
- Fetch API

## Funcionalidad

La aplicación permite:

- Ingresar usuario y contraseña.
- Enviar las credenciales a la API.
- Mostrar el resultado de la autenticación.

## API utilizada

El frontend se comunica con:

```text
POST http://localhost:3000/api/login
```

### Solicitud

```json
{
  "usuario": "juan",
  "password": "123456"
}
```

### Respuesta exitosa

```json
{
  "mensaje": "Autenticación satisfactoria"
}
```

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar al proyecto:

```bash
cd frontend-autenticacion
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

## Backend

Para que el inicio de sesión funcione, la API debe estar ejecutándose en:

```text
http://localhost:3000
```

Arquitectura:

```text
React → API Node.js/Express → MySQL
```