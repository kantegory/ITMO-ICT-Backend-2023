import express from "express"
import statRoutes from "./Stat"

const router: express.Router = express.Router()

router.use('/', statRoutes)

export default router