const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to app!')
})

app.get('/users', async (req, res) => {
    const users = await db.User.findAll()
    res.send(users)
  })

app.post('/users', async (req, res) => {
    const user = await db.User.create(req.body)
    res.send(user.toJSON())
  })

app.get('/users/:id', async(req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        res.send(user.toJSON())
    } else {
        res.send({"error": "user is not found"})
    }
})

app.put('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        await user.update(req.body)
        res.send({'msg': 'user information has been updated'})
    } else {
        res.send({"error": "user is not found"})
    }
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        await user.destroy()
        res.sendStatus(200)
    } else {
        res.send({"error": "user is not found"})
    }
})

app.get('/users/email/:email', async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.params.email }})

    if (user) {
      res.send(user.toJSON())
    } else {
      res.send({"error": "user is not found"})
    }
  })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})