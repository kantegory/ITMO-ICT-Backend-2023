FROM node:18.14.1-alpine
WORKDIR /userservice
COPY . .
RUN npm install
EXPOSE 8101
CMD ["npm", "run", "start"]