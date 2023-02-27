const express = require("express");
const { models } = require("../models");

const app = express();

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

app.get("/", async (req, res) => {
    res.write("Start\n");
    await models.User.create({
        username: "Test",
    });
    const users = await models.User.findAll();
    res.write(JSON.stringify(users, null, 2) + "\n\n");

    res.end();
});

app.get("/user", async (req, res) => {
    console.log("Got a GET request /user");

    const users = await models.User.findAll();
    res.status(200).send(JSON.stringify(users, null, 2));
});

app.post("/user", async (req, res) => {
    console.log("Got a POST request /user");

    try {
        await models.User.create(req.body);
    } catch (error) {
        return res.status(400).send({ message: error });
    }
    res.status(200).send({ message: `User '${req.body.username}' created successfully.` });
});

app.put("/user", async (req, res) => {
    console.log("Got a PUT request at /user");
});

app.delete("/user", async (req, res) => {
    console.log("Got a DELETE request at /user");
});

module.exports = app;
