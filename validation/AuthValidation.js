const Joi = require('joi')

class AuthValidation
{
    static register(req, res, next) {

        const schema = Joi.object({
            name: Joi.string().max(30),
            username: Joi.string().alphanum().min(4).max(30),
            email: Joi.string().email(),
            password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9]+$')),
            phone: Joi.string().pattern( new RegExp('^[0-9]+$')),
            age: Joi.number(),
            city: Joi.string(),
            country: Joi.string()
        });

        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send({
                message: error.details[0].message
            });
        
        next();
    }

    static login(req, res, next) {

        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string()
        });

        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send({
                message: error.details[0].message
            });
        
        next();
    }
}

module.exports = AuthValidation;