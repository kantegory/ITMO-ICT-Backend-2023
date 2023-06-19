const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Homework 2')
})

app.get('/users', async (req,res) => {
    const users = await db.User.findAll()
    res.send(users)
})

app.post('/users', async (req, res) => {
    try {
        const user = await db.User.create(req.body);
        res.send(user.toJSON());
    } catch (error) {
        res.status(400).send({"msg": "Failed to create user"});
    }
})

app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        return res.send(user.toJSON())
    }

    return res.send({"msg": "User is not found"})
})

app.get('/users/email/:email', async (req, res) => {
    const user = await db.User.findOne({where: {email: req.params.email}})
    if (user) {
        return res.send(user.toJSON())
    }

    return res.send({"msg": "User is not found by email"})
})

app.put('/users/:id', async (req, res) => {
    try {
        const user = await db.User.update(req.body, {where: {id: req.params.id}});
        res.send({"msg": "Successfully updated!"});
    } catch (error) {
        res.send(error);
    }
})

app.delete('/users/:id', async(req,res) => {
    const user = await db.User.destroy({ where: { id: req.params.id } })
    if (user) {
        res.send({"msg": "User deleted"})
    } else {
        res.status(404).send({"msg": "user not found"})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})