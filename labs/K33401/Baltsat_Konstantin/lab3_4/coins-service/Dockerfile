FROM node:18.14.1-alpine
WORKDIR /pg_backend/coins-service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]