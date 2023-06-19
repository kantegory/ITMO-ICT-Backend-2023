# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm rebuild
RUN npm run build
RUN cp ./src/config/settings.ini ./dist/config
RUN npm run migrate
RUN npm run seed
CMD ["npm", "start"]
EXPOSE 8000