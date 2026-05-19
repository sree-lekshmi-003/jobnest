const jwt = require('jsonwebtoken')

const middleware = async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(
                token,
                process.env.SECRET_KEY || 'your_secret_key'
            )

            req.user = {
                id: decoded.id,
                role: decoded.role
            }

            next()
        } catch (error) {
            return res.status(401).json({
                msg: "Invalid token"
            })
        }
    }

    if (!token) {
        return res.status(401).json({
            msg: "No token"
        })
    }
}

module.exports = middleware;