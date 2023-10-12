FROM node:lts-alpine

WORKDIR /events

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "run", "start"]