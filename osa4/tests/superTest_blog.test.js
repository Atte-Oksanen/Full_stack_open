const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('The backend returns right amount of blogs', () => {
    test(`Backend returns ${initialBlogs.length} blogs`, async () => {
        const blogs = await api.get('/api/blogs')
        expect(blogs.body).toHaveLength(initialBlogs.length)
    })
})

describe('id field named id', () => {
    test('id field named correctly', async () => {
        const blogs = await api.get('/api/blogs')
        expect(blogs.body[0].id).toBeDefined()
    })
})

describe('Post works correctly', () => {
    test('Post blog to database', async () => {
        const testBlog = JSON.parse(JSON.stringify(initialBlogs))[0]
        delete testBlog._id
        await api.post('/api/blogs').send(testBlog).expect(201)
        const responseBlogs = await api.get('/api/blogs')
        expect(responseBlogs.body).toHaveLength(initialBlogs.length + 1)
    })
})

describe('Likes-field automatically set to 0', () => {
    test('Likes to 0', async () => {
        const testBlog = JSON.parse(JSON.stringify(initialBlogs))[0]
        delete testBlog.likes
        delete testBlog._id
        const response = await api.post('/api/blogs').send(testBlog).expect(201)
        expect(response.body.likes).toBe(0)
    })
})

describe('Testing for mandatory fields title & url', () => {
    test('Mandatory fields', async () => {
        const testBlog = JSON.parse(JSON.stringify(initialBlogs))[0]
        delete testBlog.title
        delete testBlog.url
        delete testBlog._id
        await api.post('/api/blogs').send(testBlog).expect(400)
    })
})

describe('Deleting a single blog', () => {
    test('Delete a blog', async () => {
        const id = initialBlogs[0]._id
        await api.delete(`/api/blogs/${id}`).expect(204)
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length - 1)
    })
})

describe('Modifying existing blog', () => {
    test('Modifying blog', async () => {
        const testBlog = JSON.parse(JSON.stringify(initialBlogs))[0]
        testBlog.likes = 2
        const response = await api.put(`/api/blogs/${testBlog._id}`).send(testBlog)
        expect(response.body.likes).toBe(2)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})