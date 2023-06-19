const { UserService } = require("../services");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError } = require('../utils/app-errors')


// All Business logic will be here
class UserController {

    constructor(){
        this.service = new UserService();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        try {
            
            const existingCustomer = await this.service.FindCustomer({ email});

            if(existingCustomer){
            
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                
                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token });
                } 
            }
    
            return FormateData(null);

        } catch (err) {
            throw new APIError('Data Not found', err)
        }

       
    }

    async SignUp(userInputs){
        
        const { name, email, password } = userInputs;
        
        try{
            // create salt
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            
            const existingCustomer = await this.service.create({ name, email, password: userPassword, salt});
            
            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});

            return FormateData({id: existingCustomer._id, token });

        }catch(err){
            throw new APIError('Data Not found', err)
        }

    }

    async GetProfile(id){

        try {
            const existingCustomer = await this.service.FindCustomerById({id});
            return FormateData(existingCustomer);
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async ManageAttendance(customerId, event){
        try {
            const orderResult = await this.service.AddEventToProfile(customerId, event);
            return FormateData(orderResult);
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async SubscribeEvents(payload){

        payload = JSON.parse(payload)
 
        const { event, data } =  payload;

        const { userId,  request } = data;

        switch(event){
            case 'ATTENDANCE':
                this.ManageAttendance(userId, request);
                break;
            case 'TEST':
                console.log('WORKING');
                break;
            default:
                break;
        }
    }

}
module.exports = UserController;