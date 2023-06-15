import express from "express"
import ProductController from "../../../controllers/products/Product"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: ProductController = new ProductController()

router.route('/')
    .get(passport.authenticate('bearer', { session: false }), controller.get)
    .post(passport.authenticate('bearer', { session: false }), controller.post)

router.route('/:id')
    .get(passport.authenticate('bearer', { session: false }), controller.get)
    .delete(passport.authenticate('bearer', { session: false }), controller.delete)

export default router


