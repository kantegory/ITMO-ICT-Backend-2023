const express = require('express')
const app = express()
const port = 3000
const db = require('./models')

app.use(express.json());

app.get('/', (req, res) => {
	return res.send('Hello World!')
})

app.get('/users', async (req, res) => {
	const users = await db.User.findAll()
	return res.send(users)
})

app.get('/user/:id', async (req, res) => {
	const user = await db.User.findByPk(req.params.id)
	return res.send(user)
})

app.post('/user', async (req, res) => {
	const user = await db.User.create(req.body)
	return res.send(user.toJSON())
})

app.put('/user/:id', async (req, res) => {
	const user = await db.User.update(req.body, {where: {id: req.params.id}})
	const iduser = req.params.id
	return res.send(`Изменена информация о пользователе с id: ${iduser}`)
})

app.delete('/user/:id', async (req, res) => {
	const user = await db.User.destroy({where: {id: req.params.id}})
	const iduser = req.params.id
	return res.send(`Удалён пользователь с id: ${iduser}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})