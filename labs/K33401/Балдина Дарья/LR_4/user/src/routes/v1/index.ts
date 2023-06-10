import express from 'express'
import userRoutes from './users/User'


const router = express.Router()

router.use('/users', userRoutes)


export default router
