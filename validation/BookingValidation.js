const Joi = require('joi');

class BookingValidation
{
    static store(req, res, next) {
        const schema = Joi.object({
            schedule: Joi.allow(),
            name: Joi.string(),
            age: Joi.number(),
            note: Joi.string()
        });
        
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send({
            message: error.details[0].message
        });
    
        next();
    }


    static update(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().allow(null),
            age: Joi.number().allow(null),
            note: Joi.string().allow(null),
            status: Joi.string().allow(null).valid('upcoming', 'finished', 'cancelled', 'failed'),
        });
        
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send({
            message: error.details[0].message
        });
    
        next();
    }
}

module.exports = BookingValidation;