FROM node

WORKDIR /app/event

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]