import express from "express"
import TokenController from "../controller/TokenController";

// Create router and controller
const tokenRouter: express.Router = express.Router()
const tokenController: TokenController = new TokenController()

// Token routes
tokenRouter.route('/update')
    .get(tokenController.update)

export default tokenRouter