# Laboratory Work 2
> K33401 - Рейнгеверц В.А.



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