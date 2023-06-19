import express from "express"
import AuthController from "../../../controllers/auth/Auth"


const router: express.Router = express.Router()

const controller: AuthController = new AuthController()

router.route('/login')
    .post(controller.login)
    
router.route('/register')
    .post(controller.register)



export default router