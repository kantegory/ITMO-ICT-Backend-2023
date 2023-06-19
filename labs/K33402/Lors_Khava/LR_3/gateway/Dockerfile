FROM node:18-alpine

WORKDIR /gateway

COPY package*.json ./

COPY . . 

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]