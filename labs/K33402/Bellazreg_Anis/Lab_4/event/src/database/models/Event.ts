const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: String,
    desc: String,
    type: String,
    date: Date

});

export default  mongoose.model('event', EventSchema);