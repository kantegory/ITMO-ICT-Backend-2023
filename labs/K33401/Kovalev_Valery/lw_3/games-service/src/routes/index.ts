import express from "express"
import GamesRouter from "./games";
import LikesRouter from "./likes"

const router: express.Router = express.Router()

router.use('/', GamesRouter)

router.use('/likes', LikesRouter)

export default router