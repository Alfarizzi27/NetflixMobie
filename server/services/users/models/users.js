const { getDb } = require('../config/mongo')
const ObjectId = require('mongodb').ObjectId;

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
            const users = await collection.findOne({ _id: new ObjectId(id) })
            return users
        } catch (error) {
            throw error
        }
    }
    static async deleteOne(id) {
        try {
            const collection = getDb().collection('users')
            const users = await collection.deleteOne({ _id: new ObjectId(id) })
            return users
        } catch (error) {
            throw error
        }
    }
    static async createUser(username, email, password, phoneNumber, address) {
        try {
            const collection = getDb().collection('users')
            const users = await collection.insertOne({
                username,
                email,
                password,
                role: "admin",
                phoneNumber,
                address
            })
            return users
        } catch (error) {
            throw error
        }
    }
}

module.exports = User