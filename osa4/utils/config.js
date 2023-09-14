require('dotenv').config()

let PORT = process.env.PORT
let MONGO_URI = process.env.NODE_ENV === 'test' 
?process.env.MONGO_URI_TEST
:process.env.MONGO_URI

module.exports = {
    PORT,
    MONGO_URI
}