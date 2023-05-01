# Laboratory Work 2
> K33401 - Рейнгеверц В.А.


### Requirements
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

### JWT 

[src/controllers/users/User.ts](src/controllers/users/User.ts#L81)

[src/services/auth/Auth.ts](src/services/auth/Auth.ts)

[src/utils/jwt.ts](src/utils/jwt.ts)

#### Authentication
> - **Refresh Token** ― allows for acquirement of more **Access Tokens**
>   - Valid for **8 hours** 
>   - Requires check against db per use
>   - Revocation is immediate
> - **Access Token** ― provides access to protected routes
>   - Valid for **5 minutes**
>   - Does **not** require check against db per use
>   - Revocation is **not** immediate: users could still use **Access Token** for up to 5 minutes even with revoked **Refresh Token**


![](https://i.imgur.com/stVMxbO.png)

#### Using access token

![](https://i.imgur.com/bryP2ZC.png)


#### Refreshing both tokens

![](https://i.imgur.com/02YeBgh.png)


#### Logout

- Logout would be achived by clearing local storage on the client

### Stock quantity constraint
> Was made using Prisma's [interactive transaction](https://stackoverflow.com/a/74292933)
> 

[src/services/receiptEntries/ReceiptEntry.ts](src/services/receiptEntries/ReceiptEntry.ts#L32)



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

### Reference

- [JWT Authentication using Prisma and Express](https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk)
- [JWT Decoder](http://calebb.net/)