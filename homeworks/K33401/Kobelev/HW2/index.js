const express = require('express')
const db = require('./models')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.post('/users/create', async (req, res) => {
    try {
        const user = await db.User.create(req.body);
        return res.send({"msg": "New user: " + user.username})
    } catch (error) {
        return res.send({"msg": error})
    }
});

app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        return res.send(user.toJSON())
    }
    return res.send({"msg": "User does not exist"})
})

app.get('/users', async (req, res) => {
    let users = await db.User.findAll()
    if (req.query.email) {
        users = users.find(user => {
            return user.email === req.query.email
        })
    }
    return res.send(users)
});

app.put('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        try {
            user.update(req.body);
            return res.send({"msg": "User updated: " + user.username})
        } catch (error) {
            return res.send({"msg": error})
        }
    }
    return res.send({"msg": "User does not exist"})
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.destroy({where: {id: req.params.id}})
    if (user) {
        return res.send({"msg": "User is deleted"})
    }
    return res.send({"msg": "User does not exist"})
})