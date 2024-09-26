import express from 'express'
require("dotenv").config();
import Product from '../models/Product';
import Worker from '../models/Workers';
import Sale from '../models/Sale';
import Review from '../models/reviews';
import axios from 'axios';


export class userControllers{
    

public static addProduct = async (req:express.Request,res:express.Response) => {
 try {
    const {productName, productDescription, price, imageUrl, quantity, categoryId} = req.body;
    const product = await Product.create(req.body)
    res.status(200).json({message: product})
 } catch (error) {
    console.log(error)
 }

}


public static addWorkers = async (req:express.Request,res:express.Response) => {
    try {
       const worker = await Worker.create(req.body)
       res.status(200).json({message: worker})
    } catch (error) {
       console.log(error)
    }
}

public static Sales = async (req:express.Request, res:express.Response)=> {
    
    const errors = [];

    // Check if the product exists
    const product = await Product.findOne({ where: { id: req.body.productID } });
    if (!product) {
        errors.push('Product with id does not exist');
    }
    // Check if the worker exists
    const worker = await Worker.findOne({ where: { id: req.body.workerID } });
    if (!worker) {
        errors.push('Worker with id does not exist');
    }
  
    // If there are errors, send a response with the errors
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    // Create the sale record
    const sale = new Sale();
    sale.productID = req.body.productID;
    sale.workerID = req.body.workerID;
    sale.saleDate = req.body.saleDate;
    sale.quantity = req.body.quantity;
    await sale.save();
    res.status(200).json({message:sale }) ;
}



public static addReview = async (req: express.Request, res: express.Response) => {
  const { productID, rating, comment } = req.body;
  const userId = req.headers['userid'];
  

  try {
    const response = await axios.get(`http://localhost:5001/users/${userId}`);
    const userExists = response.data;
    console.log(userExists);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    // Check if the product exists
    const product = await Product.findOne({ where: { id: productID } });
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }
  
    // Create the review
    const review = new Review();
    review.productID = productID;
    review.userID = Number(userId);
    review.rating = rating;
    review.comment = comment;
    await review.save();
  
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
  
}



  public static async findProductsSoldByWorker(req: express.Request, res: express.Response) {
    try {
      const workerId = req.params.id;
  
      const worker = await Worker.findByPk(workerId);
      if (!worker) {
        return res.status(404).send('Worker not found');
      }
  
      const products = await Product.findAll({
        include: [{
          model: Sale,
          where: { workerId },
          attributes: []
        }]
      });
  
      if (products.length === 0) {
        return res.status(404).send('No products sold by this worker');
      }
  
      res.send(products);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }
  

  
  


}








