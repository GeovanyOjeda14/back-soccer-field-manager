# Proyecto de Administración de Canchas Sintéticas

## Descripción

Este proyecto es un sistema de administración de canchas sintéticas que permite gestionar horarios de atención y reservas. Los administradores pueden definir los días y horas de atención para cada cancha y los usuarios pueden realizar reservas basadas en la disponibilidad.

## Tecnologías

- **Node.js**: Usado como entorno de ejecución para el backend.
- **Express**: Framework web para construir la API REST.
- **MongoDB**: Base de datos NoSQL para gestionar la información de horarios y reservas.
- **Mongoose**: ODM para modelar los datos en MongoDB.
- **JWT (JSON Web Tokens)**: Para autenticación y autorización de usuarios.
- **BCrypt**: Para el hashing de contraseñas.

## Características

- **Gestión de Canchas**: Crear, actualizar y eliminar canchas.
- **Gestión de Horarios**: Definir horarios de atención para cada cancha.
- **Reservas**: Permitir a los usuarios reservar canchas en base a la disponibilidad.
- **Autenticación**: Sistema de registro e inicio de sesión para usuarios y administradores.
- **Seguridad**: Contraseñas encriptadas y autenticación basada en tokens.

## Instalación

Para correr este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/GeovanyOjeda14/back-soccer-field-manager.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd back-soccer-field-manager
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Crea un archivo `.env` y configura las variables de entorno necesarias:
    ```plaintext
    PORT=3000
    MONGODB_URI=your-mongodb-uri
    SEED=your-jwt-secret
    ```
5. Inicia el servidor:
    ```bash
    npm start api
    ```


## Endpoints

### Autenticación

- **POST /auth/register**: Registrar un nuevo usuario.
- **POST /auth/login**: Iniciar sesión.


<!-- Actualmente en desarrollo -->

### Canchas

- **GET /courts**: Obtener una lista de todas las canchas.
- **POST /courts**: Crear una nueva cancha (requiere autenticación de administrador).

### Horarios

- **GET /schedules**: Obtener horarios de todas las canchas.
- **POST /schedules**: Definir horarios para una cancha (requiere autenticación de administrador).

### Reservas

- **GET /appointments**: Obtener todas las reservas de un usuario.
- **POST /appointments**: Crear una nueva reserva.  



## Licencia

Este proyecto está licenciado bajo la MIT License.

## Contacto

Para más información o preguntas sobre el proyecto, puedes contactarme a través de geovanyojeda14@gmail.com

