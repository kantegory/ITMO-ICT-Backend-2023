import express from "express"
import ProductController from "../../controllers/products/Product"
import passport from "../../middlewares/passport"

const router: express.Router = express.Router()
const controller: ProductController = new ProductController()

router.route('/get/:id').get(controller.get)

router.route('/post').post(passport.authenticate('jwt', { session: false }), controller.post)

router.route('/update/:id').put(passport.authenticate('jwt', { session: false }), controller.update)

router.route('/delete/:id').delete(passport.authenticate('jwt', { session: false }), controller.delete)

router.route('/name/:name').get(controller.getName)

router.route('/category/:category').get(controller.getCategory)

router.route('/article/:article_num').get(controller.getArticleNum)

router.route('/count').get(controller.getCount)

export default router