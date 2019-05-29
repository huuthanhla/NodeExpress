var db = require('../db')
var shortid = require('shortid')
// var md5 = require('md5')

var Users = require('../models/user.model')

module.exports.index = async function (req, res) {
    var users = await Users.find()
    res.render('users/index', {
        users: users
    })
}

module.exports.create = function (req, res) {    
    res.render('users/create')
}

module.exports.search = async function (req, res) {
    var q = req.query.q
    var matchedUsers = await Users.find({ name: q})

    res.render('users/index', {
        users: matchedUsers,
        query: q
    })
}

module.exports.getUser = async function (req, res) {
    var id = (req.params.id)
    var user = await Users.findById({ _id: id })

    res.render('users/view', {
        user: user
    })
}

module.exports.postCreate = function (req, res) {
    
    req.body.avatar = req.file.path.split('/').slice(1).join('/')
    Users.insertMany(req.body, function (error, docs) { })
    // db.get('users').push(req.body).write();
    res.redirect('/users')
}