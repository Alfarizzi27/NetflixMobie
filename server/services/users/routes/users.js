const express = require('express')
const router = express.Router()
const user = require('../controllers/users')

router.get('/', user.findAll)
router.get('/:id', user.findId)
router.delete('/:id', user.deleteId)
router.post('/', user.createUser)

module.exports = router