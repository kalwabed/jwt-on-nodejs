const jwt = require('jsonwebtoken')

// @desc    memverifikasi pengguna sebelum masuk ke halaman/rute home
// @meta    token == token ? data pengguna : error

module.exports = async (req, res, next) => {
    const token = await req.header('auth-token') // didapat dari saat login.
    if (!token) return res.status(401).send('Access denied!')

    try {
        const verified = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user_id = verified // membuat req baru dengan nama user_id, yang nantinya dipakai untuk mengenali user yang isinya adalah _id yang dikirim melalui login.
        next() // untuk menjalankan middleware selanjutnya. jika tidak maka sistem akan menunggu terus.
    } catch (err) {
        res.status(400).send('Invalid token!')
    }
}
