FROM node

WORKDIR /app/attendance

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]