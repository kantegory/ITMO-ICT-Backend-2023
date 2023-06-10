import express from "express"
import CurrencyController from "../../../controllers/portfolio/Portfolio";

const router: express.Router = express.Router()

const controller: CurrencyController = new CurrencyController()

//Покупка валюты
router.route('/buy_currency')
    .post(controller.buyCurrency)

//Весь портфель пользователя
router.route('/user_currencies')
    .get(controller.findByUser)

//Информация об одной валюте в портфеле пользователя
router.route('/currency_info')
    .get(controller.oneByUser)

//Продажа валюты
router.route('/sell')
    .post(controller.sell)

//Все портфели
router.route('/all')
    .get(controller.getAll)

export default router
