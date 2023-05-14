import express from "express"
import UserController from "../../controllers/users/UserController"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/users/:id')
    .get(controller.get)

router.route('/users/:id')
    .delete(controller.deleteUser)

router.route('/users/:id')
    .patch(controller.changeName)

router.route('/register')
    .post(controller.register)

router.route('/users')
    .get(controller.getAll)

router.route(('/jwt/create')).post(controller.createJWT)

router.route(('/jwt/refresh')).post(controller.refresh)

router.route("/users/me").get(controller.me)

export default router;