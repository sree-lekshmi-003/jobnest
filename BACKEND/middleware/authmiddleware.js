const jwt = require('jsonwebtoken')
const authmiddleware = async (req, res, next) => {
    const header = req.header('Authorization')
    if (!header) {
        res.status(400).json({ msg: "No token please login" })
    }
    try {
        const token = header.split(" ")[1]
        const decodedtoken = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodedtoken
        next()
    }
    catch (error) {
        res.status(401).json({ msg: "Invalid token" })
    }
}
module.exports = authmiddleware;