import express from 'express'
import Order from '../models/order';
import User from '../models/user';

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
    
    public static addOrder = async (req:express.Request,res:express.Response)=>{
        const { user_id, order_date } = req.body;
        try {
          // Check if user with user_id exists
          const userExists = await User.findByPk(user_id);
          if (!userExists) {
            return res.status(404).json({ message: 'User not found.' });
          }
      
          const order = await Order.create(req.body);
          res.status(201).json(order);
        } catch (error) {
          res.status(500).json({ message: 'Failed to create order.' });
        }
    }    
    
    public static updateOrder = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        const { user_id, order_date } = req.body;
        try {
            // Check if user with user_id exists
            const userExists = await User.findByPk(user_id);
            if (!userExists) {
            return res.status(404).json({ message: 'User not found.' });
            }

            const order = await Order.findByPk(id);
            if (order) {
            await order.update(req.body);
            res.json(order);
            } else {
            res.status(404).json({ message: 'Order not found.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to update order.' });
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