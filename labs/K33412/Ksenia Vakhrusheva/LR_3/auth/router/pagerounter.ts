import express from "express"
import { userControllers } from "../controllers/pageControllers";
import {body, validationResult} from 'express-validator'

const rout:express.Router = express.Router();
// rout.get('/',userControllers.show)

rout.post('/users', userControllers.UserPost);


//for getting all users in table
rout.get('/users',  userControllers.ShowUsers)


//for getting specific user in table
rout.get('/users/:id',userControllers.FindById)

//for updating data
rout.put('/users/:id',userControllers.UpdateUser)

//for deleting user
rout.delete('/users/:id',userControllers.DeleteUser)

// for login
rout.post('/login',[
    body('email').not().isEmpty().withMessage('email is Required'),
    body('password').not().isEmpty().withMessage('password is Required')
],userControllers.Login)


//VerifyToken
rout.post('/verifyToken', userControllers.verifyToken)

export default rout;