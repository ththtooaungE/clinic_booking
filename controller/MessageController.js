const Message = require('../models/message');
const User = require('../models/user');
class MessageController
{
    static async getChats(req, res) {
        try {
            const distinctToUsers = await Message.distinct('toUser', { fromUser: req.user.id });

        const populatedUsers = await User.find({ _id: { $in: distinctToUsers } });
        return res.status(200).send({
            messages: "Successfully retrieved!",
            data: populatedUsers
        });
        } catch (error) {
            return res.status(500).send({message: err.message});
        }
    }

    static async getMessages(req, res) {
        try {
            const messages = await Message.find({
                ownerUser: req.user.id,
                $or: [
                    { fromUser: req.user.id, toUser: req.params.id },
                    { fromUser: req.params.id, toUser: req.user.id }
                ]
            });
            
            return res.status(200).send({
                message: "Messages Successfully retrieved!",
                data: messages
            });
        } catch (error) {
            return res.status(500).send({message: err.message});
        }
    }


    static async send(ws, req) {

        const clients = [];
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
    }


    static async delete(req, res) {

        // return res.send(req.params.id);
        const message = await Message.findOne({
            _id: req.params.id,
            $or: [
                { fromUser: req.user.id },
                { toUser: req.user.id }
            ]
        });

        if(!message) {
            return res.status(404).send({
                message: "Message Not Found!"
            });
        }

        // if(req.body.forBoth) {
        //     const messages = await Message.find({

        //         ownerUser: req.user.id,
        //         message: message.message,
        //         $or: [
        //             { fromUser: req.user.id },
        //             { toUser: req.user.id }
        //         ]
        //     })
        // }

        if(await message.deleteOne()) {
            return res.status(204).send({
                message: 'Message Successfully deleted!'
            });
        }

    }
}

module.exports = MessageController;