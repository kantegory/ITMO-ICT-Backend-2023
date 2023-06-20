FROM node:lts-alpine

WORKDIR /auth

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9999

CMD ["npm", "run", "start"]