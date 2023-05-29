import express from "express"
import CompaniesController from "../../../controllers/dogs_companies/Dogs_company"

const router: express.Router = express.Router()

const controller: CompaniesController = new CompaniesController()

router.get('/:id', controller.get)

router.post('/create', controller.create)

router.patch('/update/:id', controller.update)

router.delete('/:id', controller.delete)

router.get('/owner/:id', controller.getByOwner)

export default router