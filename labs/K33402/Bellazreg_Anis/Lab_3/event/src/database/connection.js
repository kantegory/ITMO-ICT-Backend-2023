const mongoose = require('mongoose');

module.exports = async() => {

    try {
        await mongoose.connect('mongodb://localhost:27017/event');
        console.log('connecting to db');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
 
};

 