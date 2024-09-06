const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    ownerConversation: { type: mongoose.Schema.Types.ObjectId, ref: 'coversation' },
    partnerConversation: { type: mongoose.Schema.Types.ObjectId, ref: 'coversation' },
    messageType: { type:String, default:"TEXT" },
    message: { type:String, default:null },
    createdAt: { type:Date, default:Date.now }
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;