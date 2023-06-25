import express from "express"
import RegistrationController from "../controllers/registration"
import passport from "../middlewares/passport"

const router: express.Router = express.Router()

const controller: RegistrationController = new RegistrationController()

router.route('/')
    .post(passport.authenticate('bearer', { session: false }), controller.post)

router.route('/')
    .get(passport.authenticate('bearer', { session: false }), controller.getAll)

router.route('/delete/:id')
    .delete(passport.authenticate('bearer', { session: false }), controller.delete)

router.route('/:id')
    .get(passport.authenticate('bearer', { session: false }), controller.get)

export default router