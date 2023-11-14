const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://farizyoga:databasemongodb@netflix.elvifp7.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

let db = {}

async function connect() {
    try {
        await client.connect()

        db = client.db('Netflix')
        return db
    } catch (error) {
        console.log(`Error connect config / mongo.js: `, err);
    }
}

function getDb() {
    return db
}

module.exports = { connect, getDb }