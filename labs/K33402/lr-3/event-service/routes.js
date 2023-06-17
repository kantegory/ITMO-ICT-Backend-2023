const { Router } = require('express');
const eventController = require("./controllers/eventController");
const auth = require('./middleware/auth');

const router = Router();

router.post('/events/create', auth, eventController.createEvent);
router.get('/events/search', auth, eventController.findEventsByName);
router.get('/events/filter', auth, eventController.filterEvents);
router.get('/events/:id', auth, eventController.getEventById);

router.get('/api/events/types', auth, eventController.getEventTypes);
router.post('/api/events/types/create', auth, eventController.createEventType);
router.get('/api/events/types/:id', auth, eventController.getEventType);
router.put('/api/events/types/:id', auth, eventController.updateEventType);
router.delete('/api/events/types/:id', auth, eventController.deleteEventType);

module.exports = router;
