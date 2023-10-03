FROM node:19.7.0

#Create app directory
WORKDIR /features

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD ["npm", "start"]