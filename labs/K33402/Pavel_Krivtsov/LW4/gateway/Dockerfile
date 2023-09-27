FROM node:19.8.1-alpine

WORKDIR /gateway

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]