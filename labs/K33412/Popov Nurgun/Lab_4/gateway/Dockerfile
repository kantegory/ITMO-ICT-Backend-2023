FROM node:16.13.0-alpine
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]