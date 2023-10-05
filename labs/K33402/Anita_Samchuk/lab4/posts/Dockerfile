FROM node:lts-alpine

WORKDIR /posts

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5557

CMD ["npm", "run", "start"]