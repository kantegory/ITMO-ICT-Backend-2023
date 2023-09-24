FROM node

WORKDIR /app

COPY package*.json ./

RUN npm rebuild

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]