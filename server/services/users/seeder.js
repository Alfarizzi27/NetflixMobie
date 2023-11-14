// mongodb://127.0.0.1:27017
const bcrypt = require('bcryptjs')

const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://farizyoga:databasemongodb@netflix.elvifp7.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

async function seeder() {
    try {
        const db = client.db('Netflix')
        const usersCollection = db.collection('users')

        const datas = require('./user.json').map(el => {
            el.password = bcrypt.hashSync(el.password, 8)
            return el
        })

        const users = await usersCollection.insertMany(datas)

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
}

seeder()