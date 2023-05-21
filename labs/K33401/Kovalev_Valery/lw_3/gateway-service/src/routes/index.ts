import express from "express"
import GamesRouter from "./games";
import AuthRouter from "./auth"
import {authMiddleware} from "../middlewares/authMiddleware";

const router: express.Router = express.Router()

router.use('/games', GamesRouter)
router.use('/auth', AuthRouter)

export default router