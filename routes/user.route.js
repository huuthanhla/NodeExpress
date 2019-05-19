var express = require('express')
var router = express.Router()

var controller = require('../controllers/user.controller')

router.get('/', controller.index)
router.get('/create', controller.create)
router.get('/search', controller.search)
router.get('/:id', controller.getUser)

router.post('/create', controller.postCreate)

module.exports = router