const mongoose = require('mongoose');
const Schedule = require('./schedule');

const BookingSchema =  new mongoose.Schema({
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', default: null},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    name: { type: String, default: null},
    age: { type: Number, default: null},
    note: { type: String, default: null},
    token: { type: Number, default: null},
    status: { type: String, enum: ['upcoming', 'finished', 'cancelled', 'failed'], default: 'upcoming'}
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;