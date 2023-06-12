# Build
FROM node:18-alpine as builder
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
COPY --chown=node:node . .
RUN npm run build

# Install
FROM node:18-alpine
ENV NODE_ENV=production
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --chown=node:node  src/configs/settings.ini ./dist/configs/settings.ini

EXPOSE 5001
CMD [ "node", "dist/index.js" ]
