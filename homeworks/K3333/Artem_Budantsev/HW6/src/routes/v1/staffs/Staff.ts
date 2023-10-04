import express from "express"
import StaffController from "../../../controllers/staffs/Staff"


const router: express.Router = express.Router()

const controller: StaffController = new StaffController()

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