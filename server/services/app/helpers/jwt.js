const jwt = require('jsonwebtoken');

function createToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET);
    return token
}

function verifyToken(payload) {
    const verify = jwt.verify(payload, process.env.SECRET)
    return verify
}

module.exports = { createToken, verifyToken }