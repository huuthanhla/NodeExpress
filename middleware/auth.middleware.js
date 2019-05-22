var db = require('../db')

module.exports.requiredAuth = function(req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/auth/login')
    return
  }

  var user = db.get('users').find({ 
    id: req.signedCookies.userId 
  }).value()

  if (!user) {
    res.redirect('/auth/login')
    return
  }

  res.locals.user = user

  var sessionId = req.signedCookies.sessionId
  var currentSession = db.get('sessions').find({ id: sessionId }).value()
  var cart = currentSession.cart

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  var cartCount = Object.values(cart).reduce(reducer)

  if (cart) {
    res.locals.cart = cartCount
  }
  
  next()
}