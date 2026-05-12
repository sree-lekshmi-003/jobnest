const Job = require('../models/jobmodel')

// ----------------CREATE JOB---------------------------

const CreateJob = async (req, res) => {
    const { Jobrole,
        company,
        location,
        salary,
        description,
        jobtype } = req.body
    try {

        const newdata = await new Job({
            Jobrole,
            company,
            location,
            salary,
            description,
            jobtype

        })
        await newdata.save()
        res.status(200).json({ msg: "Job Created success", data: newdata })
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

// -------------READ JOBS---------------------------

const GetJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 })
        res.status(200).json({ msg: "All jobs", data: jobs })
    }
    catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

// --------------UPDATE JOBS------------------------

const UpdateJobs = async (req, res) => {
    try {
        const { id } = req.params
        const updatejobs = await job.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatejobs) {
            res.json({ msg: "Job not found" })
        }
        res.status(200).json({ msg: "Job updated successfuly", updatejobs: updatejobs })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

// -----------------------DELETE JOBS---------------

const DeleteJobs = async (req, res) => {
    try {
        const { id } = req.params
        const deletejobs = await job.findByIdAndDelete(id)
        if (!deletepost) {
            res.status(404).json({ msg: "Job not found" })
        }
        res.status(200).json({ msg: "Job deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

module.exports = { CreateJob, GetJobs, UpdateJobs, DeleteJobs }
