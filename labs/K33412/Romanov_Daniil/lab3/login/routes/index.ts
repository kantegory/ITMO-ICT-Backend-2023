import express from "express"
import User from "./users/User";

const routes: express.Router = express.Router()

routes.use(User)

export default routes