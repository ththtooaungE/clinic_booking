const User = require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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
                    var token = jwt.sign({
                        id: user.id,
                        name: user.name
                    }, "thet!@#123");

                    return res.status(200).send({message: "Valid", token: token});
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
            
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

module.exports = AuthController;