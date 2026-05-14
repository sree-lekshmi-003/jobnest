const express = require('express')
const Router = express.Router()
const usercontroller = require("../controllers/usercontroller")

Router.post('/register', usercontroller.registeruser)
Router.post('/login', usercontroller.Login)
Router.get('/Getprofile', usercontroller.getprofile)
Router.put('/Updateprofile', usercontroller.updateprofile)
module.exports = Router