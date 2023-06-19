import express from "express"
import competitionRoute from "./competition"
import Judgerout from "./judge"
import participantRoute from "./participant"
import submissionRoute from "./submission"
import teamRoute from "./teamData"


const router: express.Router = express.Router()


router.use('/competitionRoute', competitionRoute)
router.use('/Judgerout', Judgerout)
router.use('/participantRoute', participantRoute)
router.use('/submissionRoute', submissionRoute)
router.use('/teamRoute', teamRoute)

// router.use('/workers', workersRoutes)

export default router