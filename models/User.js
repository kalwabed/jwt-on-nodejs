const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 6,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('jwtuser', userSchema)
