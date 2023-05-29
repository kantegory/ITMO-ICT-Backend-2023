import express from "express"
import CreaterController from "../../../controllers/creaters/Creater"

const router: express.Router = express.Router()

const controller: CreaterController = new CreaterController()

router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.post('/filter', controller.getByParams)

export default router