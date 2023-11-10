const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')


async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers

        if (!access_token) {
            throw ({ name: "unauthenticated" })
        }

        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)

        if (!user) {
            throw ({ name: "unauthenticated" })
        }
        req.user = {
            id: user.id
        }

        next()
    } catch (error) {
        console.log(error, "<<< dari Handler Error");
        next(error)
    }
}

module.exports = authentication