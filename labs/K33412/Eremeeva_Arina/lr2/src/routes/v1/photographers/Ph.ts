import express from "express"
import PhotographersController from "../../../controllers/photographers/Ph"

const router: express.Router = express.Router()

const controller: PhotographersController = new PhotographersController()

router.get('/:id', controller.get)

router.post('/create', controller.create)

router.patch('/update/:id', controller.update)

router.delete('/:id', controller.delete)

router.get('/surname/:id', controller.getBySurname)

router.get('/company/:id', controller.getByCompany)

export default router
