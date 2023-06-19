const express = require('express')
const db = require('./models')

const app = express()
const port = 8080


app.use(express.json());

app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    console.log('User is', user)
    if (user) {
        return res.send(user.toJSON())
    }

    res.status(404)
    return res.send({"FATAL": "User not found exception"})
})

app.get('/users', async (req, res) => {
    const users = await db.User.findAll()
    return res.send(users)
})

app.post('/users', async (req, res) => {
    try {
        const user = await db.User.create(req.body)
        return res.send(user.toJSON())
    } catch (e) {
        res.status(400)
        return res.send({"FATAL": "Failed to create user"})
    }
})

app.put('/users/:id', async (req, res) => {
    var user = await db.User.findByPk(req.params.id)

    if (user) {
        try {
            user.update(req.body, {where: {id: req.params.id}})
            user = await db.User.findByPk(req.params.id)
            return res.send(user.toJSON())
        } catch (e) {
            res.status(400)
            return res.send({"FATAL": "Failed to update user"})
        }
    }

    res.status(404)
    return res.send({"FATAL": "User not found exception"})
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        try {
            user.destroy({where: {id: req.params.id}})
            return res.send({"msg": "User successfully disintegrated"})
        } catch (e) {
            res.status(400)
            return res.send({"FATAL": "Failed to disintegrate user"})
        }
    }

    res.status(404)
    return res.send({"FATAL": "User not found exception"})
})

app.get('/', async (req, res) => {
    res.send('https://youtu.be/dQw4w9WgXcQ')
})

app.listen(port, () => {
    console.log(`Demo app is listening on port ${port}. Ara-ara~`)
})

