module.exports = (app:any) => {

    app.use('/app-events', async (req:any,res:any,next:any) => {

        const { payload } = req.body;

        console.log("Event service received an event");
        return res.status(200).json(payload);
    });
}