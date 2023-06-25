const express = require('express')
const db = require('./models')

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    const users = await db.User.findAll()

    res.send(users)
})

app.get('/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    res.send(user)
})

app.post('/', async (req, res) => {
    const user =  await db.User.create(req.body);

    res.send(user.toJSON())
})

app.put('/:id', async (req, res) => {
    const user = await db.User.update(
        req.body,
        {where: {id: req.params.id}}
    );
    res.send({'msg': 'updated'})
})

app.delete('/:id', async (req, res) => {
    const user = await db.User.destroy({where: {id: req.params.id}})

    res.send({'msg': 'deleted'})
})

app.listen(3000, () => {
    console.log('Everithing is working!')
})
