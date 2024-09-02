var jwt = require('jsonwebtoken');
const User = require('../models/user');

class Middleware
{
    static auth(req, res, next) {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            return res.status(401).send('Authorization header is missing');
        }

        const [type, token] = authHeader.split(" ");
        if(type != "Bearer") return res.status(400).send("Token must be bearer!");
        
        jwt.verify(token, 'thet!@#123', function(err, decoded) {
            req.user = decoded;
            if(err) return res.status(401).send({message: "Invalid Token!"});
            else next();
        })
    }

    static async admin(req, res, next) {
        const user = await User.findById(req.user.id);

        if(user.role === "admin") next();
        else return res.status(403).send({message: "Must be admin!"});
    }


    static async doctor(req, res, next) {
        const user= await User.findById(req.user.id);

        if (user.role === "doctor") next();
        else return res.status(403).send({message: "Must be doctor"});
    }

    static async adminOrDoctor(req, res, next) {
        const user= await User.findById(req.user.id);

        if (user.role === "admin" || user.role === "doctor") next();
        else return res.status(403).send({message: "Must be admin or doctor"});
    }
}

module.exports = Middleware;