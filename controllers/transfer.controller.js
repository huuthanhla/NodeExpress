var shortId = require('shortid')

var db = require('../db')

module.exports.create = function(req, res, next) {
  res.render('transfer/create', {
    csrfToken: req.csrfToken()
  })
}

module.exports.postCreate = function(req, res, next) {
  var data = {
    id: shortId.generate(),
    amount: parseInt(req.body.amount),
    accountId: req.body.accountId,
    userId: req.signedCookies.userId
  }

  db.get('transfers').push(data).write()
  res.redirect('/transfer/create')
}