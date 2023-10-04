import { STATUS_CODES } from "http";
import EventModel  from "../database/models/Event";
const { APIError } = require('../utils/app-errors')

//Dealing with data base operations
class EventService {


    async CreateProduct({ title, desc, type, date }:{ title:any, desc:any, type:any, date:any }){

        try {
            const product = await EventModel.create({
                title, desc, type, date
            })
    
            const productResult = await product.save();
            return productResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product')
        }
        
    }


     async Products(){
         try{
             return await EventModel.find();
         }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Products')
         }
    }
   
    async FindById(id:any){
        try{
            return await EventModel.findById(id);
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product')
        }

    }
}

export default EventService