FROM node:18.14.1-alpine
WORKDIR /mainservice
COPY . .
RUN npm install
EXPOSE 8100
CMD ["npm", "run", "start"]