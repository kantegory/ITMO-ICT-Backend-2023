const mongoose = require('mongoose');

module.exports = async() => {

    try {
        await mongoose.connect('mongodb://nosql-db:27017/event', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('connecting to db');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
 
};

 