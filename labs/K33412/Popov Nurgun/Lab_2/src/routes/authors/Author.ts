import express from "express"
import { AuthorController } from "../../controllers/authors/Author"
import passportAuthor from "../../middlewares/passportAuthor"

const routes: express.Router = express.Router()

const controller: AuthorController = new AuthorController()

routes.route('/signup')
    .post(controller.signup)

routes.route('/login')
    .post(controller.login)

routes.route('/profile')
    .get(passportAuthor.authenticate('jwt', { session: false }), controller.me)

routes.route('/profile/:id')
    .get(controller.get)

export default routes