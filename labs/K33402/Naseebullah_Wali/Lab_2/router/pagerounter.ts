import express from "express"
// import {show,UserPost,ShowUsers,FindById,UpdateUser,DeleteUser} from "../Controllers/userControllers";
import { userControllers } from "../controllers/pageControllers";
import {body, validationResult} from 'express-validator'
import jwtout from "../middleware/jwtout";
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

rout.post('/login',[
    body('email').not().isEmpty().withMessage('email is Required'),
    body('password').not().isEmpty().withMessage('password is Required')
],userControllers.Login)


rout.get('/jwt',jwtout, (req,res)=>{
    console.log('test')
})


rout.post('/addfav', userControllers.addFav)
rout.get('/usermeal/:id',userControllers.findmealbyuser)
export default rout;