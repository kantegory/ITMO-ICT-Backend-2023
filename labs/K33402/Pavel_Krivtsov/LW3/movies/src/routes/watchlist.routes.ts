import express from 'express'
import WatchlistController from '../controllers/watchlist.controller'

const router: express.Router = express.Router()

const controller = new WatchlistController()

router.route('/').get(controller.getAll)

router.route('/').post(controller.create)

router.route('/:id').delete(controller.delete)

router.route('/:id').put(controller.update)

router.route('/my').get(controller.getAllByUsername)

export default router
