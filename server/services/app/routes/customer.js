const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/customerController')


router.get('/movies', CustomerController.fetchMovie)
router.get('/movies/:id', CustomerController.detailMovie)


module.exports = router
