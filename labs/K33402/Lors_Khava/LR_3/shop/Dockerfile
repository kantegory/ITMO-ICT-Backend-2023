FROM node:18-alpine

WORKDIR /shop

COPY package*.json ./

COPY . . 

RUN npm install 

EXPOSE 8002

CMD ["make", "start"]