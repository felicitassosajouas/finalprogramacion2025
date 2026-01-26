#  Rumbo
A la hora de planificar un viaje, muchas personas se enfrentan a varios desafíos: no saben qué actividades pueden hacer según su presupuesto. Además, los viajeros muchas veces no tienen en cuenta opciones culturales accesibles como los Free Walking Tours, simplemente porque no saben que existen.El principal objetivo de Rumbo es simplificar y enriquecer la planificación de un viaje. La app busca acompañar al usuario desde el inicio del proceso.
A través de un formulario simple, la app recopila datos clave como cantidad de personas que viajan, si hay niños, presupuesto estimado y ciudad de destino.

**Rumbo** es una aplicación web desarrollada con **React vite**, **TypeScript**, **NestJS** y **MongoDB**

##  Tecnologías utilizadas

- **Frontend:** React vite + TypeScript
- **Backend:** NestJS (TypeScript)  
- **Base de datos:** MongoDB  
- **Contenedores:** Docker & Docker Compose  
- **Gestión de dependencias:** npm  

### 1. Clonar el repositorio

##  Requisitos previos
Instalar (si vas a usar Docker te hacen falta solo Docker y Git):
- Git  
- Node.js (v18+ recomendado) y npm (si vas a ejecutar sin Docker)  
- Docker & Docker Compose (recomendado para levantar todo junto)  
- (Opcional) Postman o similar para probar endpoints

**backend**
para instalar mongo en nest.js 
npm i @nestjs/mongoose mongoonpm
npm install mongodb

para generar validaciones tendríamos que instalar la dependencia de class validator y transformer:
npm i --sabe class-validator class-transformer

vamos a instalar las dependencias para hashear contraseña: 
npm install bcrypt

Para trabajar con JWT la libreria recomendada es: 
npm install jsonwebtoken

**frontend**
La librería Tailwind CSS sirve para crear interfaces web modernas:
npm install -D tailwindcss
npx tailwindcss init

React hook form librería para gestionar formularios:
en la terminal vamos a colocar npm i react-hook-form

La librería react-router-dom sirve para manejar la navegación entre páginas:
npm install react-router-dom

vamos a instalar la dependencia de sonner: es una librería de notificaciones para mostrar mensajes flotantes.
npm i sonner
npm i @heroicons/react
npm i @tailwindcss/forms

Para colocar mapas en el proyecto utilizamos esta libreria:
npm install leaflet

para instalar axios que sirve para hacer peticiones HTTP:
npm install axios

Para pasar bien en limpio las recomendaciones de la IA
npm install react-markdown 

### iniciar el proyecto
Colocamos siguiente comando en la terminal de la raíz **docker compose up --build** solo cuando lo iniciamos por primera vez 
una vez que colocamos este comando después si paramos nuestro proyecto solo colocamos el comando de **docker compose el up -d** si no modificamos nada de los archivos. Para detener todos los contenedores **docker compose down**

El sistema levanta tanto el frontend como el backend simultáneamente mediante **Docker Compose up -d**.

**Integrantes**
Franco Orozco, Felicitas Sosa, Leandro Morresi, Nicolas Morresi

