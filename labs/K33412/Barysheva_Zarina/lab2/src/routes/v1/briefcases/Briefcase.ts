import express from "express"
import BriefcaseController from "../../../controllers/briefcases/Briefcase"

const router: express.Router = express.Router()

const controller: BriefcaseController = new BriefcaseController()

router.route('/user/:userId')
    .get(controller.getAll)

router.route('/:caseId')
    .get(controller.getOne)

router.route('/create')
    .post(controller.post)

router.route('/:caseId')
    .delete(controller.delete)

router.route('/:caseId')
    .put(controller.update)


export default router
