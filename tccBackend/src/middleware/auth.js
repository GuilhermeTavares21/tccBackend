const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
async function authToken(req, res, next){
    const authHeaders = req.header('Authorization')
    if (!authHeaders) return res.status(401).json({ message: "Não autorizado1" })
    try {
        const decoded = await jwt.verify(authHeaders, secret)
        req.userId = decoded.id
        next();
    } catch (error) {
        return res.status(401).json({ message: "Não autorizado2" })
    }
}

module.exports = authToken;