var express = require('express')
var bodyParser = require('body-parser')
var port = process.env.port || 3000

var app = express()

var userRoute = require('./routes/user.route')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRoute)
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
app.listen(
  port, 
  () => console.log(`Server listening on port ${port}.`)
)