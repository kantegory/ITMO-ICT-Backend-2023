.PHONY: init
init:
	npm init

.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate
	
.PHONY: start
start:
	npx node index.js

.PHONY: dep
start:
	npm install express -S
	npm install --save-dev sequelize-cli
	npm install sequelize -S
	npm install sqlite3 -S

.DEFAULT_GOAL := init