import express from "express"
import RegistrationController from "../controllers/registration"

const router: express.Router = express.Router()

const controller: RegistrationController = new RegistrationController()

router.route('/')
    .post(controller.post)

router.route('/')
    .get(controller.getAll)

router.route('/delete/:id')
    .delete(controller.delete)

router.route('/:id')
    .get(controller.get)

export default router