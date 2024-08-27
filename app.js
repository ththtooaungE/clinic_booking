const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Middleware = require('./middleware/middleware');

const AuthRoute = require('./routes/auth');
const ApiRoute = require('./routes/api');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/clinic_booking');

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', AuthRoute);
app.use('/api',Middleware.auth, ApiRoute);

app.listen(3000, ()=> console.log('Listening at port: 3000!'));