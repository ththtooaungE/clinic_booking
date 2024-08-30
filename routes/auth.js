const express = require('express');
const route = express.Router();
const AuthController = require('../controller/AuthController'); 
const AuthValidation = require('../validation/AuthValidation');

route.post('/register', AuthValidation.register, AuthController.register);
route.post('/login', AuthValidation.login, AuthController.login);
route.delete('/logout', AuthController.logout);
route.post('/refresh-token', AuthController.refreshToken);

module.exports = route;