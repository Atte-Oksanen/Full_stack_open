const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogRouter.post('/', (req, res) => {
    const blogPost = new Blog(req.body)
    blogPost.save().then(result => {
        res.status(201).json(result)
    })
})

module.exports = blogRouter