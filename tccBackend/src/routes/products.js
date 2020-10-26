const router  = require('express').Router();
const { products,
        ListProducts,
        FindProductsSize, 
        FindProductsStyle, 
        FindProductsPrice, 
        FindProductsTimeUsed, 
        DeleteProduct,
        Evaluation
     }  = require('../controllers/Products')
const authToken = require('../middleware/auth')
const verifyAdm = require('../middleware/confirmAdm')
const multer = require('../middleware/multer')

router.post('/products', authToken, verifyAdm, multer.single("file"), products)
router.get('/listproducts', ListProducts)
router.post('/findProductsSize', FindProductsSize)
router.post('/findProductsStyle', FindProductsStyle)
router.post('/findProductsPrice', FindProductsPrice)
router.post('/findProductsTimesUsed', FindProductsTimeUsed)
router.delete('/deleteProduct/:id', authToken, DeleteProduct)
router.post('/evaluationProduct/:id', Evaluation)
module.exports = router;