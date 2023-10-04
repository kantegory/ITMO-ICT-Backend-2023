PHONY: init start migrate
init:
	npm i
	npm run build

start:
	npm run start

migrate:
	npx sequelize-cli db:migrate

.DEFAULT_GOAL := init