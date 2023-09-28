const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')



blogRouter.get('/', async (req, res) => {
  res.json(await Blog.find({}).populate('user'))
})

blogRouter.post('/', async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Token invalid' })
    }
    const user = await User.findById(req.user)
    const blogPost = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        user: user._id
    })
    const savedBlog = await blogPost.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
})


blogRouter.delete('/:id', async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    if (blog === null) {
        return res.status(404).json({ error: 'Blog not found' })
    }
    if (!req.user || req.user !== blog.user.toString()) {
        return res.status(401).json({ error: 'Token invalid' })
    }
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogRouter.put('/:id', async (req, res, next) => {
    
    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
    }
    const response = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(response)
})

blogRouter.post('/:id/comment', async (req, res, next) => {
  const comment = new Comment({
    content: req.body.content,
    blog: req.params.id
  })
  
  const response = await comment.save()
  res.json(response)
})

blogRouter.get('/:id/comment', async (req, res, next) => {
  const response = await Comment.find({blog: req.params.id})
  res.json(response)
})

module.exports = blogRouter