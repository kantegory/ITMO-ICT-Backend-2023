const express = require("express");
const db = require("./models");

const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer(); // for parsing multipart/form-data
const Joi = require("joi");

const app = express();
const port = 8080;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/users", async (req, res) => {
    const users = await db.User.findAll({});
    return res.json({users});
})

app.get("/users/:id", async (req, res) => {
  const user = await db.User.findByPk(req.params.id);
  if (user) {
    return res.send(user.toJSON());
  }
  return res.send({ msg: "user is not found" });
});

const userCreateSchema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});

app.post("/users", upload.array(), async (req, res, next) => {
  const { body } = req;
  const { value, error } = userCreateSchema.validate(body);
  if (error) {
    res.status(422).json({
      message: "Invalid request",
      data: body,
      error: error.details,
    });
  } else {
    await db.User.create(value);
    res.json({ message: "Resource created", data: value });
  }
});

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({
            message: `User with id ${req.params.id} not found`
        })
        return;
    }
    await user.destroy();
    res.json({ message: "deleted ok", data: user });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
