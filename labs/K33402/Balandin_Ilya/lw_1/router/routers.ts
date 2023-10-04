import express from "express"
import { userControllers } from "../controllers/userRouteControllers";
import verifyToken from "../middleware/tokenVerification";

const rout:express.Router = express.Router();

//Register
rout.post('/register', userControllers.register);

//Login
rout.post('/login',userControllers.login)

//for getting all users in table
rout.get('/users',verifyToken,  userControllers.showUsers)


//for getting specific user in table
rout.get('/users/:id',verifyToken, userControllers.findById)

//for updating data
rout.put('/users/:id',verifyToken, userControllers.updateUser)

//for deleting user
rout.delete('/users/:id',verifyToken, userControllers.deleteUser)



export default rout;