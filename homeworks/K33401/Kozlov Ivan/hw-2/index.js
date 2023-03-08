const express = require('express')
const db = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3333

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    console.log('user is', user)

    if (user) {
        return res.send(user.toJSON())
    }

    return res.send({"msg": "user is not found"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/api/users/', async (req, res) => {
    try {
        const user = await db.User.create(req.body);
        await user.reload();
        res.send(user.toJSON());
    } catch (e) {
        return res.send({"msg": "failed to create"})
    }
})

app.put('/api/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        try {
            user.update(req.body, {where: {id: req.params.id}});
            user.reload();
            res.send(user.toJSON());
        } catch (e) {
            return res.send({"msg": "failed to update"})
        }
    } else {
        return res.send({"msg": "user is not found"})
    }

})

app.delete('/api/users/:id', async (req, res) => {
    const user = await db.User.destroy({where: {id: req.params.id}})
    if (user) {
        res.send({"detail": "User deleted"});
    }
    return res.send({"msg": "user is not found"})
})