import express from 'express'
import userRoutes from './users/User'
import authRoutes from './auth/Auth'
import walletRoutes from './wallet/Wallet'
import coinRoutes from './wallet/Coin'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/wallets', walletRoutes)
router.use('/coins', coinRoutes)

export default router
