const express = require('express');
const bodyParser = require('body-parser')
const db = require('./models');

const app = express();
const port = 5000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse application/json
app.use(bodyParser.json())


app.get('/api/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id);

    if (user) {
        res.send(user.toJSON());
    }

    res.status(404).send({"detail": "User not found"});
})

app.get('/api/users', async (req, res) => {
    const users = await db.User.findAll();
    res.send(users);
})

app.post('/api/users', async (req, res) => {
    try {
        const user = await db.User.create(req.body);
        await user.reload();
        res.send(user.toJSON());
    } catch (e) {
        console.log(e);
        res.status(400).send({"detail": "Failed to create user"});
    }
})

app.put('/api/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        try {
            user.update(req.body, {where: {id: req.params.id}});
            user.reload();
            res.send(user.toJSON());
        } catch (e) {
            console.log(e);
            res.status(400).send({"detail": "Failed to update user"});
        }
    } else {
        res.status(404).send({"detail": "User not found"});
    }

})

app.delete('/api/users/:id', async (req, res) => {
    const user = await db.User.destroy({where: {id: req.params.id}})
    if (user) {
        res.send({"detail": "User deleted"});
    }
    res.status(404).send({"detail": "User not found"});
})

app.listen(port, () => {
    console.log(`Started app on port ${port}`);
})
