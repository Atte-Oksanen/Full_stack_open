const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

const initialUsers = [
    { "username": "njeffry0", "name": "Nelia", "password": "eH5{*Mts+(59=V" },
    { "username": "sthripp1", "name": "Svend", "password": "gZ3\\9I@+HDY" },
    { "username": "mkinastan2", "name": "Melinde", "password": "uV8&!4,TmN" },
    { "username": "alismore3", "name": "Audi", "password": "jI4?0OBe*q80\"MD" },
    { "username": "fattenbrow4", "name": "Floris", "password": "pR5+YYCdVrP'_" },
    { "username": "ctorel5", "name": "Clint", "password": "qJ7&*$Wb<{{j\"fa" },
    { "username": "afazakerley6", "name": "Anselma", "password": "mR2}`+G_$%v}Y'}" },
    { "username": "lnormanvill7", "name": "Lutero", "password": "tV6)dMUK1" },
    { "username": "amackegg8", "name": "Analise", "password": "wJ4$uw\"h4)$RM#W" },
    { "username": "rhalifax9", "name": "Rodrique", "password": "pH7*qhL(7toCc%\"" }
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

describe('Testing for valid user', () => {
    test('Adding valid user to db', async () => {
        const user = {
            username: "test",
            name: "sample",
            password: "12345",
        }
        await api.post('/api/users').send(user).expect(201)
    })
})

describe('Testing invalid users', () => {
    test('Duplicate user', async () => {
        const user = {
            username: "test",
            name: "sample",
            password: "12345",
        }
        await api.post('/api/users').send(user).expect(201)
        const response = await api.post('/api/users').send(user).expect(400)
        expect(response.text).toBe('User already exists')
    })

    test('Invalid username', async () => {
        const user = {
            username: "t",
            name: "sample",
            password: "12345",
        }
        const response = await api.post('/api/users').send(user).expect(400)
        expect(response.text).toMatch(/User validation failed/)
    })

    test('Invalid password', async () => {
        const user = {
            username: "test",
            name: "sample",
            password: "1",
        }
        const response = await api.post('/api/users').send(user).expect(400)
        expect(response.text).toBe('Password must be atleast 3 characters long')
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})