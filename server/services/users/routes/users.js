const express = require('express')
const router = express.Router()
const user = require('../controllers/users')

router.get('/', user.findAll)
router.get('/:id', user.findId)

module.exports = router