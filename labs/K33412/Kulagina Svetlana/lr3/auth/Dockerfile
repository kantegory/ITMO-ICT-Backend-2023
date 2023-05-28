FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY . . 

RUN npm install

EXPOSE 8000

CMD ["make", "start"]