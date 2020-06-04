const router = require('express').Router()
const User = require('../models/User')
const verify = require('../utils/privateRoutes')

// @desc    halaman setelah user berhasil login

router.get('/', verify, async (req, res) => {
    const user = await User.findOne({ _id: req.user_id }) // user_id didapat dari verifikasi privateRoutes.
    if (!user) return res.status(401).send('Problem with user_id')
    res.send(`Welcome home, ${user.username}`)
})

module.exports = router
