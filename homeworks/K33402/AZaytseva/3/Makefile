all: node_modules migrate seed
.PHONY: all migrate seed start clean

# Установка зависимостей и сборка приложения
node_modules: package.json
	npm install

# Проведение миграций через sequelize;
migrate: node_modules
	npx sequelize-cli db:migrate

# Проведение посева через sequelize;
seed: node_modules
	npx sequelize-cli db:seed:all

# Запуск приложения
start: node_modules
	npm start

# Очистка сгенерированных файлов
clean:
	rm -rf node_modules db.sqlite