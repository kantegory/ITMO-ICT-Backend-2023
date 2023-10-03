import express from "express"
import LoginController from "../controllers/login"

const router: express.Router = express.Router()

const loginCntroller = new LoginController()

router
  .route('/login')
  .post(loginCntroller.login)

export default router

