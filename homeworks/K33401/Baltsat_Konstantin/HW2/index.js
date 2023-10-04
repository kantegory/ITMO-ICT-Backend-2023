const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({ "msg": "Hello! I'm server." })
})

app.get('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  console.log('user is', user)
  if (user) {
    return res.send(user.toJSON())
  }
  return res.send({ "msg": "user is not found" })
})

app.get('/users', async (req, res) => {
  let users = []
  if (req.query && req.query.email) {
    users = await db.User.findAll({ where: { email: req.query.email } })
  } else {
    users = await db.User.findAll()
  }
  console.log(users)
  return res.send(users)
})

app.post('/users/create', async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    console.log(req.body);
    return res.send({ "msg": "Succesfully created " + user.name + " " + user.surname })
  } catch (e) {
    return res.send({ "msg": e })
  }
})

app.delete('/users/:id', async (req, res) => {
  const user = await db.User.destroy({ where: { id: req.params.id } })
  if (user) {
    return res.send({ "msg": "User deleted" })
  }
  return res.send({ "msg": "User is not found" })
})

app.put('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  if (user) {
    try {
      user.update(req.body, { where: { id: req.params.id } });
      return res.send({ "msg": "Successfully updated!" })
    } catch (e) {
      return res.send({ "msg": e })
    }
  }
  return res.send({ "msg": "User is not found" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})