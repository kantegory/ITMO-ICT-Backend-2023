.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate

.PHONY: init
init:
	npm init

.PHONY: start
start:
	npx node index.js

.PHONY: dependencies
dependencies:
	npm install express -S
	npm install sqlite3 -S
	npm install --save-dev sequelize-cli
	npm install sequelize -S

.DEFAULT_GOAL := init