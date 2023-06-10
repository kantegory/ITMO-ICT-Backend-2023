import express from "express"
import UserController from "../../../controllers/users/UserController"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router();

const controller: UserController = new UserController();

router.route('/create')
    .post(controller.post);

router.route('/login')
    .post(controller.auth);

router.route('/auth')
    .get(passport.authenticate('jwt', {session: false}), controller.me);

router.route('/refresh')
    .post(controller.refreshToken);

router.route('/:id')
    .get(controller.get);

router.route('/')
    .get(controller.getAllUsers);

router.route('/validate')
    .post(controller.validateToken);

export default router;
