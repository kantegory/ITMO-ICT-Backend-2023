import express from 'express'
import User from '../models/user'
require("dotenv").config();
import generateToken from '../utils/tokenCreater';
import checkPassword from '../utils/checkPassword';
import mealTable from '../models/personalCabin'
import feedback from '../models/feedback';
import Ingredient from '../models/ingredients';
import MealIngredient from '../models/MealIngredient';
import Meal from '../models/mealDb';


export class userControllers{
    

//Register
public static UserPost = async (req:express.Request,res:express.Response)=>{
    // await User.create(req.body)
    const {firstName,lastName,email,password} = req.body;
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
        res.send(`${firstName} ${lastName} is inserted, Thanks for registeration`)
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
    requestedUser.username = req.body.username;
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



//mealTable
public static addFav = async (req: express.Request, res: express.Response) => {
    const { userId, mealId } = req.body;
  
    try {
      // Check if the user exists in the User table
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
  
      // Add the favorite meal for the user
      const userMeal = new mealTable();
      userMeal.userId = userId;
      userMeal.mealId = mealId;
      await userMeal.save();
  
      res.json({ message: 'Favorite meal added successfully.' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

  public static findmealbyuser = async (req: express.Request, res: express.Response) => {
    const requestedUser = req.params.id;
  
    try {
      const meals = await mealTable.findAll({ where: { userId: requestedUser } });
  
      if (meals.length === 0) {
        return res.status(404).json({ message: 'No meals found for the requested user.' });
      }
  
      return res.json({ meals });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };


  public static saveFeedback = async (req: express.Request, res: express.Response) => {
            const {name, email, subject,message} =  req.body;
            try {      
                const fb = new feedback();
                fb.name = name;
                fb.email = email;
                fb.subject = subject;
                fb.message = message;
                await fb.save()
                res.json({message:"Your feedback is saved, Thanks for feedback"})
            } catch (error) {
                console.log(error);
                res.status(500).json({message:"Server Error"});
            }
  }

  public static getFeedback = async (req: express.Request, res: express.Response) => {
        try {
            const allfed =await feedback.findAll();
            res.json({message:allfed})

        } catch (error) {
            
        }
  }
  
  public static postmeal = async (req: express.Request, res: express.Response) => {
    try {
      // Extract the meal data from the request body
      const { mealName, mealImage, instructions, ingredients } = req.body;
    
      // Check if meal already exists in the database
      const existingMeal = await Meal.findOne({ where: { mealName } });
      if (existingMeal) {
        return res.status(400).json({ error: 'Meal already exists in the database' });
      }
    
      // Create a new Meal record
      const meal = new Meal();
      meal.mealName = mealName;
      meal.mealImage = mealImage;
      meal.instructions = instructions;
      await meal.save();
    
      // Create a new MealIngredient record for each ingredient in the meal
      for (const { name, quantity, unit } of ingredients) {
        let ingredient = await Ingredient.findOne({ where: { name } });
    
        if (!ingredient) {
          // If ingredient doesn't exist, create a new one
          ingredient = new Ingredient();
          ingredient.name = name;
          await ingredient.save();
        }
    
        const mealIngredient = new MealIngredient();
        mealIngredient.meal_id = meal.id;
        mealIngredient.ingredient_id = ingredient.id;
        mealIngredient.quantity = quantity;
        mealIngredient.unit = unit;
        await mealIngredient.save();
      }
    
      // Return the created meal record
      res.status(201).json(meal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  public static findMealByName = async (req: express.Request, res: express.Response) => {
    const mealName = req.params.name;

    try {
        const mealInDb = await Meal.findOne({where:{
          mealName: mealName
        }})

        if(!mealInDb) {
          return res.status(404).json({ message: 'No meals found for the requested name.' });
        }
    
        return res.json({ mealInDb });
    } catch (error) {
      
    }
  
  }
 

}
