const express = require('express');
const connection = require('./connection')

const auth = require('../src/routes/auth')
const user = require('../src/routes/user')
const adm = require('../src/routes/adm')
const products = require('../src/routes/products')

const cors = require('cors')
const app = express();
connection();
app.use(express.json());
app.use(cors())
app.use(auth)
app.use(user)
app.use(adm)
app.use(products)

app.listen(process.env.PORT || 3333, () => {
    console.log("Server started")
})