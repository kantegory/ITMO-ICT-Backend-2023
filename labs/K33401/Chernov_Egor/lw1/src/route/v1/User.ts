import express from "express"
import TestController from "../../controller/test/index"
// import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

// start test
const testController = new TestController()

router.route('/test')
    .get(testController.get)
// end test


// const controller: UserController = new UserController()
//
// router.route('/')
//     .post(controller.post)
//
// router.route('/profile')
//     .get(passport.authenticate('jwt', { session: false }), controller.me)
//
// router.route('/profile/:id')
//     .get(controller.get)
//
// router.route('/login')
//     .post(controller.auth)
//
// router.route('/refresh')
//     .post(controller.refreshToken)

export default router