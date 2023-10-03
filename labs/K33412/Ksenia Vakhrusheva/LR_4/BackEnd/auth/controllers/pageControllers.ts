import express from 'express'
import User from '../models/user'
require("dotenv").config();
import generateToken from '../utils/tokenCreater';
import checkPassword from '../utils/checkPassword';




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
    const isPasswordMatch = checkPassword(user, password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Email or password doesn't match!" })
  }
    const token = await generateToken(email);
    res.cookie('mytoken', token, { httpOnly: true, maxAge: 10000006400000 }); // set the cookie with the token value
     user.token = token;
     await user.save();
    res.status(200).json({ message: "Welcome back!"});
}

  
//for verifying token
public static verifyToken = async (req: express.Request, res: express.Response) => {
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
    }
  }; 
  


}








