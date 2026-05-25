const express = require('express')
const app = express()
const connectDB = require('./config/db')
connectDB();
const jobroute = require('./routes/jobroutes')
const userroute=require('./routes/userroutes')
const applicationroute=require('./routes/applicationroutes')
const adminroute=require('./routes/adminroutes')
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.use('/user',userroute);
app.use('/jobs', jobroute);
app.use('/applications',applicationroute);
app.use('/admin',adminroute)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
})



