.PHONY: install migrate start

install:
	npm install

migrate: install
	npx sequelize-cli db:migrate

start: migrate
	npm start

.DEFAULT_GOAL := start