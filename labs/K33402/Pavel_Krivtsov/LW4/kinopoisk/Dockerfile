FROM node:19.8.1-alpine

WORKDIR /kinopoisk

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8002

CMD [ "npm", "start" ]