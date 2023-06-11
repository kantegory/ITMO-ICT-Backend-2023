# Laboratory Work 3
> K33401 - Рейнгеверц В.А.

## Requirements

Необходимо реализовать отдельный микросервис, выполняющий какую-либо содержательную функцию из всего арсенала функций вашего приложения.

## Description
> Вариант 4 - Сайт администратора интернет-магазина

- Вход
- Регистрация
- Учёт товара на складе
- Графики по продажам тех или иных товаров, по общей выручке предприятия
- Управление сотрудниками

## ER Diagram

![](https://i.imgur.com/iFGWh4B.png)


## Microservices

### Main Service

<details>
    <summary>Unfold to see the list of all API Routes of Main Service</summary>

    GET /users
    POST /users

    GET /users/:id
    PATCH /users/:id
    DELETE /users/:id

    POST /users/register

    POST /users/login

    POST /users/refreshToken

    POST /users/me

    POST /users/resetPassword

    GET /users/resetPassword/:id
</details>

### Depot Service

<details>
    <summary>Unfold to see the list of all API Routes of Main Service</summary>

    GET /products
    POST /products

    GET /products/:id
    PATCH /products/:id
    DELETE /products/:id

    GET /stocks
    POST /stocks

    GET /stocks/:id
    PATCH /stocks/:id
    DELETE /stocks/:id

    GET /warehouses
    POST /warehouses

    GET /warehouses/:id
    PATCH /warehouses/:id
    DELETE /warehouses/:id

    GET /receipts
    POST /receipts

    GET /receipts/:id
    PATCH /receipts/:id
    DELETE /receipts/:id

    GET /receiptEntries
    POST /receiptEntries

    GET /receiptEntries/:id
    PATCH /receiptEntries/:id
    DELETE /receiptEntries/:id

    GET /sales

    GET /sales/category/

    GET /sales/category/:category

    GET /sales/products/:productId
</details>

## Running

```bash
sh run.sh
```

```bash
sh run.sh migrate
```


## Structure
> Repository design pattern

Two microservices:
- [mainService](./mainService)
  - Handles registration, loggin in, password recovery of a user
  - Proxies authenticated requests to depotService
- [depotService](./mainService)
  - Provides warehouse, product, stock information


Microservice structure:
- Microservice entry point at [<ServiceName>/core/app.ts](./mainService/src/core/app.ts)
- Models are defined at [<ServiceName>/db/schema.prisma](./mainService/src/db/schema.prisma)
- Controllers are defined at [<ServiceName>/controllers/*](./mainService/src/controllers/users/User.ts)
- Middlewares are defined at [<ServiceName>/middleware/*](./mainService/src/middleware/isAuthenticated.ts)
- Routes are defined at [<ServiceName>/routes/*](./mainService/src/routes/users/User.ts)
- Services are defined at [<ServiceName>/services/*](./mainService/src/services/users/User.ts)
- Utility functions are defined at [<ServiceName>/utils/*](./mainService/src/utils/jwt.ts)
