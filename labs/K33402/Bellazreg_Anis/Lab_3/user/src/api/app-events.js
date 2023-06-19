const UserController = require('../controllers/user');

module.exports = (app) => {

    const controller = new UserController();

    app.use('/app-events', async (req,res,next) => {

        const { payload } = req.body;

        controller.SubscribeEvents(payload);

        console.log("User service received an event");
        return res.status(200).json(payload);
    });
}