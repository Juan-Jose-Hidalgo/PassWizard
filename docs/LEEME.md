# 🔑 **PassWizard** 🧙‍♂️
### 🇬🇧 [English](../README.md) | 🇪🇸 Español
PassWizard es una aplicación para generar y gestionar contraseñas de forma segura. Está desarrollada en Angular 15 y utiliza angular-cli.

## 🔧 **Instalación**
### 🛠️  ***Prerrequisitos***
Para poder utilizar PassWizard se necesitan los siguientes prerrequisitos:

- Node.js (versión 15 o superior)
- Angular CLI (versión 15 o superior)
- Firebase CLI (opcional)

### 💻 ***Instalación local***
1. Descargar o clonar el repositorio de PassWizard.
2. Descomprimir server.zip que se encuentra en la carpeta server. Esta es la API REST que necesita PassWizard para funcionar correctamente. Una vez descomprida la API REST, deberás moverla a otra carpeta de tu equipo. La API REST tiene su propio LEEME.md que deberás leer para configurarla correctamente.
3. Abrir una terminal y navegar hasta el directorio del proyecto.
4. Ejecutar el comando ```npm install``` para instalar las dependencias del proyecto.

### ☁️ ***Instalación en línea***
PassWizard está pensado para desplegarse en Firebase. Para poder hacer la instalación en línea deberás configurar un proyecto en Firebase y hacer el deploy:

#### 🚀 ***Deploy en Firebase***
Para hacer el deploy de la aplicación en Firebase, sigue los siguientes pasos:

1. Crea un proyecto en Firebase.
2. Instala Firebase CLI en tu máquina con el comando npm install -g firebase-tools.
3. Inicia sesión en Firebase CLI con el comando firebase login.
4. En la carpeta del proyecto, ejecuta el comando ``ng build --configuration=production`` para compilar la aplicación en modo producción.
5. Ejecuta el comando firebase init y sigue los pasos para inicializar el proyecto de Firebase.
6. Ejecuta el comando firebase deploy para hacer el deploy de la aplicación en Firebase.

Recuerda que deberás tener configurada la aplicación servidor para que funcione correctamente.

## 🤖 **Uso**
### 🖥️ ***Local***
1. Ejecutar la aplicación con el comando ```npm run start```.
2. Abrir en el navegador la dirección http://localhost:4200/.
3. Iniciar sesión o registrarse para acceder a las funcionalidades de la aplicación.

### 🌐 ***En línea***
1. Acceder a la url proporcionada por firebase. Por ejemplo: https://passwizard.firebaseapp.com
2. Iniciar sesión o registrarse para acceder a las funcionalidades de la aplicación.

## ***Datos del autor*** 👨‍💻
#### 🙋‍♂️ Nombre: Jhon Doe
#### 🐙 GitHub: enlace
#### 💼 Visita mi perfil en LinkedIn
#### 📨 Correo electrónico: correo
---
## 📝 ***Licencia***
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENCIA](./LICENCIA.md) para más detalles.
