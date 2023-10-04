FROM node:latest

RUN apt-get update -y && apt-get install --no-install-recommends -y build-essential

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "make", "start" ]