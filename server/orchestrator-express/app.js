const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const axios = require('axios')
const redis = require('./config/redisConfig')

const APP_SERVICE_URL = "http://localhost:4002";
const USER_SERVICE_URL = "http://localhost:4001";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json("Server jalan sayang")
})

app.get('/movies', async (req, res) => {
    try {
        const cache = await redis.get("movies")

        const { data } = await axios.get(APP_SERVICE_URL + "/user/movies")
        const values = JSON.stringify(data)
        await redis.set("movies", values)
        res.status(200).json(data)
    } catch (error) {
        console.log(error, "<<<<<error");
    }
})

app.listen(port, () => {
    console.log(`saranghae ${port}`)
})