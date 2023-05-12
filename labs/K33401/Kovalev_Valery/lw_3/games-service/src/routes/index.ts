import express from "express"
import GamesRouter from "./games";

const router: express.Router = express.Router()

router.use('/', GamesRouter)

export default router