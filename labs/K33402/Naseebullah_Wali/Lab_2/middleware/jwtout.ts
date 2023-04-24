import User from "../models/user";
import express from "express";
const jwt = require('jsonwebtoken');
require("dotenv").config();


const jwtout = async (req:express.Request, res:express.Response, next:any) => {
    try {
        const token = req.cookies.mytoken;
        const verifyUser = jwt.verify(token, process.env.SECRETKEY);
        const user = await User.findOne({
            where: {
                id: verifyUser.id
            }
        });
        if(user && user.firstName){
            console.log(user);
        res.send(`Hello, ${user.firstName}! Your ID is ${user.id}`);
        }
        
    } catch (error) {
        res.status(401).send(error);
    }
};


export default jwtout;