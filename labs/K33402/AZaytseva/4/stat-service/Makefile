all: node_modules build
.PHONY: all build start clean

# Установка зависимостей и сборка приложения
node_modules: package.json
	npm install

# Сборка приложения
build: node_modules
	npm run build

# Проверка кода на соответствие правил линтера;
lint: node_modules
	npm run lint

# Запуск приложения
start: node_modules
	npm start

# Очистка сгенерированных файлов
clean:
	rm -rf node_modules dist