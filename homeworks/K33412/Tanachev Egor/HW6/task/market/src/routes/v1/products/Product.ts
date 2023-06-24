import express from "express"
import ProductController from "../../../controllers/products/Product"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: ProductController = new ProductController()

router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/:id')
    .get(controller.get)
    .delete(controller.delete)

export default router


