import express from "express"
import { EventSettingsController } from "../controllers/EventSettings"
import passport from "../middlewares/passport";

const routes: express.Router = express.Router()
const controller: EventSettingsController = new EventSettingsController()

routes.route('/create')
    .post(passport.authenticate('bearer', { session: false }), controller.post)

routes.route('/update/:id')
    .patch(passport.authenticate('bearer', { session: false }), controller.update)

routes.route('/delete/:id')
    .delete(passport.authenticate('bearer', { session: false }), controller.delete)

routes.route('/join')
    .post(passport.authenticate('bearer', { session: false }), controller.join)

routes.route('/my')
    .get(passport.authenticate('bearer', { session: false }), controller.get)

export default routes