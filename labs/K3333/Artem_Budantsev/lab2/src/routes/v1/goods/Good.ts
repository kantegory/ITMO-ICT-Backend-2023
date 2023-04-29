import express from "express"
import GoodController from "../../../controllers/goods/Good"


const router: express.Router = express.Router()

const controller: GoodController = new GoodController()

router.route('/')
    .get(controller.get)
    
router.route('/:id')
    .get(controller.getById)

router.route('/')
    .post(controller.post)

router.route('/:id')
    .patch(controller.patch)

router.route("/:id")
    .delete(controller.delete)

export default router