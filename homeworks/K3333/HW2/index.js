const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  const users = await db.User.findAll()

  console.log('user is', users)

  if (users) {
    return res.send(users)
  }
  
  return res.send({"msg": "user is not found"})
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
      const post = await db.User.create(req.body)
      return res.status(201).json({post})
  } catch (error) {
      return res.status(500).json({error: error.message})
  }
})

app.put('/users/:id', async (req, res) => {
  try {
      const check = await db.User.findByPk(req.params.id)

      if(check) {
          const updated = await db.User.update(req.body, {where: {id: req.params.id}})

          if(updated) {
            const user = await db.User.findByPk(req.params.id)
      
            res.send({'Updated user': user})
          }
      }
      else {
        res.send("User didn't find.")
      }

  } catch(error) {
      res.send({error: error.message})
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
      const check = await db.User.findByPk(req.params.id)

      if(check) {
          const deleted = await db.User.destroy({where: {id: req.params.id}})

          if(deleted) {
            res.send("User deleted!")
          }
      }
      else {
        res.send("User didn't find.")
      }


  } catch(error) {
      res.send({error: error.message})
  }
})

app.get('/users/email/:email', async (req, res) => {
  const user = await db.User.findAll({where:{email: req.params.email}})

  console.log('user is', user)

  if (user) {
    return res.send(user)
  }

  return res.send({"msg": "user is not found"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})