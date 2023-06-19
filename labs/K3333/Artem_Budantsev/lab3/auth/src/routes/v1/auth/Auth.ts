import express from "express"
import AuthController from "../../../controllers/auth/Auth"
import passport from "../../../middleware/passport"


const router: express.Router = express.Router()

const controller: AuthController = new AuthController()

router.route("/me")
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/auth/login')
    .post(controller.login)
    
router.route('/auth/register')
    .post(controller.register)

router.route('/validateToken')
    .post(controller.validateToken)


export default router