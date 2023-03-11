const express = require("express");

//for important our instance file we do as below
const sequelize = require('./database');//importing the file 
const User = require('./User');
//for running our database we do as below
sequelize.sync({force: true}).then(()=> console.log("db is ready"))
//force: true. is used here to delete old data from table and create table again every time

const app = express()

app.use(express.json()); // this to make express aware what data is coming. unless it will put null in every entity
app.post('/users', async (req,res)=>{
    await User.create(req.body)
        res.send("User is inserted")
    
});
//for getting all users in table
app.get('/users', async (req, res)=>{
    const myuser = await User.findAll()
        res.send(myuser);
    })
//for getting specific user in table
app.get('/users/:id',async (req,res)=>{
    const requestedId = req.params.id;
    const requestedUser = await User.findOne({where: {id: requestedId} })
    res.send(requestedUser)
})

//for updating data
app.put('/users/:id',async (req,res)=>{
    const requestedId = req.params.id;
    const requestedUser = await User.findOne({where: {id: requestedId} })
    requestedUser.username = req.body.username;
    await requestedUser.save()
    res.send("Updated")
})

//for deleting user
app.delete('/users/:id',async (req,res)=>{
    const requestedId = req.params.id;
    const requestedUser = await User.destroy({where: {id: requestedId} })
    res.send("deleted")
})

app.listen(4000, ()=>{
    console.log("testing app")
})