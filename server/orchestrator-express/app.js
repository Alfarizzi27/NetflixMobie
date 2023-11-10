const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const axios = require('axios')
const redis = require('./config/redisConfig')

const APP_SERVICE_URL = "http://localhost:4002";
const USER_SERVICE_URL = "http://localhost:4001/users";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json("Server jalan sayang")
})

app.get('/movies', async (req, res) => {
    try {
        const cache = await redis.get("movies")
        if (cache) {
            console.log("ada cachenya");
            const data = JSON.parse(cache)
            res.status(200).json(data)
        } else {
            console.log("ga ada cache");
            const { data } = await axios.get(APP_SERVICE_URL + "/user/movies")
            res.status(200).json(data)
            const values = JSON.stringify(data)
            await redis.set("movies", values)
        }
    } catch (error) {
        console.log(error, "<<<<<error");
    }
})

app.get('/', async (req, res) => {
    try {
        // const cache = await redis.get("users")

        const { data } = await axios.get(USER_SERVICE_URL)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`saranghae ${port}`)
})