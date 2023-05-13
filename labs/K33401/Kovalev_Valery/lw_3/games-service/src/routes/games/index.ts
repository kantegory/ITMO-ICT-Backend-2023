import express from "express"
import GamesController from "../../controllers/games/GamesController"

const router: express.Router = express.Router()

const controller: GamesController = new GamesController()

router.route('/')
    .get(controller.getAll)
//
// router.route('/register')
//     .post(controller.register)
//
// router.route('/')
//     .get(controller.getAll)

// router.route('/register')
//     .post(controller.getAll)

// router.route(('/jwt/create')).post(controller.createJWT)

// router.route("/games/me").get(controller.me)

export default router;