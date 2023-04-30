import express from "express"
import GoodsController from "../../../controllers/goods/Goods"

const router: express.Router = express.Router()

const controller: GoodsController = new GoodsController()

router.route('/get/:id').get(controller.get)

router.route('/create').post(controller.create)

router.route('/update/:id').post(controller.update)

router.route('/delete/:id').post(controller.delete)

router.route('/countGoods').get(controller.getCountGoods)

export default router