# Домашняя работа № 1

`Описание:` 

- У становка npm, node.js
- Инициализация npm-пакета
- У становка express
- У даление express/попытка его обновить
- Написание кастомной команды для npm, чтобы можно удалить express командой “npm run rme”

<hr>

# Ход работы

- Установка node (на mac) через утилиту brew командой:
`brew install node`

![Screenshot](img/hw_1/p_1.png)

- Теперь посмотрим текущие версии node и npm:

![Screenshot](img/hw_1/p_2.png)

- Сделаем инициализацию проекта командой:
`npm init`

![Screenshot](img/hw_1/p_3.png)

- Теперь установим express и сохраним его в списке зависимостей командой:`npm install express --save`

![Screenshot](img/hw_1/p_4.png)

- Теперь удалим или обновим express из проекта командой:
`npm uninstall express --save` или
`npm update express --save`

![Screenshot](img/hw_1/p_5.png)

- Пишем кастомную команду `npm run rme` для удаления express, для этого надо изменить файл package.json:

![Screenshot](img/hw_1/p_6.png)

- Протестируем, предварительно установив express:

![Screenshot](img/hw_1/p_7.png)

<hr>

# Вывод 

В ходе работы я познакомился с командами npm.