const { Event, UserEvent } = require('../models');
const axios = require('axios');

class EventService {
    async getEventById(id) {
        await axios.get(`http://localhost:3002/events/${id}`);
    }

    async createEvent(eventData) {return await Event.create(eventData);}

    async isUserRegisteredForEvent(userId, eventId) {
        return await UserEvent.findOne({
            where: {
                userId: userId,
                eventId: eventId,
            },
        });
    }

    async userRegisterToEvent(userId, eventId) {await UserEvent.create({ userId, eventId });}

    async userUnregisterFromEvent(userId, eventId) {await UserEvent.destroy({ where: { userId, eventId } });}

    async getUserEvents(userId) {
        return await UserEvent.findAll({where: {userId}, include: Event});
    }
}

module.exports = new EventService();
