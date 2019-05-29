// var db = require('../db')

var Product = require('../models/product.model')

module.exports.index = async function (req, res) {
  // var page = parseInt(req.query.page) || 1
  // var itemPerPage = 8
  
  // var start = (page - 1) * itemPerPage
  // var end = page * itemPerPage

  // res.render('product/index', {
  //   products: db.get('products').value().slice(start, end),
  //   page: page
  // })
  var products = await Product.find()
  
  res.render('product/index', {
    products: products
  })
}