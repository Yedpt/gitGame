# GitGame 🎮

Bienvenidos a **GitGame**, una plataforma completa para los apasionados de los videojuegos. Aquí encontrarás noticias, videos, lanzamientos y reseñas de los títulos más actuales y relevantes. Nuestra plataforma ofrece una experiencia personalizada con contenido exclusivo para usuarios registrados.

![image](https://github.com/user-attachments/assets/ee5b4c35-8c61-4dfe-a992-d7d48d590963)



## Índice
- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Roles y Permisos](#roles-y-permisos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## Características

**GitGame** permite a los usuarios acceder a contenido sobre videojuegos de diversas maneras. Aquí están las secciones principales:

1. **Noticias**: Las últimas novedades sobre videojuegos, eventos, lanzamientos, y más.
2. **Videos**: Contenido multimedia relacionado con análisis, tráilers y eventos de videojuegos.
3. **Lanzamientos**: Información sobre próximos títulos y fechas de lanzamiento.
4. **Reviews**: Análisis y opiniones sobre los últimos lanzamientos, realizados por usuarios y administradores.

Además, GitGame ofrece un sistema de autenticación y control de usuarios para moderar el acceso y la creación de contenido.

## Tecnologías Utilizadas

GitGame está construido con una variedad de tecnologías modernas para ofrecer una experiencia de usuario rápida y una arquitectura robusta en el servidor. A continuación, se listan las principales herramientas y frameworks utilizados en el proyecto.

### Frontend (Cliente)
- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas y dinámicas.
- **Vite**: Herramienta de construcción rápida y ligera para desarrollar proyectos con React.
- **Tailwind CSS**: Framework de CSS basado en utilidades para diseñar de forma rápida y eficiente.
- **Axios**: Cliente HTTP para realizar peticiones al backend de forma sencilla.
- **ESLint**: Herramienta de análisis estático para identificar y solucionar problemas en el código JavaScript.
- **PostCSS**: Herramienta para transformar CSS mediante plugins, usada aquí para personalizar Tailwind CSS.

### Backend (Servidor)
- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Express**: Framework de servidor para Node.js que simplifica la gestión de rutas y peticiones HTTP.
- **MongoDB**: Base de datos NoSQL orientada a documentos, ideal para manejar datos flexibles de la aplicación.
- **Mongoose**: ODM para MongoDB que facilita la interacción entre Node.js y la base de datos.
- **JWT (JSON Web Tokens)**: Tecnología para manejar la autenticación y autorización de usuarios.
- **Bcrypt**: Librería para el hash de contraseñas, asegurando la seguridad de los datos sensibles.
- **Multer**: Middleware para manejar la subida de archivos en las rutas del servidor.

## Instalación

Para ejecutar GitGame en tu entorno local, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Wilder-Aguilar/gitGame.git

2. Instalar dependencias para el cliente:


          cd gitgame/client
          npm install
   
4. Instalar dependencias para el servidor:


          cd ../server
          npm install

5. Configurar variables de entorno: Crea un archivo .env en el directorio server con las configuraciones necesarias, como la conexión a la base de datos.

   
            DB_PASSWORD =12345
            DB_HOST=localhost
            DB_USER=root
            DB_DEV_NAME=git_game
            DB_TEST_NAME=git_game_test
            PORT=3000
            DB_PORT=3306
            JWT_SECRET=tu_clave_secreta_super_segura
   
   
7. Ejecutar el proyecto:

Inicia el servidor desde el directorio server:

          npm run dev
Inicia el cliente desde el directorio client:

          npm run dev


## Roles y Permisos

La plataforma define permisos específicos según el rol del usuario:

| Rol           | Permisos                                                                                           |
|---------------|----------------------------------------------------------------------------------------------------|
| **Usuario**   | Puede ver contenido y crear reseñas de videojuegos.                                       |
| **Admin**     | Puede crear, editar y eliminar noticias, videos, lanzamientos y reseñas.                           |

## Estructura

            gitgame/
          ├── client/                  # Código del frontend (interfaz de usuario)
          │   ├── node_modules/        # Dependencias del cliente
          │   ├── public/              # Archivos estáticos (imágenes, CSS, index.html)
          │   ├── src/                 # Código fuente de la aplicación cliente
          │   │   ├── components/      # Componentes reutilizables de React
          │   │   ├── pages/           # Páginas principales (Noticias, Videos, etc.)
          │   │   ├── services/        # Servicios y llamadas a la API
          │   │   ├── utils/           # Utilidades y funciones auxiliares
          │   │   └── App.js           # Componente principal de la aplicación
          │   ├── eslint.config.js     # Configuración de ESLint
          │   ├── postcss.config.js    # Configuración de PostCSS
          │   ├── tailwind.config.js   # Configuración de TailwindCSS
          │   └── vite.config.js       # Configuración de Vite
          ├── server/                  # Código del backend (API y lógica del servidor)
          │   ├── controllers/         # Controladores que gestionan la lógica de las rutas
          │   ├── database/            # Configuración de la base de datos
          │   ├── interfaces/          # Definiciones de tipos de datos e interfaces
          │   ├── middleware/          # Middleware para autenticación, logs, etc.
          │   ├── models/              # Modelos de la base de datos (ORM)
          │   ├── node_modules/        # Dependencias del servidor
          │   ├── routes/              # Definición de las rutas de la API
          │   ├── uploads/             # Archivos subidos por los usuarios
          │   ├── utils/               # Funciones de utilidad usadas en el servidor
          │   └── .env                 # Variables de entorno para el servidor
          └── README.md                # Documentación del proyecto

## Uso

Para usar GitGame, sigue los pasos a continuación:

Registro e Inicio de Sesión: Los usuarios deben registrarse o iniciar sesión para interactuar con la plataforma.
Explorar Secciones: Los usuarios pueden explorar noticias, videos y lanzamientos de forma libre.
Crear Reseñas: Los usuarios registrados pueden crear y ver reseñas.
Acciones del Administrador: Los administradores pueden crear, editar y eliminar noticias, videos, lanzamientos y reseñas.



## Herramientas y Utilidades
- **Git**: Sistema de control de versiones para seguimiento de cambios en el código.
- **GitHub**: Plataforma para alojar el repositorio, colaborar y gestionar issues.
- **dotenv**: Librería para manejar variables de entorno, manteniendo la configuración sensible segura y separada del código fuente.

---

Estas tecnologías fueron seleccionadas para ofrecer un equilibrio entre rendimiento, escalabilidad y facilidad de desarrollo, permitiendo que GitGame sea una plataforma rápida, segura y fácil de mantener.

## Visionado de la web

![image](https://github.com/user-attachments/assets/0f6a4829-f3fe-422f-881d-c75fb2f15e57) ![image](https://github.com/user-attachments/assets/52b2533f-8b10-4f67-96f6-381a69168b70) ![image](https://github.com/user-attachments/assets/3097400d-5c90-47a9-8890-8dac78a754f7) ![image](https://github.com/user-attachments/assets/a5ae141b-c87d-48d8-b6e9-056b85c7ffb5) ![image](https://github.com/user-attachments/assets/090e68c8-2056-4eb7-a9d1-a4561774c89d)



