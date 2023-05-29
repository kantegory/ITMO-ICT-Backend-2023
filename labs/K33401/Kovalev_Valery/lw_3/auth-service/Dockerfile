FROM node:16-alpine

RUN apk add make

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

EXPOSE 8000

EXPOSE 9229

CMD [ "make", "dev" ]
