import express from "express"
import WorkerController from "../../controllers/workers/Worker"
import passport from "../../middlewares/passport"

const router: express.Router = express.Router()
const controller: WorkerController = new WorkerController()

router.route('/:id').get(controller.get)

router.route('/').post(passport.authenticate('jwt', { session: false }), controller.create)

router.route('/:id').put(passport.authenticate('jwt', { session: false }), controller.update)

router.route('/:id').delete(passport.authenticate('jwt', { session: false }), controller.delete)

export default router