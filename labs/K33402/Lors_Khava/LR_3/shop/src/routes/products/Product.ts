import express from "express"
import ProductController from "../../controllers/products/Product"
import passport from "../../middlewares/passport"

const router: express.Router = express.Router()
const controller: ProductController = new ProductController()

router.route('/:id').get(controller.get)

router.route('/').post(controller.post)

router.route('/:id').put(controller.update)

router.route('/:id').delete(controller.delete)

router.route('/name/:name').get(controller.getName)

router.route('/category/:category').get(controller.getCategory)

router.route('/article/:article_num').get(controller.getArticleNum)

router.route('/count').get(controller.getCount)

export default router