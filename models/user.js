const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, default: null},
    username: { type: String, }, // unique: true
    email: { type: String, }, // unique: true
    role: { type: String, enum: ['admin', 'user', 'doctor'], default: 'user'},
    password: { type: String},
    phone: { type: String, }, // unique: true
    age: { type: Number},
    city: { type: String, default: null},
    country: { type:String, default: null}
})

const User = mongoose.model('User', UserSchema);
module.exports = User;