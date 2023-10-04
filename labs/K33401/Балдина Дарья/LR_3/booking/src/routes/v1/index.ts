import express from 'express'
import bookingRoutes from './booking/Booking'

const router = express.Router()

router.use('/booking', bookingRoutes)


export default router
