import express from 'express'
import hotelsRoutes from './hotels/Hotel'

const router = express.Router()

router.use('/hotels', hotelsRoutes)

export default router
