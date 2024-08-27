const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null},
    slot: { type: Number, default: 1},
    start: { type: Date, default: null},
    end: { type: Date, default: null},
    createdAt: { type: Date, default: mongoose.now}
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;