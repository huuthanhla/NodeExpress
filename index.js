require('dotenv').config()

var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var csurf = require('csurf')
var csrfProtection = csurf({ cookie: true })
var port = process.env.port || 3000

var app = express()

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var productRoute = require('./routes/product.route')
var cartRoute = require('./routes/cart.route')
var transferRoute = require('./routes/transfer.route')

var sessionMiddleware = require('./middleware/session.middleware')
var authMiddleware = require('./middleware/auth.middleware')
var cartMiddleware = require('./middleware/cartChecker.middleware')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET))

app.use(csrfProtection)

app.use('/users', authMiddleware.requiredAuth, cartMiddleware, userRoute)
app.use('/auth', authRoute)
app.use('/products', cartMiddleware, productRoute)
app.use('/cart', cartRoute)
app.use('/transfer', authMiddleware.requiredAuth, transferRoute)

app.use(sessionMiddleware)
app.use(cartMiddleware)

app.use(express.static('public'))

var tracks = require('./tracks.json')
app.get('/tracks', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(tracks))
});


app.get('/', function(req, res) {
  res.render('index', {
    name: 'Nodejs Express'
  })
})

// Starting server
app.listen(port, () => console.log(`Server listening on port ${port}.`))