import express from "express";
import UserController from "../../../controllers/users/index";

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/add/')
    .post(controller.post)

router.route('/profiles')
    .get(controller.getAll)

router.route('/profile/id/:id')
    .get(controller.getById)

router.route('/profile/username/:username')
    .get(controller.getByUsername)

export default router