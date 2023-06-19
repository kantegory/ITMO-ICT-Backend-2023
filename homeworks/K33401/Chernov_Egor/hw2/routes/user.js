let express = require('express');
let router = express.Router();

const { getAll, getUser, createUser } = require('../services/user')

// GET user list
router.get('/', async (req, res, next) => {
    res.send(await getAll());
});

// GET user by id
router.get('/:id', async (req, res) => {
    res.send(await getUser(req.params.id))
})

// POST create user
router.post('/reg', async (req, res) => {
    res.send(await createUser(req.query))
})


module.exports = router;