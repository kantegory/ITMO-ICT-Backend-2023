FROM node:19.7.0

#Create app directory
WORKDIR /auth

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8800
CMD ["npm", "start"]