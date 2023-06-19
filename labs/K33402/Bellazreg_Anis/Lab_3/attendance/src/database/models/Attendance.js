const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    attendId: String,
    userId: String,
    status: String,
    txnId: String,
    eventId: String
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('attendance', AttendanceSchema);