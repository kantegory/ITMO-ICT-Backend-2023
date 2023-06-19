import UserController from "../controllers/user";
import express from "express";
import auth from "../middleware/authenticate"

const router = express.Router()
const userController: UserController = new UserController()

router
    .route('/signup')
    .post(userController.signup)

router 
    .route('/login')
    .post(userController.login)

router
    .route('/profile')
    .get(auth.authenticate, userController.profile)

router
    .route('/all')
    .get(auth.authenticate, userController.getAll)

router
    .route('/update/:id')
    .put(userController.put)

router
    .route('/delete/:id')
    .delete(userController.delete)

export default router 