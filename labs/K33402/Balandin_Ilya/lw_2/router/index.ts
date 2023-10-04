import express from "express"
import verifyToken from "../middleware/tokenVerification"
import userRoute from "./user"
import competitionRoute from "./competition"
import Judgerout from "./judge"
import participantRoute from "./participant"
import submissionRoute from "./submission"
import teamRoute from "./teamData"


const router: express.Router = express.Router()

router.use('/userRoute', userRoute)
router.use('/competitionRoute',verifyToken, competitionRoute)
router.use('/Judgerout',verifyToken, Judgerout)
router.use('/participantRoute',verifyToken, participantRoute)
router.use('/submissionRoute',verifyToken, submissionRoute)
router.use('/teamRoute',verifyToken, teamRoute)

// router.use('/workers', workersRoutes)

export default router