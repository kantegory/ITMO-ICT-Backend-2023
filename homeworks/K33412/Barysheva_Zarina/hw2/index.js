const express = require('express')
const bodyParser    = require('body-parser');

const app = express()
const port = 8515
const {get_all_users, get_user_by_id, create_user, delete_user_by_id, update_user} = require('./func')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.send('Barysheva, hw2')
})

app.post('/create', async (req, res) => {
    const body = req.body
    console.log(body);
    const r = await create_user(body)
    res.send(r)
})

app.get('/users', async(req, res) =>{
    const users = await get_all_users()
    res.json(users)
})

app.get('/users/:userId', async (req, res) =>{
    const id = req.params.userId
    res.json(await get_user_by_id(id))
})

app.delete('/users/:userId', async (req, res) => {
    const id = req.params.userId
    const r = await delete_user_by_id(id)
    res.send(r)
})

app.put('/users/:userId', async (req, res) => {
    const id = req.params.userId
    const user_data = req.body
    const r = await update_user(id, user_data)
    res.send(r)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})