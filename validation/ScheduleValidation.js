const Joi = require('joi')

class ScheduleValidation
{
    static store(req, res, next) {
        const schema = Joi.object({
            doctor: Joi.allow(),
            slot: Joi.number(),
            start: Joi.date().iso().required(),
            end: Joi.date().iso().required()
        });
        
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send({
            message: error.details[0].message
        });
    
        next();
    }


    static update(req, res, next) {
        const schema = Joi.object({
            slot: Joi.number().allow(null),
            start: Joi.date().iso().allow(null),
            end: Joi.date().iso().allow(null)
        });
        
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send({
            message: error.details[0].message
        });
    
        next();
    }
}

module.exports = ScheduleValidation;