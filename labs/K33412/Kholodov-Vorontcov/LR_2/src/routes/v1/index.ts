import express from 'express'
import userRoutes from './users/User'
import hotelsRoutes from './hotels/Hotel'
import bookingRoutes from './bookings/Booking'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/hotels', hotelsRoutes)
router.use('/bookings', bookingRoutes)

export default router
