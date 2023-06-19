import express from 'express'
import OrderItem from '../models/orderItem';
import Order from '../models/order';
import Product from '../models/product';

export  class orderItemController{
   
    public static showAllOrderItem = async (req:express.Request,res:express.Response)=>{
        try {
            const orderItems = await OrderItem.findAll();
            res.json(orderItems);
          } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve order items.' });
          }
    }

    public static getOrderItemById = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        try {
          const orderItem = await OrderItem.findByPk(id);
          if (orderItem) {
            res.json(orderItem);
          } else {
            res.status(404).json({ message: 'Order item not found.' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Failed to retrieve order item.' });
        }
    } 
    
    public static addOrderItem = async (req:express.Request,res:express.Response)=>{
        const { order_id, product_id, quantity } = req.body;

        try {
            const order = await Order.findByPk(order_id);
            const product = await Product.findByPk(product_id);

            if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
            }

            if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
            }

            const orderItem = await OrderItem.create(req.body);
            res.status(201).json(orderItem);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create order item.' });
        }
    }    
    
    public static updateOrderItem = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        const { order_id, product_id, quantity } = req.body;

        try {
            const orderItem = await OrderItem.findByPk(id);
            const order = await Order.findByPk(order_id);
            const product = await Product.findByPk(product_id);

            if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found.' });
            }

            if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
            }

            if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
            }

            await orderItem.update(req.body);
            res.json(orderItem);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update order item.' });
        }
    }

    public static deleteOrderItem = async (req:express.Request,res:express.Response)=>{
        const { id } = req.params;
        try {
          const orderItem = await OrderItem.findByPk(id);
          if (orderItem) {
            await orderItem.destroy();
            res.sendStatus(204);
          } else {
            res.status(404).json({ message: 'Order item not found.' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Failed to delete order item.' });
        }

    }


}