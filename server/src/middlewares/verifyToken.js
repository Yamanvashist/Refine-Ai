const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not authorized" });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (err) {
        return res.status(403).json({ message: "Bad token" });
    }
}

module.exports = verifyToken