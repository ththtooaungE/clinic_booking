const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    title: { type: String },
    specialty: { type: String },
    experienceYear: { type: Number },
    price: { type: Number }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;