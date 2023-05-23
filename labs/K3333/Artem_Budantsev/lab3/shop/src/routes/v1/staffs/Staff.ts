import express from "express"
import StaffController from "../../../controllers/staffs/Staff"
import passport from "../../../middleware/passport"


const router: express.Router = express.Router()

const controller: StaffController = new StaffController()

router.route('/')
    .get(passport.authenticate('bearer', { session: false }), controller.get)
    
router.route('/:id')
    .get(passport.authenticate('bearer', { session: false }), controller.getById)

router.route('/')
    .post(passport.authenticate('bearer', { session: false }), controller.post)

router.route('/:id')
    .patch(passport.authenticate('bearer', { session: false }), controller.patch)

router.route("/:id")
    .delete(passport.authenticate('bearer', { session: false }), controller.delete)

export default router