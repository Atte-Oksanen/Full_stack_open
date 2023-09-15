const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
    if (await User.findOne({ username: req.body.username })) {
        res.status(400).send('User already exists').end()
    }
    else if (req.body.password.length < 3) {
        res.status(400).send('Password must be atleast 3 characters long').end()
    } else {
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            password: await bcrypt.hash(req.body.password, 10),
        })
        res.status(201).json(await user.save().catch(error => next(error)))
    }
})

userRouter.get('/', async (req, res) => {
    res.json(await User.find({}).populate('blogs'))
})

const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).send(error.message).end()
    } else {
        return res.status(502).end()
    }
}

userRouter.use(errorHandler)

module.exports = userRouter