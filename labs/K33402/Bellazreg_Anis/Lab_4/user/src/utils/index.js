const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const amqplib = require('amqplib');


//Utility functions
module.exports.GenerateSalt = async() => {
        return await bcrypt.genSalt()    
},

module.exports.GeneratePassword = async (password, salt) => {
        return await bcrypt.hash(password, salt);
};


module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
        return await this.GeneratePassword(enteredPassword, salt) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
        return await jwt.sign(payload, 'apple', { expiresIn: '1d'} )
}, 

module.exports.ValidateSignature  = async(req) => {

        const signature = req.get('Authorization');

        console.log(signature);
        
        if(signature){
            const payload = await jwt.verify(signature.split(' ')[1], 'apple');
            req.user = payload;
            return true;
        }

        return false
};

module.exports.FormateData = (data) => {
        if(data){
            return { data }
        }else{
            throw new Error('Data Not found!')
        }
    }


module.exports.CreateChannel = async() => {

        try {
                const connection = await amqplib.connect('amqps://kkfittrn:K2NUTcEOi31ghMQnM8aSIHekScoIUFXM@whale.rmq.cloudamqp.com/kkfittrn')
                const channel = await connection.createChannel()
                await channel.assertExchange('MEETUP', 'direct', false);
                return channel
        } catch (e) {
                throw e
        }
}


module.exports.PublishMessage = async(channel, binding_key, message) => {

        try {
                await channel.publish('MEETUP', binding_key, Buffer.from(message))
        } catch (e) {
                throw e
        }
}

module.exports.SubscribeMessage = async(channel, service, binding_key) => {

        const appQueue = await channel.assertQueue('USER_QUEUE');

        channel.bindQueue(appQueue.queue, 'MEETUP', binding_key);

        // channel.consume(appQueue.queue, data => {
        //         console.log('received data');
        //         console.log(data.consent.toString())
        //         service.SubscribeEvents(data.consent.toString())
        //         channel.ack(data)
        // })
}