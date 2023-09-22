import express from "express";
import PlaceController from "../../controllers/placeController";

const placeRoutes: express.Router = express.Router();
const controller: PlaceController = new PlaceController();

placeRoutes.route('/')
    .post(controller.create)
    .get(controller.getAll);

placeRoutes.route('/:id')
    .get(controller.get)
    .delete(controller.delete)
    .put(controller.update);

export default placeRoutes;
