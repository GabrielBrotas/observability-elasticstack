FROM node:16-alpine3.14 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 4000

CMD ["node", "./server.js"]