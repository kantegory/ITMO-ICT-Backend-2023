FROM node:18.14.1-alpine
WORKDIR /empl_api
COPY . .
RUN npm install
EXPOSE 5002
CMD ["npm", "run", "start"]
