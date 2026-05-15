const express = require('express')

const Router = express.Router()

const applicationcontroller = require('../controllers/applicationcontroller')

const middleware = require('../middleware/authmiddleware')


//-------------------------------APPLY JOB
Router.post('/apply/:jobid',middleware,applicationcontroller.ApplyJob)

//----------------------------- MY APPLICATIONS
Router.get('/myapplications',middleware,applicationcontroller.GetMyApplications)


//-------------------------------- GET APPLICANTS
Router.get('/applicants/:jobid',middleware,applicationcontroller.GetApplicants)


//------------------------------- UPDATE STATUS
Router.put('/updatestatus/:applicationid',middleware,applicationcontroller.UpdateApplicationStatus)

module.exports = Router