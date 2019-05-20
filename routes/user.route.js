var express = require('express')
var router = express.Router()
var validate = require('../Validate/user.validate')

var controller = require('../controllers/user.controller')

router.get('/', controller.index)
router.get('/create', controller.create)
router.get('/search', controller.search)
router.get('/:id', controller.getUser)

router.post('/create', validate.postCreate,  controller.postCreate)

module.exports = router