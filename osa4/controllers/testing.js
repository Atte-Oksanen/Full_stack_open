const testRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testRouter.post('/reset', async (req, res, next) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  res.status(204).end()
})

module.exports = testRouter