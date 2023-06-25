const express = require('express')

const router = express.Router();

const {getAll, getUser, createUser, updateUser, deleteUser} = require('../services/user')

router.get('/', (req, res) => {
    res.send(getAll());
})

router.get('/:id', (req, res) => {
    res.send(getUser(req.params.id))
})

router.post('/', (req, res) => {
    res.send(createUser(req.body))
})

router.put('/:id', (req, res) => {
    res.send(updateUser(id, req.query))
})

router.delete('/:id', (req, res) => {
    res.send(deleteUser(req.query))
})

module.exports = router