import express from 'express'
import Coin from "./Coin";
import Wallet from "./Wallet";


const router: express.Router = express.Router()

router.use('/wallets', Wallet)
router.use('/coins', Coin)

export default router