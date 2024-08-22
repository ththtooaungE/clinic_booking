const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null},
    day: { type: String, default: null, enum:  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']},
    start: { type: String, default: null},
    end: { type: String, default: null},
    createdAt: { type: Date, default: mongoose.now}
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;