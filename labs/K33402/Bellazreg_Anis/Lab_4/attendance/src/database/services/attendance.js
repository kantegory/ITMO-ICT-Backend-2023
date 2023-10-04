const { AttendanceModel } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { APIError } = require('../../utils/app-errors')


//Dealing with data base operations
class AttendanceService {

    // payment

    async Attendances(userId) {
        try {
            const requests = await AttendanceModel.find({ userId });
            return requests;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'No participation available')
        }
    }


    async NewParticipation(userId, eventId) {

        //check transaction for payment Status

        try {
            const attendId = uuidv4();


            const request = new AttendanceModel({
                attendId,
                userId,
                eventId,
                status: 'received',
            })
            const attendRes = await request.save();
            return attendRes;
            } catch(e) {
                throw new Error(e)
            }
    }
}

module.exports = AttendanceService