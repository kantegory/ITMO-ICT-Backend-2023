const express = require('express')
const db = require('./models')
const bodyParser = require("body-parser");

const app = express()
const port = 5000

app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello here!')
})

app.post('/add', async (req, res) => {
    const user = await db.User.create(req.body)
    res.send(user.toJSON())
})

app.get('/get', async (req, res) => {
    const users = await db.User.findAll()
    res.send(users)
})

app.get('/users/id/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        res.send(user.toJSON())
    } else {
        res.status(404).send({'msg': 'user not found'})
    }

})

app.get('/users/username/:username', async (req, res) => {
    const user = await db.User.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user) {
        res.send(user.toJSON())
    } else {
        res.status(404).send({'msg': 'user not found'})
    }

})

app.put('/update/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        await db.User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.send(user.toJSON())
    } else {
        res.status(404).send({'msg': 'user not found'})
    }
})

app.delete('/delete/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        user.destroy();
        res.sendStatus(200).send({'msg': 'user deleted'})
    }
    res.status(404).send({'msg': 'user not found'})
})
