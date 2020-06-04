const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../utils/validation')

// @desc    mendaftarkan pengguna baru dengan username, email, password
// @meta    userOnDb ? error : addNewUser

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = await req.body

    // email checker
    const emailExist = await User.findOne({ email })
    if (emailExist) return res.status(400).send('Email is already exist.')

    // Data validator
    const { error } = registerValidation(req.body) // dari validasi ./utils/validation.
    if (error) return res.status(400).send(error.details[0].message) // isi dari error yang dihasilkan dari validasi dengan Joi diatas.

    // Hash password
    const salt = await bcrypt.genSalt(10) // menggenerasi rumus hashing yang akan digunakan password.
    const hashedPassword = await bcrypt.hash(password, salt) // hasil hashing password.

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

// @desc    login menggunakan email dan password untuk mendapatkan token
// @meta    userExist ? login : error

// Login
router.post('/login', async (req, res) => {
    const { email, password } = await req.body

    // validation
    const { error } = loginValidation(req.body) // dari validasi ./utils/validation.
    if (error) return res.status(400).send(error.details[0].message) // isi dari error yang dihasilkan dari validasi dengan Joi diatas.

    // check email
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send('Email not found!')

    // check password
    const validPass = await bcrypt.compare(password, user.password) // mencocokkan antara password yang dimasukkan user dengan password yang sudah di hashing di DB.
    if (!validPass) return res.status(400).send('Password is incorrect!')

    // create and sign a token
    const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY) // membuat token dan isi token adalah _id dari user yang sudah berhasil login, yang nantinya akan digunakan untuk mengambil data user dari database atau memverifikasi kalau user sudah login.
    res.header('auth-token', token).send(
        `Cool, now you can GET access the home page by http://localhost:5000 with auth-token`
    ) // membuat header dengan nama auth-token dan isinya adalah token yang sebelumnya sudah dibuat.
})

module.exports = router
