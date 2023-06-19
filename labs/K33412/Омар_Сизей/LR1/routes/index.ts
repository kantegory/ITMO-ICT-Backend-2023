import express from "express"
import ExampleController from '../controllers/index'

const router: express.Router = express.Router()

const exampleController = new ExampleController()

router
  .route('/')
  .get(exampleController.get)
  .post(exampleController.post)

export default router

