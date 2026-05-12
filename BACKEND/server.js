const express = require('express')
const app = express()
const connectDB = require('./config/db')
connectDB();
const jobroute = require('./routes/jobroutes')
const authroute=require('./routes/authroutes')
app.use(express.json())
app.use('/auth',authroute)
app.use('/jobs', jobroute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
})



