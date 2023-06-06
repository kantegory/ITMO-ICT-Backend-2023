import EventService from '../controllers/event';
const { SubscribeMessage } = require('../utils');

module.exports = (app:any, channel:any) => {
    
    const service = new EventService();
    SubscribeMessage(channel, service);

    app.post('/event/create', async(req:any,res:any,next:any) => {
        
        try {
            const { title, desc, type, date } = req.body; 
            // validation
            const { data } =  await service.CreateProduct({ title, desc, type, date });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });

    app.get('/', async (req:any,res:any,next:any) => {
        //check validation
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
        
    });
    
}