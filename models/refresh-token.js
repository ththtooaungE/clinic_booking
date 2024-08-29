const { text } = require('body-parser');
const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    email: {type: String},
    token: {type: String}
});
const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
module.exports = RefreshToken;