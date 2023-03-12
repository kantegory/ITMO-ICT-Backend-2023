const express = require('express')
const db = require('./models')

const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.post('/users', async (req, res) => {
  const user = await db.User.create(req.body)
  res.send(user)
})

app.get('/', async (req, res) => {
  const users = await db.User.findAll()
  res.send(users)
})

app.get('/users/email', async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.query.email } })
  if (user) {
    res.send(user)
  } else {
    res.send({"status": "error"})
  }
})

app.get('/users/id', async (req, res) => {
  const user = await db.User.findByPk(req.query.id)
  if (user) {
    res.send(user)
  } else {
    res.send({"status": "error"})
  }
})

app.delete('/users/:id', async (req, res) => {
  const user = await db.User.destroy({ where: { id: req.params.id } })
  if (user) {
    res.send({"status": "user deleted"})
  } else {
    res.send({"status": "error"})
  }
})

app.put('/users/:id', async (req, res) => {
  const num = await db.User.update(req.body, { where: { id: req.params.id } })
  if (num == 1) {
    res.send({"status": "user updated"})
  } else {
    res.send({"status": "error"})
  }
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})