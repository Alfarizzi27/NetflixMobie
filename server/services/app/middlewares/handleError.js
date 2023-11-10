function errorHandler(err, req, res, next) {

    let status = 500
    let msg = "Internal Server Error"

    if (err.name === "SequelizeUniqueConstraintError") {
        status = 400
        msg = err.errors[0].message
    } else if (err.name === "SequelizeValidationError") {
        status = 400
        msg = err.errors[0].message
    } else if (err.name === "Invalid Email/Password") {
        status = 401
        msg = err.name
    } else if (err.name === "Email or Password cannot NULL") {
        status = 401
        msg = err.name
    } else if (err.name === "Movie not found") {
        status = 404
        msg = err.name
    } else if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
        status = 401;
        msg = err.name
    }

    return res.status(status).json({ message: msg })

}



module.exports = errorHandler