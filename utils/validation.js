const Joi = require('@hapi/joi')

// @desc    memverifikasi data yang masuk dan memberikan error sesuai kesalahan.
// @meta    data = req.body

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
