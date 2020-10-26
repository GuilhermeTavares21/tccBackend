const router  = require('express').Router();
const { login, loginAdm }  = require('../controllers/auth')

router.post('/login', login)
router.post('/admlogin', loginAdm)

module.exports = router;