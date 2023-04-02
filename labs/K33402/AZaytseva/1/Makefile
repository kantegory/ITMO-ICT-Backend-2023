all: node_modules build migrate seed
.PHONY: all build migrate seed start clean

# Установка зависимостей и сборка приложения
node_modules: package.json
	npm install

# Сборка приложения
build: node_modules
	npm run build

# Проведение миграций через sequelize;
migrate: node_modules
	npm run migrate

# Проведение посева через sequelize;
seed: node_modules
	npm run seed

# Проверка кода на соответствие правил линтера;
lint: node_modules
	npm run lint

# Запуск приложения
start: node_modules
	npm start

# Очистка сгенерированных файлов
clean:
	rm -rf node_modules db.sqlite dist