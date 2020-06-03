const Joi = require('@hapi/joi')

// Validation
const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().required().email({}),
        password: Joi.string().required().min(6),
    })
    return schema.validate(data)
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email({}),
        password: Joi.string().required().min(6),
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
