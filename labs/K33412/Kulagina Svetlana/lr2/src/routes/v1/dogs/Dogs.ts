import express from "express"
import DogsController from "../../../controllers/dogs/dogs"

const router: express.Router = express.Router()

const controller: DogsController = new DogsController()

router.get('/:id', controller.get)

router.post('/create', controller.create)

router.patch('/update/:id', controller.update)

router.delete('/:id', controller.delete)

router.get('/breed/:id', controller.getByBreed)

router.get('/company/:id', controller.getByCompany)

export default router
