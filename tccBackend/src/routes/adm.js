const router  = require('express').Router();
const { adm, findOne, updateAdm, ListAdm, DeleteAdm, Evaluation, loadAdm }  = require('../controllers/adm')
const authToken = require('../middleware/auth')
const multer = require('../middleware/multer')


router.post('/adm', adm)
router.post('/findOne', findOne)
router.get('/listAdms', ListAdm)
router.put('/updateAdm', authToken, multer.single("file"), updateAdm)
router.delete('/deleteAdm', authToken, DeleteAdm)
router.post('/evaluationAdm/:id', authToken, Evaluation)
router.get('/loadAdm', authToken, loadAdm)

module.exports = router;