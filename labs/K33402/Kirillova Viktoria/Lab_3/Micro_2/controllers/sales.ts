import express from 'express'
import Product from '../models/product';
import Sales from '../models/sales';
import Order from '../models/order';
import Employee from '../models/employee';

export  class salesController{
   
    public static showAllSales = async (req:express.Request,res:express.Response)=>{
        Sales.findAll()
        .then((sales: Sales[]) => {
          res.json(sales);
        })
        .catch((error: Error) => {
          res.status(500).json({ error: 'Failed to retrieve sales' });
        });
    }

    public static getSalesById = async (req:express.Request,res:express.Response)=>{
        const id: number = parseInt(req.params.id, 10);

        Sales.findByPk(id)
            .then((sale: Sales | null) => {
            if (sale) {
                res.json(sale);
            } else {
                res.status(404).json({ error: 'Sale not found' });
            }
            })
            .catch((error: Error) => {
            res.status(500).json({ error: 'Failed to retrieve sale' });
            });
    } 
    
    public static addSales = async (req:express.Request,res:express.Response)=>{
        try {
            const { order_id, product_id, employee_id, sale_date } = req.body;
        
            // Check if the order, product, and employee exist
            const order = await Order.findByPk(order_id);
            const product = await Product.findByPk(product_id);
            const employee = await Employee.findByPk(employee_id);
        
            if (!order || !product || !employee) {
              return res.status(404).json({ error: 'Order, product, or employee not found' });
            }
        
            // Create the sale
            const sale: Sales = await Sales.create(
             req.body);
        
            res.status(201).json(sale);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create sale' });
          }
    }    
    
    public static updateSales = async (req:express.Request,res:express.Response)=>{
        try {
            const saleId = req.params.id;
            const { order_id, product_id, employee_id, sale_date } = req.body;
        
            // Check if the order, product, and employee exist
            const order = await Order.findByPk(order_id);
            const product = await Product.findByPk(product_id);
            const employee = await Employee.findByPk(employee_id);
        
            if (!order || !product || !employee) {
              return res.status(404).json({ error: 'Order, product, or employee not found' });
            }
        
            // Find the sale by ID and update its properties
            const sale = await Sales.findByPk(saleId);
        
            if (!sale) {
              return res.status(404).json({ error: 'Sale not found' });
            }
        
            sale.order_id = order_id;
            sale.product_id = product_id;
            sale.employee_id = employee_id;
            sale.sale_date = sale_date;
        
            // Save the updated sale
            await sale.save();
        
            res.json(sale);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update sale' });
          }
    }

    public static deleteSales = async (req:express.Request,res:express.Response)=>{
        const id: number = parseInt(req.params.id, 10);

        Sales.destroy({ where: { id } })
            .then((result: number) => {
            if (result === 1) {
                res.json({ message: 'Sale deleted successfully' });
            } else {
                res.status(404).json({ error: 'Sale not found' });
            }
            })
            .catch((error: Error) => {
            res.status(500).json({ error: 'Failed to delete sale' });
            });
    }

}