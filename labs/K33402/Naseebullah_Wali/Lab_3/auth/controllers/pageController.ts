import express from 'express'
import User from '../model/user'
require("dotenv").config();
import generateToken from '../utils/tokenCreater';
import checkPassword from '../utils/checkPassword';


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
        res.set('userId', (savedUser as any).id.toString());
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
    req.headers.userId = user.id;
    res.status(200).json({ message: "Welcome back!"});

}   

}