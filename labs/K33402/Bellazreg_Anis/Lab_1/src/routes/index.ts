import express from "express"
import Controller from '../controllers/index'

const router: express.Router = express.Router()

const controller = new Controller()

router.route('/read')
  .get(controller.get)

router.route('/create')
  .post(controller.post)

router.route('/user/:id')
  .get(controller.getbyID)

router.route('/update/:id')
  .put(controller.put)

router.route('/delete/:id')
  .delete(controller.delete)
export default router