import express from "express"
import GamesController from "../../controllers/games/GamesController"

const router: express.Router = express.Router()

const controller: GamesController = new GamesController()

router.route('/')
    .get(controller.getAll)

export default router;