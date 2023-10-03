const { Router } = require('express');
const userController = require('./controllers/userController');
const eventController = require("./controllers/eventController");
const auth = require('./middleware/auth');

const router = Router();

router.get('/users/me', auth, userController.getUser);
router.put('/users/me', auth, userController.updateUser);
router.get('/users/me/events', auth, eventController.getUserEvents);

router.post('/api/user/create', userController.createUser);
router.post('/api/event/create', eventController.createEvent);

router.post('/events/register/:id', auth, eventController.registerToEvent);
router.delete('/events/unregister/:id', auth, eventController.unregisterFromEvent);

module.exports = router;
