### Boilerplate на express typescript sequelize

Структура boilerplate описана в файле structure.pdf.

##### Команды для запуска

Установить зависимости
```
npm i
```

Запустить проект
```
npm start
```

##### CRUD-запросы

Создать пользователя (post)
```
http://localhost:8000/v1/users/
```

Вывести пользователя по id (get)
```
http://localhost:8000/v1/users/id/:id
```

Вывести пользователя по email (get)
```
http://localhost:8000/v1/users/email/:email
```

Вывести всех пользователей (get)
```
http://localhost:8000/v1/users/all
```

Залогиниться (post)
```
http://localhost:8000/v1/users/login
```