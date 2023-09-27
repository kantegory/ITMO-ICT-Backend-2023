import express from 'express'
import WatchlistController from '../controllers/watchlist.controller'
import {checkJWT} from "../middlewares/checkJWT";

const router: express.Router = express.Router()

const controller = new WatchlistController()

router.route('/').get(controller.getAll)

router.route('/').post(checkJWT, controller.create)

router.route('/:id').delete(checkJWT, controller.delete)

router.route('/:id').put(checkJWT, controller.update)

router.route('/my').get(checkJWT, controller.getAllByUsername)

export default router
