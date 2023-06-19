import express from 'express'
import Order from '../models/order';
import axios from 'axios';
import jwt, { JwtPayload }  from 'jsonwebtoken';
require("dotenv").config();

export  class orderController{
   
    public static showAllOrder = async (req:express.Request,res:express.Response)=>{
        try {
            const orders = await Order.findAll();
            res.json(orders);
          } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve orders.' });
          }
    }

    public static getOrderById = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        try {
          const order = await Order.findByPk(id);
          if (order) {
            res.json(order);
          } else {
            res.status(404).json({ message: 'Order not found.' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Failed to retrieve order.' });
        }
    } 
    
   
    public static addOrder = async (req: express.Request, res: express.Response) => {
        const  userId = req.headers.userid;
        const { order_date } = req.body;
        console.log(userId)
        // Send request to another microservice to check if user with userId exists
        try {
          const response = await axios.get(`http://localhost:4001/users/${userId}`);
          const  userExists  = response.data;
          console.log(userExists)
          if (!userExists) {
            return res.status(404).json({ message: 'User not found.' });
          }
      
          // Create the order with the user ID
          const order = new Order();
          order.user_id = Number(userId);
          order.order_date = new Date(order_date);
          await order.save();
            // const order = await Order.create({ user_id: userId, order_date });
            return res.status(201).json(order);
          } catch (error) {
            return res.status(500).json({ message: 'Failed to check user existence.' });
          }
        }
      
   
    
      public static updateOrder = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const  userId = req.headers.userid;
        const { order_date } = req.body;
      
        try {
          const response = await axios.get(`http://localhost:4001/users/${userId}`);
          const  userExists  = response.data;
          console.log(userExists)
      
          if (!userExists) {
            return res.status(404).json({ message: 'User not found.' });
          }
      
          const order = await Order.findByPk(id);
          if (order) {
            await order.update(req.body);
            return res.json(order);
          } else {
            return res.status(404).json({ message: 'Order not found.' });
          }
        } catch (error) {
          if ((error as any).response && (error as any).response.status === 401) {
            return res.status(401).json({ message: 'Invalid token.' });
          }
          console.error(error);
          return res.status(500).json({ message: 'Failed to update order.' });
        }
      }
      
      
    

    public static deleteOrder = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        try {
            const order = await Order.findByPk(id);
            if (order) {
            await order.destroy();
            res.sendStatus(204);
            } else {
            res.status(404).json({ message: 'Order not found.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete order.' });
        }

    }


}