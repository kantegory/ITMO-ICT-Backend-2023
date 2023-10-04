FROM node:18

WORKDIR /user-event-service/

ENV PATH /user-event-service/node_modules/.bin:$PATH

COPY package.json /user-event-service/

RUN npm install

COPY . .
