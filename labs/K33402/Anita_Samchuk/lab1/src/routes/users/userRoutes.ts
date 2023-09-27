import {Router} from "express"
import {UserController} from "../../controllers/userController"

export const userRouter = Router()
const controller: UserController = new UserController()

// Выводит всех юзеров
userRouter.get("/", controller.getAll)

// Регистрация нового пользователя
userRouter.post("/reg")

// Вход в аккаунт
userRouter.post("/login", controller.auth)

// Аккаунт авторизированного пользователя
userRouter.route("/account")

// Аккаунт пользователя по id
userRouter.get("/:id", controller.get)


// Аккаунт пользователя по username
userRouter.get("/:username", controller.getByUsername)

userRouter.delete("/delete/:id", controller.delete)

// Обновление токена
userRouter.post("/refresh", controller.refreshToken)