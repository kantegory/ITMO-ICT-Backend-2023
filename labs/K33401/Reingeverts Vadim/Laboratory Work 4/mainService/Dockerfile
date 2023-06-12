FROM node:16

WORKDIR /container

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="file:./data/dev.db"

RUN npm run migrate

ENV HOST="0.0.0.0"
ENV PORT=3010
ENV DEPOT_HOST="depot"
ENV DEPOT_PORT=3020

EXPOSE 3010

CMD [ "npm", "run", "dev" ]