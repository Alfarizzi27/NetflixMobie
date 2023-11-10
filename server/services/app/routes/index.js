const express = require('express')
const router = express.Router()
const routerUser = require('./user')
const routerCustomer = require('./customer')


router.use('/user', routerUser)
router.use('/customer', routerCustomer)


module.exports = router