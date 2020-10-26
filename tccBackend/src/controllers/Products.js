const Products = require('../models/Products');
const Adm = require('../models/Adm');
module.exports = {
    async products(req, res) {
        try {
            const { style, size, price, timeUsed, description } = req.body;
            if (!style || !size || !price || !timeUsed || !description){
                return res.status(400).json('Campo inválido')
            }
            if(!req.file){
                return res.status(400).json('Imagem não cadastrada')
                
            }
            console.log(req.file)
            // if (size != "M" || size != "G" || size != "P" || size != "GG") {
            //     return res.status(400).json("Tamanho inválido");
            // }              
            const { originalname, size : sizeImg, key, location } = req.file      
            const image = {
                originalName: originalname,
                size: sizeImg,
                key,
                location
            }
            const products = await Products.create({ 
                style: style.toUpperCase(),
                size: size.toUpperCase(),
                price,
                timeUsed,
                description,
                image,
                evaluation: 0,
                totalEvaluation: 0,
                mediaEvaluation: 0,
                adm: req.userId });

            const findAdm = await Adm.findById(req.userId)
            findAdm.products.push(products)
            await findAdm.save()

            return res.status(200).json(products);
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha no registro');
        }
    },
    async ListProducts(req, res) {
        try {
            const products = await Products.find().populate("adm")
            return res.status(200).send({ products })
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao listar');
        }
    },
    async FindProductsSize(req,res) {
        try {
            const products = await Products.find({ size: req.body.size.toUpperCase() }).populate("adm")
            return res.status(200).json({ products })
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao achar produto');
        }
    },
    async FindProductsStyle(req,res) {
        try {
            const products = await Products.find({ style: req.body.style.toUpperCase() }).populate("adm")
            return res.status(200).json({ products })
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao achar produto');
        }
    },
    async FindProductsPrice(req,res) {
        try {
            const Allproducts = await Products.find({  }).populate("adm")
            const products = Allproducts.map((product)=>{
                if(product.price > req.body.smallest && product.price < req.body.biggest){
                    return product
                }
            })
            return res.status(200).json({ products })
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao achar produto');
        }
    },
    async FindProductsTimeUsed(req,res) {
        try {
            const Allproducts = await Products.find({  }).populate("adm")
            const products = Allproducts.map((product)=>{
                if(product.timeUsed > req.body.smallest && product.timeUsed < req.body.biggest){
                    return product
                }
            })
            return res.status(200).json({ products })
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao achar produto');
        }
    },
    async DeleteProduct(req,res){
        try {
            const adm = await Adm.findById( req.userId )
            const newProducts = adm.products.filter((product)=>{
               return product != req.params.id
            })
            adm.products = newProducts
            await adm.save()
            await Products.findByIdAndDelete( req.params.id )
            return res.status(200).json('Deletado com sucesso')
        } catch (error) {
            console.log(error)
            return res.status(500).json('Falha ao deletar');
        }
    },
    async Evaluation(req, res){
        try {
        const product = await Products.findById( req.params.id )
        console.log(product)
        product.evaluation += parseInt(req.body.evaluation)  
        product.totalEvaluation++      
        product.mediaEvaluation = product.evaluation / product.totalEvaluation;
        await product.save()            
        const productAvaliated = await Products.findById( req.params.id )
        return res.status(200).json( productAvaliated )

        } catch (error) {
            return res.status(500).json('Falha ao avaliar');
        }
    }
}