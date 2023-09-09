import express from "express"
import userRoutes from "./userRoutes"
// import todoRoutes from "./todo"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
// router.use('/todo', todoRoutes)

export default router