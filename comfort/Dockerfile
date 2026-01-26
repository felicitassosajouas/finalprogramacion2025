# menciona la imagen que vamos a utilizar e
# en este caso es node.js versión 20 sobre Lunix
# una distribución lijera para los contenedores
FROM node:20-alpine

# carpeta de trabajo dentro del contenedor 
WORKDIR /app

# copia el package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# copia todo el contenido del directorio actual a la carpeta de app
COPY . .

# es el puerto
EXPOSE 4000

# define el comando que se ejecutará cuando el contenedor lo inicie
CMD ["npm", "run", "start:dev"]
