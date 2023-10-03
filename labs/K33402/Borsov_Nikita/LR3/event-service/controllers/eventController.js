const eventService = require('../services/eventService');
const axios = require('axios');

module.exports = {
    async getEventTypes(req, res) {
        const eventTypes = await eventService.getAllEventTypes();
        return res.json(eventTypes);
    },

    async getEventType(req, res) {
        const eventType = await eventService.getEventTypeById(req.params.id);
        return res.json(eventType);
    },

    async createEventType(req, res) {
        const eventType = await eventService.createEventType(req.body);
        return res.json(eventType);
    },

    async updateEventType(req, res) {
        const eventType = await eventService.updateEventType(req.params.id, req.body);
        return res.json(eventType);
    },

    async deleteEventType(req, res) {
        const eventType = await eventService.deleteEventType(req.params.id);
        return res.json(eventType);
    },

    async createEvent(req, res) {
        try{
            const event = await eventService.createEvent(req.body);
            const eventData = event.dataValues;
            await axios.post('http://user-event-service:3003/api/event/create', eventData)
            res.json(event);
        } catch (e) {
            res.json({ message: e });
        }
    },

    async getEventById(req, res) {
        const event = await eventService.getEventById(req.params.id);
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

    async findEventsByName(req, res) {
        const events = await eventService.findEventsByName(req.query.name);
        return res.json(events);
    },

    async filterEvents(req, res) {
        const filter = req.query.filter;
        if(filter === 'type') {
            const events = await eventService.filterEventsByType(req.query.text);
            return res.json(events);
        }
        else if(filter === 'location') {
            const events = await eventService.filterEventsByLocation(req.query.text);
            return res.json(events);
        }
        return res.status(400).json({ message: 'Wrong filter type.' });
    },
};
