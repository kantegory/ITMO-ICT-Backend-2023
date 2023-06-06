import AttendanceController from '../../controllers/attendance'
import express from "express"
import passport from 'passport'


const router: express.Router = express.Router()
const attendancecontroller = new AttendanceController()

router.route('/list').get(passport.authenticate('jwt', {session: false}), attendancecontroller.get)
router.route('/create').post(passport.authenticate('jwt', {session: false}), attendancecontroller.post)

export default router