if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const router = require('./routes')
const errorHandler = require('./middlewares/handleError')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router)


app.use(errorHandler)

app.listen(port, () => {
    console.log(`aku tresno panjenengan ${port}`)
})
