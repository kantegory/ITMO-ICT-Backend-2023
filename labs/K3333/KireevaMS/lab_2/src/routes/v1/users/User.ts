import express from "express"
import UserController from "../../../controllers/users/User"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

//Регистрация
router.route('/create_account')
    .post(controller.post)

//Вход
router.route('/login')
    .post(controller.auth)

//Поиск пользователя по токену
router.route('/auth')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

//Инфомарция об аккаунте
router.route('/account/:id')
    .get(controller.get)

//Обновление токена
router.route('/refresh')
    .post(controller.refreshToken)

//Все профили
router.route('/profiles')
    .get(controller.getAll)

//Удаление аккаунта
router.route('/delete/:id')
    .delete(controller.deleteById)

export default router
