import express from 'express'
import Coin from "./wallets/Coin";
import Wallet from "./wallets/Wallet";
import User from "./users/User";

const router: express.Router = express.Router()

router.use('/users', User)
router.use('/wallets', Wallet)
router.use('/coins', Coin)

export default router