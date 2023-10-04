import express from "express"
import UserController from "../controllers"

const router = express.Router()

const userController = new UserController()

router.route('/users').get(userController.get)

router.route('/users/id/:id').get(userController.getbyID)

router.route('/users/email/:email').get(userController.getbyEmail)

router.route('/users').post(userController.post)

router.route('/users/:id').put(userController.put)

router.route('/users/:id').delete(userController.delete)

export default router