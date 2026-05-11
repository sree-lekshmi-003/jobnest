const express = require('express')
const Router = express.Router()
const jobcontroller = require("../controllers/jobcontroller")

Router.post('/createjob', jobcontroller.CreateJob)
Router.get('/alljobs', jobcontroller.GetJobs)
Router.put('/updatejob/:id', jobcontroller.UpdateJobs)
Router.delete('/deletejobs/:id', jobcontroller.DeleteJobs)

module.exports = Router