const express = require('express')
const db = require('./models')

const app = express()
const port = 666

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello world by HW2')
})

app.get('/users', async (req, res) => {
  const users = await db.User.findAll()
  return res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  if (user) {
    return res.send(user.toJSON())
  } else {
    return res.status(404).send({'msg': 'user does not exist'})
  }
})

app.post('/users', async (req, res) => {
    const user = await db.User.create(req.body)
    return res.send(user.toJSON())
  })

app.put('/users/:id', async (req, res) => {
  console.log(req.body, req.params)
  const num = await db.User.update(req.body, { where: { id: req.params.id } })
  if (num) {
    return res.send({'msg': 'user has been updated'})
  } else {
    return res.status(404).send({'msg': 'user not found'})
  }
})

app.delete('/users/:id', async (req, res) => {
  const user = await db.User.destroy({ where: { id: req.params.id } })
  if (user) {
    return res.send({'msg': 'user deleted'})
  } else {
    return res.status(404).send({'msg': 'user not found'})
  }
})

app.listen(port, () => {
  console.log(`Homework app on http://localhost:${port}`)
})