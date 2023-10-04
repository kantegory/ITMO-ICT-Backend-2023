import express from 'express'
import User from '../models/user';
import generateToken from '../utils/TokenCreater';
import checkPassword from '../utils/checkPassword';


export class Controller{

    //Get home
    public static Home = (req:express.Request,res:express.Response)=>{
        res.send(
            `<h1> Welcome to the Application </h1>
            
            <pre> 
             http://localhost:5000  for Home page(current Page) 
             http://localhost:5000/Register  for Registeration 
             http://localhost:5000/login  for login 
             http://localhost:5000/update/(numOfId)  for Update by Id 
             http://localhost:5000/users/(numOfId)  for delete by Id 
             http://localhost:5000/FindUserById/(numOfId)  for FindUser by Id 
             http://localhost:5000/users  for showing all users <pre>
            `
        )
    }


    //POST registeration 
    public static Register =async (req:express.Request,res:express.Response) => {
        const {firstName,password,email}= req.body;
        const exist = await User.findOne({
            where:{
                email
            }
        }).catch((e)=> console.log(e));
        if(exist){
            return res.status(400).json({message:"User email already in database"})
        }else if(!exist){
            const newuser = await User.create(req.body).catch((e)=> console.log(e));
            const token = await generateToken(email);
            res.cookie('usertoken',token);
            res.send(`${firstName}  is inserted, Thanks for registeration`)

        }   
    }

        //Get: request for showing all users
        public static AllUsers = async (req:express.Request,res:express.Response)=>{
            const allUsers:object = await User.findAll()
            res.send(allUsers);
            
        }


        //Get: find by ID
        public static FindById = async (req:express.Request,res:express.Response)=>{
            const ByIdUser:object | null = await User.findOne({where: {id: req.params.id}})
            res.send(ByIdUser);

        }

        //PUT: update userdata
        public static UpdateUser = async (req:express.Request,res:express.Response)=>{
            const requestedUser:any = await User.findOne({where: {id: req.params.id} })
            requestedUser.name = req.body.name;
            requestedUser.password = req.body.password;
            requestedUser.email= req.body.email
            await requestedUser.save()
            res.send(requestedUser)
            
        }


        //DELETE REQ: Delete User
        public static DeleteUser= async (req:express.Request,res:express.Response)=>{
            const requestedId:string = req.params.id;
            const requestedUser = await User.destroy({where: {id: requestedId} })
            res.send("Deleted!")
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
            res.json({ message: "Welcome back!"});

        }




}