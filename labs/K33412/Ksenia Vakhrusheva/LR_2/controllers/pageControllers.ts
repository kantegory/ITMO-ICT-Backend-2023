import express from 'express'
import User from '../models/user'
require("dotenv").config();
import generateToken from '../utils/tokenCreater';
import checkPassword from '../utils/checkPassword';
import Product from '../models/Product';
import Worker from '../models/Workers';
import Sale from '../models/Sale';
import Review from '../models/reviews';



export class userControllers{
    

//Register
public static UserPost = async (req:express.Request,res:express.Response)=>{
    // await User.create(req.body)
    const {email,password,first_name,last_name,position,working_days,working_hours} = req.body;
    const alreadyExist = await User.findOne({where:{
        email
    }}).catch((error)=>{console.log("Error:", error)});

    if(alreadyExist){
        return res.status(400).json({message: "User with email already exist!"})
    }
    else if(!alreadyExist){
        const savedUser = await User.create(req.body).catch((error)=>{console.log("Error: ", error)});
        const token = await generateToken(email);
        res.cookie('mytoken', token, { httpOnly: true, maxAge: 349839086400000 }); // set the cookie with the token value
        // console.error("this is the toke",token)
        // console.error(req.cookies.mytoken)
        res.send(`${first_name} ${last_name} is inserted, Thanks for registeration`)
    }
    
}

//Get: request for showing all users
public static ShowUsers = async (req:express.Request,res:express.Response)=>{
    const allUsers:object = await User.findAll()
    res.send(allUsers);
    
    
}

//Get: find by ID
public static FindById = async (req:express.Request,res:express.Response)=>{
    const ByIdUser:object | null = await User.findOne({where: {id: req.params.id}})
    res.send(ByIdUser);

}

//PUT REQ: Update User
public static UpdateUser = async (req:express.Request,res:express.Response)=>{
    // const requestedId = req.params.id;
    const requestedUser:any = await User.findOne({where: {id: req.params.id} })
    requestedUser.first_name = req.body.first_name;
    requestedUser.password = req.body.password;
    requestedUser.email= req.body.email
    await requestedUser.save()
    res.send("Updated")
    
}


//DELETE REQ: Delete User
public static DeleteUser= async (req:express.Request,res:express.Response)=>{
    const requestedId:string = req.params.id;
    const requestedUser = await User.destroy({where: {id: requestedId} })
    res.send("deleted")
}


//LOGIN
public static Login=async (req:express.Request,res:express.Response) => {
    let {email, password} = req.body;
    
    const user = await User.findOne({where:{
        email
    }}).catch((error)=>{
        console.log(error)
    })

    if(!user){
       return res.status(400).json({message: "Email or password doesnt Match!"})
    }
    // if(user.password !== password){
    //     return res.status(400).json({message: "Email or password doesnt Match!"})
    // }
    const isPasswordMatch = checkPassword(user, password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Email or password doesn't match!" })
  }
    const token = await generateToken(email);
    res.cookie('mytoken', token, { httpOnly: true, maxAge: 10000006400000 }); // set the cookie with the token value
    res.status(200).json({ message: "Welcome back!"});

}

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
    const { productID, userID, rating, comment } = req.body;
  
    // Check if the product exists
    const product = await Product.findOne({ where: { id: productID } });
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }
  
    // Check if the user exists
    const user = await User.findOne({ where: { id: userID } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
  
    // Create the review
    const review = new Review();
    review.productID = productID;
    review.userID = userID;
    review.rating = rating;
    review.comment = comment;
    await review.save();
  
    return res.status(200).json({ review });
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








