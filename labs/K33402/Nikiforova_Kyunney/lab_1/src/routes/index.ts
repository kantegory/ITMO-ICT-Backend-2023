import express from "express"
import userRoutes from "./users/User"

const routes: express.Router = express.Router()
routes.use('/users', userRoutes)

export default routes
