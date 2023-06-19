import express from 'express';
import { orderController } from '../controllers/order';



const orderRoute = express.Router();

// Get all orders
orderRoute.get('/orders', orderController.showAllOrder);

// Get order by ID
orderRoute.get('/orders/:id', orderController.getOrderById);

// Create a new order
orderRoute.post('/orders', orderController.addOrder);

// Update an order
orderRoute.put('/orders/:id',orderController.updateOrder);

// Delete an order
orderRoute.delete('/orders/:id',orderController.deleteOrder);

export default orderRoute;
