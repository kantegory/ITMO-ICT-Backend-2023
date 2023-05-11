import express from "express"
import UserController from "../../controllers/users/UserController"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/:id')
    .get(controller.get)

export default router;