const express = require('express')
const db = require('./models')

const app = express()
const port = 3003


app.use(express.json());

app.get('/', async (req, res) => {
    res.send('useless route')
})

app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    console.log('user is', user)

    if (user) {
        return res.send(user.toJSON())
    }

    return res.send({"msg": "user is not found"})
})

app.get('/users', async (req, res) => {
    const users = await db.User.findAll()

    if (users) {
        return res.send(users)
    }

    return res.send({"msg": "no users in db"})
})

app.post('/users', async (req, res) => {
    try {
        const user = await db.User.create(req.body)
        return res.send({"msg": `successfully created user: ${user.toJSON().username}`})
    } catch (e) {
        return res.send({"msg": "failed to create user"})
    }
})

app.put('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        try {
            user.update(req.body, {where: {id: req.params.id}})
            return res.send({"msg": "user successfully updated"})
        } catch (e) {
            return res.send({"msg": "failed to update user"})
        }
    }

    return res.send({"msg": "user not found"})
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        try {
            user.destroy({where: {id: req.params.id}})
            return res.send({"msg": "user successfully deleted"})
        } catch (e) {
            return res.send({"msg": "failed to delete user"})
        }
    }

    return res.send({"msg": "user not found"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

