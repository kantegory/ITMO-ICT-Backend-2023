FROM node:18.14.1-alpine
WORKDIR /currency
COPY ../currency .
RUN npm install
EXPOSE 8002
CMD ["npm", "run", "start"]
