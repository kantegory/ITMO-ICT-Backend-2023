const { AttendanceService } = require("../database/services");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');


// All Business logic will be here
class AttendanceController {
    constructor(){
        this.repository = new AttendanceService();
    }
 
    async Participation(userInput){

        const { _id, eventId } = userInput

        // Verify the txn number with payment logs

        try {
            const attendRes = await this.repository.NewParticipation(_id, eventId);
            return FormateData(attendRes);    
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
        
    }

    async GetParticipation(userId){
        try {
            const orders = await this.repository.Attendances(userId);
            return FormateData(orders)
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async GetAttendancePayload(userId,attendance,event){
        if(attendance){
             const payload = { 
                event: event,
                data: { userId, attendance }
            };
 
             return payload
        }else{
            return FormateData({error: 'No event participations'});
        }
 
    }
  
}

module.exports = AttendanceController;