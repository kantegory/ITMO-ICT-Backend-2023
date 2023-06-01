FROM node:18.14.1-alpine
WORKDIR /auth
COPY . .
RUN npm install
EXPOSE 8001
CMD ["npm", "run", "start"]
