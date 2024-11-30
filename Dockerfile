FROM node:18

WORKDIR /usr/src/app

COPY ./educational/package*.json ./

RUN npm install

COPY ./educational .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]