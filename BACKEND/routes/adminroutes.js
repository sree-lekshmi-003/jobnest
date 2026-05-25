const express = require('express')

const router = express.Router()

const admincontroller = require('../controllers/adminController')

const middleware = require('../middleware/authmiddleware')

const adminRole = require('../middleware/adminmiddleware')


router.get('/allusers',middleware,adminRole,admincontroller.GetUsers)
router.delete('/deleteuser/:id',middleware,adminRole,admincontroller.DeleteUser)
router.get('/alljobs',middleware,adminRole,admincontroller.GetAllJobs)
router.delete('/deletejob/:id',middleware,adminRole,admincontroller.DeleteAnyJob)
router.get('/allapplications',middleware,adminRole,admincontroller.GetApplications)

module.exports = router