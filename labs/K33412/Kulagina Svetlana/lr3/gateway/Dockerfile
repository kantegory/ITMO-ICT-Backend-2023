FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY . . 

RUN npm install

EXPOSE 3000

CMD ["make", "start"]