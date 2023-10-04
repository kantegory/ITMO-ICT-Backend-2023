import { Router } from 'express';
import { productController } from '../controllers/product';

const productRoute: Router = Router();

// Get all products
productRoute.get('/products', productController.showAllProduct);

// Get a specific product by ID
productRoute.get('/products/:id',productController.getProductById);

// Create a new product
productRoute.post('/addProduct',productController.addProduct);

// Update an existing product
productRoute.put('/products/:id',productController.updateProduct);

// Delete a product
productRoute.delete('/products/:id',productController.deleteProduct);

export default productRoute;
