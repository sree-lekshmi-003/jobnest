const express = require('express')
const app = express()
const connectDB = require('./config/db')
connectDB();
const jobroute = require('./routes/jobroutes')
const userroute=require('./routes/userroutes')
const applicationroute=require('./routes/applicationroutes')
app.use(express.json())
app.use('/user',userroute);
app.use('/jobs', jobroute);
app.use('/applications',applicationroute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
})



