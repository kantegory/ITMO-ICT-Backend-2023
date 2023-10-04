FROM node:18.14.1-alpine
WORKDIR /pg_backend/auth-service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]