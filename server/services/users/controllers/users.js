const User = require('../models/users')
const bcrypt = require('bcryptjs')

class Users {
    static async findAll(req, res) {
        try {
            const users = await User.findAll()

            res.status(200).json(users)

        } catch (error) {
            console.log(error, "<<eror dari controller");
        }
    }

    static async findId(req, res) {
        try {
            const id = req.params.id
            const datas = await User.findOne(id)

            res.status(200).json(datas)

        } catch (error) {
            console.log(error, "<<eror dari controller");
        }
    }

    static async deleteId(req, res) {
        try {
            const id = req.params.id
            const datas = await User.deleteOne(id)

            res.status(200).json(datas)

        } catch (error) {
            console.log(error, "<<eror dari controller");
        }
    }

    static async createUser(req, res) {
        try {
            const { username, email, password, phoneNumber, address } = req.body

            if (!username || !email || !password || !phoneNumber || !address) {
                throw { message: "Must fill the input" }
            }
            const hasPassword = bcrypt.hashSync(password, 8)
            const datas = await User.createUser(username, email, hasPassword, phoneNumber, address)

            res.status(200).json(datas)

        } catch (error) {
            console.log(error, "<<eror dari controller");
        }
    }
}


module.exports = Users