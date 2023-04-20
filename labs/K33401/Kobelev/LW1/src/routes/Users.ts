import express from 'express'
import UserController from '../controllers/UserController'
import { checkJWT } from '../middlewares/checkJWT'
const router: express.Router = express.Router()

const userController = new UserController()

router.route('/').get(userController.getAllUsers)

router
    .route('/add_random_entity/:id')
    .post(checkJWT, userController.addUserRandomEntity)

router
    .route('/delete_random_entity/:id')
    .delete(checkJWT, userController.removeUserRandomEntity)

router
    .route('/my_random_entities')
    .get(checkJWT, userController.getMyRandomEntities)

export default router
