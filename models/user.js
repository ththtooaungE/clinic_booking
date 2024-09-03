const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, default: null},
    username: { type: String, }, // unique: true
    email: { type: String, }, // unique: true
    role: { type: String, enum: ['admin', 'user', 'doctor'], default: 'user'},
    password: { type: String},
    phone: { type: String, }, // unique: true
    city: { type: String, default: null },
    country: { type: String, default: null },

    birthday: { type: Date, default: null },
    // status: { type: String, default: "isActive"},
    cancellationCount: { type: Number, default: 0 },
    suspensationUntil: { type: Date, default: null }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;