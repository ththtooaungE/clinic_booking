const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    fromUser: { type:mongoose.Schema.Types.ObjectId, ref: 'user' },
    toUser: { type:mongoose.Schema.Types.ObjectId, ref: 'user' },
    ownerUser: { type:mongoose.Schema.Types.ObjectId, ref: 'user' },
    messageType: { type:String, default:"TEXT" },
    message: { type:String, default:null },
    createdAt: { type:Date, default:Date.now }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;