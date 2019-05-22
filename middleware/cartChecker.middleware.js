var db = require('../db')

module.exports = function (req, res, next) {  
  var sessionId = req.signedCookies.sessionId

  if (!sessionId) {
    next()
    return
  }

  var currentSession = db.get('sessions').find({ id: sessionId }).value()
  var cart = currentSession.cart
  
  if (cart) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    var cartCount = Object.values(cart).reduce(reducer)
    res.locals.cart = cartCount
  }

  next()
}