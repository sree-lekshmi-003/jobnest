const express = require('express')
const router = express.Router()
const jobcontroller = require("../controllers/jobcontroller")
const middleware = require("../middleware/authmiddleware")

router.post('/createjob', middleware, jobcontroller.CreateJob)
router.get('/alljobs', jobcontroller.GetJobs)
router.put('/updatejob/:id', middleware, jobcontroller.UpdateJobs)
router.delete('/deletejobs/:id', middleware, jobcontroller.DeleteJobs)

module.exports = router