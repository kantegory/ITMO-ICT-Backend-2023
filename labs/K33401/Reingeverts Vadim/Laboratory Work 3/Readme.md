# Laboratory Work 3
> K33401 - Рейнгеверц В.А.

### Description
> Вариант 4 - Сайт администратора интернет-магазина

- Вход
- Регистрация
- Учёт товара на складе
- Графики по продажам тех или иных товаров, по общей выручке предприятия
- Управление сотрудниками

### ER Diagram

![](https://i.imgur.com/GBXb3xs.png)


### Routes

<details>
    <summary>Unfold to see the list of all API Routes</summary>

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


### Running

```bash
npm run migrate
```

```bash
npm run dev
```


### Structure
> Repository design pattern

- Application entry point at [core/app.ts](./src/core/app.ts)
- Models are defined at [db/schema.prisma](./src/db/schema.prisma)
- Controllers are defined at [controllers/*](./src/controllers/users/User.ts)
- Middlewares are defined at [middleware/*](./src/middleware/isAuthenticated.ts)
- Routes are defined at [routes/*](./src/routes/users/User.ts)
- Services are defined at [services/*](./src/services/users/User.ts)
- Utility functions are defined at [utils/*](./src/utils/jwt.ts)
