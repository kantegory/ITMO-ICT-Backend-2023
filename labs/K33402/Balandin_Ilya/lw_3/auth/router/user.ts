import express from "express"
import { Router, Request, Response } from 'express';
import User from "../models/user";
import generateToken from "../utils/TokenCreater";
import checkPassword from "../utils/checkPassword";


const userRoute:express.Router = express.Router();


// Create a user
userRoute.post('/users', async (req: Request, res: Response) => {
    // Request body should contain user details
    const { firstName, lastName, email, password } = req.body; 
    const alreadyExist = await User.findOne({where:{
        email
    }})

    if(alreadyExist){
        return res.status(400).json({message: "User with email already exist!"})
    }
    else {
        const savedUser = await User.create(req.body);
        const token = await generateToken(email);
        res.cookie('mytoken', token, { httpOnly: true, maxAge: 349839086400000 });
        res.send(`${firstName} ${lastName} is inserted, Thanks for registeration`)
    }

  });
  
  // Get all users
  userRoute.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get a user by ID
  userRoute.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update a user
  userRoute.put('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, token } = req.body;
    try {
      const user = await User.findByPk(id);
  
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.token = token;
        await user.save();
  
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a user
  userRoute.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
  
      if (user) {
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
//LOGIN
userRoute.post('/login' ,  async (req:express.Request,res:express.Response) => {
  let {email, password} = req.body;
  
  const user = await User.findOne({where:{
      email
  }}).catch((error)=>{
      console.log(error)
  })

  if(!user){
     return res.status(400).json({message: "Email or password doesnt Match!"})
  }
  const isPasswordMatch = checkPassword(user, password);

if (!isPasswordMatch) {
  return res.status(400).json({ message: "Email or password doesn't match!" })
}
  const token = await generateToken(email);
  res.cookie('mytoken', token, { httpOnly: true, maxAge: 10000006400000 }); // set the cookie with the token value
  user.token = token;
  await user.save();
  res.status(200).json({ message: "Welcome back!"});

})

//VerifyToken
userRoute.post('/verifyToken',  async (req: express.Request, res: express.Response) => {
  const token = req.query.token; 
  const userId = req.query.userId; 
  console.log(token , userId)
  // console.log(req.query)
  if (!token || !userId) {
    return res.status(400).json({ message: 'Token or userId not provided' });
  }

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the token and userId in the database matches the provided token and userId
    if (user.token === token && userId === userId) {
      return res.json({ valid: true, userId });
    } else {
      return res.json({ valid: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }})

export default userRoute;