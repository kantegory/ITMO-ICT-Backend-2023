const express = require('express')
const db = require('./models')

const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('Hello World, it is a 2nd homework!')
})

app.get('/users', async (req, res) => {
    const users = await db.user.findAll()

    console.log(users)

    if (users) {
        return res.status(200).send(users.toJSON())
    }

    return res.send({"msg": "no users"})
})

app.post('/users/', async (req, res) => {
    const user = await db.user.create(req.body)

    console.log('New user', user)

    if (user) {
        return res.status(201).send(user.toJSON())
    }

    return res.send({"msg": "failed"})
})

app.delete('/users/:id', async (req, res) => {
    const deleted = await db.user.destroy({ where: { id: req.params.id } })

    console.log('user is deleted')

    if (deleted) {
        return res.status(200).send({"msg": "user is deleted"})
    }

    return res.status(404).send({"msg": "user is not found"})
})

app.put('/users/:id', async (req, res) => {
    const user = await db.user.update(req.body, { where: {id: req.params.id}})

    console.log('user is updated')

    if (user) {
        return res.status(200).send({"msg": "user is updated"})
    }

    return res.status(404).send({"msg": "user is not found"})
})

app.get('/users/:id', async (req, res) => {
    const user = await db.user.findByPk(req.params.id)

    console.log('user is', user)

    if (user) {
        return res.status(200).send(user.toJSON())
    }

    return res.status(404).send({"msg": "user is not found"})
})

app.get('/users/:email', async (req, res) => {
    const user = await db.user.findByPk(req.params.email)

    console.log('user is', user)

    if (user) {
        return res.status(200).send(user.toJSON())
    }

    return res.status(404).send({"msg": "user is not found"})
})



app.listen(port, () => {
    console.log(`HW2 listening on port ${port}`)
})