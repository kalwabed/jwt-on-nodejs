const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

// index
router.get('/', (req, res) => {
    res.send('hello you are in api')
})

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = await req.body

    // email checker
    const emailExist = await User.findOne({ email })
    if (emailExist) return res.status(400).send('Email is already exist.')

    // Data validator
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        res.status(201).send({
            msg: 'Succesfully added a new user!',
            id: user._id,
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = await req.body

    // validation
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // check email
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send('Email not found!')

    // check password
    const validPass = await bcrypt.compare(password, user.password)
    if (!validPass) return res.status(400).send('Password is incorrect!')

    // create and sign a token
    const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY)
    res.header('auth-token', token).send(
        `Cool, now you can access the home page by http://localhost:5000`
    )
})

module.exports = router
