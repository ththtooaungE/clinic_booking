var jwt = require('jsonwebtoken');

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
}

module.exports = Middleware;