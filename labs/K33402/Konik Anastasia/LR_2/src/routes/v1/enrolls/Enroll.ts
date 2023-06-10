import express from 'express'
import EnrollController from '../../../controllers/enrolls/Enroll'
import passport from "../../../middlewares/passport";

const enrollRoutes = express.Router()
const controller: EnrollController = new EnrollController()

enrollRoutes.route('/all')
    .get(controller.getAll)
enrollRoutes.route('/')
    .post(passport.authenticate('jwt', { session: false }), controller.post)
enrollRoutes.route('/delete/:id')
    .delete(passport.authenticate('jwt', { session: false }), controller.delete)
enrollRoutes.route('/user/:userId')
    .get(passport.authenticate('jwt', { session: false }), controller.getUserEnrolls)


export default enrollRoutes
