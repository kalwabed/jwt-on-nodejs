const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Routes
const authRoute = require('./routes/auth')
const homeRoute = require('./routes/home')

const PORT = process.env.PORT || 5000
require('dotenv').config()

// Middlewares
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))

// Connet to MongoDB
mongoose.connect(
    process.env.MongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
    err => (err ? console.log(err) : console.log('DB connected'))
)

// Router
app.use('/api/user', authRoute)
app.use('/', homeRoute)

app.listen(PORT, () => console.log(`Server running up on ${PORT}`))
