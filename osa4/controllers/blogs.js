const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogRouter.post('/', (req, res, next) => {
    const blogPost = new Blog(req.body)
    blogPost.save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => next(error))
})

blogRouter.delete('/:id', async (req, res, next) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogRouter.put('/:id', async (req, res, next)=>{
    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
    }
    const response = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    res.json(response)
})

const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).send(error.message).end()
    } else {
        return res.status(502).end()
    }
}

blogRouter.use(errorHandler)

module.exports = blogRouter