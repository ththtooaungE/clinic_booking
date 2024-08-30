const Joi = require('joi')

class DoctorValidation
{
    static store(req, res, next) {
        const schema = Joi.object({
            name: Joi.string(),
            title: Joi.string(),
            specialty: Joi.string(),
            experienceYear: Joi.number(),
            price: Joi.number()
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
            title: Joi.string().allow(null),
            specialty: Joi.string().allow(null),
            experienceYear: Joi.number().allow(null),
            price: Joi.number().allow(null),
        });
        
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send({
            message: error.details[0].message
        });
    
        next();
    }
}

module.exports = DoctorValidation;