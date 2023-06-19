const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.get('/users', async (req, res) => {
    const users = await db.User.findAll()
    return res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  if (user) {
    return res.send(user.toJSON())
  }
  return res.send({"msg": "user is not found"})
})

app.post('/users/create', async (req, res) => {
    try {
        const user = await db.User.create(req.body);
        return res.send(user.toJSON());
    } catch (e) {
        return res.send({"msg": "failed to create user"});
    }
})

app.put('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        try {
            user.update(req.body, {where: {id: req.params.id}});
            return res.send({"msg": "successfully updated!"})
        } catch (e) {
            return res.send({"msg": e})
        }
    }
    return res.send({"msg": "User is not found"})
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.destroy({where: {id: req.params.id}})
    if (user) {
        return res.send({"msg": "user deleted"})
    }
    return res.status(404).send({"msg": "user not found"})
    
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})