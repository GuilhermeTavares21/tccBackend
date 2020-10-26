const router  = require('express').Router();
const { register, updateUser, ListUsers, DeleteUser, addBag , deleteBag, listBag, loadUser }  = require('../controllers/user')
const authToken = require('../middleware/auth')
const multer = require('../middleware/multer')


router.post('/register', register)
router.get('/listusers', ListUsers)
router.put('/updateUser', authToken, multer.single("file"), updateUser)
router.delete('/deleteUser', authToken, DeleteUser)
router.post('/addBag', authToken, addBag)
router.delete('/deleteBag', authToken, deleteBag)
router.get('/listBag', authToken, listBag)
router.get('/loadUser', authToken, loadUser)
module.exports = router;