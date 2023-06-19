import express from 'express'
import userRoutes from './users/User'
import hotelRoutes from './hotel/Hotel'
import bookingRoutes from './booking/Booking'
import roomRoutes from './room/Room'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/hotel', hotelRoutes)
router.use('/booking', bookingRoutes)
router.use('/room', roomRoutes)

export default router
