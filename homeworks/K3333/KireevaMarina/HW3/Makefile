.PHONY: init
init:
    npm install

.PHONY: start
start:
    npx node index.js

.PHONY: install
install:
    npm install sqlite3 -S
    npm install sequelize -S
    npm install --save-dev sequelize-cli
    npm install express -S

.DEFAULT_GOAL:=init