const express = require('express')
const Router = express.Router()
const usercontroller = require("../controllers/usercontroller")
const middleware = require("../middleware/authmiddleware")
Router.post('/register', usercontroller.registeruser)
Router.post('/login', usercontroller.Login)
Router.get('/getprofile',middleware, usercontroller.getprofile)
Router.put('/updateprofile', middleware,usercontroller.updateprofile)
module.exports = Router