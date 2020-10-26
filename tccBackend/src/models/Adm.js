const mongoose = require('mongoose');

const AdmScheema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    street: {
        type: String,
        required: true
    },
    numberHouse: {
        type: Number,
        required: true
    },
    complement: String,
    image:{
        originalName: String,
        size: Number,
        key: String,
        location: String
     },
     imageBanner:{
        originalName: String,
        size: Number,
        key: String,
        location: String
     },
     description: String,
    evaluation: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        avaliate: Number,
        comment: String
    }],
    mediaEvaluation: Number,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    }]
})
const Adm = mongoose.model('Adm', AdmScheema)

module.exports = Adm;