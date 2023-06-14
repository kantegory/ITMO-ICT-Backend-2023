.PHONY: init
init:
	npm init

.PHONY: install
install:
	npm install express sequelize sequelize-cli sqlite3 -S -D

.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate
	
.PHONY: start
start:
	npx node index.js

.DEFAULT_GOAL := init


