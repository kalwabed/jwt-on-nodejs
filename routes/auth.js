const router = require('express').Router()
const User = require('../models/User')
const { registerValidation } = require('../validation')

router.post('/register', async (req, res) => {
    // Data validator
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // const { username, email, password } = await req.body
    // const user = new User({ username, email, password })
    // try {
    //     const newUser = await user.save()
    //     res.status(201).send(newUser)
    // } catch (err) {
    //     res.status(400).send(err)
    // }
})

module.exports = router
