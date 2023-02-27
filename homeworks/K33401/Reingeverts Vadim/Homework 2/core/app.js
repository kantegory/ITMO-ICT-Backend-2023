const express = require("express");
const { models } = require("../models");

const app = express();

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
    res.send("Got a GET request /user");
});

app.post("/user", async (req, res) => {
    res.send("Got a POST request /user");
    const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
    console.log("Jane's auto-generated ID:", jane.id);
});

app.put("/user", async (req, res) => {
    res.send("Got a PUT request at /user");
});

app.delete("/user", async (req, res) => {
    res.send("Got a DELETE request at /user");
});

module.exports = app;
