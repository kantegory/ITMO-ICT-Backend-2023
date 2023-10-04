const { UserModel } = require('../database/models');
const { APIError, STATUS_CODES } = require('../utils/app-errors')

//Dealing with data base operations
class UserService {

    async create(user){
        try {
            const userData = await UserModel.create(user)
            return userData
        } catch (e) {
            const errors = e.errors.map((error) => error.message)
            throw new UserError(errors)
        }
    }

    async FindCustomer({ email }){
        try{
            const existingCustomer = await UserModel.findOne({ email: email });
            return existingCustomer;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
        }
    }

    async FindCustomerById({ id }){

        try {
            const existingCustomer = await UserModel.findById(id)
            .populate('events');
            return existingCustomer;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
        }
    }

    async AddEventToProfile(userId, event){
 
        try{

            const profile = await UserModel.findById(userId);

            if(profile){ 
                
                if(profile.events == undefined){
                    profile.events = []
                }
                profile.events.push(event);

                const profileResult = await profile.save();

                return profileResult;
            }
            
            throw new Error('Unable to participate in this event!');

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
        
    }

}

module.exports = UserService;