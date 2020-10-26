const User = require('../models/User')
const bcrypt = require('bcrypt');
const Products = require('../models/Products');
const { findById } = require('../models/User');
module.exports = {
    async register(req, res) {
        try {
            const { name, phone, email, password, street, numberHouse } = req.body;
            if (!name || !phone || !email || !password || !street || !numberHouse) {
                return res.status(400).json('Campo em branco')
            }
            if (phone.length > 15 || phone.length <= 7) {
                return res.status(400).json('Telefone inválido')
            }
            // console.log(phone.length)

            if (await User.findOne({ email })) {
                return res.status(400).json('Este e-mail já está sendo usado')
            }
            req.body.password = await bcrypt.hash(password, 12)
            const user = await User.create(req.body);
            // console.log(id)
            return res.status(200).json(user);
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha no registro');
        }
    },
    async updateUser(req, res) {
        try {
            const { name, phone, email, password, street, complement, numberHouse, imageLocation, } = req.body;

            var alter = {}

            console.log(req.body)
            if (req.file) {
                const { originalname, size: sizeImg, key, location } = req.file
                const image = {
                    originalName: originalname,
                    size: sizeImg,
                    key,
                    location
                }
                if (imageLocation == "perfil") {
                    alter.image = image
                }
                if (imageLocation == "banner") {
                    alter.imageBanner = image
                }
            }

            if (phone) {
                if (phone.length > 15 || phone.length <= 7) {
                    return res.status(400).json('Telefone inválido')
                }
                alter.phone = req.body.phone
            }
            if (password) {
                alter.password = await bcrypt.hash(password, 12)
            }
            if (name) {
                alter.name = req.body.name
                // console.log(req.body.name)
                
            }
            if (email) {
                alter.email = req.body.email
            }
            if (street) {
                alter.street = req.body.street
            }
            if(complement){
                    alter.complement = req.body.complement
            }
            if (numberHouse) {
                alter.numberHouse = req.body.numberHouse
            }
            
            // console.log(alter)
            const user = await User.findByIdAndUpdate(req.userId, {$set:alter} , { upsert: true });
            // console.log(phone)
            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json('Falha ao atualizar');
        }
    },
    async ListUsers(req, res) {
        try {
            const users = await User.find()
            return res.status(200).send({ users })
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao listar');
        }
    },
    async DeleteUser(req, res) {
        try {
            const id = req.userId;
            await User.findByIdAndDelete(id)
            return res.status(200).json('Deletado com sucesso')
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao deletar');
        }
    },
    async addBag(req, res) {
        try {
            const id = req.body.id;
            const userId = req.userId

            const user = await User.findById(userId)
            user.sacola.push(id)
            await user.save()
            const userAdd = await User.findById(userId).populate("sacola")

            return res.status(200).json(userAdd)
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao adicionar a sacola');
        }
    },
    async deleteBag(req, res) {
        try {
            const userId = req.userId
            const user = await User.findById(userId)

            const product = req.body.id
            const newSacola = user.sacola.filter(sacola => { return sacola != product })
            const newUser = await User.findByIdAndUpdate(userId, { sacola: newSacola }).populate("sacola")
            return res.status(200).json(newUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao deletar produto');
        }
    },
    async listBag(req, res) {
        try {
            const userId = req.userId
            console.log(userId)
            const sacola = await User.findById(userId).populate("sacola")
            console.log(sacola)
            return res.status(200).json(sacola)
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao listar a sacola');
        }
    },
    async loadUser(req, res) {
        try {
            const userId = req.userId
            console.log(userId)
            const user = await User.findById(userId)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao carregar user');
        }
    }
}