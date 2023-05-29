import express from 'express';
import { userControllers } from '../controllers/pageControllers';

const rout:express.Router = express.Router();



rout.post('/addfav', userControllers.addFav)
rout.get('/usermeal/:id',userControllers.findmealbyuser)


rout.post('/feedback', userControllers.saveFeedback)
rout.get('/feedback', userControllers.getFeedback)


rout.post('/meal', userControllers.postmeal)
rout.get('/meal/:name',userControllers.findMealByName)
export default rout;