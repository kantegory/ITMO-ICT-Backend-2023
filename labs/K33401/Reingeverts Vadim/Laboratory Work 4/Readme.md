# Laboratory Work 4
> K33401 - Рейнгеверц В.А.

[Postman docs](https://documenter.getpostman.com/view/12165066/2s93si1A8F#a2cd45ed-123d-4b68-9973-07c40ab72e1a)

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


## Running in Docker

Delete all containers
```bash
docker rm $(docker ps -a -q)
```

### Without `docker-compose`

#### Creating a network

```bash
docker network create lab4
```

```bash
docker network ls
```

```bash
docker network inspect lab4
```

#### Main Microservice
> [Dockerfile](./mainService/Dockerfile)

##### Dockerfile -> Image

```bash
docker build --tag liprikon/lab4-main-service:1.0 ./mainService
```

##### Image -> Container

```bash
docker run -t -i -p 3333:3010 \
    --rm --name main \
    --network lab4 \
    --volume dbMain:/container/src/db/data \
    liprikon/lab4-main-service:1.0
```

- `-p` forwards container's `3010` port to `3333` port of host machine
- `-ti` allows `CTRL + C` to stop container
- `--rm` removes container after exit
- `--name` becomes hostname for containers
- `--network` adds container to network
- `--volume` makes database data persistent by [creating a named volume](https://github.com/moby/moby/issues/30647#issuecomment-276882545)


#### Depot Microservice
> [Dockerfile](./depotService/Dockerfile)

##### Dockerfile -> Image

```bash
docker build --tag liprikon/lab4-depot-service:1.0 ./depotService
```

##### Image -> Container

```bash
docker run -t -i \
    --rm --name depot \
    --network lab4 \
    --volume dbDepot:/container/src/db/data \
    liprikon/lab4-depot-service:1.0
```

- `-ti` allows `CTRL + C` to stop container
- `--rm` removes container after exit
- `--name` becomes hostname for containers
- `--network` adds container to network
- `--volume` makes database data persistent by [creating a named volume](https://github.com/moby/moby/issues/30647#issuecomment-276882545)

### With `docker-compose`

> [docker-compose.yaml](./docker-compose.yaml)

```bash
docker-compose build && docker-compose up
```

- Main Microservice available at http://localhost:3333

## Running without Docker

```bash
sh run.sh install
```

```bash
sh run.sh migrate
```

```bash
sh run.sh
```

- Main Microservice available at http://localhost:3010
- Depot Microservice available at http://localhost:3020

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
- Microservice entry point at [\<ServiceName\>/src/core/app.ts](./mainService/src/core/app.ts)
- Models are defined at [\<ServiceName\>/src/db/schema.prisma](./mainService/src/db/schema.prisma)
- Controllers are defined at [\<ServiceName\>/src/controllers/*](./mainService/src/controllers/users/User.ts)
- Middlewares are defined at [\<ServiceName\>/src/middleware/*](./mainService/src/middleware/isAuthenticated.ts)
- Routes are defined at [\<ServiceName\>/src/routes/*](./mainService/src/routes/users/User.ts)
- Services are defined at [\<ServiceName\>/src/services/*](./mainService/src/services/users/User.ts)
- Utility functions are defined at [\<ServiceName\>/src/utils/*](./mainService/src/utils/jwt.ts)
