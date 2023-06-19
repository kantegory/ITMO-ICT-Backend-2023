const eventService = require('../services/eventService');

module.exports = {
    async createEvent(req, res) {
        const event = await eventService.createEvent(req.body);
        res.json(event);
    },

    async registerToEvent(req, res) {
        const userId = req.user.id;
        const eventId = req.params.id;

        const isRegistered = await eventService.isUserRegisteredForEvent(userId, eventId);
        if (isRegistered) {
            return res.status(400).send({ error: 'You are already registered for this event' });
        }

        const userEvent = await eventService.userRegisterToEvent(userId, eventId);

        return res.status(201).send({ message: 'Registered successfully', userEvent });
    },

    async unregisterFromEvent(req, res) {
        await eventService.userUnregisterFromEvent(req.user.id, req.params.id);
        res.json({ message: 'Unregistered successfully' });
    },

    async getUserEvents(req, res) {
        const events = await eventService.getUserEvents(req.user.id);

        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found for this user.' });
        }

        return res.json(events);
    },
};
