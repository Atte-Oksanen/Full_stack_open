const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
require('dotenv').config()

mongoose.connect(config.MONGO_URI)
.then(() =>{
    logger.info('connected to database')
})
.catch(error => {
    logger.info(`Error connecting to database ${error.message}`)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


module.exports = app