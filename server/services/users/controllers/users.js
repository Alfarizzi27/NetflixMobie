const User = require('../models/users')

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
}


module.exports = Users