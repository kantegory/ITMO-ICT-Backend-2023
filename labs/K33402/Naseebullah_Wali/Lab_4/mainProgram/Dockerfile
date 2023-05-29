FROM node:16-alpine

RUN apk add make

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 9002

CMD [ "npm", "start" ]