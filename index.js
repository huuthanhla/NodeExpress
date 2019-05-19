var express = require('express')
var bodyParser = require('body-parser')
var port = process.env.port || 3000
var app = express()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
var shortid = require('shortid')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: []}).write()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var tracks = require('./tracks.json')
app.get('/tracks', function (req, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(tracks))
});


app.get('/', function(req, res) {
  res.render('index', {
    name: 'Thanh La'
  })
})

app.get('/users', function (req, res) {
  res.render('users/index', {
    users: db.get('users').value(),
    query: ""
  })
})

app.get('/users/create', function(req, res) {
  res.render('users/create')
})

app.post('/users/create', function(req, res) {
  req.body.id = shortid.generate()
  db.get('users').push(req.body).write();
  res.redirect('/users')
})

app.get('/users/search', function(req, res) {
  var q = req.query.q
  var matchedUsers = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('users/index', {
    users: matchedUsers,
    query: q
  })
})

app.get('/users/:id', function(req, res) {
  var id = (req.params.id)
  var user = db.get('users').find({ id: id }).value()
  res.render('users/view', {
    user: user
  })
})

// Starting server
app.listen(
  port, 
  () => console.log(`Server listening on port ${port}.`)
)