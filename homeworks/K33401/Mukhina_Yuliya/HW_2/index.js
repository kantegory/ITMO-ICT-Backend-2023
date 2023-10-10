const express = require('express')
const db = require('./models')
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: '*'}))

const port = 8000


app.route("/users/").get(async (req, res) => {
    // Get all Users from db.
    // Supports query param `email`, for example /users/?email=example@example.com
    if (req.query && req.query.email) {
        const users = await db.User.findAll(
            {
                where: {email: req.query.email}
            }
        )
        return res.send(users)
    } else {
        const users = await db.User.findAll()
        return res.send(users)
    }
})

app.route("/users/").post(async (req, res) => {
    // Create new User
    try {
        const user = await db.User.create(req.body);
        return res.send("Success")
    } catch (e) {
        return res.send(e)
    }
})

app.route("/users/:id").get(async (req, res) => {
    // Get User by id
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        return res.send(user.toJSON())
    } else {
        return res.send("User does not exist")
    }
})

app.route("/users/:id").delete(async (req, res) => {
    // Delete User by id
    const user = await db.User.destroy({where: {id: req.params.id}})
    if (user) {
        return res.send("Success")
    } else {
        return res.send("User does not exist")
    }
})

app.route("/users/:id").put(async (req, res) => {
    // Update User by id
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        try {
            user.update(req.body, {where: {id: req.params.id}});
            return res.send("Success")
        } catch (e) {
            return res.send(e)
        }
    } else {
        return res.send("User does not exist")
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})