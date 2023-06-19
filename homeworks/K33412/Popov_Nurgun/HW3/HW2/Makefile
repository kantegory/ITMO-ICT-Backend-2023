# Установка зависимостей и сборка приложения
.PHONY: init
init:
	npm install

# Проведение миграций через sequelize
.PHONY: migrate
migrate:
	npx sequelize db:migrate

# Запуск приложения
.PHONY: start
start:
	npm start

all: init migrate start
.DEFAULT_GOAL:= all