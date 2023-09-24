const express = require('express')
const db = require('./models')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.route("/users/")
    .get(async (req, res) => {
        let users
        if (req.query && req.query.email) {
            users = await db.User.findAll({where: {email: req.query.email}})
        } else {
            users = await db.User.findAll()
        }
        return res.send(users)
    })
    .post(async (req, res) => {
        try {
            const user = await db.User.create(req.body);
            return res.send({"status": 201, "statusText": "Successfully created " + user.username})
        } catch (e) {
            return res.send({"msg": e})
        }
    })

app.route("/users/:id")
    .get(async (req, res) => {
        const user = await db.User.findByPk(req.params.id)
        if (user) {
            return res.send(user.toJSON())
        }
        return res.send({"status": 404, "statusText": `User with id=${req.params.id} does not exist`})
    })
    .delete(async (req, res) => {
        const user = await db.User.destroy({where: {id: req.params.id}})
        if (user) {
            return res.send({"status": 200, "statusText": `User with id=${req.params.id} deleted`})
        }
        return res.send({"status": 204, "statusText": `User with id=${req.params.id} does not exist`})
    })
    .put(async (req, res) => {
        const user = await db.User.findByPk(req.params.id);
        if (user) {
            try {
                user.update(req.body, {where: {id: req.params.id}});
                return res.send({"msg": "Successfully updated!"})
            } catch (e) {
                return res.send({"msg": e})
            }
        }
        return res.send({"msg": "User is not found"})
    })

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})