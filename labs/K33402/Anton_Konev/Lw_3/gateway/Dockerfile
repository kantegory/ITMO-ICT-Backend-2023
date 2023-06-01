FROM node:18.14.1-alpine
WORKDIR /gateway
COPY . .
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "start"]
