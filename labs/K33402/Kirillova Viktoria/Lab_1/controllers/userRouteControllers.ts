import express from 'express'
import User from '../models/user'
require("dotenv").config();
import generateToken from '../utils/tokenCreater';
import checkPassword from '../utils/checkPassword';
export class userControllers{
    

//Register
public static register = async (req: express.Request, res: express.Response) => {
    const { firstName, lastName, email, password } = req.body;
    const alreadyExist = await User.findOne({ where: { email } }).catch((error) => {
      console.log("Error:", error);
    });
  
    if (alreadyExist) {
      return res.status(400).json({ message: "User already exists!" });
    } else {
      const user = await User.create(req.body).catch((error) => {
        console.log("Error creating user:", error);
      });
  
      if (user) {
        const token = await generateToken(email);
        user.token = token;
        await user.save(); 
        // Set the token in the response header
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json(`${firstName} ${lastName} Registered successfully, Welcome! `);
      } else {
        return res.status(500).json({ message: "Error occurred while creating the user." });
      }
    }
  };

//Login
public static login = async (req: express.Request, res: express.Response) => {
const { email, password } = req.body;

const user = await User.findOne({ where: { email } }).catch((error) => {
    console.log(error);
});

if (!user) {
    return res.status(400).json({ message: "Email or password doesn't match!" });
}
const isPasswordMatch = checkPassword(user, password);
if (!isPasswordMatch) {
    return res.status(400).json({ message: "Email or password doesn't match!" });
}
const token = await generateToken(email);
// Update the user's token and save it to the database
user.token = token;
await user.save();
// Set the token in the response header
res.setHeader('Authorization', `Bearer ${token}`);
res.status(200).json({ message: `Welcome back! ${user.firstName}` });
};




//Get: request for showing all users
public static showUsers = async (req:express.Request,res:express.Response)=>{
    const allUsers:object = await User.findAll()
    res.send(allUsers);
    
    
}

//Get: find by ID
public static findById = async (req:express.Request,res:express.Response)=>{
    const byIdUser:object | null = await User.findOne({where: {id: req.params.id}})
    if(byIdUser === null){
        res.status(400).json({message: `User with Id ${req.params.id} does not exist in db.`})
    }else{
        res.send(byIdUser);
    }
   

}

//PUT REQ: Update User
public static updateUser = async (req:express.Request,res:express.Response)=>{
    // const requestedId = req.params.id;
    const requestedUser:any = await User.findOne({where: {id: req.params.id} })
    requestedUser.firstName = req.body.firstName;
    requestedUser.lastName = req.body.lastName;
    requestedUser.password = req.body.password;
    requestedUser.email= req.body.email
    await requestedUser.save()
    res.send(requestedUser)
    
}


//DELETE REQ: Delete User
public static deleteUser= async (req:express.Request,res:express.Response)=>{
    const requestedId:string = req.params.id;
    const requestedUser = await User.destroy({where: {id: requestedId} })
    res.send("deleted")
}



}