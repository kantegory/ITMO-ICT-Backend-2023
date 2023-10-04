const express = require('express')
const db = require('./models')

const app = express()
const port = 4000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    console.log('user is', user)

    if (user) {
        return res.send(user.toJSON())
    }

    return res.send({"msg": "user is not found"})
})

app.get('/users/:email', async (req, res) => {
    const user = await db.User.find({where:{email:req.params.email}})
    console.log('user is', user)

    if (user) {
        return res.send(user.toJSON())
    }

    return res.send({"msg": "user is not found"})
})

app.post ('/users/', async (req, res) => {
    try {
        const user = await db.User.create(req.body)
        await user.reload()
        res.send(user.toJSON())
    }
    catch (error) {
        res.send({error:error.msg})
    }
})

app.delete ('/users/:id', async (req,res) => {
    try {
        const user = await db.User.destroy({where:{id:req.params.id}})
            if (user) {
                return res.send ({"msg": "user deleted"})
            }
            else {
                return res.send({"msg": "user is not found"})
            }
        }
    catch (error) {
        res.send({error:error.msg})
    }
})

app.put ('/users/:id',async (req,res) =>{
    try {
        const user = await db.User.update(req.body, {where:{id:req.params.id}})
        if (user) {
            return res.send({"msg":"User updated"})
        }
            else {
                return res.send({"msg": "user is not found"})
            }
        }
    catch (error) {
        res.send({error:error.msg})
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})