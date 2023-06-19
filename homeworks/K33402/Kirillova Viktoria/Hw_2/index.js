const express = require("express");
const port = 4000;

const sequelize = require('./database');
const User = require('./User');
sequelize.sync({force: true}).then(()=> console.log("db is ready"))
//force: true. is used here to delete old data from table and create table again every time
const app = express()
app.use(express.json()); // this to make express aware what data is coming. unless it will put null in every entity
app.post('/users', async (req,res)=>{
    await User.create(req.body)
        res.send("User is inserted")
});
//Show All Users
app.get('/users', async (req, res)=>{
    const myuser = await User.findAll()
        res.send(myuser);
    })
//Find By Id
app.get('/users/:id',async (req,res)=>{
    const requestedId = req.params.id;
    const requestedUser = await User.findOne({where: {id: requestedId} })
    res.send(requestedUser)
})

//Update By Id
app.put('/users/:id',async (req,res)=>{
    const requestedId = req.params.id;
    const requestedUser = await User.findOne({where: {id: requestedId} })
    requestedUser.username = req.body.username;
    await requestedUser.save()
    res.send("Updated")
})

//Delete By Id
app.delete('/users/:id',async (req,res)=>{
    const requestedId = req.params.id;
    const requestedUser = await User.destroy({where: {id: requestedId} })
    res.send("deleted")
})

app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`)
})