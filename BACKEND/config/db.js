const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB CONNECTED SUCCESSFULLY")

    } catch (error) {
        console.error("ERROR IN DB CONNECTION", error);

    }

}
module.exports = connectDB