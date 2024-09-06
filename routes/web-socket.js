const express = require('express');
const expressWs = require('express-ws');
// const Conversation = require('../models/conversation');
// const Chat = require('../models/chat');
const User = require('../models/user');
const Message = require('../models/message');
var socketRoute = express.Router();

const clients = [];

socketRoute.ws('/:id', function (ws, req) {
    clients.push({
        userId: req.params.id,
        socket: ws
    });

    ws.on('message', async function(msg) {
        try {
            const data = JSON.parse(msg);

            const partner = await User.findById(data.receiverId);            
            if(!partner) {
                return ws.send('Invalid User!');
            }

            const senderId = req.params.id;
            const receiverId = data.receiverId;

            // creating two messages for two users
            const message1 = new Message({
                fromUser: senderId,
                toUser: receiverId,
                ownerUser: senderId,
                message: data.message
            });
            await message1.save();

            const message2 = new Message({
                fromUser: senderId,
                toUser: receiverId,
                ownerUser: receiverId,
                message: data.message
            });
            await message2.save();
               
            // // checking conversations
            // const conversation = await Conversation.findOne({
            //     owner: senderId,
            //     partner: receiverId
            // });

            // // creating conversations
            // if(!conversation) {
            //     const ownerConversation = new Conversation({
            //         owner: senderId,
            //         partner: receiverId
            //     });
            //     await ownerConversation.save();

            //     const partnerConversation = new Conversation({
            //         owner: receiverId,
            //         partner: senderId
            //     });
            //     await partnerConversation.save();
            // }

            // const ownerChat = new Chat({
            // ownerConversation: ownerConversation._id,
            //     partnerConversation: partnerConversation._id,
            //     message: data.message
            // });
            // await ownerChat.save();

            // const partnerChat = new Chat({
            //     ownerConversation: conversation._id,
            //     partnerConversation: null,
            //     message: data.message
            // });
            // await partnerChat.save();
                
            clients.forEach(client => {
                if (client.userId === receiverId && client.socket.readyState === client.socket.OPEN) {
                    client.socket.send(data.message);
                }
            });

        } catch (error) {
            console.error('Error processing message:', error);
            ws.send('Error processing message.');
        }
    });
});

module.exports = socketRoute;