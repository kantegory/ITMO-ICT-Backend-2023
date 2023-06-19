import { Router } from 'express';
import { salesController } from '../controllers/sales';

const saleRoute: Router = Router();

// GET all sales
saleRoute.get('/sales', salesController.showAllSales);

// GET a single sale by ID
saleRoute.get('/sales/:id', salesController.getSalesById);

// POST a new sale
saleRoute.post('/sales', salesController.addSales);

// PUT (update) an existing sale by ID
saleRoute.put('/sales/:id', salesController.updateSales);


// DELETE a sale by ID
saleRoute.delete('/sales/:id',salesController.deleteSales);

export default saleRoute;
