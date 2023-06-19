import EventController from "../controllers/Event";
import express from "express";

const eventRouter = express.Router()

const eventController: EventController = new EventController()

eventRouter.route('/').get(eventController.getEvents)
eventRouter.route('/add').post(eventController.add)
eventRouter.route('/:id').get(eventController.getById)
eventRouter.route('/:id').put(eventController.update)
eventRouter.route('/:id').delete(eventController.delete)


export default eventRouter
