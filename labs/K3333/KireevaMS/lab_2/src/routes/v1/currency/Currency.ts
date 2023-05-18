import express from "express"
import CurrencyController from "../../../controllers/currency/Currency";

const router: express.Router = express.Router()

const controller: CurrencyController = new CurrencyController()

//Добавление валюты на биржу
router.route('/add_currency')
    .post(controller.post)

//Удаление валюты
router.route('/delete/:id')
    .delete(controller.deleteById)

//Информация о валюте
router.route('/find/:id')
    .get(controller.get)

//Все валюты на бирже
router.route('/all')
    .get(controller.getAll)

//Фильрация по дате
router.route('/date_filter')
    .get(controller.ByDate)

//Фильрация по имени
router.route('/name_filter')
    .get(controller.ByName)

export default router
