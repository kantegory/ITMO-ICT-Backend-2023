FROM node:18

WORKDIR /app/src

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 8501

CMD [ "npm", "start" ]