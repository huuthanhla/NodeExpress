var mongooes = require('mongoose')

var userSchema = new mongooes.Schema({
  email: String,
  password: String,
  name: String,
  avatar: String,
  phone: String
})

var User = mongooes.model('User', userSchema, 'users')

module.exports = User