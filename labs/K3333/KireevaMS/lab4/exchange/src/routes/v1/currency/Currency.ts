import express from "express"
import CurrencyController from "../../../controllers/currency/Currency";
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: CurrencyController = new CurrencyController()

//Добавление валюты на биржу
router.route('/add_currency')
    .post(passport.authenticate('bearer', { session: false }), controller.post)

//Удаление валюты
router.route('/delete/:id')
    .delete(passport.authenticate('bearer', { session: false }), controller.deleteById)

//Все валюты на бирже
router.route('/all')
    .get(passport.authenticate('bearer', { session: false }), controller.getAll)

//Фильрация по дате
router.route('/date_filter')
    .get(passport.authenticate('bearer', { session: false }), controller.byDate)

//Информация о валюте
router.route('/name_filter')
    .get(passport.authenticate('bearer', { session: false }), controller.byName)

export default router
