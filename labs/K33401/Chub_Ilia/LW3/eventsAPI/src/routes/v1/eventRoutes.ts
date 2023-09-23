import express from "express";
import EventController from "../../controllers/eventController";

const eventRoutes: express.Router = express.Router();
const controller: EventController = new EventController();

eventRoutes.route('/')
    .post(controller.create)
    .get(controller.getAll);

eventRoutes.route('/:id')
    .get(controller.get)
    .delete(controller.delete)
    .put(controller.update);

export default eventRoutes;
