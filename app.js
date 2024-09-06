const express = require('express');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Middleware = require('./middleware/middleware');

const app = express();
expressWs(app);

const AuthRoute = require('./routes/auth');
const ApiRoute = require('./routes/api');
const SocketRoute = require('./routes/web-socket');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/clinic_booking');

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', AuthRoute);
app.use('/api',Middleware.auth, ApiRoute);
app.use('/ws', SocketRoute);
// const clients = [];
// app.ws('/echo', function (ws, req) {

//     clients.push(ws);
//     // console.log(req);

    
//     ws.on('message', function(msg) {
//         clients.map(client => {
//             client.send(msg);
//         })
//     })
// });

app.listen(3000, ()=> console.log('Listening at port: 3000!'));