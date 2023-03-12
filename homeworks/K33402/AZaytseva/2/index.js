const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  const email = req.query.email;

  const options = {
    attributes: ['id', 'email', 'firstName', 'lastName', 'dob', 'createdAt', 'updatedAt']
  }

  if (email) {
    options.where = { email }
  }

  const users = await db.User.findAll(options);

  res.send(JSON.stringify(users, null, 2));
})

app.get('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  delete user.password;

  if (user) {
    return res.send(JSON.stringify(user, null, 2))
  }

  return res.status(404).send({ message: 'User is not found' })
})

app.post('/users', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'You did not provide email or password' })
  }

  if (req.body.firstName === '' || req.body.lastName === '') {
    return res.status(400).send({ message: 'First or last name cannot be empty' })
  }

  let dob = null;
  if (req.body.dob) {
    try {
      dob = new Date(req.body.dob)
    } catch (e) {
      return res.status(400).send({ message: 'Incorrect date of birth provided' })
    }
  }

  try {
    const user = await db.User.create({
      email: req.body.email,
      password: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    if (user) {
      return res.send(JSON.stringify(user, null, 2))
    } else {
      throw new Error();
    }
  } catch {
    return res.status(500).send({ message: 'Error creating user' })
  }
})

app.delete('/users', async (req, res) => {
  try {
    await db.User.destroy({
      truncate: true
    });
    return res.send(JSON.stringify(user, null, 2))
  } catch (e) {
    return res.status(500).send({ message: 'Error deleting users' })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    await db.User.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.send()
  } catch (e) {
    return res.status(500).send({ message: 'Error deleting user' })
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    await db.User.update({ ...req.body }, {
      where: {
        id: req.params.id
      }
    });

    return res.send()
  } catch (e) {
    return res.status(500).send({ message: 'Error updating user' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})