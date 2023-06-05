FROM node:19.8.1-alpine

WORKDIR /users_microservice

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9001

CMD [ "npm", "start" ]
