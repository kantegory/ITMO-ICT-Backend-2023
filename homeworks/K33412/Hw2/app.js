"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const {Users} = require("./sequelize/database/models/users.model")
const {controller} = require("./sequelize/CRUD");
const app = express();
const port = 3333;
const db = controller.create([Users])


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/users', async (req, res) => {
    const users = await Users.findAll();
    if (users) {
        return res.send(users);
    }
    return res.send({"msg" : "Users not found"});
})

app.get('/users/:id', async (req, res) => {
    const user = await Users.findByPk(req.params.id);
    if (user) {
        return res.send(user);
    }
    return res.send('User not found')
})

app.post('/users', async (req, res) => {
    const created = await Users.create(req.query);
    if (created) {
        res.send("User was created!")
    }
})

app.put('/users', async (req, res) => {
    try
    {
        console.log(req)
        const has_user = await Users.findByPk(req.query.id);
        if (has_user) {
            const updated_user = await Users.update(req.query, {
                where: {
                    id: req.query.id
                }
            })
            if (updated_user) {
                res.send('user updated')
            }
        }
        else {
            res.send('User not found')
        }
    }
    catch(error) {
        res.send({"error": error.message})
    }
})

app.delete('/users', async (req, res) => {
    try
    {
        const has_user = await Users.findByPk(req.query.id);
        if (has_user) {
            const deleted_user = await Users.destroy({
                where: {
                    id: req.query.id
                }
            })
            if (deleted_user) {
                res.send("User deleted!")
            }
        }
        else {
            res.send('User not found')
        }
    }
    catch(error) {
        res.send({"error": error.message})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
//# sourceMappingURL=app.js.map