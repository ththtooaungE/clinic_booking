const express = require('express');
const expressWs = require('express-ws');
const MessageController = require('../controller/MessageController');
var socketRoute = express.Router();

// demo format
// {
// "receiverId": "66d7dce92ce1307e0ca8199d",
// "message": "What'up"
// }

socketRoute.ws('/message/:id', MessageController.send   );

module.exports = socketRoute;