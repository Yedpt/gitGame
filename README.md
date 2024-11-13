# GitGame 🎮

Bienvenidos a **GitGame**, una plataforma completa para los apasionados de los videojuegos. Aquí encontrarás noticias, videos, lanzamientos y reseñas de los títulos más actuales y relevantes. Nuestra plataforma ofrece una experiencia personalizada con contenido exclusivo para usuarios registrados.

![image](https://github.com/user-attachments/assets/ee5b4c35-8c61-4dfe-a992-d7d48d590963)



## Índice
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Roles y Permisos](#roles-y-permisos)
- [Recursos de Diseño y Base de Datos](#recursos-de-diseño-y-base-de-datos)
- [Estructura del Proyecto](#estructura)
- [Uso](#uso)
- [Herramientas y Utilidades](#herramientas-y-utilidades)
- [Documentación de la API](#Documentación-de-la-API)
- [Visionado de la Web](#visionado-de-la-web)
- [Autores](#Autores)




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

### Frontend (Client)
![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white): Biblioteca de JavaScript para construir interfaces de usuario interactivas y dinámicas.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white): Herramienta de construcción rápida y ligera para desarrollar proyectos con React.

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white): Framework de CSS basado en utilidades para diseñar de forma rápida y eficiente.

![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white): Cliente HTTP para realizar peticiones al backend de forma sencilla.

![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white) : Aplicado en el back-end mejorando la escalabilidad, seguridad y mantenimiento del código con tipado estático.


### Backend (Server)
![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white): Entorno de ejecución de JavaScript en el servidor.

![Express.js](https://img.shields.io/badge/Express.js-4DB33A?style=for-the-badge&logo=express&logoColor=white): Framework de servidor para Node.js que simplifica la gestión de rutas y peticiones HTTP.

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white): Tecnología para manejar la autenticación y autorización de usuarios.

![Bcrypt](https://img.shields.io/badge/Bcrypt-0046BE?style=for-the-badge&logo=bcrypt&logoColor=white): Librería para el hash de contraseñas, asegurando la seguridad de los datos sensibles.

![Multer](https://img.shields.io/badge/Multer-FF7A3F?style=for-the-badge&logo=multer&logoColor=white): Middleware para manejar la subida de archivos en las rutas del servidor.

![MySQL Workbench](https://img.shields.io/badge/MySQL_Workbench-00758F?style=for-the-badge&logo=mysql&logoColor=white): Facilita la gestión y el diseño de la Base de Datos.

[![Sequelize](https://img.shields.io/badge/Sequelize-5272B4?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/): ORM (Object-Relational Mapper) para interactuar con la base de datos de forma más intuitiva.

[![Jest](https://img.shields.io/badge/Jest-blue?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/) [![Supertst](https://img.shields.io/badge/Supertst-blue?style=for-the-badge&logo=supertest&logoColor=white)](https://supertest.js.org/): Framework de testing y herramienta para realizar pruebas unitarias y de integración.


## Instalación

Para ejecutar GitGame en tu entorno local, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Wilder-Aguilar/gitGame.git

2. Instalar dependencias en el front-end:


          cd gitgame/client
          npm install
   
3. Instalar dependencias en el back-end:


          cd ../server
          npm install

4. Configurar variables de entorno: Crea un archivo .env en el directorio server con las configuraciones necesarias, como la conexión a la base de datos.

   
            DB_PASSWORD = "INTRODUCE LA CONTRASEÑA DE TU MYSQL WORKBENCH"
            DB_HOST=localhost
            DB_USER=root (Verifica tu MySQL Workbench)
            DB_DEV_NAME=git_game
            DB_TEST_NAME=git_game_test
            PORT=3000 
            DB_PORT=3306  (Verifica tu MySQL Workbench)
            JWT_SECRET= "INTRODUCE LA CONTRASEÑA JWT"
   
   
5. Ejecutar el proyecto:

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


## Recursos de Diseño y Base de Datos

- [Diseño en Figma](https://www.figma.com/design/Of512zBJEbl0Xb7dhLwPqe/Untitled?node-id=17-3&node-type=canvas&t=DGR9bJCHvTUIh5bk-0) - Visualiza el diseño en Figma.
- [Esquema de Base de Datos en DrawSQL]([https://drawsql.app/teams/f5-5/diagrams/git-games](https://drawsql.app/teams/wilder-aguilar/diagrams/git-games))
- [Consulta el esquema de la base de datos en DrawSQL](https://drawsql.app/teams/wilder-aguilar/diagrams/git-games).

![drawSQL-image-export-2024-11-13](https://github.com/user-attachments/assets/baca752e-34db-4ca7-8e13-289e8a051aea)

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

**Registro e Inicio de Sesión**: Los usuarios deben registrarse o iniciar sesión para interactuar con la plataforma.

**Explorar Secciones**: Los usuarios pueden explorar noticias, videos y lanzamientos de forma libre.

**Crear Reseñas**: Los usuarios registrados pueden crear y ver reseñas.

**Acciones del Administrador**: Los administradores pueden crear, editar y eliminar noticias, videos, lanzamientos y reseñas.



## Herramientas y Utilidades

- ![Git](https://img.shields.io/badge/git-1F71AB?style=for-the-badge&logo=git&logoColor=white): Sistema de control de versiones para seguimiento de cambios en el código.
- ![GitHub](https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=github&logoColor=white) : Plataforma para alojar el repositorio, colaborar y gestionar issues.
- ![dotenv](https://img.shields.io/badge/dotenv-2B3238?style=for-the-badge&logo=dotenv&logoColor=white) : Librería para manejar variables de entorno, manteniendo la configuración sensible segura y separada del código fuente.

---

Estas tecnologías fueron seleccionadas para ofrecer un equilibrio entre rendimiento, escalabilidad y facilidad de desarrollo, permitiendo que GitGame sea una plataforma rápida, segura y fácil de mantener.

## Documentación de la API

Esta documentación proporciona una guía completa para interactuar con nuestra API, diseñada para facilitar la integración y el uso de los servicios backend. A través de Postman, podrás realizar pruebas, explorar los distintos endpoints y comprender las respuestas de la API de manera efectiva.

![Postman](https://img.shields.io/badge/Postman-orange?style=for-the-badge&logo=postman&logoColor=white)  [Documentación](https://documenter.getpostman.com/view/37812250/2sAY545JAw)


## Visionado de la web

![image](https://github.com/user-attachments/assets/0f6a4829-f3fe-422f-881d-c75fb2f15e57) ![image](https://github.com/user-attachments/assets/52b2533f-8b10-4f67-96f6-381a69168b70) ![image](https://github.com/user-attachments/assets/3097400d-5c90-47a9-8890-8dac78a754f7) ![image](https://github.com/user-attachments/assets/a5ae141b-c87d-48d8-b6e9-056b85c7ffb5) ![image](https://github.com/user-attachments/assets/090e68c8-2056-4eb7-a9d1-a4561774c89d)

## Autores ✒️

Vada Velázquez - [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DarthVada36) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/avadavelazquez/)

Yeder Pimentel - [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Yedpt) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yeder-pimentel/)

Oury Diallo - [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Diallo2024) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diallo-consulting/)

Arturo Mencia Martin - [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Arthurmm77) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arturomencia/)

Wilder Aguilar - [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Wilder-Aguilar) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wilderaguilar/)

