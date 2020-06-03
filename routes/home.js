const router = require('express').Router()
const User = require('../models/User')
const verify = require('../utils/privateRoutes')

router.get('/', verify, async (req, res) => {
    const user = await User.findOne({ _id: req.user_id })
    res.send(`Welcome home, ${user.username}`)
})

module.exports = router
