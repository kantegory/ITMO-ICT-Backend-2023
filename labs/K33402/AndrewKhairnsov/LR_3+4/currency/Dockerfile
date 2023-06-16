FROM node:14.21.3-alpine
WORKDIR /currency
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start"]
