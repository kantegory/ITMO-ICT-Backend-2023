.PHONY: init
init:
	npm install
	npm run build

.PHONY: run
run:
	npm start

.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate  
.DEFAULT_GOAL := init
