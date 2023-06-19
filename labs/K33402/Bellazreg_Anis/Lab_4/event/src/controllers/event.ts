import EventService  from "../services/event";
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class EventController {
    private repository: EventService
    constructor(){
        this.repository = new EventService();
    }

    async CreateProduct(input:any){
        try{
            const productResult = await this.repository.CreateProduct(input)
            return FormateData(productResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    
    async GetProducts(){
        try{
            const events = await this.repository.Products();
            
            return FormateData({
                events,
            });

        }catch(err){
            throw new APIError('Data Not found')
        }
    }


    async GetProductById(productId:any){
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetEventPayload(userId:any, eventId:any, appevent:any){
        const event = await this.repository.FindById(eventId);

        if(event) {
            const payload = {
                appevent: appevent,
                data: {userId, event}
            }
            return FormateData(payload)
        }else{
            return FormateData({error: "No event available"})
        }
    }
}

export default EventController;