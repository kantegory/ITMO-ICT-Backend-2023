.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate

.PHONY: init
init:
	npm init

.PHONY: install_d
install_d:
	npm install express -S
	npm install sequelize -S
	npm install --save-dev sequelize-cli
	npm install nodemon
	npm install sqlite3 -S
	npm install body-parser -S
	npm install cors -S

.PHONY: start
start:
	npx nodemon index.js

.DEFAULT_GOAL := init