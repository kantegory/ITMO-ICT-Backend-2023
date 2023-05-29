import express from "express"
import GoodsController from "../../../controllers/goods/Goods"

const router: express.Router = express.Router()

const controller: GoodsController = new GoodsController()

router.route('/*').all(controller.redirect)

export default router