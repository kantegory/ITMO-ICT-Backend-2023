FROM node:lts-alpine

WORKDIR /users

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5556

CMD ["npm", "run", "start"]