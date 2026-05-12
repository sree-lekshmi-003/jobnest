const express = require('express')
const Router = express.Router()
const authcontroller = require("../controllers/authcontroller")

Router.post('/register', authcontroller.registeruser)
Router.post('/login', authcontroller.Login)

module.exports = Router