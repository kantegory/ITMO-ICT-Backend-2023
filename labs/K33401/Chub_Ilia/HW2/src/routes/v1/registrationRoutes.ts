import express from "express";
import RegistrationController from "../../controllers/registrationController";

const registrationRoutes: express.Router = express.Router();
const controller: RegistrationController = new RegistrationController();

registrationRoutes.route('/')
    .post(controller.create)
    .get(controller.getAll);

registrationRoutes.route('/:id')
    .get(controller.get)
    .delete(controller.delete)

export default registrationRoutes;
