import express from "express"
import PlotController from "../../../controllers/plot/Plot";

const router: express.Router = express.Router()

const controller: PlotController = new PlotController()

//График за год
router.route('/year')
    .get(controller.oneYear)

//График за месяц
router.route('/month')
    .get(controller.oneMonth)

//Добавление информации о цене валюты
router.route('/add_price')
    .post(controller.addPrice)

//Удаление информации о цене валюты
router.route('/delete_price/:id')
    .delete(controller.deletePrice)

export default router
