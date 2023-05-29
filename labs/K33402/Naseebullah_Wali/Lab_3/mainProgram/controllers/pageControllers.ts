import express from 'express';
import mealTable from '../models/personalCabin'
import feedback from '../models/feedback';
import Ingredient from '../models/ingredients';
import MealIngredient from '../models/MealIngredients';
import Meal from '../models/mealDb';
import axios from 'axios';




export class userControllers{
  public static addFav = async (req: express.Request, res: express.Response) => {
    const { mealId } = req.body;
    const userId = req.headers.userid; // Access the userId from the response headers
    // console.log(userId)
    try {
      // Check if the user exists in the User table
      // Make the necessary request to the user microservice to validate the user existence
      const response = await axios.get(`http://localhost:9001/users/${userId}`);
      const user = response.data;
    
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
    
      // Add the favorite meal for the user
      const userMeal = new mealTable();
      (userMeal as any).userId = userId;
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