FROM node:18

WORKDIR /event-service/

ENV PATH /event-service/node_modules/.bin:$PATH

COPY package.json /event-service/

RUN npm install

COPY . .
