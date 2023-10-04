FROM node:18-alpine

WORKDIR /user

COPY package*.json ./

COPY . . 

RUN npm install


EXPOSE 8001

CMD ["make", "start"]