const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const users = require('./routes/users')
const { connect } = require('./config/mongo')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (_, res) => res.json("Welcome to jungle bro"))
app.use('/users', users)

connect()
    .then(db => {
        app.listen(port, () => {
            console.log(`araso ${port}`)
        })
    })

