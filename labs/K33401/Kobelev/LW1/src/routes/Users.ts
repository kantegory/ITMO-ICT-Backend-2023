import express from 'express'
import UserController from '../controllers/UserController'
import { checkJWT } from '../middlewares/checkJWT'

const router: express.Router = express.Router()

const userController = new UserController()

router.route('/').get(userController.getAllUsers)

router
    .route('/my_random_entities')
    .get(checkJWT, userController.getMyRandomEntities)

router
    .route('/my_random_entities/:id')
    .post(checkJWT, userController.addUserRandomEntity)

router
    .route('/my_random_entities/:id')
    .delete(checkJWT, userController.removeUserRandomEntity)

export default router
