const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

function connection() {
    try{
        mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database Conected")
    }
    catch(error){
        console.log("error")
        console.log(error)
        process.exit(1)
    }
}
module.exports = connection;