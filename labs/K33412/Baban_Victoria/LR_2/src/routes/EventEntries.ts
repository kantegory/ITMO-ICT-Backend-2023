import EventEntryController from "../controllers/EventEntries";
import express from "express";
import auth from "../middleware/auth";

const entryRouter = express.Router()

const entryController: EventEntryController = new EventEntryController()

entryRouter.route('/').post(auth.auth, entryController.add)
entryRouter.route('/:id').delete(auth.auth, entryController.delete)
entryRouter.route('/').get(auth.auth, entryController.get)


export default entryRouter
