# На каком образе работает докер контейнер
FROM node:16-alpine

# Рабочая директория
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всех файлов
COPY . .

# Прослушивание порта
EXPOSE 1111

# Запуск скрипта
CMD [ "npm", "start" ]