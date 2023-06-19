import express from "express"
import { UserEventController } from "../../controllers/users/UserEvent"
import passport from "../../middlewares/passport";

const routes: express.Router = express.Router()

const controller: UserEventController = new UserEventController()

routes.route('/addEvent')
    .post(passport.authenticate('jwt', { session: false }), controller.addEvent)

routes.route('/getEvent')
    .get(passport.authenticate('jwt', { session: false }), controller.getEvent)

export default routes