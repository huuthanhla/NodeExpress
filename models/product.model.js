var mongooes = require('mongoose')

var productSchema = new mongooes.Schema({
  name: String,
  image: String,
  description: String
})

var Product = mongooes.model('Product', productSchema, 'products')

module.exports = Product