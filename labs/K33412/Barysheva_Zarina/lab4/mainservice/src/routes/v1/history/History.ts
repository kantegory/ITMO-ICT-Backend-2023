import express from "express"
import HistoryController from "../../../controllers/history/History"

const router: express.Router = express.Router()

const controller: HistoryController = new HistoryController()

router.route('/:id')
    .get(controller.get)


export default router
