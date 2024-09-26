import express from 'express'
const rout = express.Router()
import { Controller } from '../control/controllers'

rout.get('/', Controller.Home)
rout.post('/Login',Controller.Login)
rout.post('/Register',Controller.Register)
rout.get('/users',Controller.AllUsers)
rout.post('/userProducts',Controller.ProductCheck)
rout.get('/getProducts/:id',Controller.UserProducts)  //find products according to userid
rout.get('/FindUserById/:id',Controller.FindById)
rout.delete('/users/:id',Controller.DeleteUser)
rout.put('/update/:id',Controller.UpdateUser)








export default rout;