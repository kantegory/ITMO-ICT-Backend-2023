FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run migrate

ENV MAIN_HOST="0.0.0.0"
ENV MAIN_PORT=3010

EXPOSE 3010

CMD [ "npm", "run", "dev" ]