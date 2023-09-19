const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/testing')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userExtractor = (req, res, next) => {
    try {
        let auth = req.get('authorization')
        if (auth.startsWith('Bearer ')) {
            auth = auth.replace('Bearer ', '')
        }
        req.user = jwt.verify(auth, process.env.SECRET).id
    } catch (error) {}
    next()
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message }).end()
    }
    if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: 'Token missing or invalid' }).end()
    }
    else {
        return res.status(502).end()
    }
}

mongoose.connect(config.MONGO_URI)
.then(() =>{
    logger.info('connected to database')
})
.catch(error => {
    logger.info(`Error connecting to database ${error.message}`)
})

app.use(cors())
app.use(express.json())
app.use(userExtractor)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter)
  console.log('test routing active')
}
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)


module.exports = app