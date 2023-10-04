import express from "express";
import GoodsController from "../../../controllers/goods/Goods";

const router: express.Router = express.Router();
const controller: GoodsController = new GoodsController();

router.route('/').post(controller.create);
router.route('/countGoods').get(controller.getCountGoods);
router.route('/getGoodsByUserId').get(controller.getGoodsByUserId);

router.route('/:id')
    .get(controller.get)
    .patch(controller.update)
    .delete(controller.delete);

export default router;
