import EmpController from "../controllers/employee";
import express from "express"
import authMiddleware from "../middleware/authenticate"

const router = express.Router()
const controller: EmpController = new EmpController()

router
    .route('/')
    .get(authMiddleware.authenticate, controller.get)

router
    .route('/')
    .post(authMiddleware.authenticate, controller.post)

router
    .route('/id/:id')
    .get(authMiddleware.authenticate, controller.getbyId)

router
    .route('/:id')
    .put(authMiddleware.authenticate, controller.put)

router
    .route('/:id')
    .delete(authMiddleware.authenticate, controller.delete)

router
    .route('/position/:position')
    .get(authMiddleware.authenticate, controller.getbyPosition)

export default router