Ход работы: 

Инициализация проекта
```bash
npm init 
```

Установка зависимостей
```bash
npm i -S <package>
nmp i -D <package>
```

Создание tsconfig.json:
```bash
npx tsc --init
```

В package.json создадим кастомные команды:

```json
"watch": "tsc -w", 
"build": "npx tsc",
"start": "nodemon ./dist/index.js",
"dev": "npm-run-all --parallel watch start"
```

Создадим приложение src/app.ts из примера. Настроим зададим переменные среды окружения .env 

Создадим структуру директорий в src

Создадим шаблон для роутинга 

Настраиваем БД в provides/db.ts

Создаём модель User

Пишем .sequelizerc можно взять из примера. Инициализируем sequelize

```bash
npx sequelize init
```
