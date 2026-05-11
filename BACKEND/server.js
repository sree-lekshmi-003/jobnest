const express = require('express')
const app = express()
const connectDB = require('./config/db')
connectDB();
const jobroute = require('./routes/jobroutes')
app.use(express.json())
app.use('/jobs', jobroute);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
})



