import express from "express"
import { userControllers } from "../controllers/pageControllers";

const rout:express.Router = express.Router();

rout.post('/addProduct', userControllers.addProduct)
rout.post('/addWorkers', userControllers.addWorkers)
rout.post('/Sales', userControllers.Sales);
rout.post('/AddReview',userControllers.addReview)
rout.get('/workerProducts/:id', userControllers.findProductsSoldByWorker)
export default rout;