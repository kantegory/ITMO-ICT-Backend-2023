const { Router } = require('express');
const userController = require('./controllers/userController');
const eventController = require("./controllers/eventController");
const auth = require('./middleware/auth');

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/users/me', auth, userController.getUser);
router.put('/users/me', auth, userController.updateUser);
router.get('/users/me/events', auth, eventController.getUserEvents);

router.post('/events/create', auth, eventController.createEvent);
router.get('/events/search', auth, eventController.findEventsByName);
router.get('/events/filter', auth, eventController.filterEvents);
router.get('/events/:id', auth, eventController.getEventById);
router.post('/events/register/:id', auth, eventController.registerToEvent);
router.delete('/events/unregister/:id', auth, eventController.unregisterFromEvent);

router.get('/api/events/types', auth, eventController.getEventTypes);
router.post('/api/events/types/create', auth, eventController.createEventType);
router.get('/api/events/types/:id', auth, eventController.getEventType);
router.put('/api/events/types/:id', auth, eventController.updateEventType);
router.delete('/api/events/types/:id', auth, eventController.deleteEventType);

module.exports = router;
