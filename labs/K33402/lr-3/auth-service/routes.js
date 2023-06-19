const { Router } = require('express');
const userController = require('./controllers/userController');

const router = Router();

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);

module.exports = router;