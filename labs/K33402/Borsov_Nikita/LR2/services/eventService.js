const { Event, EventType, UserEvent } = require('../models');
const { Op } = require('sequelize');

class EventService {
    async getAllEventTypes() {return await EventType.findAll();}

    async getEventTypeById(id) {return await EventType.findByPk(id);}

    async createEventType(data) {return await EventType.create(data);}

    async updateEventType(id, data) {
        await EventType.update(data, {
            where: { id },
        });

        return await EventType.findByPk(id);
    }

    async deleteEventType(id) {
        return await EventType.destroy({
            where: {id},
        });
    }

    async createEvent(eventData) {return await Event.create(eventData);}

    async getEventById(id) {return await Event.findByPk(id);}

    async isUserRegisteredForEvent(userId, eventId) {
        const userEvent = await UserEvent.findOne({
            where: {
                userId: userId,
                eventId: eventId,
            },
        });

        return !!userEvent;
    }

    async userRegisterToEvent(userId, eventId) {await UserEvent.create({ userId, eventId });}

    async userUnregisterFromEvent(userId, eventId) {await UserEvent.destroy({ where: { userId, eventId } });}

    async getUserEvents(userId) {
        return await UserEvent.findAll({where: {userId}, include: Event});
    }

    async findEventsByName(name) {
        return await Event.findAll({
            where: {
                name: {
                    [Op.like]: '%' + name + '%'
                }
            },
            include: EventType
        });
    }

    async filterEventsByType(type) {
        return await Event.findAll({
            include: {
                model: EventType,
                where: {type}
            }
        });
    }

    async filterEventsByLocation(location) {
        return await Event.findAll({
            where: {location},
            include: EventType
        });
    }
}

module.exports = new EventService();
