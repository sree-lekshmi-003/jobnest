const express = require('express')
const Router = express.Router()
const jobcontroller = require("../controllers/jobcontroller")
const middleware=require("../middleware/authmiddleware")
Router.post('/createjob',middleware, jobcontroller.CreateJob)
Router.get('/alljobs', jobcontroller.GetJobs)
Router.put('/updatejob/:id',middleware, jobcontroller.UpdateJobs)
Router.delete('/deletejobs/:id',middleware, jobcontroller.DeleteJobs)
module.exports = Router

