const { getDb } = require('../config/mongo')

class User {
    static async findAll() {
        try {
            const collection = getDb().collection('users')
            const users = await collection.find().toArray()
            return users
        } catch (error) {
            throw error
        }
    }
    static async findOne(id) {
        try {
            const collection = getDb().collection('users')
            const users = await collection.findOne({}, { _id: id })
            return users
        } catch (error) {
            throw error
        }
    }
}

module.exports = User