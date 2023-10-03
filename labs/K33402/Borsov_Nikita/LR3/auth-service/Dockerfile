FROM node:18

WORKDIR /auth-service/

ENV PATH /auth-service/node_modules/.bin:$PATH

COPY package.json /auth-service/

RUN npm install

COPY . .
