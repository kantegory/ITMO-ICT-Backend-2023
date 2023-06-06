import EventController from '../../controllers/event'
import express from "express"


const router: express.Router = express.Router()
const eventcontroller = new EventController()

router.route('/list').get(eventcontroller.get)
router.route('/create').post(eventcontroller.post)

export default router