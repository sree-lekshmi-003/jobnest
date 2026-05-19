const express = require('express')
const router = express.Router() // Changed to lowercase for clean convention
const usercontroller = require("../controllers/usercontroller") // Linked to your auth file
const middleware = require("../middleware/authmiddleware")

router.post('/register', usercontroller.registeruser)
router.post('/login', usercontroller.Login)
router.get('/getprofile', middleware, usercontroller.getprofile)
router.put('/updateprofile', middleware, usercontroller.updateprofile)

module.exports = router