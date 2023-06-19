import express from 'express'
import Product from '../models/product';


export  class productController{
   
    public static showAllProduct = async (req:express.Request,res:express.Response)=>{
        try {
            const products: Product[] = await Product.findAll();
            res.json(products);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
          }
    }

    public static getProductById = async (req:express.Request,res:express.Response)=>{
        try {
            const product: Product | null = await Product.findByPk(req.params.id);
            if (!product) {
              return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
          }
    } 
    
    public static addProduct = async (req:express.Request,res:express.Response)=>{
        try {
            const product: Product = await Product.create(req.body);
            res.status(201).json(product);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
          }
    }    
    
    public static updateProduct = async (req:express.Request,res:express.Response)=>{
        try {
            const product: Product | null = await Product.findByPk(req.params.id);
            if (!product) {
              return res.status(404).json({ error: 'Product not found' });
            }
            await product.update(req.body);
            res.json(product);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
          }
    }

    public static deleteProduct = async (req:express.Request,res:express.Response)=>{
        try {
            const product: Product | null = await Product.findByPk(req.params.id);
            if (!product) {
              return res.status(404).json({ error: 'Product not found' });
            }
            await product.destroy();
            res.sendStatus(204);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
          }
    }


}