const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: { type: String, default: null},
    title: { type: String, default: null},
    speciality: { type: String, default: null},
    experienceYear: { type: Number, default: null},
    price: { type: Number, default: null}
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;