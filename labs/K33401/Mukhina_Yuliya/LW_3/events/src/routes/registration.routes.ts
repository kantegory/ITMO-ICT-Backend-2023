import express from "express"
import RegistrationController from "../controllers/registration.controller"

const registrationRoutes: express.Router = express.Router()
const controller: RegistrationController = new RegistrationController()

registrationRoutes.route('/').get(controller.me)
registrationRoutes.route('/:id').post(controller.register)
registrationRoutes.route('/:id').delete(controller.unregister)

export default registrationRoutes