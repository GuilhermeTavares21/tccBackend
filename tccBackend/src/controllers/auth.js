const User = require('../models/User')
const Adm = require('../models/Adm')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { secret } = require('../config/config')
module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body
            // console.log(req.body)
            if (!email || !password) {
                return res.status(400).json('Campo em branco')
            }
            const user = await User.findOne({ email }).select('+password')
           
            if (!user) {
                return res.status(404).json('Usuário não cadastrado')
            }
            if (!await bcrypt.compare(password, user.password)) {
                console.log(user.password)
                return res.status(400).json('Email ou Senha inválido')
            }            
            const token = sign({ id: user._id }, secret, { expiresIn: 86400 });  
            return res.status(200).json({ user, token });
            
        }
        catch (error) {
            console.error(error.message)
        }
    },
    async loginAdm(req, res) {
        try {
            const { email, password } = req.body
            // console.log(req.body)
            if (!email || !password) {
                return res.status(400).json('Campo em branco')
            }
            const adm = await Adm.findOne({ email }).select('+password').populate("products")
            if (!adm) {
                return res.status(404).json('Usuário não cadastrado')
            }
            console.log(adm.password)
            if (!await bcrypt.compare(password, adm.password)) {
                return res.status(400).json('Email ou Senha inválido')
            }        
            
            const token = sign({ id: adm._id }, secret, { expiresIn: 86400 });  
            return res.status(200).json({ adm, token });
            
        }
        catch (error) {
            console.error(error.message)
        }
    }
}
