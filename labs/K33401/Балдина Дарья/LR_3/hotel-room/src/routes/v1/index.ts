import express from 'express'
import hotelRoutes from './hotel/Hotel'
import roomRoutes from './room/Room'

const router = express.Router()

router.use('/hotel', hotelRoutes)
router.use('/room', roomRoutes)

export default router
