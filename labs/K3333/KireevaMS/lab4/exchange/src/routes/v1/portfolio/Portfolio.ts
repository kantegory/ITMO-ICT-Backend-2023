import express from "express"
import CurrencyController from "../../../controllers/portfolio/Portfolio";
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: CurrencyController = new CurrencyController()

//Покупка валюты
router.route('/buy_currency')
    .post(passport.authenticate('bearer', { session: false }), controller.buyCurrency)

//Весь портфель пользователя
router.route('/user_currencies')
    .get(passport.authenticate('bearer', { session: false }), controller.findByUser)

//Информация об одной валюте в портфеле пользователя
router.route('/currency_info')
    .get(passport.authenticate('bearer', { session: false }), controller.oneByUser)

//Продажа валюты
router.route('/sell')
    .post(passport.authenticate('bearer', { session: false }), controller.sell)

//Все портфели
router.route('/all')
    .get(passport.authenticate('bearer', { session: false }), controller.getAll)

export default router
