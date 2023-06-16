FROM node:18.14.1-alpine
WORKDIR /auth
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start"]
