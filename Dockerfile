FROM node:16

WORKDIR /usr/src/app

COPY educational/code/package*.json ./

RUN npm install

COPY educational/code .

EXPOSE 3000

CMD ["npm", "run", "dev"]
