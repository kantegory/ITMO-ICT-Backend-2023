FROM node:lts-alpine

WORKDIR /gateway

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm", "run", "start"]

