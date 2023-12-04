const mongoose = require('mongoose')

// you must install this library
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5
  },
  favoriteGenre: {
    type: String,
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)