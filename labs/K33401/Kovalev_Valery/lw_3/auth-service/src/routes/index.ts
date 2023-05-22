import express from "express"
import UserRouter from "./users";

const router: express.Router = express.Router()

router.use('/', UserRouter)

export default router