const express = require('express')
const Router = express.Router()
const admincontroller = require('../controllers/admincontroller')
const middleware = require('../middleware/authmiddleware')
const adminRole=require('../middleware/adminmiddleware')

Router.get('/allusers',middleware,adminRole,admincontroller.GetUsers)

Router.delete('/deleteuser/:id',middleware,adminRole,admincontroller.DeleteUser)

Router.get('/alljobs',middleware,adminRole,admincontroller.DeleteAnyJob)

Router.get('/allapplications',middleware,adminRole,admincontroller.GetApplications)

module.exports = Router