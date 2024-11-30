FROM node:18

WORKDIR /usr/src/app

# Copiar package.json para a pasta de trabalho
COPY educational/package*.json ./

# Instalar dependências
RUN npm install

COPY educational .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]