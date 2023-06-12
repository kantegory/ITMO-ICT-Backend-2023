# Laboratory Work 4
> K33401 - Рейнгеверц В.А.

## Requirements

Необходимо упаковать ваше приложение в docker-контейнеры и обеспечить сетевое взаимодействие между различными частями вашего приложения. Делать это можно как с помощью docker-compose так и с помощью docker swarm. При разумном использовании swirl вы получите дополнительные баллы.

## Description
> Вариант 4 - Сайт администратора интернет-магазина

- Вход
- Регистрация
- Учёт товара на складе
- Графики по продажам тех или иных товаров, по общей выручке предприятия
- Управление сотрудниками
- Реализованы 2 микросервиса, выполняющий содержательние функции


## ER Diagram

![](https://i.imgur.com/iFGWh4B.png)


## Docker

### Dockerfile -> Image

```bash
docker build --tag liprikon/backend-lab-4:1.0 .
```

### Image -> Container

```bash
docker run -t -i -p 3333:3010 liprikon/backend-lab-4:1.0
```


## Running

```bash
sh run.sh install
```

```bash
sh run.sh migrate
```

```bash
sh run.sh
```

Port and host can be specified in [run.sh](run.sh):
```bash
# <...>

# Main microservice
export MAIN_HOST="127.0.0.1"
export MAIN_PORT=3010

# Depot microservice
export DEPOT_HOST="127.0.0.1"
export DEPOT_PORT=3020

# <...>
```



## Structure
> Repository design pattern


### [Main Microservice](./mainService)

<details>
    <summary>Unfold to see the list of all API Routes of Main Microservice</summary>

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

  
- Handles registration, loggin in, password recovery of a user
- Proxies requests to depotService

### [Depot Microservice](./depotService)

<details>
    <summary>Unfold to see the list of all API Routes of Depot Microservice</summary>

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

- Provides warehouse, product, stock information


### Gateway
- Main Service proxies authenticated `/depot/*` requests to Depot Service's `/*`
- Gateway is at [mainService/src/core/app.ts](./mainService/src/core/app.ts#L37)


### Microservice structure:
- Microservice entry point at [<ServiceName>/src/core/app.ts](./mainService/src/core/app.ts)
- Models are defined at [<ServiceName>/src/db/schema.prisma](./mainService/src/db/schema.prisma)
- Controllers are defined at [<ServiceName>/src/controllers/*](./mainService/src/controllers/users/User.ts)
- Middlewares are defined at [<ServiceName>/src/middleware/*](./mainService/src/middleware/isAuthenticated.ts)
- Routes are defined at [<ServiceName>/src/routes/*](./mainService/src/routes/users/User.ts)
- Services are defined at [<ServiceName>/src/services/*](./mainService/src/services/users/User.ts)
- Utility functions are defined at [<ServiceName>/src/utils/*](./mainService/src/utils/jwt.ts)
