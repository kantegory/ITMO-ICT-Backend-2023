const express = require('express');
const router = express.Router();
const db = require('../models')

// CREATE user
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const user = await db.User.create(req.body);
    res.status(200).send(user.toJSON());
  } catch (err) {
    res.status(400).send({"msg": err});
  }
});

// GET users listing
router.get('/', async (req, res) => {
  const users = await db.User.findAll()
  res.status(200).send(users)
});

// GET user by id
router.get('/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  if (user) {
    return res.status(200).send(user.toJSON())
  }

  return res.status(404).send({"msg": "user not found"})
})

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const user = await db.User.update(req.body, { where: { id: req.params.id } });
    res.status(200).send({ "msg": "User has been successfully updated" });
  } catch (err) {
    res.status(400).send({ "msg": err });
  }
})

// DELETE user
router.delete('/:id', async (req, res) => {
  const user = await db.User.destroy({ where: { id: req.params.id } })
  if (user) {
    res.status(204).send()
  } else {
    res.status(404).send({'msg': 'User not found'})
  }
})

module.exports = router;
