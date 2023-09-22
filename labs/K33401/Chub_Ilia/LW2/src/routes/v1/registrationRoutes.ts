import express from "express";
import RegistrationController from "../../controllers/registrationController";
import passport from "../../middlewares/passport";

const registrationRoutes: express.Router = express.Router();
const controller: RegistrationController = new RegistrationController();    

registrationRoutes.route('/')
    .post(passport.authenticate('jwt', {session: false}), controller.create)
    .get(controller.getAll);

registrationRoutes.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), controller.get)
    .delete(passport.authenticate('jwt', {session: false}), controller.delete)

export default registrationRoutes;
