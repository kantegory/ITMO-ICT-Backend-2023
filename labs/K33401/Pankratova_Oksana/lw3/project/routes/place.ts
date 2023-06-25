import express from "express"
import PlaceController from "../controllers/place"

const router: express.Router = express.Router()

const controller: PlaceController = new PlaceController()

router.route('/')
    .post(controller.post)

router.route('/')
    .get(controller.getAll)

router.route('/delete/:id')
    .delete(controller.delete)

router.route('/:id')
    .get(controller.get)

export default router