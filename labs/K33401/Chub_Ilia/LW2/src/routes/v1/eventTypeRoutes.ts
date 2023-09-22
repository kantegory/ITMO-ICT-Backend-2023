import express from "express";
import EventTypeController from "../../controllers/eventTypeController";

const eventTypeRoutes: express.Router = express.Router();
const controller: EventTypeController = new EventTypeController();

eventTypeRoutes.route('/')
    .post(controller.create)
    .get(controller.getAll);

eventTypeRoutes.route('/:id')
    .get(controller.get)
    .delete(controller.delete)
    .put(controller.update);

export default eventTypeRoutes;
