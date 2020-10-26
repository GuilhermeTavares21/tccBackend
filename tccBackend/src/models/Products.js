const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    style:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    timeUsed:{
        type: String,
        required: true
    },
    image:{
       originalName: String,
       size: Number,
       key: String,
       location: String
    },
    description:{
        type: String,
        required: true
    },
    evaluation: Number,
    totalEvaluation: Number,
    mediaEvaluation: Number,
    adm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adm',
        required: true
    }

})

const Products = mongoose.model("Products", productsSchema)

module.exports = Products