require('dotenv').config()

var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var port = process.env.port || 3000

var app = express()

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var productRoute = require('./routes/product.route')

var authMiddleware = require('./middleware/auth.middleware')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET))

app.use('/users', authMiddleware.requiredAuth, userRoute)
app.use('/auth', authRoute)
app.use('/products', productRoute)

app.use(express.static('public'))

var tracks = require('./tracks.json')
app.get('/tracks', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(tracks))
});


app.get('/', function(req, res) {
  res.render('index', {
    name: 'Thanh La'
  })
})

// Starting server
app.listen(port, () => console.log(`Server listening on port ${port}.`))