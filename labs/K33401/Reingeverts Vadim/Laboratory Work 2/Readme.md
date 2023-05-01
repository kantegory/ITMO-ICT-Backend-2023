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

### JWT 

#### Authentication
> - **Refresh Token** ― allows for acquirement of new **Access Tokens**
>   - Valid for **8 hours** 
>   - Requires check against db to use
>   - Revocation is immediate
> - **Access Token** ― provides access to protected routes
>   - Valid for **5 minutes**
>   - Does not require check against db to use
>   - Revocation is not immediate: users could still use **Access Token** for up to 5 minutes even with revoked **Refresh Token**


![](https://i.imgur.com/stVMxbO.png)

#### Using access token

![](https://i.imgur.com/bryP2ZC.png)


#### Refreshing both tokens

![](https://i.imgur.com/02YeBgh.png)


### Stock quantity constraint
> Made using Prisma's [interactive transaction](https://stackoverflow.com/a/74292933)
> 

[src/services/receiptEntries/ReceiptEntry.ts](src/services/receiptEntries/ReceiptEntry.ts#L27)



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
- Routes are defined at [routes/*](./src/routes/users/User.ts)
- Services are defined at [services/*](./src/services/users/User.ts)

### Reference

- [JWT Authentication using Prisma and Express](https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk)
- [JWT Decoder](http://calebb.net/)