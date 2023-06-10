.PHONY: install migrate start
.DEFAULT_GOAL := start

# Установка зависимостей и сборка приложения
install:
	npm install

# Проведение миграций
migrate: install
	npx sequelize-cli db:migrate

# Запуск приложения
start: migrate
	npm start
