const express = require('express')
const Router = express.Router()
const applicationcontroller = require('../controllers/applicationcontroller')
const middleware = require('../middleware/authmiddleware')

Router.post('/apply/:jobid',middleware,applicationcontroller.ApplyJob)

Router.get('/myapplications',middleware,applicationcontroller.GetMyApplications)

Router.get('/applicants/:jobid',middleware,applicationcontroller.GetApplicants)

Router.put('/updatestatus/:applicationid',middleware,applicationcontroller.UpdateApplicationStatus)

module.exports = Router