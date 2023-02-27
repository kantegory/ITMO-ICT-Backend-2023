const express = require("express");
const { models } = require("../models");

const app = express();

/* MIDDLEWARE */
/* Requires header 'Content-Type: application/json' for body */
app.use(express.json());
/* Handle express.json errors */
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error(err);
        return res.status(400).send({ message: err.message });
    }
    next();
});

/* ROUTES */
app.get("/", async (req, res) => {
    res.status(200).send(`
        <h3>Available rotues:</h3>

        <p>GET /user</p>
        <p>POST /user</p>
        <p>PUT /user/:email</p>
        <p>DELETE /user/:email</p>
    `);
});

app.get("/user", async (req, res) => {
    console.log("Got a GET request /user");

    const users = await models.User.findAll();
    res.status(200).send(JSON.stringify(users, null, 2));
});

app.post("/user", async (req, res) => {
    console.log("Got a POST request /user");

    try {
        // const { password } = req.body;
        // const hashedPassword = models.User.hashPassword(password);
        // await models.User.create({ ...req.body, password: hashedPassword });
        await models.User.create(req.body);
    } catch (error) {
        return res.status(400).send({ message: error });
    }
    res.status(200).send({ message: `User '${req.body.email}' created successfully.` });
});

app.put("/user/:email", async (req, res) => {
    console.log("Got a PUT request at /user");

    const { email } = req.params;

    try {
        await models.User.update(req.body, {
            where: {
                email,
            },
        });
    } catch (error) {
        return res.status(400).send({ message: error });
    }

    res.status(200).send({ message: `User '${email}' updated successfully.` });
});

app.delete("/user/:email", async (req, res) => {
    console.log("Got a DELETE request at /user");

    const { email } = req.params;

    try {
        await models.User.destroy({
            where: {
                email,
            },
        });
    } catch (error) {
        return res.status(400).send({ message: error });
    }

    res.status(200).send({ message: `User '${email}' deleted successfully.` });
});

module.exports = app;
