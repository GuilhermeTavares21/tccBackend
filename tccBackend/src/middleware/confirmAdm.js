const Adm = require('../models/Adm')

async function verifyAdm(req, res, next) {
    try {
        const verifyAdm = await Adm.findById(req.userId)
        if(!verifyAdm){
            return res.status(401).json('Adm inválido')
        }
        next()
    } catch (error) {
        return res.status(500).json('Server error')
    }
}

module.exports = verifyAdm;
