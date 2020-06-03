const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = await req.header('auth-token')
    if (!token) return res.status(401).send('Access denied!')

    try {
        const verified = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user_id = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid token!')
    }
}
