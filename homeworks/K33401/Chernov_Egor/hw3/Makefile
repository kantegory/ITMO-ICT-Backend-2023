.PHONY: init
init:
    npm install

.PHONY: start
start:
    npm run start_app

.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate

.DEFAULT_GOAL := init