const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Homework 2')
})

app.get('/users', async (req, res) => {
    const users = await db.User.findAll()
    res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)

  console.log('user is', user)

  if (user) {
    return res.send(user.toJSON())
  }

  return res.send({"msg": "user is not found"})
})

app.post('/users', async (req, res) => {
    try {
        console.log(req.body)
        const user = await db.User.create(req.body);
        res.send(user.toJSON());
    } catch (e) {
        res.status(400).send({"detail": "Failed to create user"});
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        console.log(req.body)
        const user = await db.User.update(req.body, {where: {id: req.params.id}});
        res.send({'status_code': 'User updated'});
    } catch (err) {
        res.send(err);
    }
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.destroy({where: {id: req.params.id}})
    if (user) {
        res.send({'status_code': 'User deleted'})
    } else {
        res.status(404).send({'error_code': 'User not found'})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
