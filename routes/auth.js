const express = require('express');
const route = express.Router();
const AuthController = require('../controller/AuthController'); 

route.post('/register', AuthController.register);
route.post('/login', AuthController.login);
route.post('/logout', AuthController.logout);

module.exports = route;