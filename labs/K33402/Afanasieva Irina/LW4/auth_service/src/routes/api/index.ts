import express from 'express'
import userRoutes from './users/User'
import authRoutes from './auth/Auth'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)

export default router
