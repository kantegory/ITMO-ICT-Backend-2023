import express from "express"
import UserController from "../../controllers/userController"
import passport from "../../middlewares/passport"

const userRoutes: express.Router = express.Router()

const controller: UserController = new UserController()

// Route for user creation
userRoutes.route('/')
    .post(controller.post);

// Route for getting user profile (Requires JWT authentication)
userRoutes.route('/profile')
    .get(passport.authenticate('jwt', {session: false}), controller.me);

// Route for getting a specific user's profile by ID
userRoutes.route('/profile/:id')
    .get(controller.get);

// Route for user login
userRoutes.route('/login')
    .post(controller.auth);

// Route for refreshing JWT tokens
userRoutes.route('/refresh')
    .post(controller.refreshToken);

export default userRoutes
