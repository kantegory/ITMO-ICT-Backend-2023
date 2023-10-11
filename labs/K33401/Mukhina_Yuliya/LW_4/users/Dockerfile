FROM node:lts-alpine

WORKDIR /users

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "run", "start"]