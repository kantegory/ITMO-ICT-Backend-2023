const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');
const router = express.Router();

router.get('/profile', authenticate, userController.getProfile);

module.exports = router;