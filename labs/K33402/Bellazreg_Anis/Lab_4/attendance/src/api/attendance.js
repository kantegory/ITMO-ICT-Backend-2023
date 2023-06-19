const AttendanceController = require('../controllers/attendance');
const { SubscribeMessage, PublishMessage } = require('../utils');
const UserAuth = require('./middlewares/auth');

module.exports = (app, channel) => {
    
    const service = new AttendanceController();
    SubscribeMessage(channel, service)

    app.post('/attendance/create',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { eventId } = req.body;


        try {
            const { data } = await service.Participation({_id, eventId});
            const payload = await service.GetAttendancePayload(_id, data, 'ATTENDANCE');

            PublishMessage(channel, 'PARTICIPATION_BINDING_KEY', JSON.stringify(payload))

            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }

    });

    app.get('/attendance/list',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.GetParticipation(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }

    });
       

}