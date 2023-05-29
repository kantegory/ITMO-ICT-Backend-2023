.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate 

.PHONY: init
init:
	npm init

.PHONY: start
start:
	npx nodemon index.js

.PHONY: lint
lint:
	npx eslint . --ext .ts

.PHONY: build
build:
	npx tcs

.DEFAULT_GOAL := init