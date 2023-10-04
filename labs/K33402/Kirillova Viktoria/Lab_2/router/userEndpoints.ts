import express from "express"
import { userControllers } from "../controllers/userControllers";
const userRoute:express.Router = express.Router();


//Register
userRoute.post('/register', userControllers.register);

//Login
userRoute.post('/login',userControllers.Login)

//Show all users
userRoute.get('/users',  userControllers.showUsers)

//FindById
userRoute.get('/users/:id',userControllers.findById)

//UpdateById
userRoute.put('/users/:id',userControllers.updateUser)

//DeleteById
userRoute.delete('/users/:id',userControllers.deleteUser)



export default userRoute;