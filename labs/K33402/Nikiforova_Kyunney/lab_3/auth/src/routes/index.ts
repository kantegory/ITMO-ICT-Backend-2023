import express from "express"
import userRoutes from "./auths/auth"

const routes: express.Router = express.Router()

routes.use('/users', userRoutes)

export default routes
