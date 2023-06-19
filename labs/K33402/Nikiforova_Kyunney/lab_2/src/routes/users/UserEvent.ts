import express from "express"
import { UserEventController } from "../../controllers/users/UserEvent"
import passport from "../../middlewares/passport";

const routes: express.Router = express.Router()

const controller: UserEventController = new UserEventController()

routes.route('/createEvent')
    .post(passport.authenticate('jwt', { session: false }), controller.createEvent)

routes.route('/updateEvent/:id')
    .patch(passport.authenticate('jwt', { session: false }), controller.updateEvent)

routes.route('/deleteEvent/:id')
    .delete(passport.authenticate('jwt', { session: false }), controller.deleteEvent)

routes.route('/joinTheEvent')
    .post(passport.authenticate('jwt', { session: false }), controller.joinTheEvent)

routes.route('/getEvent')
    .get(passport.authenticate('jwt', { session: false }), controller.getEvent)

export default routes