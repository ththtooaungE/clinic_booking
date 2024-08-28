const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require("../models/user");
const RefreshToken = require("../models/RefreshToken");

class AuthController
{
    static async register(req, res) {
        try {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt,async function(err, hash) {
                    const user = new User({
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        phone: req.body.phone,
                        age: req.body.age,
                        city: req.body.city,
                        country: req.body.country
                    });
                    if (await user.save()) return res.send(user);
                    else throw Error('Something went wrong!');
                })
            })
            
        } catch(error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email});
            if(!user) return res.status(404).send({message: "Not Found"});

            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result) {
                    
                    const userInfo = {
                        id: user.id,
                        name: user.name
                    };

                    const accessToken = jwt.sign(userInfo, "thet!@#123", {expiresIn: "20s"});
                    const refreshToken = jwt.sign(userInfo, 'RefreshToken');

                    new RefreshToken({
                        email: user.email,
                        token: refreshToken
                    }).save();

                    return res.status(200).send({
                        message: "Valid", 
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });
                } else {
                    return res.status(500).send({message: "Wrong Credentials!"})
                }
            })
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    }

    static async logout(req, res) {
        try {
            await RefreshToken.deleteOne({token: req.body.token});
            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async refreshToken(req, res) {
        const refreshToken = await RefreshToken.findOne({token: req.body.token});
        if(!refreshToken) return res.status(401).send({message: 'Invalid Token'});

        jwt.verify(refreshToken.token, 'RefreshToken', async function(err, decoded) {
            if(err) {
                return res.status(401).send({message: "Invalid Token!"});
            }
            else {
                const user = await User.findOne({email: refreshToken.email});
                const accessToken = jwt.sign({id: user.id, name: user.name}, "thet!@#123", { expiresIn: '20s'});
                
                return res.status(200).send({
                    message: 'Access Token is successfully created!',
                    data: {accessToken: accessToken}
                });
            }
        })

        
    }
}

module.exports = AuthController;