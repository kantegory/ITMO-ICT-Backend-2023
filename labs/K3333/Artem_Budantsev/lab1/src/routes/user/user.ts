import express from "express"
import UserController from "../../controllers/userController"


const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/')
    .get(controller.get)
    
router.route('/:id')
    .get(controller.getById)

router.route('/')
    .post(controller.post)

router.route('/:id')
    .patch(controller.patch)

router.route("/:id")
    .delete(controller.delete)

export default router