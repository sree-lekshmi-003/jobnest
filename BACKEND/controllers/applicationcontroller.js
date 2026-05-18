const Application = require('../models/applicationmodel')
const Job = require('../models/jobmodel')

// ------------------------------------APPLY JOB ----------------------------------------------

const ApplyJob = async (req, res) => {

//----------------------------------- ONLY USERS CAN APPLY-------------------------------------
    if (req.user.role !== "user") {

        return res.status(403).json({
            msg: "Only users can apply for jobs"
        })
    }

    try {

        const { jobid } = req.params

//------------------------------- CHECK JOB EXISTS---------------------------------------------

        const job = await Job.findById(jobid)

        if (!job) {

            return res.status(404).json({
                msg: "Job not found"
            })
        }

//---------------------------------------------CHECK ALREADY APPLIED-------------------------------

        const alreadyApplied = await Application.findOne({
            user: req.user.id,
            job: jobid
        })

        if (alreadyApplied) {

            return res.status(400).json({
                msg: "Already applied for this job"
            })
        }

//----------------------------------------------CREATE APPLICATION-------------------------------------

        const newApplication = await new Application({
            user: req.user.id,
            job: jobid
        })

        await newApplication.save()

        res.status(200).json({
            msg: "Job applied successfully",
            data: newApplication
        })

    } catch (error) {

        res.status(500).json({
            msg: "Server error"
        })
    }
}

// ----------------------------- GET MY APPLICATIONS --------------------------------

const GetMyApplications = async (req, res) => {

    try {

        const applications = await Application.find({
            user: req.user.id
        })
        .populate("job")

        res.status(200).json({
            msg: "My Applications",
            data: applications
        })

    } catch (error) {

        res.status(500).json({
            msg: "Server error"
        })
    }
}


// ------------------------------- GET APPLICANTS -----------------------------------

const GetApplicants = async (req, res) => {

//--------------------------------- ONLY EMPLOYER------------------------------------
    if (req.user.role !== "employer") {

        return res.status(403).json({
            msg: "Only employers can view applicants"
        })
    }

    try {

        const { jobid } = req.params

//----------------------- FIND JOB
        const job = await Job.findById(jobid)

        if (!job) {

            return res.status(404).json({
                msg: "Job not found"
            })
        }

//---------------------------------- OWNER CHECK--------------------------------------

        if (job.employer.toString() !== req.user.id) {

            return res.status(403).json({
                msg: "You can view applicants only for your jobs"
            })
        }

//---------------------------------------- GET APPLICATIONS----------------------------

        const applicants = await Application.find({
            job: jobid
        })
        .populate("user", "-password")

        res.status(200).json({
            msg: "Applicants List",
            data: applicants
        })

    } catch (error) {

        res.status(500).json({
            msg: "Server error"
        })
    }
}

// -------------------------- UPDATE APPLICATION STATUS --------------------------

const UpdateApplicationStatus = async (req, res) => {

//----------------- ONLY EMPLOYER
    if (req.user.role !== "employer") {

        return res.status(403).json({
            msg: "Only employers can update status"
        })
    }

    try {

        const { applicationid } = req.params

        const { status } = req.body

//---------------- FIND APPLICATION
        const application = await Application.findById(applicationid)
        .populate("job")

        if (!application) {

            return res.status(404).json({
                msg: "Application not found"
            })
        }

//------------------- OWNER CHECK
        if (application.job.employer.toString() !== req.user.id) {

            return res.status(403).json({
                msg: "Unauthorized"
            })
        }

//-------------- UPDATE STATUS
        application.status = status

        await application.save()

        res.status(200).json({
            msg: "Application status updated",
            data: application
        })

    } catch (error) {

        res.status(500).json({
            msg: "Server error"
        })
    }
}


module.exports = {ApplyJob,GetMyApplications,GetApplicants,UpdateApplicationStatus}