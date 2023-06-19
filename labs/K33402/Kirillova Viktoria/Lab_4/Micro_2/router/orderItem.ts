import express from 'express';
import { orderItemController } from '../controllers/orderItem';

const orderItemRoute = express.Router();

// Get all order items
orderItemRoute.get('/orderItems', orderItemController.showAllOrderItem);

// Get order item by ID
orderItemRoute.get('/orderItems/:id', orderItemController.getOrderItemById);

// Create a new order item
orderItemRoute.post('/orderItems',orderItemController.addOrderItem);

// Update an order item
orderItemRoute.put('/orderItems/:id', orderItemController.updateOrderItem);

// Delete an order item
orderItemRoute.delete('/orderItems/:id', orderItemController.deleteOrderItem);

export default orderItemRoute;
