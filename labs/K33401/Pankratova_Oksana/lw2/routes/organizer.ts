import express from "express"
import OrganizerController from "../controllers/organizer"

const router: express.Router = express.Router()

const controller: OrganizerController = new OrganizerController()

router.route('/')
    .post(controller.post)

router.route('/')
    .get(controller.getAll)

router.route('/:id')
    .delete(controller.delete)

router.route('/delete/:id')
    .get(controller.get)

export default router