import EventEntryController from "../controllers/EventEntries";
import express from "express";

const entryRouter = express.Router()

const entryController: EventEntryController = new EventEntryController()

entryRouter.route('/').post(entryController.add)
entryRouter.route('/:id').delete(entryController.delete)
entryRouter.route('/').get(entryController.get)


export default entryRouter
