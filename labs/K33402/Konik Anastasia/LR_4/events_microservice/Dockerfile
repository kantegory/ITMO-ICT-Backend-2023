FROM node:19.8.1-alpine

WORKDIR /events_microservice

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD [ "npm", "start" ]
