import express from "express";
import { createServer } from "http";

import sequelize from "./src/providers/db"
import userRouter from "./src/routes/user"
import prodRouter from "./src/routes/product"
import cookieParser from 'cookie-parser';  

const sequelizeObject = sequelize

var app = express()
app.use(cookieParser());
app.use(express.json())
app.use('/user', userRouter)
app.use('/prod', prodRouter)

var server = createServer(app)
const port = 8501

server.listen(port, () => console.log(`Server listening on localhost:${port}`))