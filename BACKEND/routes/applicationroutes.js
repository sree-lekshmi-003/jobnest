const express = require('express')
const router = express.Router()
const applicationcontroller = require('../controllers/applicationController')
const middleware = require('../middleware/authmiddleware')

router.post('/apply/:jobid', middleware, applicationcontroller.ApplyJob)
router.get('/myapplications', middleware, applicationcontroller.GetMyApplications)
router.get('/applicants/:jobid', middleware, applicationcontroller.GetApplicants)
router.put('/updatestatus/:applicationid', middleware, applicationcontroller.UpdateApplicationStatus)

module.exports = router