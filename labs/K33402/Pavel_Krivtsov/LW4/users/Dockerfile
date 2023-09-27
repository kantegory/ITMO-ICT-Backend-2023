FROM node:19.8.1-alpine

WORKDIR /users

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD [ "npm", "start" ]